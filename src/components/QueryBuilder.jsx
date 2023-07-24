import { useState } from "react";
import { QueryCondition } from "./QueryCondition";
import { QueryTable } from "./QueryTable";
import { AddCondition } from "./AddCondition";
import { LogicalSwitch } from "./LogicalSwitch";
import { schemas } from "../config/tableSchemas";
import { Button } from "@mui/material";
import { Dropdown } from "./Dropdown";

export const QueryBuilder = () => {
  const [allSchemas] = useState(schemas);
  const [selectedTable, setSelectedTable] = useState(null);
  const [columnsToSelect, setColumnsToSelect] = useState([
    { label: "All", value: "all" },
  ]);
  const [conditions, setConditions] = useState([]);
  const [logicalOperator, setLogicalOperator] = useState("and");

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
      setColumnsToSelect([
        { label: "All", value: "all" },
        ...allSchemas[table],
      ]);
    }
  };

  const handleLogicalOperatorChange = (logicOperator) => {
    setLogicalOperator(logicOperator);
  };

  const handleColumsToFetchChange = (_, columnsToFetch) => {
    if (columnsToFetch.length && columnsToFetch.includes("all")) {
      setColumnsToSelect([...allSchemas[selectedTable]]);
    } else {
      setColumnsToSelect(columnsToFetch);
    }
  };

  const generateConditionsString = () => {};

  const generateColumnsToSelectString = () => {
    if (columnsToSelect.length) {
    }
  };

  const generateQuery = () => {
    const query = "SELECT ";
  };

  return (
    <div className="query-builder">
      <h4>Query builder</h4>
      <QueryTable
        selectedTable={selectedTable}
        handleTableChange={handleTableChange}
      />
      {selectedTable ? (
        <>
          <Dropdown
            menuItems={columnsToSelect}
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
