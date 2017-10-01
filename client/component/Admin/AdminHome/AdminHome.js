import React from "react";
import {Link, Redirect} from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { isExact } = this.props.match;
        if(isExact) {
            return (
                <section id="container">
                    <AdminHeader/>
                    <AdminSidebar/>
                </section>
            )
        } else {
           return (
               <Redirect to="/404"/>
           )
        }
    }
}

export default AdminHome;