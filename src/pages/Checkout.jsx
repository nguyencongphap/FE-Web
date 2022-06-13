import React, {useState} from "react";
import {useUser} from "../hook/User";
import {
    requestGETOrderPayment,
} from "../backend/billing";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../OtherComponents/CheckoutForm";


const Checkout = () => {

    const {
        accessToken
    } = useUser();

    // Make sure to call loadStripe outside of a component’s render to avoid
    // recreating the Stripe object on every render.
    // This is a public sample test API key.
    // Don’t submit any personally identifiable information in requests made with this key.
    // Sign in to see your own test API key embedded in code samples.
    const stripePromise = loadStripe("pk_test_51KwvvhD1sPU1WyH4EJB0sLCmVQbyRUwzE0BhRBDXs0H3Xmy4wn9ZlkRAsxmCPY6FQIrJwuDQaYndvoMZ25NJsa8H00YA7eLkEp");

    const [paymentIntentId, setPaymentIntentId] = useState();
    const [clientSecret, setClientSecret] = useState();

    React.useEffect( () => {
        requestGETOrderPayment(accessToken)
            .then(response => {
                console.log("Finished calling Order Payment Endpoint");
                setPaymentIntentId(response.data.paymentIntentId);
                setClientSecret(response.data.clientSecret);
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm paymentIntentId={paymentIntentId} />
                </Elements>
            )}
        </div>
    );
}

export default Checkout;