import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="/chat/:id" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
		</Routes>
	);
};

export default AppRoutes;
