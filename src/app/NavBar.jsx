import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useUser} from "../hook/User";
import {AppBar, Toolbar, Button, IconButton, Typography, Stack, Menu, MenuItem, Grid, Container} from "@mui/material";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppLogoTitleBtn from "../OtherComponents/nav-bar-components/AppLogoTitleBtn";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BrowseTab from "../OtherComponents/nav-bar-components/BrowseTab";
import AccountTab from "../OtherComponents/nav-bar-components/AccountTab";
import ShoppingCartTab from "../OtherComponents/nav-bar-components/ShoppingCartTab";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2


/**
 * To be able to navigate around the website we have these NavLink's (Notice
 * that they are "styled" NavLink's that are now named StyledNavLink)
 * <br>
 * Whenever you add a NavLink here make sure to add a corresponding Route in
 * the Content Component
 * <br>
 * You can add as many Link as you would like here to allow for better navigation
 * <br>
 * Below we have two Links:
 * <li>Home - A link that will change the url of the page to "/"
 * <li>Login - A link that will change the url of the page to "/login"
 */
const NavBar = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const navigate = useNavigate();


    return (
        <>
            {
                !!!accessToken ?
                    (
                        <>
                            <AppBar position='fixed' enableColorOnDark
                                    sx={{
                                        background: '#23252b'
                                    }}
                            >
                                {/*Toolbar adds some padding on the left and right side of the nav bar*/}
                                <Toolbar
                                    sx={{
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <AppLogoTitleBtn/>

                                    <Stack direction='row' spacing={2}>
                                        <Button
                                            // variant="contained"
                                            onClick={() => {
                                                navigate("/login")
                                            }}
                                            aria-label="Login Button"
                                            sx={{
                                                color: '#c0c0c0'
                                            }}
                                        >Login</Button>
                                    </Stack>
                                </Toolbar>
                            </AppBar>
                            <Toolbar/>
                            {/*    Add extra toolbar to prevent content from staying behind the AppBar with fixed position  */}
                        </>
                    )
                    :   // If the user is authorized, then show the below nav bar
                    (
                        <>
                            <AppBar position='fixed' enableColorOnDark
                                    sx={{
                                        background: '#23252b'
                                    }}
                            >

                                <Toolbar
                                >
                                    <Grid container direction='row'
                                          sx={{
                                              alignItems: "center",
                                          }}
                                    >
                                        <Grid2
                                        >
                                            <AppLogoTitleBtn/>
                                        </Grid2>

                                        <Grid2 container direction="row"
                                               sx={{
                                                   flexGrow: 1,
                                                   justifyContent: "space-between",
                                                   alignItems: "space-between",
                                               }}
                                        >
                                            <Stack direction="row"
                                            >
                                                <BrowseTab/>
                                            </Stack>

                                            <Stack direction="row"
                                            >
                                                <AccountTab/>
                                                <ShoppingCartTab/>
                                            </Stack>

                                        </Grid2>

                                    </Grid>
                                </Toolbar>

                            </AppBar>
                            <Toolbar/>
                            {/*    Add extra toolbar to prevent content from staying behind the AppBar with fixed position  */}
                        </>
                    )
            }
        </>

    );
}

export default NavBar;
