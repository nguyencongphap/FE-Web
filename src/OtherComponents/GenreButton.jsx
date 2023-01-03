import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {genreNamesToCodeNames} from "../data/genres";
import {constructSearchPageURLQueryStr} from "../pages/search/Search";


const GenreButton = ({genreName}) => {

    const navigate = useNavigate();

    return (
        <Button
            variant="outlined"
            onClick={() => {
                console.log("genreNamesToCodeNames[genreName]: ", genreNamesToCodeNames[genreName])
                const queryString = constructSearchPageURLQueryStr(
                    {
                        genre: `${genreNamesToCodeNames[genreName]}`,
                    }
                )
                navigate(`/search/${queryString}`)
            }}
        >
            {genreName}
        </Button>
    )
}

export default GenreButton;
