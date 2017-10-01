import React from "react";
import {Link} from "react-router-dom";

const jQueryInit = () => {
    /*==Sidebar Toggle==*/

    $(".leftside-navigation .sub-menu > a").click(function () {
        var o = ($(this).offset());
        var diff = 80 - o.top;
        if (diff > 0)
            $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
        else
            $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
    });

    $('.sidebar-toggle-box .fa-bars').click(function (e) {

        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $('#sidebar').toggleClass('hide-left-bar');
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();
        $('#main-content').toggleClass('merge-left');
        e.stopPropagation();
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }


    });
    $('.toggle-right-box .fa-bars').click(function (e) {
        $('#container').toggleClass('open-right-panel');
        $('.right-sidebar').toggleClass('open-right-bar');
        $('.header').toggleClass('merge-header');

        e.stopPropagation();
    });

    $('.header,#main-content,#sidebar').click(function () {
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }


    });


    $('.panel .tools .fa').click(function () {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("fa-chevron-down")) {
            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200); }
    });



    $('.panel .tools .fa-times').click(function () {
        $(this).parents(".panel").parent().remove();
    });
}

class AdminHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        jQueryInit();
    }

    render() {
        return (
            <header className="header fixed-top clearfix">
                <div className="brand">
                    <Link to='/admin' className="logo">
                        VISITORS
                    </Link>
                    <div className="sidebar-toggle-box">
                        <div className="fa fa-bars"/>
                    </div>
                </div>
                <div className="nav notify-row" id="top_menu">
                    <ul className="nav top-menu">
                        <li className="dropdown"></li>
                        <li id="header_inbox_bar" className="dropdown"></li>
                        <li id="header_notification_bar" className="dropdown"></li>
                    </ul>
                </div>
                <AdminHeaderNotification/>
                <div className="top-nav clearfix">

                    <ul className="nav pull-right top-menu">
                        <li>
                            <input type="text" className="form-control search" placeholder=" Search"/>
                        </li>

                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <img alt="" src="http://localhost:3000/static/images/2.png"/>
                                <span className="username">John Doe</span>
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu extended logout">
                                <li><Link to="/admin"><i className=" fa fa-suitcase"></i>Profile</Link></li>
                                <li><Link to="/admin"><i className="fa fa-cog"></i> Settings</Link></li>
                                <li><Link to="/admin"><i className="fa fa-key"></i> Log Out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}

class AdminHeaderNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav notify-row" id="top_menu">
                <ul className="nav top-menu">
                    <li className="dropdown">
                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <i className="fa fa-tasks"></i>
                            <span className="badge bg-success">0</span>
                        </a>
                        <ul className="dropdown-menu extended tasks-bar">
                            <li>
                                <p className="">You have 0 pending tasks</p>
                            </li>
                        </ul>
                    </li>
                    <li id="header_inbox_bar" className="dropdown">
                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <i className="fa fa-envelope-o"></i>
                            <span className="badge bg-important">0</span>
                        </a>
                        <ul className="dropdown-menu extended inbox">
                            <li>
                                <p className="red">You have 0 Mails</p>
                            </li>
                        </ul>
                    </li>
                    <li id="header_notification_bar" className="dropdown">
                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">

                            <i className="fa fa-bell-o"></i>
                            <span className="badge bg-warning">0</span>
                        </a>
                        <ul className="dropdown-menu extended notification">
                            <li>
                                <p>Notifications</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminHeader;