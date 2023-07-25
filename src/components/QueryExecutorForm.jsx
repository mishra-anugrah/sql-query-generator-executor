import React from "react";
import { Button, FormLabel, TextField, Tooltip } from "@mui/material";

export const QueryExecutorForm = (props) => {
  const {
    handleQueryExecution,
    selectedQuery,
    disableEditing,
    handleQueryTextChange,
  } = props;

  return (
    <div className="query-executor-form">
      {/* <FormLabel className="query-form-field">Selected query : </FormLabel> */}
      <Tooltip title={selectedQuery}>
        <TextField
          className="query-form-field"
          value={selectedQuery}
          disabled={disableEditing}
          variant="outlined"
          onChange={(event) => {
            handleQueryTextChange("customQuery", event.target.value);
          }}
        />
      </Tooltip>
      <Button
        className="query-form-field"
        variant="contained"
        onClick={() => handleQueryExecution()}
      >
        Execute Query
      </Button>
    </div>
  );
};
