import React from "react";
import Config from "../backend/config.json";


const CartItem = ({item}) => {

    return (
        <div className="container">
            <div className="movie">
                <div>
                </div>

                <div>
                    <img src={Config.TMDB_API_IMG_BASE_URL + item.posterPath} alt={item.movieTitle}/>
                </div>

                <div>
                    <span>{item.movieTitle}</span>
                    <h3>Quantity: {item.quantity}</h3>
                    <h3>Price: ${Math.round((item.unitPrice * item.quantity) * 100) / 100 }</h3>
                </div>
            </div>
        </div>
    )
}

export default CartItem;