import React from "react";
import {Link} from "react-router-dom";

const jQueryInit = function () {
    /*==Left Navigation Accordion ==*/
    if ($.fn.dcAccordion) {
        $('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'normal',
            showCount: false,
            autoExpand: true,
            classExpand: 'dcjq-current-parent'
        });
    }
}

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        jQueryInit ()
    }

    render() {
        return (
            <aside>
                <div id="sidebar" className="nav-collapse">
                    <div className="leftside-navigation">
                        <ul className="sidebar-menu" id="nav-accordion">
                            <li>
                                <a className="active" href="/">
                                    <i className="fa fa-dashboard"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <AdminSidebarSubMenu {...this.props}/>
                        </ul>
                    </div>
                </div>
            </aside>
        )
    }
}

class AdminSidebarSubMenu extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <li className="sub-menu">
                <a href="javascript:;">
                    <i className="fa fa-book"></i>
                    <span>UI Elements</span>
                </a>
                <ul className="sub" style={{display: "block"}}>
                    <li><a href="typography.html">Typography</a></li>
                    <li><a href="glyphicon.html">glyphicon</a></li>
                    <li><a href="grids.html">Grids</a></li>
                </ul>
            </li>
        )
    }
}

export default AdminSidebar;