import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Button,
} from "@material-ui/core";

function CourseCard(props) {
  const { course } = props;
  const { title, description } = course;

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>{description}</CardContent>
      <CardActionArea>
        <Button>Preview</Button>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
