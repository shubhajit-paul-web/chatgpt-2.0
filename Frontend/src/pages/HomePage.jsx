import { useSelector } from "react-redux";
import PromptInput from "../components/Chat/PromptInput";
import ModelMessage from "../components/Message/ModelMessage";
import UserMessage from "../components/Message/UserMessage";
import Sidebar from "../components/Sidebar";
import CreateChatModel from "../components/CreateChatModel";
import ChatMessagesView from "../components/Chat/ChatMessagesView";
import { useParams } from "react-router-dom";

const HomePage = () => {
	const params = useParams();
	const userInfo = useSelector((state) => state.authReducer.user);

	return (
		<div className="flex">
			<Sidebar />
			<CreateChatModel />

			{/* Main chat area */}
			<div className="min-h-screen w-[80vw] bg-zinc-800 relative">
				<div className="absolute top-2/5 left-[50%] -translate-1/2">
					<h1 className="hidden text-5xl font-medium text-blue-500/80 select-none">Hello, {userInfo.fullName.split(" ")[0].trim()}</h1>
				</div>

				{/* chat messages */}
				<ChatMessagesView chatId={params.id} />

				<PromptInput />
			</div>
		</div>
	);
};

export default HomePage;
