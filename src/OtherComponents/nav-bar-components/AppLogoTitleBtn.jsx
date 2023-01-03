import React from "react";
import Config from "../../backend/config.json";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import {Button, IconButton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const AppLogoTitleBtn = ({item}) => {

    const navigate = useNavigate();

    return (
        <IconButton size='large' edge='start' aria-label='logo'
                    // onClick={() => {
                    //     // navigate("/")
                    // }}
                    sx={{
                        color: '#fab818'
                    }}
        >
            <MovieFilterIcon
                sx={{
                    transform: "scale(1.8)",
                    color: '#fab818'
                }}
            />
            <Typography variant='h5' component='div'
                        sx={{
                            color: '#fab818',
                            marginLeft: '15px'
                        }}>
                FABFLIX
            </Typography>
        </IconButton>
    )
}

export default AppLogoTitleBtn;
