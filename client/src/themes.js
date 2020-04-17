import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const themes = {
    default: responsiveFontSizes(createMuiTheme({
        palette: {
            type: 'dark',
            primary: { main: '#01ffff' },
            secondary: { main: '#fffbc6' },
        },
        typography: {
            htmlFontSize: 10,
        },
        // spacing: (factor => `${0.25 * factor}rem`),
    })),
}
export default themes; 