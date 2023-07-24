import { AddCircle } from "@mui/icons-material";
import React from "react";

export const AddCondition = (props) => {
  const { onClick } = props;
  return (
    <div className="add-condition" onClick={onClick}>
      <AddCircle />
    </div>
  );
};
