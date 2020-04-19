import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const themes = {
  default: responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: { main: "#7fe1ed" },
        secondary: { main: "#fffbc6" },
      },
      typography: {
        htmlFontSize: 10,
      },
      // spacing: (factor => `${0.25 * factor}rem`),
    })
  ),
};
export default themes;
