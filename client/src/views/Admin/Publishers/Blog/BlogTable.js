import React, { useEffect, useState, useRef } from "react";
import MaterialTable from "material-table";
import { ViewHeadline, Search } from "@material-ui/icons";
import { Chip, Switch, Avatar, Tooltip } from "@material-ui/core";
import API from "../../../../modules/API";
import { Redirect } from "react-router-dom";

function CourseTable(props) {
  const [redirect, setRedirect] = useState("");
  const tableRef = useRef(null);

  function fetchData(query) {
    return new Promise((resolve, reject) => {
      API.get("/api/blog/")
        .then((res) => {
          if (res.status == 200) {
            resolve({
              data: res.data,
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
    API.put(`/api/blog/${id}/`, option);
    if (tableRef.current) {
      tableRef.current.onQueryChange();
    }
  }

  function handleDelete(id) {
    API.delete(`/api/blog/${id}/`);
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
      title="Blogs"
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
          title: "Published Date",
          field: "date_published",
          type: "date",
        },
        {
          title: "Last Updated",
          field: "date_updated",
          type: "date",
          editable: "never",
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
          tooltip: "Edit Body",
          onClick: (event, rowData) =>
            setRedirect(`/Admin/Blog/Edit/${rowData._id}`),
        },
        {
          icon: Search,
          tooltip: "View",
          onClick: (event, rowData) => setRedirect(`/Blog/${rowData._id}`),
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
