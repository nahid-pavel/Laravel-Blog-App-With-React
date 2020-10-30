import React from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./layout/Header";
import Homepage from "./pages/Homepage";
import CreatePost from "./posts/CreatePost";
import PostView from "./posts/PostView";

function App() {
    return (
        <>
            <Header />
            <Container>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/edit/:id" component={PostView} exact={true} />
                    <Route path="/create" component={CreatePost} exact={true} />
                </Switch>
            </Container>
        </>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Router>
            <App />
        </Router>,

        document.getElementById("app")
    );
}
