import React from 'react';
import { Button, Paper, TableCell, TableContainer, TableRow, TableHead, Box, Table, makeStyles, Typography, Fade, Grow} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
      margin: 'auto'
        },
  });
const Summary = (props) => {
    const classes = useStyles();

    return (
        <div className="App">
            <header className="App-header">
                <Box align="center" m={3}>
                <Fade in="true" mountOnEnter timeout={3000}><Typography component="h1" variant="h3">Payment Confirmed!</Typography></Fade>
                </Box>
            </header>
            <Box ml="25%" mr="25%" pb={2}>
            <Grow in="true" mountOnEnter timeout={3000}>
                <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        </TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            {props.location.state.products.map(item => {
                                return(
                                    <TableRow>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell align="right">{item.price === 0 ? "FREE":"$" + item.price.toFixed(2)}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                )
                            })}

                        </Table>
                    </TableContainer>
                </Grow>
                </Box>
                <Box ml="25%" mr="25%" pb={2}>
                <Grow in="true" mountOnEnter timeout={3000}>
                    <TableContainer component={Paper} >
                            <Table className={classes.table} aria-label="simple table">
                                {props.location.state.subcount !== 0 ?  
                                <React.Fragment><TableRow>
                                <TableCell>SUBTOTAL</TableCell>
                                <TableCell align="right">{"$" + props.location.state.subcount.toFixed(2)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>SERVICE FEE</TableCell>
                                <TableCell align="right">{"$" + props.location.state.service.toFixed(2)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow></React.Fragment>: <React.Fragment></React.Fragment>}
                            <TableRow>
                                <TableCell>TOTAL</TableCell>
                                <TableCell align="right">{props.location.state.count === 0 ? "FREE":"$" + props.location.state.count.toFixed(2)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            </Table>
                        </TableContainer>
                    </Grow>
                </Box>
            <Grow in="true" mountOnEnter timeout={3000}>
                <Box m={3} align="center">
                    Thank you for your purchase! Please check your courses to get started!
                </Box>
            </Grow>
            <Grow in="true" mountOnEnter timeout={3000}>
                <Box mt={1} align = "center">
                    <Button component={Link} to="/Store/">Return to Course Store</Button>
                </Box>
            </Grow>
        </div>
    );
}
export default Summary