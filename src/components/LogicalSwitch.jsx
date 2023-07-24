import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export const LogicalSwitch = (props) => {
  const { handleLogicalOperatorChange, logicalOperator } = props;

  return (
    <div className="logical-switch">
      <ToggleButtonGroup
        value={logicalOperator}
        exclusive
        onChange={(event) => {
          handleLogicalOperatorChange(event.target.value);
        }}
        color="primary"
        aria-label="text alignment"
      >
        <ToggleButton value="and" aria-label="left aligned">
          AND
        </ToggleButton>
        <ToggleButton value="or" aria-label="centered">
          OR
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
