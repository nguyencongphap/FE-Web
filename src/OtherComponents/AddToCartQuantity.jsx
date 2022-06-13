import React from "react";
import {requestPOSTCartInsert} from "../backend/billing";
import {useUser} from "../hook/User";
import {useForm} from "react-hook-form";


const AddToCartQuantity = ({movie}) => {

    const {
        accessToken
    } = useUser();

    const {register, getValues} = useForm();


    return (
        <div>
            <input {...register("quantity")} placeholder="Enter Quantity"/>
            <button onClick={() => requestPOSTCartInsert(accessToken, movie.id,
                !!getValues("quantity") ? parseInt(getValues("quantity")) : 0
            ).then(response => alert(JSON.stringify(response.data.result.message, null, 2)))
            }>Add to Cart</button>
        </div>
    )
}

export default AddToCartQuantity;