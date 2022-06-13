import Config from "backend/config.json";
import React from "react";
import {useParams} from "react-router-dom";
import {useUser} from "../hook/User";
import {requestGETOrderDetail, requestPOSTCartInsert} from "../backend/billing";
import CartItem from "../OtherComponents/CartItem";

const SaleOrderDetail = () => {
    const {
        accessToken
    } = useUser();
    const {saleId} = useParams();

    const [total, setTotal] = React.useState();
    const [items, setItems] = React.useState();

    React.useEffect( () => {
        requestGETOrderDetail(accessToken, saleId)
            .then(response => {
                setTotal(response.data.total);
                setItems(response.data.items);
            });
    }, [])

    return (
        <div>
            <h1>Order ID#: {saleId}</h1>
            {
                !!total &&
                <div>
                    <h1>Order total: ${total}</h1>
                    <h2>Items:</h2>
                </div>
            }
            {
                !!items &&
                <div className="container">
                    {
                        items.map((item) => (
                            <div key={saleId}>
                                <React.Fragment>
                                    <CartItem item={item}/>
                                </React.Fragment>
                            </div>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default SaleOrderDetail;