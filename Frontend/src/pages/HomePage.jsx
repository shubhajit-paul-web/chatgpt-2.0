import { useSelector } from "react-redux";
import PromptInput from "../components/Chat/PromptInput";
import ModelMessage from "../components/Message/ModelMessage";
import UserMessage from "../components/Message/UserMessage";
import Sidebar from "../components/Sidebar";
import CreateChatModel from "../components/CreateChatModel";

const HomePage = () => {
	const userInfo = useSelector((state) => state.authReducer.user);

	return (
		<div className="flex">
			<Sidebar />
			<CreateChatModel />

			{/* Main chat area */}
			<div className="min-h-screen w-[80vw] bg-zinc-800 relative">
				<div className="absolute top-2/5 left-[50%] -translate-1/2">
					<h1 className="text-5xl font-medium text-blue-500/80 select-none">Hello, {userInfo.fullName.split(" ")[0].trim()}</h1>
				</div>

				{/* chat messages */}
				<div className="w-full h-screen flex flex-col gap-10 px-[calc(10vw+0.5rem)] pt-12 inset-x-0 mx-auto overflow-y-auto">
					{/* <UserMessage />
        				<ModelMessage /> */}
				</div>

				<PromptInput />
			</div>
		</div>
	);
};

export default HomePage;
