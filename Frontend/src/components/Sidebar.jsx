import { SquarePen } from "lucide-react";
import ChatTitle from "./Chat/ChatTitle";
import UserProfile from "./UserProfile";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
	return (
		<div className="w-[22vw] h-screen bg-zinc-900 px-4 py-5 overflow-y-auto">
			{/* TOP */}
			<SidebarHeader />

			{/* New chat button */}
			<button className="w-full flex items-center gap-2.5 text-lg font-medium bg-gray-100/15 hover:bg-gray-100/10 transition-colors duration-200 text-zinc-100 rounded-xl py-3 px-4 mt-20">
				<SquarePen size="1.3rem" />
				New chat
			</button>

			{/* Chats list */}
			<div>
				<h2 className="text-zinc-400 font-medium text-md mt-10 mb-1 ml-3">Chats</h2>
				<div className="flex flex-col gap-1 pb-6">
					{Array(30)
						.fill(0)
						.map((_, index) => (
							<ChatTitle chatId={index} title={`Chat title ${index + 1}`} key={index} />
						))}
				</div>
			</div>

			{/* Profile - bottom */}
			<UserProfile />
		</div>
	);
};

export default Sidebar;
