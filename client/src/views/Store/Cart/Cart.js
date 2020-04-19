import React, { useState, useContext, useEffect } from 'react';
import { Redirect, useHistory, withRouter, BrowserRouter, Switch, Link } from 'react-router-dom';
import { CssBaseline, Paper, TableCell, TableContainer, TableRow, TableHead, Box, Table, makeStyles, TableBody} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import StripeCheckout from "react-stripe-checkout"
import API from '../../../modules/API'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { UserContext } from '../../../contexts/UserContext';
import {
    usePopupState,
    bindTrigger,
  } from 'material-ui-popup-state/hooks'

const useStyles = makeStyles({
    table: {
      margin: 'auto'
        },
  });

const Cart = () => {
    //array of products stored
    const [products, setProducts] = useState([]);
    const userInfo = useContext(UserContext);
    const [changed, setChange] = useState(false);
    const [counter, setCounter] = useState(0);
    const [names, setNames] = useState("");

    useEffect(() => {
        API.get('/api/user/getCart', {'username': userInfo.user.username}).then(res=>{
            for (var i = 0; i < res.data.length; i++) {
                API.get('/api/course/', {'id': res.data[i]}).then(res=>{
                    setProducts(oldArray => [...oldArray, res.data])
                })
            }
                }).catch(err=>{
            console.log(err);
        });
    }, [counter]);
    if(counter === 0) {
        setCounter(1);
        setChange(true);
    }
    var count = 0;
    var subcount = 0;
    var service = .3;
    let history = useHistory();

    const makePayment = token => {

        API.post('/api/cart/payment', {product: {name: userInfo.user.username + "'s items", price: count.toFixed(2) }, token: token, username: userInfo.user.username}).then(res=>{
            console.log("RESPONSE", res);
            const {status} = res;
            console.log("STATUS", status);
            for (var i = 0; i < products.length; i++) {
                API.post('/api/user/addToCourse', {title: products[i].title, username: userInfo.user.username})
            }
            API.post('/api/user/clearCart', {username: userInfo.user.username}).then(res => {
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
            })
        }).catch(err => console.log(err))
    }

    const classes = useStyles();
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
    const deleteItem = (popupState, item) => {
        API.post('/api/user/deleteItem', {username: userInfo.user.username, number: item._id}).then(res=>{
            alert(item.title + " was deleted!");
            popupState.close();
            window.location.reload(false); 
            return false;
        })
    } 

    const checkoutFree = () => {
        for (var i = 0; i < products.length; i++) {
            API.post('/api/user/addToCourse', {title: products[i].title, username: userInfo.user.username})
        }
        API.post('/api/user/clearCart', {username: userInfo.user.username}).then(res => {
            history.push({pathname: "/Store/Summary", state: {products: products, count: 0, subcount: 0, service: 0}});
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
        })
    }
    const ReturnStore = () => {
        window.location.pathname = "/Store"; 
        return false;
    }
    return (
        <CssBaseline>
            <div>
                <header>
                    <Box m={3}>
                        <Typography component="h1" variant="h3" align="center">Shopping Cart</Typography>
                    </Box>
                </header>
                {products.length === 0 ? <React.Fragment>
                    <Typography align="center">Nothing in your cart! Start shopping!</Typography>
                    </React.Fragment>:
                    <React.Fragment>
                                        <Box ml="17%" mr="17%" pb={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        {products.map(item => {
                            subcount += item.price;
                            service += subcount * .029;
                            count = subcount + service;
                            return(
                                <TableRow>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell align="right">{item.price === 0 ? "FREE" : "$" + item.price.toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        <Button {...bindTrigger(popupState)} onClick={() => deleteItem(popupState, item)}><DeleteOutlineIcon/></Button>
                                        </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
                <Box ml="25%" mr="25%" pb={2}>
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="simple table">
                        {subcount !== 0 ?
                        <React.Fragment>
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
                        </React.Fragment> : <React.Fragment></React.Fragment>}
                        <TableRow>
                            <TableCell>TOTAL</TableCell>
                            <TableCell align="right">{subcount === 0? "FREE" : "$" + count.toFixed(2)}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </Table>
                    </TableContainer>
                </Box>
                {subcount !== 0 ? <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Teach. Leave. Live." amount={count.toFixed(2) * 100}>
                        <Box m={3} align="center">
                            <Button variant="contained" color="primary">Checkout</Button>
                        </Box>
                    </StripeCheckout> : <Button variant="contained" color="primary" onClick={checkoutFree}>Checkout</Button>}
                    </React.Fragment>
                }
                    <Box mt={3} align="center">
                        <Button component={Link} to="/Store/">Back to Store</Button>
                    </Box>
            </div>
        </CssBaseline>
    );
}

export default withRouter(Cart);