const PromptInput = () => {
	return (
		<div className="absolute bottom-0 inset-x-0 mx-auto w-[60vw]">
			<form className="w-full h-28 bg-zinc-700 rounded-xl border border-zinc-600 p-5">
				<textarea className="text-xl w-full outline-none" type="text" placeholder="Ask anything" />
			</form>

			<p className="text-center mt-3 mb-2.5 text-zinc-200/70">ChatGPT-2.0 can make mistakes. Check important info.</p>
		</div>
	);
};

export default PromptInput;
