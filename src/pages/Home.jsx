import React, {useEffect} from "react";
import "../App.css";
import {useUser} from "../hook/User";


const Home = () => {

    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    useEffect(() => {
        setAccessToken(null);
        setRefreshToken(null);
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
