import React from "react";
import { Container } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./layout/Header";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <>
            <Header />
            <Container>
                <Switch>
                    <Route exact path="/" component={Homepage} />
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
