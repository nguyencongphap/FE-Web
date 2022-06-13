import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const StyledTD = styled.td`
    border: black solid 1px;
    max-height: 20px;
`

const SaleOrder = ({sale}) => {

    const navigate = useNavigate();

    return (
        <tr>
            <StyledTD>{sale.saleId}</StyledTD>
            <StyledTD>{sale.total}</StyledTD>
            <StyledTD>{sale.orderDate}</StyledTD>
            <StyledTD>
                <button onClick={() => navigate("/order/detail/" + sale.saleId)}>Detail</button>
            </StyledTD>
        </tr>
    )
}

export default SaleOrder;

