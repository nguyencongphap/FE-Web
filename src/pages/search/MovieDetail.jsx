import Config from "backend/config.json";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {requestGETMovieByMovieId} from "../../backend/movies";
import {useUser} from "../../hook/User";
import {requestGETCartRetrieve, requestPOSTCartInsert} from "../../backend/billing";
import {useForm} from "react-hook-form";
import AddToCartBar from "./AddToCartBar";
import {Backdrop, Button, Card, CardContent, CardMedia, Grid, Rating, Typography} from "@mui/material";
import GenreButton from "../../OtherComponents/GenreButton";

const MovieDetail = () => {
    const {
        accessToken
    } = useUser();

    const {id} = useParams();

    const [movie, setMovie] = React.useState();
    const [genres, setGenres] = React.useState();
    const [persons, setPersons] = React.useState();
    const [quantity, setQuantity] = React.useState(0);

    React.useEffect( async () => {

        console.log("id: ", id)

        requestGETMovieByMovieId(accessToken, id)
            .then(response => {
                setMovie(response.data.movie);
                setGenres(response.data.genres);
                setPersons(response.data.persons);
            });

        await retrieveMovieQuantityInCart();

    }, [])

    const retrieveMovieQuantityInCart = async () => {
        const response = await requestGETCartRetrieve(accessToken)

        console.log("Cart Retrieve response: ", response)

        for (const item of response.data.items) {
            console.log("typeof item.movieId", typeof item.movieId)
            console.log("typeof id", typeof id)
            console.log("item.movieId === id:", item.movieId === id)
            if (item.movieId === parseInt(id)) {
                setQuantity(item.quantity)
                return
            }
        }
    }


    return (
        <>
            {
                !!movie &&
                <>
                    <Card
                        sx={{
                            minHeight: '100vh',
                        }}
                    >
                        <CardContent>

                            <Grid container
                                  direction="column"
                                  spacing={6}
                            >
                                <Grid item>
                                    <CardMedia
                                        component="img"
                                        alt={"backdrop image of" + movie.title}
                                        image={Config.TMDB_API_IMG_BASE_URL + movie.backdropPath}
                                        sx={{
                                            borderRadius: '12px',
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Grid container
                                        // direction="row"
                                          spacing={4}
                                          sx={{
                                          }}
                                    >
                                        {/*Start of Poster column*/}
                                        <Grid item
                                              xs={12}
                                              sm={5}
                                        >
                                            <CardMedia
                                                component="img"
                                                alt={"poster image of" + movie.title}
                                                image={Config.TMDB_API_IMG_BASE_URL + movie.posterPath}
                                                sx={{
                                                    borderRadius: '12px',
                                                }}
                                            />

                                        </Grid>
                                        {/*End of Poster column*/}


                                        {/*Start of Info column*/}
                                        <Grid item
                                              xs={7}
                                        >
                                            <Grid container
                                                  direction="column"
                                                  spacing={3}
                                            >
                                                <Grid item>
                                                    <Typography gutterBottom
                                                                variant="h4"
                                                                component="div"
                                                                sx={{
                                                                    margin: '0px',
                                                                    fontWeight: 'bold',
                                                                }}
                                                    >
                                                        {movie.title} ({movie.year})
                                                    </Typography>
                                                </Grid>

                                                {/*Show genre buttons here*/}
                                                {
                                                    !!genres &&
                                                    <Grid item>
                                                        <Grid container direction="row"
                                                              spacing={1}
                                                        >
                                                            {
                                                                genres.map((genre) => (
                                                                    <Grid item>
                                                                        <GenreButton genreName={genre.name}/>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                }

                                                <Grid item>
                                                    <Grid container
                                                          spacing={0.5}
                                                          sx={{
                                                              alignItems: 'center',
                                                          }}
                                                    >
                                                        <Grid item>
                                                            <Rating
                                                                size='large'
                                                                value={movie.rating/2}
                                                                readOnly
                                                                precision={0.5}
                                                                // emptyIcon={<StarIcon style={{color: '#f0f0f0', opacity: 1 }} fontSize="inherit" />}
                                                            />
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography variant="body" color="text.secondary">
                                                                ({movie.numVotes})
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                {/*Show AddToCartBar here*/}
                                                {
                                                    !!accessToken &&
                                                    <Grid item>
                                                        <AddToCartBar movie={movie} quantity={quantity}/>
                                                    </Grid>
                                                }

                                                {
                                                    !!movie.overview &&
                                                    <Grid item>
                                                        <Typography variant="body" color="text.secondary">
                                                            {/*<b>Overview: </b>*/}
                                                            <div>
                                                                {movie.overview}
                                                            </div>
                                                        </Typography>
                                                    </Grid>
                                                }

                                                <Grid item>
                                                    <Typography variant="body" color="text.secondary">
                                                        <b>Director: </b> {movie.director}
                                                    </Typography>
                                                </Grid>

                                                <Grid item>
                                                    {
                                                        !!persons &&
                                                        <Typography variant="body" color="text.secondary">
                                                            <b>Cast: </b>
                                                            {
                                                                persons.map((person) => (
                                                                    <div key={person.id}>
                                                                        <Typography variant="body" color="text.secondary">
                                                                            <body>{person.name}</body>
                                                                        </Typography>
                                                                    </div>
                                                                ))
                                                            }
                                                        </Typography>
                                                    }
                                                </Grid>


                                            </Grid>
                                        </Grid> {/*End of Info column*/}


                                    </Grid>
                                </Grid>


                            </Grid>
                        </CardContent>
                    </Card>

                    {/*<img src={Config.TMDB_API_IMG_BASE_URL + movie.backdropPath} alt={"backdrop image of" + movie.title} ></img>*/}
                </>
            }


        </>
    )
}

export default MovieDetail;
