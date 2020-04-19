import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

function CourseCard(props) {
  const { course } = props;

  return (
    <Card>
      <CardHeader>{course.title}</CardHeader>
      <CardContent>{course.description}</CardContent>
      <CardActionArea>
        <Button>Preview</Button>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
