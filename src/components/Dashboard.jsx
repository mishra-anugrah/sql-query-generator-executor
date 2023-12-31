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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Setup stored queries
  useEffect(() => {
    if (queries) {
      setStoredQueries(queries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (
      selectedApplication === "customQueryExecutor" ||
      selectedApplication === "queryBuilder"
    ) {
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
        return (
          <QueryBuilder
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
            handleQueryExecution={handleQueryExecution}
          />
        );

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
      <div className="app-selector">
        <FormControl>
          <FormLabel className="title">Select app to proceed</FormLabel>
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
      </div>

      {renderSelectedApp(selectedApplication)}

      {dataForSelectedQuery ? (
        <Results results={dataForSelectedQuery} />
      ) : (
        <></>
      )}
    </div>
  );
};
