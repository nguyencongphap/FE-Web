import React, {useState} from "react";
import {useUser} from "../../hook/User";
import {
    requestGETOrderPayment,
} from "../../backend/billing";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../OtherComponents/CheckoutForm";


const Checkout = () => {

    const {
        accessToken
    } = useUser();

    // Here we load our app's registered public key in so that Stripe server knows which client is calling
    const stripePromise = loadStripe("pk_test_51KwvvhD1sPU1WyH4EJB0sLCmVQbyRUwzE0BhRBDXs0H3Xmy4wn9ZlkRAsxmCPY6FQIrJwuDQaYndvoMZ25NJsa8H00YA7eLkEp");

    const [paymentIntentId, setPaymentIntentId] = useState();
    const [clientSecret, setClientSecret] = useState();

    React.useEffect( () => {
        // We call our backend to create a paymentIntent.
        // The backend will return to us the paymentIntentId and clientSecret
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
