import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import SignIn from "../components/Login/SignIn";

const indexRoutes = [
    { path: "/", component: SignIn },
    { path: "/dashboard", component: Dashboard},
];

export default indexRoutes;
