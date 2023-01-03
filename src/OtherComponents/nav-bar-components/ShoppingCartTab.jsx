import React from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hook/User";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Button} from "@mui/material";


const ShoppingCartTab = ({item}) => {
    const navigate = useNavigate();

    return (
        <>
            <Button
                variant='contained'
                startIcon={<ShoppingCartIcon
                    fontSize="inherit"
                    sx={{
                        scale: '1.5',
                        color: '#23252b'
                    }}
                />}
                sx={{
                    fontWeight: 'bold',
                    color: '#23252b',
                    backgroundColor: '#fab818'
                }}
                onClick={() => navigate("/cart")}
            >
                Cart
            </Button>
        </>
    )
}

export default ShoppingCartTab;
