import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import Config from "../../backend/config.json";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AddToCartBar from "./AddToCartBar";
import {useUser} from "../../hook/User";
import {requestGETCartRetrieve} from "../../backend/billing";


const MovieSearchResult = ({movie, quantity}) => {

    const {
        accessToken
    } = useUser();

    const navigate = useNavigate();

    //extract the 'current' property of useRef, and give it a name
    const moviesInCartQuantities = useRef({});

    // useEffect(async () => {
    //     await retrieveMovieIdsInCart();
    //     console.log("Inside MovieSearchResult useEffect")
    // }, [])

    const retrieveMovieIdsInCart = async () => {
        const response = await requestGETCartRetrieve(accessToken)

        console.log("Cart Retrieve response: ", response)

        for (const item of response.data.items) {
            moviesInCartQuantities.current[item.movieId] = item.quantity
        }

        console.log("moviesInCart: ", moviesInCartQuantities.current)
    }

    return (
        <>
            <Card
                // className="movie"
                sx={{
                maxWidth: '310px',
                maxHeight: 'fit-content',
                margin: '1.5rem',

                position: 'relative',
                borderRadius: '12px',
                overflow: 'visible',
                border: 'none',

                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0, 1)',
                boxShadow: '0px 13px 10px -7px rgba(0, 0, 0, 0.1)'
                }}
            >
                <CardMedia
                    className="movie"
                    component="img"
                    height="465px"
                    width="310px"
                    image={Config.TMDB_API_IMG_BASE_URL + movie.posterPath}
                    alt={"poster image of" + movie.title}
                    onClick={() => navigate("/movie/id=" + movie.id)}
                    sx={{
                        borderRadius: '12px',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0, 1)',
                        boxShadow: '0px 13px 10px -7px rgba(0, 0, 0, 0.1)'
                    }}
                />

                <CardContent>
                    {/*<Button>From movie search: {quantity}</Button>*/}
                    <br/>
                    {
                        !!accessToken &&
                        <AddToCartBar movie={movie} quantity={quantity}/>
                    }

                    <Typography gutterBottom variant="h6" component="div"
                                sx={{
                                    fontWeight: 'bold',
                                }}
                    >
                        {movie.title} ({movie.year})
                    </Typography>

                    {/*<Typography gutterBottom variant="h7" component="div">*/}
                    {/*    ({movie.year})*/}
                    {/*</Typography>*/}

                    <Rating
                        value={movie.rating/2}
                        readOnly
                        precision={0.5}
                        // emptyIcon={<StarIcon style={{color: '#f0f0f0', opacity: 1 }} fontSize="inherit" />}
                    />

                    <Typography gutterBottom variant="h5" component="div">
                        ${movie.unitPrice}
                    </Typography>

                </CardContent>

            </Card>


        </>
    )
}

export default MovieSearchResult;
