import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from 'app/App';

import "index.css";

/**
 * This is the starting point of our application!
 *
 * Here we have our <App> (Think of this as the root of your application)
<<<<<<< HEAD
 * ReactDOM.render loads up the <App> tag created and defined by us in App.jsx
 * In React, we get to create our own HTML tag a.k.a Component. Whenever we want
 * to reuse our Component, we just need to include that HTML tag which is much
 * shorter and flexible than copying and pasting a block of code
=======
>>>>>>> 34b3e76c88c81ccd611651861bb057ff37fc0903
 *
 * You'll notice its wrapped inside a <BrowserRouter>. This will allow us
 * to navigate around our site by switching which component the user sees
 * depending on the url of the website.
 */
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
