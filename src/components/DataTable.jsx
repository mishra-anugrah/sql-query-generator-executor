import { useEffect, useState } from "react";
import { getColumns } from "../utils/utils";

export const DataTable = (props) => {
  const { data } = props;

  const [columns, setColumns] = useState([]);

  // extract columns from data whenever data changes
  useEffect(() => {
    setColumns(getColumns(data));
  }, [data]);

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) && data.length ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td>{row[column.value]}</td>
                ))}
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};
