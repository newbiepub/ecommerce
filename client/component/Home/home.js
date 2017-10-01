import React, {PropTypes} from "react";
import {Link, withRouter} from "react-router-dom";
import HeaderTop from "../HeaderTop/headerTop";
import {connect} from "react-redux";
import {fetchData} from "../../action/data";

import 'isomorphic-fetch';
import LoadingTemplate from "../loadingTemplate/loadingTemplate";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    static async fetchData(store) {
        return await store.dispatch(fetchData())
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data);
        this.setState({data: nextProps.data});
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        return (
            <div>
                <HeaderTop/>
                <div className="container">
                </div>
            </div>
        )
    }
}

class DataItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        try {
            return (
                <div>

                </div>
            )
        } catch (e) {
            console.log("error - render data item")
        }
    }
}

DataItem.defaultProps = {
    data: {}
}

DataItem.propTypes = {
    data: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        data: state.data.data
    }
};

const mapDispatchToProps = {
    fetchData
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));