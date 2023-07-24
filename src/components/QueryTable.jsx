import { Dropdown } from "./Dropdown";
import { tables } from "../config/queryBuilderConfig";

export const QueryTable = (props) => {
  const { selectedTable, handleTableChange } = props;

  return (
    <div>
      <Dropdown
        menuItems={tables}
        value={selectedTable}
        label="Table"
        handleDropdownChange={(_, value) => {
          handleTableChange(value);
        }}
        name="table"
      />
    </div>
  );
};
