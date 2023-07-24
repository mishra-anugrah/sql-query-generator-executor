import { Dropdown } from "./Dropdown";
import { conditionalOperators } from "../config/queryBuilderConfig";
import { TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

export const QueryCondition = (props) => {
  const { condition, updateConditionRow, handleDeleteCondition, schema } =
    props;

  const handleQueryInputChange = (name, value) => {
    updateConditionRow(condition.id, name, value);
  };

  return (
    <div className="condition">
      <Dropdown
        menuItems={schema}
        value={condition.columnName}
        label="Column"
        handleDropdownChange={handleQueryInputChange}
        name="columnName"
      />

      <Dropdown
        menuItems={conditionalOperators}
        value={condition.conditionalOperator}
        label="Conditional Operator"
        handleDropdownChange={handleQueryInputChange}
        name="conditionalOperator"
      />

      {/* textbox here for value*/}
      <TextField
        id="condition-value"
        label="Value"
        variant="filled"
        value={condition.value}
        name={"value"}
        onChange={(event) =>
          handleQueryInputChange("value", event.target.value)
        }
      />

      <Delete
        className="delete-condition"
        onClick={() => handleDeleteCondition(condition.id)}
      />
    </div>
  );
};
