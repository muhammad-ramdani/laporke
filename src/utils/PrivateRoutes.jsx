import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = { 'access_token': localStorage.getItem("token") };

    return (
        auth.access_token ? <Outlet /> : <Navigate to="/login" />
    );
};

export default PrivateRoutes;
