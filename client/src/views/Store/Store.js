import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import './Store.css';
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import Summary from "./Summary/Summary";

export default function Store() {
    return (
        <div>
            <header>
                <Switch>
                    <Route exact path="/Store/Cart" component={Cart} />
                    <Route exact path="/Store/Checkout" component={Checkout} />
                    <Route exact path="/Store/Confirmation" component={Confirmation} />
                    <Route exact path="/Store/Summary" component={Summary} />
                </Switch>
            </header>
        </div>
    );
}