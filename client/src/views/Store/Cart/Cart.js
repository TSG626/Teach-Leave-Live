import React, { useState } from 'react';
import { Redirect, useHistory, withRouter, BrowserRouter, Switch } from 'react-router-dom';
import { CssBaseline, Paper, TableCell, TableContainer, TableRow, TableHead, Box, Table, makeStyles} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import StripeCheckout from "react-stripe-checkout"
import API from '../../../modules/API'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const useStyles = makeStyles({
    table: {
      margin: 'auto'
        },
  });

const Cart = () => {
    //array of products stored
    const [products, setProduct] = useState([{
        name: "React from FB",
        price: 10,
        productBy: "facebook"
    }]);
    var count = 0;
    var subcount = 0;
   // var taxes = 0;
    var service = .3;
    let history = useHistory();

    const makePayment = token => {
        API.post('/api/cart/payment', {product: products[0], token: token}).then(res=>{
            console.log("RESPONSE", res);
            const {status} = res;
            console.log("STATUS", status);
            history.push({pathname: "/Store/Summary", state: {products: products, count: count, subcount: subcount, service: service}});
            return(
                <BrowserRouter>
                    <Switch>
                        <Redirect to={
                            {pathname: "/Store/Summary", 
                            state: {products: products, count: count, subcount: subcount, service: service}}
                        }/>
                    </Switch>
                </BrowserRouter>
            )
        }).catch(err => console.log(err))
    }

    const classes = useStyles();
    return (
        <CssBaseline>
            <div className="App">
                <header className="App-header">
                    <Typography component="h1" variant="h3">Shopping Cart</Typography>
                </header>

                <Box ml="17%" mr="17%" pb={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        {products.map(item => {
                            subcount += item.price;
                            //taxes += subcount * .07;
                            service += subcount * .029;
                            count = subcount + service;
                            return(
                                <TableRow>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">{"$" + item.price.toFixed(2)}</TableCell>
                                    <TableCell align="right"><DeleteOutlineIcon/></TableCell>
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
                            <TableCell align="right">{"$" + subcount.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SERVICE FEE</TableCell>
                            <TableCell align="right">{"$" + service.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>TOTAL</TableCell>
                            <TableCell align="right">{"$" + count.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </Table>
                    </TableContainer>
                </Box>
                    <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Teach. Leave. Live." amount={count * 100}>
                        <Button variant="contained" color="primary">Checkout</Button>
                    </StripeCheckout>
            </div>
        </CssBaseline>
    );
}

export default withRouter(Cart);