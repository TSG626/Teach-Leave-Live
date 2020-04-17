import React from 'react';
import { Button, Paper, TableCell, TableContainer, TableRow, TableHead, Box, Table, makeStyles, Typography} from '@material-ui/core';
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
            <Typography component="h1" variant="h3">Payment Confirmed!</Typography>
            </header>
            <Box ml="25%" mr="25%" pb={2}>
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
                                    <TableCell align="right">{"$" + item.price.toFixed(2)}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )
                        })}

                    </Table>
                </TableContainer>
                </Box>
                <Box ml="25%" mr="25%" pb={2}>
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="simple table">
                        <TableRow>
                            <TableCell>SUBTOTAL</TableCell>
                            <TableCell align="right">{"$" + props.location.state.subcount.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SERVICE FEE</TableCell>
                            <TableCell align="right">{"$" + props.location.state.service.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>TOTAL</TableCell>
                            <TableCell align="right">{"$" + props.location.state.count.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </Table>
                    </TableContainer>
                </Box>
            Please check your email to see full details on your purchase! Thank you!
            <Box mt={1}>
                <Button component={Link} to="/Store">Return to Course Store</Button>
            </Box>
        </div>
    );
}
export default Summary