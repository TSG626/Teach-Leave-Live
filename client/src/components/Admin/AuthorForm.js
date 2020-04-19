import React, { useState, useContext } from "react";
import {
  Tooltip,
  TextField,
  CircularProgress,
  Chip,
  Avatar,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import API from "../../modules/API";
import { useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function AuthorForm(props) {
  const { authors, setAuthors } = props;
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  function addAuthor(a) {
    setAuthors(authors.concat(a));
  }

  useEffect(() => {
    addAuthor(user._id);
  }, []);

  const loading = users.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      const response = await API.get("/api/admin/getAllUsers");
      if (active && response.status === 200) {
        setUsers(response.data);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  function handleChange(event, author, reason) {
    let newAuthors = author.map((a) => a._id);
    if (!newAuthors.includes(user._id)) {
      newAuthors = [user._id, ...newAuthors];
    }
    setAuthors(newAuthors);
  }

  return (
    <Autocomplete
      multiple
      value={users.filter((user) => authors.includes(user._id))}
      loading={loading}
      onChange={handleChange}
      style={{ width: "100%" }}
      options={users}
      getOptionLabel={(option) => option.firstname + " " + option.lastname}
      filterSelectedOptions
      getOptionSelected={(option) => authors.includes(option._id)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Tooltip key={index} title={option.username}>
            <Chip
              avatar={<Avatar src={option.avatar} />}
              label={option.firstname + " " + option.lastname}
              {...getTagProps({ index })}
              disabled={index === 0}
            />
          </Tooltip>
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Author(s)"
          variant="outlined"
          placeholder="Author"
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

export default AuthorForm;
