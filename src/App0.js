// src/App.js
import React, { useState } from "react";
import { dataSets, queries } from "./data";
import { Parser } from "sql-parser";
import { useTable } from "react-table";

const App = () => {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleExecuteQuery = () => {
    try {
      setError(null);
      const parser = new Parser();
      const parsedQuery = parser.astify(query);

      // Validate the query
      if (!parsedQuery || parsedQuery.type !== "select") {
        setError("Invalid SQL query. Only SELECT queries are supported.");
        setQueryResult(null);
        return;
      }

      // Execute the query (dummy data used here)
      const resultSet = executeQuery(query);

      setQueryResult(resultSet);
    } catch (err) {
      setError("Error executing the SQL query.");
      setQueryResult(null);
    }
  };

  const columns = React.useMemo(
    () =>
      Object.keys(dataSets["dataSet1"][0]).map((col) => ({
        Header: col,
        accessor: col,
      })),
    []
  );

  const data = React.useMemo(
    () => queryResult || dataSets["dataSet1"],
    [queryResult]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      <h1>SQL Query Execution App</h1>
      <textarea
        rows="6"
        cols="50"
        value={query}
        onChange={handleQueryChange}
        placeholder="Enter your SQL query here..."
      ></textarea>
      <br />
      <button onClick={handleExecuteQuery}>Execute Query</button>
      {error && <div className="error">{error}</div>}
      <br />
      <div>
        <h2>Table Data</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const executeQuery = (query) => {
  // Dummy implementation using predefined data
  return dataSets["dataSet1"];
};

export default App;
