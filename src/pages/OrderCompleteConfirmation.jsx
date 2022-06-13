import React from "react";
import "../App.css";
import {requestPOSTOrderComplete} from "../backend/billing";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../hook/User";

const OrderCompleteConfirmation = () => {

    const navigate = useNavigate();

    const {
        accessToken
    } = useUser();

    const {paymentIntentId} = useParams();

    const [message, setMessage] = React.useState([]);

    React.useEffect( () => {
        console.log(paymentIntentId);

        requestPOSTOrderComplete(accessToken, paymentIntentId)
            .then(response => {
                setMessage(response.data.result.message);
                console.log(JSON.stringify(response.data.result.message, null, 2));
            });
    }, [])


    return (
        <div>
            <h1>{message}</h1>
            <h1>You can leave this page now.</h1>
        </div>
    );
}

export default OrderCompleteConfirmation;
