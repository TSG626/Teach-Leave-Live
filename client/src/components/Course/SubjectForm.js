import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../modules/API";
import themes from "../../themes";

function SubjectForm(props) {
  const { subject, setSubject } = props;
  const [subjectList, setSubjectList] = useState([]);

  const filter = createFilterOptions();

  const loading = subjectList.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      const response = await API.get("/api/course/subjects");
      if (active && response.status === 200) {
        setSubjectList(response.data);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  function handleChange(event, newValue) {
    if (newValue && newValue.inputValue) {
      setSubject(newValue.inputValue);
      return;
    }
    setSubject(newValue);
  }

  return (
    <Autocomplete
      loading={loading}
      value={subject}
      onChange={handleChange}
      options={subjectList}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        if (option.inputValue) {
          return option.inputValue;
        }
        return option;
      }}
      renderOption={(option) => {
        if (option.inputValue) {
          return option.title;
        }
        return option;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Subject"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default SubjectForm;
