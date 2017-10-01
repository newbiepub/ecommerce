import App from "./component/app";
import Home from "./component/home/home";
import NotFound from "./component/NotFound/notFound";
import Login from "./component/Login/Login";
import AdminLogin from "./component/Admin/AdminLogin/AdminLogin";
import AdminHome from "./component/Admin/AdminHome/AdminHome";

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/login',
                component: Login
            },
            {
                path: '/admin',
                component: AdminLogin
            },
            {
                path: "/dashboard",
                component: AdminHome
            },
            {
                path: "*",
                component: NotFound
            }
        ]
    }
];

export default routes;