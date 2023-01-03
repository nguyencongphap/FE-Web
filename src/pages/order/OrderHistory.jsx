import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../hook/User";
import {requestGETOrderList} from "../../backend/billing";
import styled from "styled-components";
import SaleOrder from "../../OtherComponents/SaleOrder";
import {Button, Grid, Table} from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

    const parseStringToDate = (s) => {
        return Date.parse(s)
    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/*<TableCell>Sale ID</TableCell>*/}
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >Total</TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >Order Date</TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        !!sales &&
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow
                                    key={sale.saleId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/*<TableCell component="th" scope="row">*/}
                                    {/*    {sale.saleId}*/}
                                    {/*</TableCell>*/}
                                    <TableCell>${sale.total}</TableCell>
                                    <TableCell>{sale.orderDate}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate("/order/detail/" + sale.saleId)}
                                        >Detail</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
            </TableContainer>

            {/*<StyledTable>*/}
            {/*    <thead>*/}
            {/*        <tr>*/}
            {/*            <StyleTH>Sale ID</StyleTH>*/}
            {/*            <StyleTH>Total</StyleTH>*/}
            {/*            <StyleTH>Order Date</StyleTH>*/}
            {/*            <StyleTH>Detail</StyleTH>*/}
            {/*        </tr>*/}
            {/*    </thead>*/}
            {/*    {*/}
            {/*        !!sales &&*/}
            {/*        <tbody>*/}
            {/*            {*/}
            {/*                sales.map((sale) => (*/}
            {/*                    <SaleOrder key={sale.saleId} sale={sale}/>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </tbody>*/}
            {/*    }*/}
            {/*</StyledTable>*/}
        </>
    );
}



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default OrderHistory;
