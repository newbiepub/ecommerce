import React from "react";
import HeaderTop from "../HeaderTop/headerTop";
import Cookie from "universal-cookie";
import {Redirect} from "react-router-dom";

class Login extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div>
                <HeaderTop/>
                <div className="container">
                    <div className="form-group-wrapper">
                        <div className="columns">
                            <div className="column">
                                <FormLogin {...this.props} instance={this}/>
                            </div>
                            <div className="divider-vert" data-content="OR"/>
                            <div className="column">
                                <FormSignUp {...this.props} instance={this}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class FormLogin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    onLoginSubmit(event) {
        event.preventDefault();
        this.setState({isLogin: true});

        let _csrf = $("#_csrf").val();
        let { username, password } = this.state;

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/login",
            data: {username, password, _csrf},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            dataType: "json"
        })  .fail((err) => {
            this.setState({isLogin: false})
        })
            .done((response) => {
            this.setState({isLogin: false})
        })
    }

    render() {
        return (
            <form onSubmit={this.onLoginSubmit.bind(this)}>
                <div className="form-group">
                    <label className="form-label" htmlFor="input-example-1">Username</label>
                    <input className="form-input" id="input-example-1"
                           required={true}
                           onChange={(e) => {let username = e.target.value; this.setState({username})}}
                           placeholder="Username" type="text"/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="input-example-2">Password</label>
                    <input className="form-input" id="input-example-2"
                           required={true}
                           onChange={(e) => {let password = e.target.value; this.setState({password})}}
                           placeholder="Password" type="password"/>
                </div>
                <div className="form-group">
                    <button type="submit" className={`btn btn-primary${this.state.isLogin ? "loading" : ""}`}>Login</button>
                </div>
            </form>
        )
    }
}


class FormSignUp extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }



    render() {
        let { isExact } = this.props.match;
        if(isExact) {
            return (
                <form>
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-3">Username</label>
                        <input className="form-input" id="input-example-3" placeholder="Username"
                               onChange={(username) => this.setState({username})}
                               type="text"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-4">Password</label>
                        <input className="form-input"
                               onChange={(password) => this.setState({password})}
                               id="input-example-4" placeholder="Password" type="password"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-5">Re-Password</label>
                        <input className="form-input" id="input-example-5" placeholder="Re-Password" type="password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            )
        } else {
            return (
                <Redirect to="/404"/>
            )
        }
    }
}

export default Login;