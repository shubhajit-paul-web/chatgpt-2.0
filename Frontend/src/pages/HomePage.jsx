import { useParams } from "react-router-dom";
import PromptInput from "../components/Chat/PromptInput";
import Sidebar from "../components/Sidebar";
import CreateChatModel from "../components/CreateChatModel";
import ChatMessagesView from "../components/Chat/ChatMessagesView";
import EmptyChatView from "../components/EmptyChatView";

const HomePage = () => {
	const params = useParams();

	return (
		<div className="flex">
			<Sidebar />
			<CreateChatModel />

			{/* Main chat window */}
			<div className="min-h-screen w-[80vw] bg-zinc-800 relative">
				{params.id ? (
					<>
						<ChatMessagesView chatId={params.id} />
						<PromptInput />
					</>
				) : (
					<EmptyChatView />
				)}
			</div>
		</div>
	);
};

export default HomePage;
