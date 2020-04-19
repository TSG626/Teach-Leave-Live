import React, { useEffect, useState, useRef } from "react";
import MaterialTable from "material-table";
import {
  Edit,
  Delete,
  VerifiedUser,
  ViewModule,
  ViewComfy,
  ViewHeadline,
  Search,
} from "@material-ui/icons";
import {
  Chip,
  Switch,
  CircularProgress,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import themes from "../../../../themes";
import API from "../../../../modules/API";
import { Redirect } from "react-router-dom";
import { red } from "@material-ui/core/colors";

function CourseTable(props) {
  const [redirect, setRedirect] = useState("");
  const tableRef = useRef(null);

  function fetchData(query) {
    return new Promise((resolve, reject) => {
      API.get("/api/course/")
        .then((res) => {
          if (res.status == 200) {
            resolve({
              data: res.data.map((course) => {
                return {
                  title: course.title,
                  authors: course.authors,
                  description: course.description,
                  free: course.free,
                  price: course.price,
                  subject: course.subject,
                  subject_index: course.subject_index,
                  modules: course.modules,
                  last_updated: course.last_updated,
                  published: course.published,
                  _id: course._id,
                };
              }),
              page: 0,
              totalCount: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  function handleChange(id, option) {
    API.put(`/api/course/${id}/`, option);
    if (tableRef.current) {
      tableRef.current.onQueryChange();
    }
  }

  function handleDelete(id) {
    API.delete(`/api/course/${id}/`);
    if (tableRef.current) {
      tableRef.current.onQueryChange();
    }
  }

  if (redirect != "") {
    return <Redirect to={redirect} />;
  }

  return (
    <MaterialTable
      tableRef={tableRef}
      title="Courses"
      columns={[
        { title: "Title", field: "title" },
        { title: "Description", field: "description" },
        {
          title: "Author(s)",
          field: "authors",
          editable: "never",
          render: (rowData) => (
            <div>
              {rowData.authors.map((author, index) => (
                <Tooltip title={author.username}>
                  <Chip
                    key={index}
                    avatar={<Avatar src={author.avatar} />}
                    label={author.firstname + " " + author.lastname}
                  />
                </Tooltip>
              ))}
            </div>
          ),
        },
        {
          title: "Published",
          field: "published",
          type: "boolean",
          render: (rowData) => (
            <Switch
              checked={rowData.published}
              onClick={() =>
                handleChange(rowData._id, { published: !rowData.published })
              }
            />
          ),
        },
        {
          title: "Free",
          field: "free",
          type: "boolean",
          render: (rowData) => (
            <Switch
              checked={rowData.free}
              onClick={() => handleChange(rowData._id, { free: !rowData.free })}
            />
          ),
        },
        {
          title: "Price",
          field: "price",
          type: "currency",
        },
        {
          title: "Subject",
          field: "subject",
        },
        {
          title: "Last Updated",
          field: "last_updated",
          type: "date",
        },
        {
          title: "ID",
          field: "_id",
          hidden: true,
          editable: "never",
        },
      ]}
      data={fetchData}
      actions={[
        {
          icon: ViewHeadline,
          tooltip: "Modules",
          onClick: (event, rowData) =>
            setRedirect(`/Admin/Course/Edit/${rowData._id}`),
        },
        {
          icon: Search,
          tooltip: "View",
          onClick: (event, rowData) => setRedirect(`/Course/${rowData._id}`),
        },
      ]}
      options={{
        search: true,
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleChange(newData._id, newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                handleDelete(oldData._id);
              }
              resolve();
            }, 1000);
          }),
      }}
    />
  );
}

export default CourseTable;
