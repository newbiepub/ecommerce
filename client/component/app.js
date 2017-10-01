import React, {Component} from "react";
import {renderRoutes} from "react-router-config";
import {Route} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default App;