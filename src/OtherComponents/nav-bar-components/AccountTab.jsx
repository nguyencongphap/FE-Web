import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../hook/User";


const AccountTab = ({item}) => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const navigate = useNavigate();

    const [anchorElAccount, setAnchorElAccount] = React.useState(null);
    const menuIsOpen = Boolean(anchorElAccount);

    const handleClick = (event) => {
        setAnchorElAccount(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElAccount(null);
    };

    return (
        <>
            <IconButton
                aria-label='account'
                onClick={handleClick}>
                <PersonIcon
                    sx={{
                        color: '#c0c0c0',
                    }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorElAccount}
                open={menuIsOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => navigate("/order/list")}>
                    Order History
                </MenuItem>

                <MenuItem onClick={() => {
                    setAccessToken(null);
                    setRefreshToken(null);
                    navigate("/")
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountTab;
