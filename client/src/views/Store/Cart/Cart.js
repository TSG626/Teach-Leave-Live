import React, { useState } from 'react';
import { Link , useLocation } from 'react-router-dom';
import './Cart.css';
import { CssBaseline } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import StripeCheckout from "react-stripe-checkout"
import API from '../../../modules/API'

const Cart = () => {
    //array of products stored
    const [product, setProduct] = useState({
        name: "React from FB",
        price: 10,
        productBy: "facebook"
    });

    const makePayment = token => {
        API.post('/api/cart/payment', {product: product, token: token}).then(res=>{
            console.log("RESPONSE", res);
            const {status} = res;
            console.log("STATUS", status)
        }).catch(err => console.log(err))
    }
    return (
        <CssBaseline>
            <div className="App">
                <header className="App-header">
                    <Typography component="h1" variant="h3">Shopping Cart</Typography>
                </header>
                <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name="Buy React" amount={product.price * 100}>
                    <Button variant="contained" color="primary">Checkout</Button>
                </StripeCheckout>
            </div>
        </CssBaseline>
    );
}

export default Cart;