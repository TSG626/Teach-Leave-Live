import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  TableRow,
  Paper,
  TableContainer,
  colors,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import API from "../../modules/API";
import { Edit, ViewModule } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  title: {},
  menu: {
    // backgroundColor: theme.palette.background.paper,
  },
  content: {},
  card: {
    paddingBottom: theme.spacing(2),
  },
  cardList: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  table: {
    padding: theme.spacing(0, 0, 0.5, 0),
  },
  row: {},
  head: {},
}));

const SubjectCard = (props) => {
  const [courses, setCourses] = useState({});
  const classes = useStyles();

  useEffect(() => {
    API.get("/api/course/", { subject: props.subject })
      .then((res) => {
        if (res.status == 200) {
          setCourses(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.title}>{props.subject}</Typography>
        </ExpansionPanelSummary>
        <TableContainer
          className={classes.tableContainer}
          component={ExpansionPanelDetails}
        >
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.length &&
                courses.map((course, index) => (
                  <TableRow key={index} className={classes.row}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        className={classes.action}
                        to={`/Admin/Course/Edit/${course._id}`}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        className={classes.action}
                        to={`/Course/${course._id}`}
                      >
                        <ViewModule />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ExpansionPanel>
    </div>
  );
};

export default SubjectCard;
