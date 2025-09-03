import { Clapperboard, Images, Microscope, NotebookPen, Plus, RefreshCw, SendHorizontal } from "lucide-react";
import OptionBtn from "./OptionBtn";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageSending, setIsSocketConnected, setMessages } from "../../features/messages/messagesSlice";

const PromptInput = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const isMessageSending = useSelector((state) => state.messagesReducer.isSending);
	const { handleSubmit, register, reset } = useForm();
	const [socket, setSocket] = useState(null);

	async function socketConnection() {
		const socket = io("http://localhost:3000", { withCredentials: true });

		socket.on("connect", () => {
			setSocket(socket);
			dispatch(setIsSocketConnected(true));
		});
		
		socket.on("disconnect", () => {
			dispatch(setIsSocketConnected(false));
		});
	}

	function sendMessage(data) {
		const userMessage = {
			chat: params.id,
			content: data.prompt,
			role: "user",
		};

		dispatch(messageSending(true));
		dispatch(setMessages(userMessage));

		socket.emit("ai-message", userMessage);

		socket.on("ai-response", (messagePayload) => {
			dispatch(setMessages(messagePayload));
			dispatch(messageSending(false));
		});

		reset();
	}

	function handleKeyDown(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(sendMessage)();
		}
	}

	useEffect(() => {
		socketConnection();
	}, []);

	return (
		<div className="absolute bg-zinc-800 bottom-0 inset-x-0 mx-auto w-[60vw]">
			<form onSubmit={handleSubmit(sendMessage)} className="w-full min-h-28 bg-zinc-800 rounded-3xl border border-zinc-600 shadow-2xl shadow-zinc-900/40 p-5">
				{/* Input */}
				<textarea rows={2} {...register("prompt", { required: true })} onKeyDown={handleKeyDown} className="text-xl w-full outline-none" type="text" placeholder="Ask anything" />

				{/* Options */}
				<div className="flex items-center justify-between gap-3 mt-2">
					<div className="flex items-center gap-3">
						<OptionBtn icon={<Plus size="1.6rem" />} />
						<OptionBtn icon={<Microscope size="1.35rem" />} text="Deep Research" />
						<OptionBtn icon={<Clapperboard size="1.35rem" />} text="Video" />
						<OptionBtn icon={<Images size="1.35rem" />} text="Image" />
						<OptionBtn icon={<NotebookPen size="1.35rem" />} text="Canvas" />
					</div>
					{/* Submit */}
					<button disabled={isMessageSending} className="p-3 rounded-full bg-zinc-700/40 hover:bg-zinc-700/70 transition-all disabled:opacity-50" type="submit">
						{isMessageSending ? <RefreshCw size="1.6rem" className="animate-spin text-blue-200" /> : <SendHorizontal size="1.6rem" />}
					</button>
				</div>
			</form>

			<p className="text-center mt-3 mb-2.5 text-zinc-200/70">ChatGPT-2.0 can make mistakes. Check important info.</p>
		</div>
	);
};

export default PromptInput;
