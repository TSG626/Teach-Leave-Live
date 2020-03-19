import React, { useState } from 'react';
import { Link , useLocation } from 'react-router-dom';
import './Cart.css';
import { CssBaseline } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const SetListings = () => {
    const [list, setList] = useState("Shopping Cart is empty!")
    return(
        <div className="Empty">
            <Typography component="h4" variant="h4">
                {list}
            </Typography>
            <Button component={Link} to="/Store" color="default" variant="contained" color="primary">
                Go Shopping!
            </Button>
        </div>
    );
}

const Cart = () => {
    return (
        <CssBaseline>
            <div>
                <header className="Header">
                    <Typography component="h1" variant="h3">Shopping Cart</Typography>
                </header>
                <div className="List">
                    <SetListings/>
                </div>
            </div>
        </CssBaseline>
    );
}

export default Cart;