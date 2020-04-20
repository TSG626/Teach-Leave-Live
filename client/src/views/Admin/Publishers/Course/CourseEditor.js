import React, { useState, useEffect } from "react";
import { makeStyles, emphasize } from "@material-ui/core/styles";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import { Container, Paper } from "@material-ui/core";
import { SaveTwoTone as SaveIcon, ViewModule } from "@material-ui/icons/";
import API from "../../../../modules/API";
import ModuleList from "./Editor/ModuleList";
import ModuleEditor from "./Editor/ModuleEditor";
import DetailEditor from "./Editor/DetailEditor";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    position: "relative",
  },
  speedDial: {
    margin: "0 auto",
    right: theme.spacing(8),
    bottom: theme.spacing(8),
    position: "fixed",
  },
  details: {
    padding: theme.spacing(3),
  },
  fab: {
    margin: 0,
  },
  moduleList: {},
  sectionWindow: {},
  moduleText: {
    width: 200,
    height: 50,
  },
  sectionChip: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}));

export default function CourseEditor(props) {
  const classes = useStyles();
  const [course, setCourse] = useState({
    authors: [],
    free: false,
    price: 0,
    modules: [],
    published: false,
    title: "",
    description: "",
    subject: "",
  });
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedSection, setSelectedSection] = useState(0);
  const [increment, setStillIncrement] = useState(true);
  let { id } = useParams();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      API.get("/api/course/", { id: id }).then((res) => {
        if (res.status === 200) {
          if (res.data.modules.length > 0) {
            setStillIncrement(false);
          }
          setCourse(res.data);
        }
      });
    }
    fetchData();
  }, []);

  //Module functions
  function selectModule(index) {
    if (index != selectedModule) {
      setSelectedModule(index);
      setSelectedSection(0);
    }
  }

  function isModuleSelected(moduleIndex) {
    return selectedModule === moduleIndex;
  }

  function addModule() {
    setCourse({
      ...course,
      modules: [
        ...course.modules,
        {
          name: increment
            ? "Module " + (course.modules.length + 1)
            : "Untitled Module",
          sections: [],
        },
      ],
    });
    selectModule(course.modules.length);
    selectSection(0);
  }

  function removeModule(index) {
    if (increment) setStillIncrement(false);
    if (isModuleSelected(index)) selectModule(0);
    setCourse({
      ...course,
      modules: [...course.modules].filter((module, i) => i !== index),
    });
  }

  function renameModule(index, name) {
    setCourse({
      ...course,
      modules: [...course.modules].map((module, i) => {
        if (i === index) module.name = name;
        return module;
      }),
    });
  }

  //Section functions
  function selectSection(index) {
    if (selectedSection != index) {
      setSelectedSection(index);
    }
  }

  function isSectionSelected(sectionIndex) {
    return selectedSection === sectionIndex;
  }

  function addSection(moduleIndex) {
    setCourse({
      ...course,
      modules: [...course.modules].map((module, i) => {
        if (i !== moduleIndex) return module;
        return {
          ...module,
          sections: [
            ...module.sections,
            {
              name: "Untitled Section",
              data: {},
            },
          ],
        };
      }),
    });
    selectModule(moduleIndex);
    selectSection(course.modules[moduleIndex].sections.length);
  }

  function renameSection(moduleIndex, sectionIndex, name) {
    setCourse({
      ...course,
      modules: [...course.modules].map((module, i) => {
        if (i !== moduleIndex) return module;
        return {
          ...module,
          sections: [...module.sections].map((section, i) => {
            if (i !== sectionIndex) return section;
            return { ...section, name: name };
          }),
        };
      }),
    });
  }

  function editSection(moduleIndex, sectionIndex, data) {
    setCourse({
      ...course,
      modules: [...course.modules].map((module, i) => {
        if (i !== moduleIndex) return module;
        return {
          ...module,
          sections: [...module.sections].map((section, i) => {
            if (i !== sectionIndex) return section;
            return { ...section, data: data };
          }),
        };
      }),
    });
  }

  function removeSection(moduleIndex, sectionIndex) {
    if (increment) setStillIncrement(false);
    if (isSectionSelected(sectionIndex)) selectSection(0);
    setCourse({
      ...course,
      modules: [...course.modules].map((module, i) => {
        if (i !== moduleIndex) return module;
        return {
          ...module,
          sections: [...module.sections].filter(
            (section, i) => i !== sectionIndex
          ),
        };
      }),
    });
  }

  async function handleSave() {
    setSaving(true);
    API.put(`/api/course/${id}`, course).then((res) => {
      if (res.status === 200) {
        setSaving(false);
      }
    });
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

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.details}>
          <Paper className={classes.details}>
            <DetailEditor course={course} setCourse={setCourse} />
          </Paper>
        </div>
        <div className={classes.details}>
          <Paper className={classes.details}>
            <ModuleList
              course={course}
              addModule={addModule}
              renameModule={renameModule}
              removeModule={removeModule}
              isSectionSelected={isSectionSelected}
              addSection={addSection}
              renameSection={renameSection}
              removeSection={removeSection}
              isModuleSelected={isModuleSelected}
              selectModule={selectModule}
              selectSection={selectSection}
            />
          </Paper>
        </div>
        <div className={classes.details}>
          <Paper className={classes.details}>
            <Grid container>
              <div>
                {/* <Breadcrumbs>
                    <Chip
                      label={selectedModule}
                      icon={<HomeIcon fontSize="small" />}
                    />
                    <Chip
                      className={classes.sectionChip}
                      label="Sections"
                      deleteIcon={<ExpandMoreIcon fontSize="small" />}
                      onClick={handleSave}
                    />
                  </Breadcrumbs> */}
                <ModuleEditor
                  id={id}
                  course={course}
                  setCourse={setCourse}
                  selectedModule={selectedModule}
                  selectedSection={selectedSection}
                  editSection={editSection}
                />
              </div>
            </Grid>
          </Paper>
        </div>
      </div>
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
