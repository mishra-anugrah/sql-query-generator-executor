import { schemas } from "../config/tableSchemas";

export const camelCaseToTitle = (camelCase) => {
  const result = camelCase.replace(/([A-Z])/g, " $1");
  const title = result.charAt(0).toUpperCase() + result.slice(1);
  return title;
};

export const getColumns = (data, columnsToInclude) => {
  if (Array.isArray(data)) {
    const dataObj = data[0];
    let columnsFromData;

    if (columnsToInclude) {
      columnsFromData = Object.keys(dataObj).map((key) => {
        if (columnsToInclude.includes(key)) {
          return {
            label: camelCaseToTitle(key),
            value: key,
          };
        }
      });
    } else {
      columnsFromData = Object.keys(dataObj).map((key) => ({
        label: camelCaseToTitle(key),
        value: key,
      }));
    }

    return Array.isArray(columnsFromData) ? columnsFromData : [];
  }
};

export const getSpecificColumnsData = (data, columnsToInclude) => {
  if (
    Array.isArray(data) &&
    Array.isArray(columnsToInclude) &&
    columnsToInclude.length
  ) {
    const selectiveData = [];

    for (let i = 0; i < data.length; i++) {
      const selectiveDataObject = {};
      columnsToInclude.forEach((columnName) => {
        selectiveDataObject[columnName] = data[i][columnName];
      });

      selectiveData.push(selectiveDataObject);
    }

    return selectiveData;
  }

  alert(
    "ERROR: No data found for given Query. Please check column names or query"
  );

  return [];
};

export const getColumnNamesFromQuery = (query) => {
  if (query) {
    query = query.replaceAll(",", " ");
    const queryTokens = query.split(" ");
    let columns = queryTokens.slice(
      1,
      queryTokens.findIndex((token) => token === "from")
    );

    if (columns.length === 1 && columns[0] === "*") {
      return schemas.customers.map((columnConfig) => columnConfig.value);
    }

    columns = schemas.customers.map((columnConfig) => {
      if (columns.includes(columnConfig.value)) {
        return columnConfig.value;
      }
    });
    return columns.filter((columnName) => !!columnName);
  }
};

const pqr = (query) => {
  if (query) {
    query = query.replaceAll(",", " ");
    const queryTokens = query.split(" ");
    const columns = queryTokens.slice(
      1,
      queryTokens.findIndex((token) => token === "from")
    );
    if (columns.length === 1 && columns[0] === "*") {
      return schemas.customers.map((columnConfig) => columnConfig.value);
    }
    return columns.filter((columnName) => columnName !== "");
  }
};

const abc = (query) => {
  if (query) {
    query = query.replaceAll(",", " ");
    const queryTokens = query.split(" ");
    const columns = queryTokens.slice(
      1,
      queryTokens.findIndex((token) => token === "from")
    );
    console.log(columns);
    return columns.filter((columnName) => columnName !== "");
  }
};
