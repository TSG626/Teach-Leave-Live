import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const themes = {
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
};
export default themes;
