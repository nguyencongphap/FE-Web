import React from "react";
import {useParams} from "react-router-dom";

const WhatIsTheNumber = () => {
    const {number} = useParams();

    return (
        <div>
            <p>The Number is: {number}</p>
        </div>
    );
}

export default WhatIsTheNumber;
