import api from "../axios/axios";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthenticateUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	async function getProfile() {
		try {
			const response = await api.get("/auth/profile");

			if (response.status === 200) {
				dispatch(login(response.data));
				navigate("/chat");
			} else {
				navigate("/login");
			}
		} catch (error) {
			console.error("Get Profile Error:", error);

			if (error.code === "ERR_BAD_REQUEST") {
				navigate("/login");
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	return loading;
};

export default useAuthenticateUser;
