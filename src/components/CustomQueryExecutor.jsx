import React from "react";
import { QueryExecutorForm } from "./QueryExecutorForm";

export const CustomQueryExecutor = (props) => {
  const { handleQueryExecution, selectedQuery, handleQueryTextChange } = props;

  return (
    <div className="custom-query-executor">
      <h4>Custom Query Executor</h4>

      <QueryExecutorForm
        handleQueryExecution={handleQueryExecution}
        selectedQuery={selectedQuery}
        handleQueryTextChange={handleQueryTextChange}
        disableEditing={false}
      />
    </div>
  );
};
