const express = require('express');
const cors = require("cors");
const config = require("../config/config")
const stripe = require("stripe")(config.stripe.sk);
const uuid = require("uuid/v4");

const router = express.Router();

//router.use(express.json());
router.use(cors());

router.post('/payment', (req, res) => {
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    //avoids getting paid twice
    const idempotencyKey = uuid();
    //creates customer
    return stripe.customers.create({
        email: token.email,
        source: token.id
        //found customer
    }).then(customer => {
        //creates charge
        stripe.charges.create({
            amount: product.price * 100, //cents * 100 = dollars
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`
        }, {idempotencyKey})
        //success
    }).then(result => res.status(200).json(result))
    //error
    .catch(err => console.log(err))
})

module.exports = router;