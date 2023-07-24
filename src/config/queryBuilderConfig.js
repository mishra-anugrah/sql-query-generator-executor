export const tablesList = [
  { label: "Customers", value: "customers" },
  { label: "Products", value: "products" },
  { label: "Orders", value: "orders" },
];

export const statements = [{ value: "SELECT", label: "SELECT" }];

export const conditionalOperators = [
  { label: "=", value: "=", type: "any" },
  { label: "<", value: "<", type: "number" },
  { label: ">", value: ">", type: "number" },
  { label: "<=", value: "<=", type: "number" },
  { label: ">=", value: ">=", type: "number" },
  { label: "!=", value: ">=", type: "any" },
];

export const logicalOperators = [
  { label: "AND", value: "and" },
  { label: "OR", value: "or" },
];

export const sortingOperators = [
  {
    label: "ASC",
    value: "asc",
  },
  {
    label: "DESC",
    value: "desc",
  },
];

export const notOperator = { label: "NOT", value: "not" };
export const inOperator = { label: "IN", value: "in", type: "any" };
export const notInOperator = { label: "NOT IN", value: "not in", type: "any" };
export const orderByOperator = { label: "ORDER BY", value: "order by" };
export const byOperator = { label: "BY", value: "by" };
export const orderOperator = { label: "ORDER", value: "order" };
