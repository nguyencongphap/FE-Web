import React from "react";
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";

import Register from "pages/Register";
import Login from "pages/Login";
import Home from "pages/Home";
import Search from "pages/search/Search"


import MovieDetail from "../pages/search/MovieDetail";
import ShoppingCart from "../pages/cart/ShoppingCart";
import OrderHistory from "../pages/order/OrderHistory";
import SaleOrderDetail from "../pages/order/SaleOrderDetail";
import Checkout from "../pages/cart/Checkout";
import OrderCompleteConfirmation from "../pages/cart/OrderCompleteConfirmation";



const StyledDiv = styled.div`
  padding: 24px;
  
  background: #ffffff;
  // background: #000000;
  
  // height: 100vh;
  
  // box-shadow: inset 0 3px 5px -3px #000000;
`

/**
 * This is the Component that will switch out what Component is being shown
 * depending on the "url" of the page
 * <br>
 * You'll notice that we have a <Routes> Component and inside it, we have
 * multiple <Route> components. Each <Route> maps a specific "url" to show a
 * specific Component.
 * <br>
 * Whenever you add a Route here make sure to add a corresponding NavLink in
 * the NavBar Component.
 * <br>
 * You can essentially think of this as a switch statement:
 * @example
 * switch (url) {
 *     case "/login":
 *         return <Login/>;
 *     case "/":
 *         return <Home/>;
 * }
 *
 */
const Content = () => {
    return (
        <StyledDiv>
            <>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    {/*<Route path="/search" element={<Search/>}/>*/}


                    <Route path={"/search/" +
                        "title=:title&" +
                        "year=:year&" +
                        "director=:director&" +
                        "genre=:genre&" +
                        "limit=:limit&" +
                        "page=:page&" +
                        "orderBy=:orderBy&" +
                        "direction=:direction"
                    }
                           element={<Search/>}/>



                    <Route path={"/movie/id=:id"} element={<MovieDetail/>}/>
                    <Route path={"/cart"} element={<ShoppingCart/>}/>
                    <Route path={"/order/list"} element={<OrderHistory/>}/>
                    <Route path={"/order/detail/:saleId"} element={<SaleOrderDetail/>}/>
                    <Route path={"/order/checkout"} element={<Checkout/>}/>
                    <Route path={"/order/completeConfirmation/:paymentIntentId"} element={<OrderCompleteConfirmation/>}/>
                </Routes>
            </>
        </StyledDiv>
    );
}

export default Content;
