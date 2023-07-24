import React from "react";
import { QueryExecutorForm } from "./QueryExecutorForm";

export const CustomQueryExecutor = (props) => {
  const { handleQueryExecution, selectedQuery, handleQueryTextChange } = props;

  return (
    <div className="custom-query-executor">
      <div className="title">Custom Query Executor</div>

      <div className="available-columns"></div>

      <QueryExecutorForm
        handleQueryExecution={handleQueryExecution}
        selectedQuery={selectedQuery}
        handleQueryTextChange={handleQueryTextChange}
        disableEditing={false}
      />
    </div>
  );
};
