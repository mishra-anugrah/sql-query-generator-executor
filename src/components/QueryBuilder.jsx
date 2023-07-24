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

  useEffect(() => {
    if (tablesList) {
      setTables(tablesList);
    }
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
    }
  };

  const handleLogicalOperatorChange = (logicOperator) => {
    setLogicalOperator(logicOperator);
  };

  const handleColumsToFetchChange = (_, columnsToFetch) => {
    if (columnsToFetch.length && columnsToFetch.includes("all")) {
      setColumnsToSelect([
        ...allSchemas[selectedTable].map((column) => column.value),
      ]);
    } else {
      setColumnsToSelect([...columnsToFetch]);
    }
  };

  // const generateConditionsString = () => {};

  // const generateColumnsToSelectString = () => {
  //   if (columnsToSelect.length) {
  //   }
  // };

  // const generateQuery = () => {
  //   const query = "SELECT ";
  // };

  return (
    <div className="query-builder">
      <div className="title">Query builder</div>
      {/* <QueryTable
        selectedTable={selectedTable}
        handleTableChange={handleTableChange}
      /> */}

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
          <Button variant="contained">Generate Query</Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
