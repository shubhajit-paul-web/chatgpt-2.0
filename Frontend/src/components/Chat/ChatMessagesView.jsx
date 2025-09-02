import api from "../../axios/axios";
import { useEffect, useRef } from "react";
import UserMessage from "../Message/UserMessage";
import ModelMessage from "../Message/ModelMessage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../features/messages/messagesSlice";

const ChatMessagesView = ({ chatId }) => {
	const dispatch = useDispatch();
	const bottomRef = useRef(null);
	const messages = useSelector((state) => state.messagesReducer.messages);

	async function getMessages() {
		if (chatId) {
			try {
				const response = await api.get(`/messages?chatId=${chatId}`);

				if (response.status === 200) {
					dispatch(setMessages(response.data));
				}
			} catch (error) {
				console.error("Get messages Error:", error);
			}
		}
	}

	useEffect(() => {
		getMessages();
	}, [chatId]);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="w-full h-screen flex flex-col gap-10 px-[calc(10vw+0.5rem)] pt-12 pb-75 inset-x-0 mx-auto overflow-y-auto">
			{messages.map((message, index) => {
				if (message.role === "user") {
					return <UserMessage content={message.content} key={message._id || index} />;
				} else {
					return <ModelMessage content={message.content} key={message._id || index} />;
				}
			})}

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessagesView;
