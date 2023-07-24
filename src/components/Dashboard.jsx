import { useEffect, useState } from "react";
import { QueryBuilder } from "./QueryBuilder";
import { QueryExecutor } from "./QueryExecutor";
import { queries } from "../data/queries";
import { data } from "../data/dataQuery";
import { Results } from "./Results";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CustomQueryExecutor } from "./CustomQueryExecutor";
import {
  getColumnNamesFromQuery,
  getSpecificColumnsData,
} from "../utils/utils";

export const Dashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState(
    "preDefinedqueryExecutor"
  );
  const [allData, setAllData] = useState(null);
  const [storedQueries, setStoredQueries] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState("");
  const [dataForSelectedQuery, setDataForSelectedQuery] = useState(null);

  // Setup data
  useEffect(() => {
    if (data) {
      setAllData(data);
    }
  }, [data]);

  // Setup stored queries
  useEffect(() => {
    if (queries) {
      setStoredQueries(queries);
    }
  }, [queries]);

  const handleQueryChange = (_, query) => {
    setSelectedQuery(query.toLocaleLowerCase());
  };

  const handleApplicationChange = (event) => {
    const selectedApp = event.target.value;
    setSelectedApplication(selectedApp);
    setDataForSelectedQuery(null);
    setSelectedQuery("");
  };

  const handleQueryExecution = () => {
    if (selectedApplication === "customQueryExecutor") {
      const selectedColumnsData = getSpecificColumnsData(
        data["select * from customers"],
        getColumnNamesFromQuery(selectedQuery)
      );

      if (
        Array.isArray(selectedColumnsData) &&
        selectedColumnsData.length > 0
      ) {
        setDataForSelectedQuery(selectedColumnsData);
      }
    } else {
      setDataForSelectedQuery(allData[selectedQuery]);
    }
  };

  const renderSelectedApp = (selectedApp) => {
    switch (selectedApp) {
      case "preDefinedqueryExecutor":
        return (
          <QueryExecutor
            queries={storedQueries}
            selectedQuery={selectedQuery}
            onSelectedQueryChange={handleQueryChange}
            handleQueryExecution={handleQueryExecution}
          />
        );
      case "queryBuilder":
        return <QueryBuilder />;

      case "customQueryExecutor":
        return (
          <CustomQueryExecutor
            handleQueryExecution={handleQueryExecution}
            selectedQuery={selectedQuery}
            handleQueryTextChange={handleQueryChange}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="dashboard">
      <FormControl>
        <FormLabel>Select app to proceed</FormLabel>
        <RadioGroup
          aria-labelledby="Application-selector-group"
          name="application-selector-group"
          value={selectedApplication}
          onChange={handleApplicationChange}
          row
        >
          <FormControlLabel
            value="preDefinedqueryExecutor"
            control={<Radio />}
            label="Pre-defined Query Executor"
          />
          <FormControlLabel
            value="queryBuilder"
            control={<Radio />}
            label="Query Builder"
          />
          <FormControlLabel
            value="customQueryExecutor"
            control={<Radio />}
            label="Custom Query Executor"
          />
        </RadioGroup>
      </FormControl>

      {renderSelectedApp(selectedApplication)}

      {dataForSelectedQuery ? (
        <Results results={dataForSelectedQuery} />
      ) : (
        <></>
      )}
    </div>
  );
};
