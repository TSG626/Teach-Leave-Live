import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Grid, MuiThemeProvider } from '@material-ui/core';
import themes from '../themes'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
        default: responsiveFontSizes(createMuiTheme({
                palette: {
                    type: 'dark',
                    primary: { main: '#01ffff' },
                    secondary: { main: '#fffbc6' },
                },
                typography: {
                    htmlFontSize: 10,
                },
        })),
}));

export default function NotFound({match}){
        const classes = useStyles();
        let string =""
        return(
                <div>
                        <MuiThemeProvider themes={themes}>
                                <CssBaseline>
                                        <Grid>
                                                <Typography align={'center'} variant="h1" component="h2">404</Typography>
                                                <Typography align={'center'} variant="h6">Page not available.</Typography>
                                        </Grid>
                                </CssBaseline>
                        </MuiThemeProvider>
                </div>
        )
};