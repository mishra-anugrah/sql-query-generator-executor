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
      <div className="title">Pre-defined Query Executor</div>
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
