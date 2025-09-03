import { Bot } from "lucide-react";

const GeneratingResponse = () => {
	return (
		<div className="flex items-center gap-4 bg-zinc-700/40 text-lg w-fit py-5 px-8 rounded-2xl animate-pulse cursor-default">
			<div className="py-2 px-2 bg-blue-500 text-zinc-50 border-2 border-white/30 rounded-full">
				<Bot size="1.4rem" />
			</div>
			<span className="font-mono animate-pulse">Generating response...</span>
		</div>
	);
};

export default GeneratingResponse;
