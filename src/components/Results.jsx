import React from "react";
import { DataTable } from "./DataTable";

export const Results = (props) => {
  const { results } = props;
  return (
    <div>
      <DataTable data={results} />
    </div>
  );
};
