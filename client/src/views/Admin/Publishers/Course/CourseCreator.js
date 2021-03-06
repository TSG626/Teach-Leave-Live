import React, { useState } from "react";
import Button from "@material-ui/core/Button";
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
import API from "../../../../modules/API";
import AuthorForm from "../../../../components/Admin/AuthorForm";
import SubjectForm from "../../../../components/Course/SubjectForm";

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
  const classes = useStyles();
  const [radio, setRadio] = useState("");

  function handlePriceChange(event) {
    props.setPrice(event.target.value);
  }

  function handleRadioChange(event) {
    setRadio(event.target.value);
  }

  return (
    <Grid container style={{ padding: 15 }}>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <RadioGroup onChange={handleRadioChange}>
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
                  value={props.price}
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

export default function CourseCreator(props) {
  const classes = useStyles();

  const [authors, setAuthors] = useState([]);
  const [price, setPrice] = useState(0);
  const [subject, setSubject] = useState(null);

  const [errors, setErrors] = useState({});

  function handleSubmit() {
    API.post("/api/course/", {
      title: document.getElementById("title").value,
      authors: authors,
      description: document.getElementById("description").value,
      free: price === 0,
      price: price,
      subject: subject,
    })
      .then((res) => {
        if (res.status === 200) {
          props.setAdding(false);
          window.location.reload(false);
          return false;
        }
      })
      .catch((err) => {
        setErrors(err);
      });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography varient="h5">Course Creator</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Course Title"
          name="title"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <SubjectForm subject={subject} setSubject={setSubject} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          id="description"
          label="Description"
          name="description"
        />
      </Grid>
      <AuthorForm authors={authors} setAuthors={setAuthors} />
      <PriceForm price={price} setPrice={setPrice} />
      <Grid item xs={12}>
        <Button color="primary" variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
