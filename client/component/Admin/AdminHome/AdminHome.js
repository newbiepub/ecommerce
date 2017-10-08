import React from "react";
import {Link, Redirect} from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import {login} from "../../../action/account";

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
    }

    // fetch User from server
    static async login(store, user) {
        return await store.dispatch(login(user));
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