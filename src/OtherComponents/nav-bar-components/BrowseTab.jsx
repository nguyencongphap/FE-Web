import React from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useNavigate} from "react-router-dom";
import {constructSearchPageURLQueryStr} from "../../pages/search/Search";


const BrowseTab = () => {

    const genres = {
        "Action": "action",
        "Adventure": "adventure",
        "Animation": "animation",
        "Comedy": "comedy",
        "Crime": "crime",
        "Documentary": "documentary",
        "Drama": "drama",
        "Family": "family",
        "Fantasy": "fantasy",
        "History": "history",
        "Horror": "horror",
        "Music": "music",
        "Mystery": "mystery",
        "Romance": "romance",
        "Science Fiction": "science-fiction",
        "TV Movie": "tv-movie",
        "War": "war",
        "Western": "western",
    }

    const navigate = useNavigate();

    const [anchorElBrowse, setAnchorElBrowse] = React.useState(null);
    const menuIsOpenOption = Boolean(anchorElBrowse);

    function handleClickBrowse(event) {
        setAnchorElBrowse(event.currentTarget);
    }

    function handleCloseBrowse() {
        setAnchorElBrowse(null);
    }

    function handleClickBrowseItem(genrePath) {
        navigate(`/search/${genrePath}`)
        handleCloseBrowse()
    }


    return (
        <>
            <Button
                aria-label='Browse'
                // variant="contained"
                disableElevation
                onClick={(event) => {
                    const queryString = constructSearchPageURLQueryStr()
                    navigate(`/search/${queryString}`)
                    // handleClickBrowse(event)
                }}
                // endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    backgroundColor: '#23252b',
                    color: '#c0c0c0',
                }}
            >
                Browse
            </Button>
            <Menu
                anchorEl={anchorElBrowse}
                open={menuIsOpenOption}
                onClose={handleCloseBrowse}
            >
                {
                    Object.keys(genres).map((key) =>
                    <MenuItem onClick={() => handleClickBrowseItem(genres[key])} disableRipple>
                        {key}
                    </MenuItem>
                    )
                }
            </Menu>
        </>
    )
}

export default BrowseTab;
