import { Dropdown } from "./Dropdown";
import { QueryExecutorForm } from "./QueryExecutorForm";

export const QueryExecutor = (props) => {
  const {
    queries,
    selectedQuery,
    onSelectedQueryChange,
    handleQueryExecution,
  } = props;

  return (
    <div className="query-executor">
      <h4>Pre-defined Query Executor</h4>
      <Dropdown
        menuItems={queries}
        value={selectedQuery}
        label="Select a Query"
        name="preDefinedQuery"
        handleDropdownChange={onSelectedQueryChange}
      />
      {queries && selectedQuery ? (
        <QueryExecutorForm
          handleQueryExecution={handleQueryExecution}
          selectedQuery={selectedQuery}
          disableEditing
        />
      ) : (
        <></>
      )}
    </div>
  );
};
