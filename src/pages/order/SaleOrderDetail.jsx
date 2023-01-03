import Config from "backend/config.json";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../hook/User";
import {requestGETOrderDetail, requestPOSTCartInsert} from "../../backend/billing";
import CartItem from "../../OtherComponents/CartItem";
import {Button, Card, CardContent, CardMedia, Grid, Link, Typography} from "@mui/material";


const SaleOrderDetail = () => {
    const {
        accessToken
    } = useUser();

    const {saleId} = useParams();

    const navigate = useNavigate();

    const [total, setTotal] = React.useState();
    const [items, setItems] = React.useState();

    React.useEffect( async () => {
        const response = await requestGETOrderDetail(accessToken, saleId)

        console.log("response", response)

        setTotal(response.data.total);
        setItems(response.data.items);
    }, [])

    return (
        <>
            <Grid container direction="column" spacing={2}>

                <Grid item>
                    <Typography gutterBottom
                                variant="h4"
                                component="div"
                                sx={{
                                    margin: '0px',
                                    fontWeight: 'bold',
                                }}
                    >
                        Order Details
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography gutterBottom
                                variant="h5"
                                component="div"
                                sx={{
                                    margin: '0px',
                                    // fontWeight: 'bold',
                                }}
                    >
                        Item(s) Subtotal: ${total}
                    </Typography>
                </Grid>

                {
                    !!items &&
                    <Grid item>
                        <Card>
                            <CardContent>

                                <Grid container
                                      direction="column"
                                    spacing={4}
                                >
                                    {
                                        items.map((item) =>
                                            <Grid container item
                                                  key={item.movieId}
                                                  spacing={4}
                                            >
                                                <Grid item
                                                      xs={5}
                                                      sm={2}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        alt={"poster image of" + item.movieTitle}
                                                        image={Config.TMDB_API_IMG_BASE_URL + item.posterPath}
                                                        sx={{
                                                            borderRadius: '12px',
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0, 1)',
                                                            boxShadow: '0px 13px 10px -7px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                        onClick={() => navigate("/movie/id=" + item.movieId)}
                                                    />
                                                </Grid>

                                                <Grid item
                                                      xs={5}
                                                      sm={10}
                                                >
                                                    <Grid container
                                                          direction="column"
                                                          spacing={1}
                                                    >
                                                        <Grid item>
                                                            <Link href={`/movie/id=${item.movieId}`}
                                                                  variant="h5"
                                                                  underline="hover"
                                                            >
                                                                {item.movieTitle}
                                                            </Link>
                                                            {/*<Typography gutterBottom*/}
                                                            {/*            variant="h5"*/}
                                                            {/*            component="div"*/}
                                                            {/*            sx={{*/}
                                                            {/*                margin: '0px',*/}
                                                            {/*                // fontWeight: 'bold',*/}
                                                            {/*            }}*/}
                                                            {/*>*/}
                                                            {/*    {item.movieTitle}*/}
                                                            {/*</Typography>*/}
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    margin: '0px',
                                                                    // fontWeight: 'bold',
                                                                }}
                                                            >
                                                                Quantity: {item.quantity}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                sx={{
                                                                    margin: '0px',
                                                                    // fontWeight: 'bold',
                                                                }}
                                                            >
                                                                Unit price: ${item.unitPrice}
                                                            </Typography>
                                                        </Grid>

                                                    </Grid>

                                                </Grid>

                                            </Grid>
                                        )
                                    }
                                </Grid>

                            </CardContent>
                        </Card>


                    </Grid>
                }



            </Grid>

            {/*<h1>Order ID#: {saleId}</h1>*/}
            {/*{*/}
            {/*    !!total &&*/}
            {/*    <div>*/}
            {/*        <h1>Order total: ${total}</h1>*/}
            {/*        <h2>Items:</h2>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{*/}
            {/*    !!items &&*/}
            {/*    <div className="container">*/}
            {/*        {*/}
            {/*            items.map((item) => (*/}
            {/*                <div key={saleId}>*/}
            {/*                    <React.Fragment>*/}
            {/*                        <CartItem item={item}/>*/}
            {/*                    </React.Fragment>*/}
            {/*                </div>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*}*/}

        </>
    )
}

export default SaleOrderDetail;
