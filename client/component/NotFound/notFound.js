import React from "react";
import {Link} from "react-router-dom";

class NotFound extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="wrapper">
                <div className="wrapper-container">
                    <div className="logo">
                        <h1>404</h1>
                        <p> Sorry - Page not Found!</p>
                        <div className="sub">
                            <Link to="/"> Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;