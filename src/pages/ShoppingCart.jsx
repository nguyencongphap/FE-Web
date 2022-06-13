import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../hook/User";
import {
    requestDELETECartDelete,
    requestGETCartRetrieve,
    requestPOSTCartInsert,
    requestPOSTCartUpdate
} from "../backend/billing";
import CartItem from "../OtherComponents/CartItem";
import {useForm} from "react-hook-form";

const ShoppingCart = () => {

    const navigate = useNavigate();

    const {
        accessToken
    } = useUser();

    const {register, getValues} = useForm();

    const [itemsInCart, setItemsInCart] = useState();
    const [totalPrice, setTotalPrice] = useState();

    React.useEffect( () => {
        requestGETCartRetrieve(accessToken)
            .then(response => {
                console.log(JSON.stringify(response.data.result.message, null, 2));
                console.log("Retrieving cart");
                setItemsInCart(response.data.items);
                setTotalPrice(response.data.total);
            });
    }, [])


    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Order total: ${!!totalPrice ? totalPrice : 0}</h2>
            {
                !!totalPrice &&
                <button onClick={() => navigate("/order/checkout")}>Check Out</button>
            }

            {
                !!itemsInCart &&
                <div className="container">
                    {
                        itemsInCart.map((item) => (
                            <div key={item.movieId}>
                                <React.Fragment>
                                    <CartItem item={item}/>
                                </React.Fragment>

                                <div>
                                    <input {...register("quantity")} placeholder="Enter Quantity"/>
                                    <button onClick={() => requestPOSTCartUpdate(accessToken, item.movieId,
                                        !!getValues("quantity") && getValues("quantity") >= 1 && getValues("quantity") <= 10 ?
                                            parseInt(getValues("quantity")) : 1
                                    ).then(response => {window.location.reload(false)})
                                    }>Update Quantity</button>
                                </div>

                                <div>
                                    <button onClick={() => {
                                        const newQuantity = item.quantity - 1 ;
                                        if ((newQuantity) >= 1) {
                                            requestPOSTCartUpdate(accessToken, item.movieId, newQuantity)
                                                .then(response => {window.location.reload(false)}
                                                );
                                        }
                                    }}
                                    >Decrease Quantity (-)</button>
                                </div>

                                <div>
                                    <button onClick={() => {
                                        const newQuantity = item.quantity + 1;
                                        if (newQuantity <= 10) {
                                            requestPOSTCartUpdate(accessToken, item.movieId, newQuantity)
                                                .then(response => {window.location.reload(false)}
                                                );
                                        }
                                    }}
                                    >Increase Quanitty (+)</button>
                                </div>

                                <div>
                                    <button onClick={() => {
                                        requestDELETECartDelete(accessToken, item.movieId)
                                            .then(response => {window.location.reload(false)}
                                            );
                                    }}
                                    >Remove Item</button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ShoppingCart;