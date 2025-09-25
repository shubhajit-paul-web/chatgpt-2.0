import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/chat" element={<HomePage />} />
				<Route path="/chat/:id" element={<HomePage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
