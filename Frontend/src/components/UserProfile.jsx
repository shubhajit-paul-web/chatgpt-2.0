import api from "../axios/axios";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const UserProfile = () => {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.authReducer.user);

	async function logoutHandler() {
		const response = await api.get("/auth/logout");

		if (response.status === 200) {
			dispatch(logout());
		}
	}

	return (
		<div className="fixed bottom-0 left-0 w-[20vw] h-20">
			<div className="w-full h-full bg-zinc-900 flex items-center justify-between px-3.5 border-t border-zinc-800">
				<div className="flex items-center gap-4">
					<div className="w-9 h-9 rounded-full overflow-hidden">
						<img className="w-full h-full object-cover object-center" src={userInfo.profilePicture} alt="profile picture" />
					</div>
					<div>
						<p className="text-lg leading-tight">{userInfo.fullName}</p>
						<p className="text-md font-light leading-tight opacity-60">Free</p>
					</div>
				</div>
				<button onClick={logoutHandler} className="flex items-center gap-1.5 text-zinc-50 text-sm font-medium bg-zinc-600/30 hover:bg-red-700/80 px-3 py-2 rounded-lg transition-all">
					<LogOut size="1rem" /> Logout
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
