import app from "./app";
import React from 'react';
import {renderToString} from 'react-dom/server';
import {renderRoutes} from "react-router-config"
import StaticRouter from 'react-router-dom/StaticRouter';
import routes from '../client/routes';
import appReducers from "../client/reducer/index";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import Home from "../client/component/Home/home";
import passport from "passport";
import {findOneUser} from "./lib/controller/User";
import passwordHash from "password-hash";
import * as _ from "lodash";
import {createAuthToken} from "./lib/controller/AccessToken";

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        findOneUser({emails: username}).then((user) => {
            let passwordVerified = passwordHash.verify(password, user.password);
            if(passwordVerified) {
                createAuthToken(user._id).then(token => {
                    done(null, token);
                }).catch(e => {
                    done(e);
                });
            } else {
                done(new Error("Unauthorized"))
            }
        }).catch(e => {
            done(e);
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


const store = createStore(appReducers, applyMiddleware(thunk));

const initialData = (store) => {
    return `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`
};

function renderStatic(req) {
    let context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
    return {content, context};
}

app.get("/api", (req, res, next) => {
    if (req.query.access_token != undefined) {
        next();
    } else {
        res.statusCode = 401;
        res.json({error: {message: "Unauthorized"}});
    }
});

app.get("/", (req, res, next) => {
    const {content, context} = renderStatic(req);
    Home.fetchData(store).then(() => {
        res.render("index.html", {title: "Home Page", content, data: initialData(store), csrfToken: req.csrfToken()});
    })
});

app.route("/login")
    .get((req, res, next) => {
        const {content, context} = renderStatic(req);
        res.render("index.html", {title: "Login", content, data: initialData(store), csrfToken: req.csrfToken()});
    })
    .post((req, res, next) => {
        passport.authenticate('local', (err, user) => {
            next();
        })(req, res, next)
    });


app.get('/admin', (req, res, next) => {
    if(req.user) {
        res.redirect("/dashboard")
    } else {
        const { content, context } = renderStatic(req);
        res.render("index.html", {
            title: "Admin Page",
            content,
            data: initialData(store),
            csrfToken: req.csrfToken(),
            adminStyle: [
                "/static/styles/adminStyle.css",
                '/static/styles/adminStyleResponsive.css',
                '/static/css/morris.css',
                'static/css/monthly.css'
            ]
        });
    }
});

app.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if(err) {
            res.statusCode = 401;
            res.json({error: {message: "Unauthorized"}});
        } else {
            res.statusCode = 200;
            let options = {
                maxAge: 1000 * 60 * 60 * 24 * 14, // would expire after 14 dates
                httpOnly: true, // The cookie only accessible by the web server
            };
            res.cookie('authToken', user.access_token, options); // options is optional
            req.logIn(user, (err) => {
                if(err) {
                    res.statusCode = 401;
                    res.json({error: {message: "Oops !! Login Failed"}});
                } else {
                    res.json({user, redirectUrl: "/dashboard"})
                }
            }); // Login Into session
        }
    })(req, res, next)
});

app.use("/dashboard", (req, res, next) => {
    console.log(req.user);
    if(req.user) {
        next();
    } else {
        res.redirect("/admin")
    }
});

app.route('/dashboard')
    .get((req, res, next) => {
        const { content, context } = renderStatic(req);
        res.render("index.html", {
            title: "Dashboard",
            content,
            data: initialData(store),
            csrfToken: req.csrfToken(),
            adminStyle: [
                "/static/styles/adminStyle.css",
                '/static/styles/adminStyleResponsive.css',
                '/static/css/morris.css',
                'static/css/monthly.css'
            ]
        });
    });

app.get("*", (req, res, next) => {
    const {content, context} = renderStatic(req);
    res.render("index.html", {title: "404 Not Found", content, data: initialData(store), csrfToken: req.csrfToken()});
})


export default app;