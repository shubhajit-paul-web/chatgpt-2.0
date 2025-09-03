import api from "../../axios/axios";
import { useEffect, useRef } from "react";
import UserMessage from "../Message/UserMessage";
import ModelMessage from "../Message/ModelMessage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../features/messages/messagesSlice";
import GeneratingResponse from "../Message/GeneratingResponse";

const ChatMessagesView = ({ chatId }) => {
	const dispatch = useDispatch();
	const bottomRef = useRef(null);
	const { messages, isSending: isMessageSending } = useSelector((state) => state.messagesReducer);

	// Fetching chat messages
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
		<div className="w-full h-screen flex flex-col gap-10 px-[calc(10vw+0.5rem)] pt-12 pb-60 inset-x-0 mx-auto overflow-y-auto">
			{messages.length ? (
				messages.map((message, index) => {
					if (message.role === "user") {
						return <UserMessage content={message.content} key={message._id || index} />;
					} else {
						return <ModelMessage content={message.content} key={message._id || index} />;
					}
				})
			) : (
				<p className="text-lg text-zinc-500/80 font-mono italic text-center mt-[25%]">No messages yet. Ask me anything to start the chat.</p>
			)}

			{isMessageSending && <GeneratingResponse />}

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessagesView;
