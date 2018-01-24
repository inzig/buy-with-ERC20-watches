import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Cart from './Cart.js'
import Help from './help.js'
// Import routing components
import {BrowserRouter, Route} from "react-router-dom";


class Root extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path={"/"} exact component={App} />
                    <Route path="/cart" exact component={Cart} />
                    <Route path="/help" exact component={Help} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
