import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../hook/User";
import {requestGETOrderList} from "../backend/billing";
import styled from "styled-components";
import SaleOrder from "../OtherComponents/SaleOrder";


const StyledTable = styled.table`
    border: black solid 1px;
    padding: 0;
    max-height: 20px;
`

const StyleTH = styled.th`
    border: black solid 1px;
    max-height: 20px;
`

const OrderHistory = () => {

    const navigate = useNavigate();

    const {
        accessToken
    } = useUser();

    const [sales, setSales] = useState();

    React.useEffect( () => {
        requestGETOrderList(accessToken)
            .then(response => {
                console.log("Getting order list");
                setSales(response.data.sales);
            })
    }, [])


    return (
        <div>
            <StyledTable>
                <thead>
                    <tr>
                        <StyleTH>Sale ID</StyleTH>
                        <StyleTH>Total</StyleTH>
                        <StyleTH>Order Date</StyleTH>
                        <StyleTH>Detail</StyleTH>
                    </tr>
                </thead>
                {
                    !!sales &&
                    <tbody>
                        {
                            sales.map((sale) => (
                                <SaleOrder key={sale.saleId} sale={sale}/>
                            ))
                        }
                    </tbody>
                }
            </StyledTable>
        </div>
    )
}

export default OrderHistory;