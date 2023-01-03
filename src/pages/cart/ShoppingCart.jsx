import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../hook/User";
import {
    requestDELETECartDelete,
    requestGETCartRetrieve,
    requestPOSTCartInsert,
    requestPOSTCartUpdate
} from "../../backend/billing";
import CartItem from "../../OtherComponents/CartItem";
import {useForm} from "react-hook-form";
import {Button, Card, CardContent, CardMedia, Grid, Link, Typography} from "@mui/material";
import Config from "../../backend/config.json";
import EditNavigateCartBar from "./EditNavigateCartBar";

const ShoppingCart = () => {

    const navigate = useNavigate();

    const {
        accessToken
    } = useUser();

    const {register, getValues} = useForm();

    const [items, setItems] = useState();
    const [total, setTotal] = useState(null);

    React.useEffect( async () => {
        const response = await requestGETCartRetrieve(accessToken)

        console.log(JSON.stringify(response.data.result.message, null, 2));
        console.log("Retrieving cart")

        setItems(response.data.items)
        setTotal(response.data.total)
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
                        Shopping Cart
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
                        Item(s) Subtotal: ${!!total ? `${total}` : "0"}
                    </Typography>
                </Grid>

                {
                    !!total &&
                    <Grid item>
                        <Button
                            sx={{
                                marginY: '16px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                color: '#23252b',
                                backgroundColor: '#fab818',
                                "&:hover": {backgroundColor: "#fab818", }
                            }}
                            onClick={() => navigate("/order/checkout")}
                        >
                            Proceed to checkout
                        </Button>
                    </Grid>
                }

                {
                    !!items &&
                    <Grid item>
                        <Card
                            sx={{
                                minHeight: 'fit-content',
                            }}
                        >
                            <CardContent>
                                <Grid container
                                      direction="column"
                                      spacing={3}
                                >
                                    {
                                        items.map((item) =>
                                            <Grid container item
                                                  direction="row"
                                                  spacing={4}
                                            >
                                                <Grid item
                                                      xs={3}
                                                      md={2}
                                                >
                                                    {/*<img src={Config.TMDB_API_IMG_BASE_URL + item.posterPath}*/}
                                                    {/*     alt={"poster image of" + item.movieTitle}*/}
                                                    {/*/>*/}
                                                    <CardMedia
                                                        component="img"
                                                        alt={"poster image of" + item.movieTitle}
                                                        image={Config.TMDB_API_IMG_BASE_URL + item.posterPath}
                                                        sx={{
                                                            borderRadius: '12px',
                                                        }}
                                                        onClick={() => navigate("/movie/id=" + item.movieId)}
                                                    />
                                                </Grid>

                                                <Grid item
                                                      // xs={5}
                                                >
                                                    <Grid container
                                                          direction="column"
                                                        // spacing={1}
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
                                                            <EditNavigateCartBar
                                                                movieId={item.movieId}
                                                                quantity={item.quantity}
                                                            />
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


            {/*<div>*/}
            {/*    <h1>Order Summary</h1>*/}
            {/*    <h2>Order total: ${!!totalPrice ? totalPrice : 0}</h2>*/}
            {/*    {*/}
            {/*        !!totalPrice &&*/}
            {/*        <button onClick={() => navigate("/order/checkout")}>Check Out</button>*/}
            {/*    }*/}

            {/*    {*/}
            {/*        !!itemsInCart &&*/}
            {/*        <div className="container">*/}
            {/*            {*/}
            {/*                itemsInCart.map((item) => (*/}
            {/*                    <div key={item.movieId}>*/}
            {/*                        <React.Fragment>*/}
            {/*                            <CartItem item={item}/>*/}
            {/*                        </React.Fragment>*/}

            {/*                        <div>*/}
            {/*                            <input {...register("quantity")} placeholder="Enter Quantity"/>*/}
            {/*                            <button onClick={() => requestPOSTCartUpdate(accessToken, item.movieId,*/}
            {/*                                !!getValues("quantity") && getValues("quantity") >= 1 && getValues("quantity") <= 10 ?*/}
            {/*                                    parseInt(getValues("quantity")) : 1*/}
            {/*                            ).then(response => {window.location.reload(false)})*/}
            {/*                            }>Update Quantity</button>*/}
            {/*                        </div>*/}

            {/*                        <div>*/}
            {/*                            <button onClick={() => {*/}
            {/*                                const newQuantity = item.quantity - 1 ;*/}
            {/*                                if ((newQuantity) >= 1) {*/}
            {/*                                    requestPOSTCartUpdate(accessToken, item.movieId, newQuantity)*/}
            {/*                                        .then(response => {window.location.reload(false)}*/}
            {/*                                        );*/}
            {/*                                }*/}
            {/*                            }}*/}
            {/*                            >Decrease Quantity (-)</button>*/}
            {/*                        </div>*/}

            {/*                        <div>*/}
            {/*                            <button onClick={() => {*/}
            {/*                                const newQuantity = item.quantity + 1;*/}
            {/*                                if (newQuantity <= 10) {*/}
            {/*                                    requestPOSTCartUpdate(accessToken, item.movieId, newQuantity)*/}
            {/*                                        .then(response => {window.location.reload(false)}*/}
            {/*                                        );*/}
            {/*                                }*/}
            {/*                            }}*/}
            {/*                            >Increase Quanitty (+)</button>*/}
            {/*                        </div>*/}

            {/*                        <div>*/}
            {/*                            <button onClick={() => {*/}
            {/*                                requestDELETECartDelete(accessToken, item.movieId)*/}
            {/*                                    .then(response => {window.location.reload(false)}*/}
            {/*                                    );*/}
            {/*                            }}*/}
            {/*                            >Remove Item</button>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*</div>*/}

        </>
    )
}

export default ShoppingCart;
