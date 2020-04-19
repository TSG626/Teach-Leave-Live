import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { SaveTwoTone as SaveIcon, ViewModule } from "@material-ui/icons/";
import API from "../../../../modules/API";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { COURSE_TOOLS } from "../../../../config/tools";
import EditorJsContainer from "react-editor-js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    position: "relative",
  },
  ejs: {
    width: "100%",
  },
  speedDial: {
    margin: "0 auto",
    right: theme.spacing(8),
    bottom: theme.spacing(8),
    position: "fixed",
  },
  title: {},
  paper: {
    padding: theme.spacing(4),
  },
  details: {
    padding: theme.spacing(3),
  },
  body: {},
  fab: {
    margin: 0,
  },
}));

export default function BlogEditor(props) {
  const classes = useStyles();
  let { id } = useParams();
  const [blog, setBlog] = useState();
  const [saving, setSaving] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    async function fetchData() {
      API.get("/api/blog/", { id: id }).then((res) => {
        if (res.status === 200) {
          setBlog(res.data);
        }
      });
    }
    fetchData();
  }, []);

  async function handleSave() {
    setSaving(true);
    const body = await editorInstance.save();
    API.put(`/api/blog/${id}`, { ...blog, body }).then((res) => {
      if (res.status === 200) {
        setSaving(false);
      }
    });
    setBlog({ ...blog, body });
  }

  const actions = [
    {
      name: "Save",
      icon: <SaveIcon />,
      handleClick: handleSave,
    },
    {
      name: "View",
      icon: <ViewModule />,
      handleClick: handleSave,
    },
  ];
  const [open, setOpen] = useState(false);
  if (blog === undefined) return <CircularProgress />;

  return (
    <Container>
      <Grid container className={classes.root} direction="column">
        <Grid item xs className={classes.details}>
          <Paper className={classes.paper}>
            <Typography variant="h2" align="center" className={classes.title}>
              {blog.title}
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              align="center"
              className={classes.title}
            >
              {blog.description}
            </Typography>
          </Paper>
        </Grid>
        <Grid item className={classes.details}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Body</Typography>
            <EditorJsContainer
              className={classes.ejs}
              data={blog.body}
              instanceRef={(instance) => setEditorInstance(instance)}
              tools={{
                ...COURSE_TOOLS,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <SpeedDial
        ariaLabel="actions"
        icon={<SpeedDialIcon />}
        className={classes.speedDial}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="up"
        FabProps={{
          className: classes.fab,
          size: "medium",
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </Container>
  );
}
