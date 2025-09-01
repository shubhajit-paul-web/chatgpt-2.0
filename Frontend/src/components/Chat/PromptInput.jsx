import { Clapperboard, Images, Microscope, NotebookPen, Plus, SendHorizontal } from "lucide-react";
import OptionBtn from "./OptionBtn";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

const PromptInput = () => {
	const promptInput = useRef(null);
	const { handleSubmit, register, reset } = useForm();

	async function sendMessage(data) {
		console.log(data);
		reset();
	}

	useEffect(() => {
		promptInput.current.focus();
	}, []);

	return (
		<div className="absolute bg-zinc-800 bottom-0 inset-x-0 mx-auto w-[60vw]">
			<form onSubmit={handleSubmit(sendMessage)} className="w-full min-h-28 bg-zinc-800 rounded-3xl border border-zinc-600 shadow-2xl shadow-zinc-900/40 p-5">
				{/* Input */}
				<textarea {...register("prompt", { required: true })} ref={promptInput} className="text-xl w-full outline-none" type="text" placeholder="Ask anything" />

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
					<button className="p-3 rounded-full bg-zinc-700/40 hover:bg-zinc-700/70 transition-all" type="submit">
						<SendHorizontal size="1.6rem" />
					</button>
				</div>
			</form>

			<p className="text-center mt-3 mb-2.5 text-zinc-200/70">ChatGPT-2.0 can make mistakes. Check important info.</p>
		</div>
	);
};

export default PromptInput;
