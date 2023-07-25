import { schemas } from "../config/tableSchemas";

export const camelCaseToTitle = (camelCase) => {
  const result = camelCase.replace(/([A-Z])/g, " $1");
  const title = result.charAt(0).toUpperCase() + result.slice(1);
  return title;
};

export const getColumns = (data, columnsToInclude) => {
  if (Array.isArray(data)) {
    const dataObj = data[0];
    let columnsFromData = [];

    if (columnsToInclude) {
      const keys = Object.keys(dataObj);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (columnsToInclude.includes(key)) {
          columnsFromData.push({
            label: camelCaseToTitle(key),
            value: key,
          });
        }
      }
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
      for (let i = 0; i < columnsToInclude.length; i++) {
        let columnName = columnsToInclude[i];
        selectiveDataObject[columnName] = data[i][columnName];
      }

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
    let columns = [],
      columnsFromQuery = queryTokens.slice(
        1,
        queryTokens.findIndex((token) => /from/i.test(token))
      );

    if (columnsFromQuery.length === 1 && columnsFromQuery[0] === "*") {
      return schemas.customers.map((columnConfig) => columnConfig.value);
    }

    for (let i = 0; i < schemas.customers.length; i++) {
      const columnConfig = schemas.customers[i];
      if (columnsFromQuery.includes(columnConfig.value)) {
        columns.push(columnConfig.value);
      }
    }

    return columnsFromQuery.filter((columnName) => !!columnName);
  }
};

export const validateConditions = (conditions) => {
  return conditions.every(
    (condition) =>
      condition.columnName && condition.conditionalOperator && condition.value
  );
};
