import React from "react";
import { QueryExecutorForm } from "./QueryExecutorForm";
import { schemas } from "../config/tableSchemas";

export const CustomQueryExecutor = (props) => {
  const { handleQueryExecution, selectedQuery, handleQueryTextChange } = props;

  return (
    <div className="custom-query-executor">
      <div className="title">Custom Query Executor</div>

      <div className="available-columns">
        <h5>
          Please use SELECT query only. List of columns currently supported
        </h5>
        <ul>
          {schemas.customers.map((schema, index) => (
            <li key={index}>{schema.value}</li>
          ))}
        </ul>
      </div>

      <QueryExecutorForm
        handleQueryExecution={handleQueryExecution}
        selectedQuery={selectedQuery}
        handleQueryTextChange={handleQueryTextChange}
        disableEditing={false}
      />
    </div>
  );
};
