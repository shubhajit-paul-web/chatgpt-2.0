import { useSelector } from "react-redux";
import useShowChatModel from "../hooks/useShowChatModel";
import { SquarePen } from "lucide-react";

const EmptyChatView = () => {
	const userInfo = useSelector((state) => state.authReducer.user);
	const { showChatModel } = useShowChatModel();

	return (
		<div className="absolute top-2/5 left-[50%] -translate-1/2">
			<h1 className="text-5xl font-medium text-blue-500/80 select-none">Hello, {userInfo.fullName.split(" ")[0].trim()}</h1>

			<button onClick={showChatModel} className="flex items-center gap-3 bg-zinc-700/60 hover:bg-zinc-600/50 transition-all text-zinc-300/80 border border-zinc-600/70 font-medium text-lg py-3 px-7 rounded-full mt-10">
				<SquarePen size="1.25rem" /> New Chat
			</button>
		</div>
	);
};

export default EmptyChatView;
