import React from "react";
import Content from 'app/Content';
import NavBar from 'app/NavBar';
import {UserProvider} from "hook/User";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`

/**
 * Here is the root of our application.
 * <br>
 * The function below is called a "React Hook" and we use these functions to
 * create a "React Component".
 * <br>
 * You'll notice that this function returns other "React Component"s. All React
 * Components will either return More "React Component's" or JSX (More on this
 * later but think of this as html)
 * <br>
 * The rule for returning these Components is that you can return
 * as many Components as you want, but they must be "Wrapped" into a single
 * Component. As we can see below, all the components are wrapped into the
 * <UserProvider> Component.
 * <li><UserProvider> - A Component allows us to do some data storage we will
 * talk about later
 * <li><StyledDiv> - A html div (think of these as boxes that <i>divide</i> the
 * page). This particular div is a "styled" div, as in a div that has some css
 * inside it. You can see the style we apply to it above in the
 * <b>StyledDiv</b> variable
 * <li><NavBar> - The top Navigation bar with links to all our pages
 * <li><Content> - This Is a component that can have its contents be decided by
 * the "url" of the page
 *
 * When we "export default App", we can now use App as an HTML tag. We're creating
 * a component basically. You know in HTML we have tags like <i>, <a>, ... In React,
 * we get to create our own tags.
 *
 * This "App" is a component. If we want to have component relating to
 * weather for example, then we create Weather.jsx
 *
 * Components are self-contained. That means, we can link the html stuff in here App
 * to a certain .css file, and they're all grouped together. You know you can get nasty
 * with .css files such as having 100 .css files overwriting the effects of one another.
 * All that goes away with React because we bundle our .css files and .html files into
 * a component. So, the .css file of this Component will never affect other Components.
 */
const App = () => {
    return (
        <UserProvider>
            <StyledDiv>
                <NavBar/>
                <Content/>
            </StyledDiv>
        </UserProvider>
    );
};

export default App;
