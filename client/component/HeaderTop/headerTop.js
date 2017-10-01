import React from "react";
import {Link} from "react-router-dom";

class HeaderTop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="header-top">
                <div style={{height: "60px"}} className="container-fluid">
                    <div className="row flex-row">
                        <div className="col-md-3 col-xs-6 flex-nav-item">
                            <ul className="nav-list">
                                <li className="nav-wrapper">
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-wrapper">
                                    <Link to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                                <li className="nav-wrapper">
                                    <a href="/admin">
                                        Admin
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 hidden-sm hidden-xs"/>
                        <div className="col-md-3 col-xs-6 flex-nav-item">
                            <div className="nav-social-icon">
                                Facebook
                            </div>
                            <div className="nav-social-icon">
                                <i className="fa fa-google"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default HeaderTop;