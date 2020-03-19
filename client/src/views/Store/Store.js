import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import './Store.css';
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Confirmation from "./Confirmation/Confirmation";
import Summary from "./Summary/Summary";

export default function Store({match}) {
    return (
        <div>
            <header>
                <Switch>
                    <Route exact path={`${match.path}/Cart`} component={Cart} />
                    <Route exact path={`${match.path}/Checkout`} component={Checkout} />
                    <Route exact path={`${match.path}/Confirmation`} component={Confirmation} />
                    <Route exact path={`${match.path}/Summary`} component={Summary} />
                </Switch>
            </header>
        </div>
    );
}