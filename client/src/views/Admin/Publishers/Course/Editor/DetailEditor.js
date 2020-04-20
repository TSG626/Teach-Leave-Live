import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@material-ui/core";
import AuthorForm from "../../../../../components/Admin/AuthorForm";

import { useEffect } from "react";
import API from "../../../../../modules/API";
import SubjectForm from "../../../../../components/Course/SubjectForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
}));

function PriceForm(props) {
  const [radio, setRadio] = useState("");

  function handlePriceChange(event) {
    props.setCourse({ ...props.course, price: event.target.value });
  }

  function handleRadioChange(event) {
    setRadio(event.target.value);
  }

  return (
    <Grid container style={{ padding: 15 }}>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <RadioGroup
          value={props.course.free ? "free" : props.course.price}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="free" label="Free" control={<Radio />} />
          <FormControlLabel
            value="price"
            label={
              (radio === "price" && (
                <CurrencyTextField
                  variant="outlined"
                  currencySymbol="$"
                  minimumValue={0}
                  maximumValue={1000}
                  margin="normal"
                  fullWidth
                  value={props.course.price}
                  onChange={handlePriceChange}
                  id="price"
                  label="Price"
                  name="price"
                />
              )) ||
              "Payed"
            }
            control={<Radio />}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}

export default function DetailEditor(props) {
  const classes = useStyles();
  const [subjectList, setSubjectList] = useState([]);
  const { subject, setSubject } = props;

  function setAuthors(authors) {
    props.setCourse({ ...props.course, authors: authors });
  }

  useEffect(() => {
    async function fetchData() {
      API.get("/api/course/subjects/").then((res) => {
        if (res.status === 200) {
          if (!Object.keys(res.data).length) return;
          setSubjectList(res.data);
        }
      });
    }
    fetchData();
  }, []);

  function updateSubject(subject) {
    props.setCourse({ ...props.course, subject: subject });
  }

  return (
    <Grid container>
      <Typography varient="h5">Course Details</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Course Title"
        name="title"
        value={props.course.title}
        onChange={(event) =>
          props.setCourse({ ...props.course, title: event.target.value })
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        id="description"
        label="Description"
        name="description"
        value={props.course.description}
        onChange={(event) =>
          props.setCourse({
            ...props.course,
            description: event.target.value,
          })
        }
      />
      <SubjectForm
        subject={props.course.subject}
        setSubject={updateSubject}
        setCourse={props.setCourse}
      />
      <AuthorForm authors={props.course.authors} setAuthors={setAuthors} />
      <PriceForm course={props.course} setCourse={props.setCourse} />
    </Grid>
  );
}
