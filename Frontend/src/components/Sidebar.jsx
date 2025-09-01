import { SquarePen } from "lucide-react";
import ChatTitle from "./Chat/ChatTitle";
import UserProfile from "./UserProfile";
import SidebarHeader from "./SidebarHeader";
import { useDispatch } from "react-redux";
import { openCreateChatModel } from "../features/chatModel/chatModelSlice";
import ChatList from "./Chat/ChatList";

const Sidebar = () => {
	const dispatch = useDispatch();

	function showChatModel() {
		dispatch(openCreateChatModel());
	}

	return (
		<div className="w-[22vw] h-screen bg-zinc-900 px-4 py-5 overflow-y-auto">
			{/* TOP */}
			<SidebarHeader />

			{/* New chat button */}
			<button onClick={showChatModel} className="w-full flex items-center gap-2.5 text-lg font-medium bg-gray-100/15 hover:bg-gray-100/10 transition-colors duration-200 text-zinc-100 rounded-xl py-3 px-4 mt-20">
				<SquarePen size="1.3rem" /> New chat
			</button>

			{/* Chats list */}
			<ChatList />

			{/* Profile - bottom */}
			<UserProfile />
		</div>
	);
};

export default Sidebar;
