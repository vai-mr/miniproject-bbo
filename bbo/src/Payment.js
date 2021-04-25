import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from './StateProvider';
import {Link, useHistory } from "react-router-dom";
//import { ElementsConsumer, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import {
    useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';
import { stripePaymentMethodHandler } from './script';


const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: "27px",
        color: "#212529",
        fontSize: "1.1rem",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            //stripe js has not yet loaded 
            //disable form submission until strip.js has loaded
            return;
        }

        setLoading(true);
        setErrorMsg('');
    
        const paymentMethodObj = {
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
            name,
            email: user?.email
        },
        };
        const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);
    
        stripePaymentMethodHandler({
        result: paymentMethodResult,
        amount: getBasketTotal(basket),
        }, handleResponse);
    };

    // callback method to handle the response
    const handleResponse = response => {
        setLoading(false);
        if (response.error) {
        setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
        return;
        }
        //redirect to different pages on success and failure
        response.success ? history.replace('/receipt') : history.replace('/checkout');
    };

    return (
        <div className='payment'>
            <div className="payment_container">
                <h1>
                    Checkout (
                        <Link to='/checkout'>{basket?.length} items</Link>
                    )
                </h1>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>no2 tank street</p>
                        <p>Hosur, India</p>
                    </div>
                </div>


                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {/* all the products in the basket*/}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                    <div className="payment_priceContainer">
                        <CurrencyFormat
                            renderText = {(value) => (
                                <>
                                    <h3>OrderTotal:<br></br> {value}</h3>
                                </>
                            )}
                            decimalScale = {2}
                            value = {getBasketTotal(basket)}
                            displayType = {"text"}
                            thousandSeparator = {true}
                            prefix={"₹"}
                        />
                    </div>
                </div>


                <div className="payment_section">
                    <div className="payment_title">
                            <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* stripe magic will go */}
                        <form onSubmit={handleSubmit}>
                            <div className='card_details'>
                                <div className="line">
                                    <div className="col">
                                        <label className="form_label" htmlFor="cc-name">Name on card</label>
                                        <input
                                        id="cc-name"
                                        type="text"
                                        className="form_element"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="line">
                                    <div className="obj">
                                        <label className="form_label" htmlFor="cc-number">Card Number</label>
                                        <CardNumberElement
                                        id="cc-number"
                                        className="form_element"
                                        options={CARD_ELEMENT_OPTIONS}
                                        />
                                    </div>
                                </div>
                        
                                <div className="line">
                                    <div className="obj">
                                        <label className="form_label" htmlFor="expiry">Exp Date</label>
                                        <CardExpiryElement
                                        id="expiry"
                                        className="form_element"
                                        options={CARD_ELEMENT_OPTIONS}
                                        />
                                    </div>
                                    <div className="obj">
                                        <label className="form_label" htmlFor="cvc">CVC</label>
                                        <CardCvcElement
                                        id="cvc"
                                        className="form_element"
                                        options={CARD_ELEMENT_OPTIONS}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <button className="pay_button" type="submit" disabled={loading}>
                                {loading ? `LOADING` : `PAY ₹${getBasketTotal(basket)}`}
                            </button>
                            {errorMsg && <div className="error_text">{errorMsg}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
