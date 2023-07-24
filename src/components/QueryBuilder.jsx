import { useEffect, useState } from "react";
import { QueryCondition } from "./QueryCondition";
import { AddCondition } from "./AddCondition";
import { LogicalSwitch } from "./LogicalSwitch";
import { schemas } from "../config/tableSchemas";
import { Button } from "@mui/material";
import { Dropdown } from "./Dropdown";
import { tablesList } from "../config/queryBuilderConfig";

export const QueryBuilder = () => {
  const [allSchemas] = useState(schemas);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnsToSelect, setColumnsToSelect] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [logicalOperator, setLogicalOperator] = useState("and");
  const [allColumnsSelected, setAllColumnsSelected] = useState(true);

  useEffect(() => {
    if (tablesList) {
      setTables(tablesList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablesList]);

  const handleAddCondition = () => {
    const newCondition = {
      columnName: null,
      conditionalOperator: null,
      value: null,
      id: new Date().getTime(),
    };

    setConditions([...conditions, newCondition]);
  };

  const updateConditionRow = (id, fieldName, fieldValue) => {
    const tempConditions = [...conditions];
    const newConditions = tempConditions.map((condition) => {
      if (condition.id === id) {
        condition[fieldName] = fieldValue;
      }
      return { ...condition };
    });

    setConditions(newConditions);
  };

  const handleDeleteCondition = (id) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleTableChange = (table) => {
    if (table === selectedTable) return;
    else {
      setSelectedTable(table);
      setConditions([]);
      setColumns([{ label: "All", value: "all" }, ...allSchemas[table]]);
      setColumnsToSelect([]);
      setAllColumnsSelected(true);
    }
  };

  const handleLogicalOperatorChange = (logicOperator) => {
    setLogicalOperator(logicOperator);
  };

  const handleColumsToFetchChange = (_, columnsToFetch) => {
    if (!columnsToFetch) {
      setColumnsToSelect([]);
      return;
    }
    if (
      Array.isArray(columnsToFetch) &&
      columnsToFetch.length &&
      columnsToFetch.includes("all")
    ) {
      setColumnsToSelect([
        ...allSchemas[selectedTable].map((column) => column.value),
      ]);
      setAllColumnsSelected(true);
    } else {
      setColumnsToSelect([...columnsToFetch]);
      setAllColumnsSelected(false);
    }
  };

  const generateConditionsString = () => {
    const conditionsArray = conditions.map((condition) => {
      return (
        condition.columnName + condition.conditionalOperator + condition.value
      );
    });
    return conditionsArray.join(` ${logicalOperator.toUpperCase()} `);
  };

  const generateSelectedColumnsString = () => {
    if (allColumnsSelected) {
      return "*";
    }

    if (Array.isArray(columnsToSelect) && columnsToSelect.length) {
      return columnsToSelect.join(", ");
    } else {
      alert("Invalid column selection");
    }
  };

  const generateQuery = () => {
    let resultQuery = "";
    const queryType = "SELECT";
    const columns = generateSelectedColumnsString();
    const table = selectedTable;
    const conditions = generateConditionsString();

    resultQuery +=
      queryType + " " + columns + " FROM " + table + " WHERE " + conditions;

    console.log(resultQuery);
    return resultQuery;
  };

  return (
    <div className="query-builder">
      <div className="title">Query builder</div>

      <Dropdown
        menuItems={tables}
        value={selectedTable}
        label="Table"
        handleDropdownChange={(_, value) => {
          handleTableChange(value);
        }}
        name="table"
      />
      {selectedTable ? (
        <>
          <Dropdown
            menuItems={columns.filter((column) => column)}
            isMulti
            label="Columns to select"
            value={columnsToSelect}
            handleDropdownChange={handleColumsToFetchChange}
            name="columnsToSelect"
            placeholder="Select columns to fetch"
          />

          <AddCondition onClick={handleAddCondition} />
          {conditions.length ? (
            <LogicalSwitch
              logicalOperator={logicalOperator}
              handleLogicalOperatorChange={handleLogicalOperatorChange}
            />
          ) : (
            <></>
          )}
          {conditions.map((condition) => (
            <QueryCondition
              key={condition.id}
              condition={condition}
              updateConditionRow={updateConditionRow}
              handleDeleteCondition={handleDeleteCondition}
              schema={schemas[selectedTable]}
            />
          ))}
          <Button variant="contained" onClick={generateQuery}>
            Generate Query
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
