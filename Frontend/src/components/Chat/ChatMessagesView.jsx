import api from "../../axios/axios";
import { useEffect, useState } from "react";
import UserMessage from "../Message/UserMessage";
import ModelMessage from "../Message/ModelMessage";

const ChatMessagesView = ({ chatId }) => {
	const [messages, setMessages] = useState([]);

	async function getMessages() {
		if (chatId) {
			try {
				const response = await api.get(`/messages?chatId=${chatId}`);

				if (response.status === 200) {
					setMessages(response.data);
				}
			} catch (error) {
				console.error("Get messages Error:", error);
			}
		}
	}

	useEffect(() => {
		getMessages();
	}, [chatId]);

	return (
		<div className="w-full h-screen flex flex-col gap-10 px-[calc(10vw+0.5rem)] pt-12 pb-80 inset-x-0 mx-auto overflow-y-auto">
			{messages.map((message) => {
				if (message.role === "user") {
					return <UserMessage content={message.content} key={message._id} />;
				} else {
					return <ModelMessage content={message.content} key={message._id} />;
				}
			})}
		</div>
	);
};

export default ChatMessagesView;
