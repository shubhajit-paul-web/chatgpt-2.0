import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthenticateUser from "../hooks/useAuthenticateUser";
import PageLoader from "../components/PageLoader";

const ProtectedRoute = () => {
	const isLoading = useAuthenticateUser();
	const isAuthenticated = useSelector((state) => state.authReducer.isLoggedIn);

	if (isLoading) return <PageLoader />;

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
