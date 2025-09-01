import api from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateChatModel } from "../features/chatModel/chatModelSlice";
import { useForm } from "react-hook-form";

const CreateChatModel = () => {
	const dispatch = useDispatch();
	const isModelOpen = useSelector((state) => state.chatModelReducer.isCreateChatModelOpened);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	function hideChatModel() {
		dispatch(closeCreateChatModel());
	}

	async function createNewChat(data) {
		const response = await api.post("/chat", {
			title: data.chatTitle,
		});
		
		console.log(response);

		hideChatModel();
		reset();
	}

	return (
		<div className={`fixed top-0 left-0 z-50 w-full h-screen bg-black/45 backdrop-blur-xs transition-all ${isModelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
			<div onClick={hideChatModel} className="w-full h-full flex items-center justify-center">
				<form onSubmit={handleSubmit(createNewChat)} onClick={(e) => e.stopPropagation()} className="w-[25rem] p-5 bg-zinc-800 border border-zinc-600/60 rounded-2xl">
					<h2 className="text-xl text-zinc-400 mb-4">Create new chat</h2>
					<input {...register("chatTitle", { required: true })} className="w-full px-4 py-3 rounded-xl text-lg border border-zinc-500" type="text" placeholder="Chat title" />
					{errors.chatTitle && <p className="text-red-400 mt-1 text-sm">Title is required</p>}
					<button className="font-medium bg-zinc-200 text-zinc-800 hover:bg-zinc-200/80 px-6 py-2.5 rounded-3xl mt-5 transition-all">Create</button>
				</form>
			</div>
		</div>
	);
};

export default CreateChatModel;
