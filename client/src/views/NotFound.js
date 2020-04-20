import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
} from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  default: responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: { main: "#01ffff" },
        secondary: { main: "#fffbc6" },
      },
      typography: {
        htmlFontSize: 10,
      },
    })
  ),
}));

export default function NotFound({ match }) {
  return (
    <div>
      <Grid>
        <Typography align={"center"} variant="h1" component="h2">
          404
        </Typography>
        <Typography align={"center"} variant="h6">
          Page not available.
        </Typography>
      </Grid>
    </div>
  );
}
