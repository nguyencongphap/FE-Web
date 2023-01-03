import React, {useState} from "react";
import "../../App.css";
import {requestPOSTOrderComplete} from "../../backend/billing";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../hook/User";
import {Button} from "@mui/material";


const OrderCompleteConfirmation = () => {

    const navigate = useNavigate();

    const {
        accessToken
    } = useUser();

    const {paymentIntentId} = useParams();

    const [message, setMessage] = React.useState([]);

    const [resultCode, setResultCode] = useState()

    React.useEffect( async () => {
        console.log(paymentIntentId);

        const response = await requestPOSTOrderComplete(accessToken, paymentIntentId)

        setResultCode(response.data.result.code)
        setMessage(response.data.result.message)

        console.log(JSON.stringify(response.data.result.message, null, 2))
    }, [])

    if (resultCode === 3071) {
        return (
            <div>
                <h1>{message}.</h1>
                <h1>Please try again.</h1>
                <Button
                    onClick={() => navigate("/cart")}
                >
                    Going back to Cart
                </Button>
            </div>
        )
    }
    else if (resultCode === 3072) {
        return (
            <div>
                <h1>{message}.</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>{message}.</h1>
            <h1>You can leave this page now.</h1>
            <h1>Thank you for shopping with us!</h1>
        </div>
    );
}

export default OrderCompleteConfirmation;
