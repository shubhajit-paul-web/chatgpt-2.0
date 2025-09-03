import { useDispatch, useSelector } from "react-redux";
import api from "../../axios/axios";
import ChatTitle from "./ChatTitle";
import { useEffect, useState } from "react";
import { setChats } from "../../features/chatModel/chatModelSlice";

const ChatList = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { chats } = useSelector((state) => state.chatModelReducer);

	async function getChats() {
		try {
			const response = await api.get("/chat");

			if (response.status === 200) {
				dispatch(setChats(response.data.reverse()));
				console.log(response.data);
			}
		} catch (error) {
			console.error("Get chats Error:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getChats();
	}, []);

	if (loading) {
		return <div className="mt-10 text-lg text-zinc-400 animate-pulse">Loading chats...</div>;
	}

	return (
		<div>
			<h2 className="text-zinc-500 font-medium text-lg mt-10 mb-1 ml-3">Chats</h2>
			<div className="flex flex-col gap-1 pb-20">
				{chats.length ? (
					chats.map((chat) => {
						return <ChatTitle chatId={chat._id} title={chat.title} key={chat._id} />;
					})
				) : (
					<div className="pl-3 text-zinc-500">No chats found...</div>
				)}
			</div>
		</div>
	);
};

export default ChatList;
