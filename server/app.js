import express from 'express';
import url from "url";
import qs from "querystring";
import consolidate from "consolidate";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {resolve, join} from "path";
import csrf from 'csurf';
const morgan = require("morgan");
const minify = require('express-minify');
const compression = require('compression');


const app = express();


// Minifying Production
app.use(compression());


// Static resource
app.use("/static", express.static(join(__dirname, "../", "public")));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// query string
app.use(
    (req, res, next) => {
        req.query = qs.parse(
            url.parse(req.url).query
        );
        next()
    }
);

//morgan
app.use(morgan('combined'));

// enable cookie
app.use(cookieParser());

// Session
const session = require("express-session");
app.use(session({
    secret: 'ecommerce',
    resave: true,
    saveUninitialized: false
}));

// helmet best practise protection
app.use(helmet());

app.use(csrf({cookie: true}));

// Prevent csrf
app.use(function (req, res, next) {
    res.locals = res.locals || {};
    res.locals.csrftoken = req.csrfToken();
    next();
});


const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// render
app.use(
    (req, res, next) => {
        res.render = (filename, params = {}) => {
            const path = resolve(__dirname, '../', 'public', filename);
            res.locals = res.locals || {}
            consolidate.mustache(
                path,
                Object.assign(params, res.locals),
                (err, html) => {
                    if (err) {
                        throw err
                    }
                    res.setHeader('Content-Type', 'text/html; charset=utf8')
                    res.end(html)
                }
            )
        };
        next()
    }
);

export default app;

