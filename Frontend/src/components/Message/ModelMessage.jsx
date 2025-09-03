import rehypeHighlight from "rehype-highlight";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import IconBtn from "../Chat/IconBtn";
import { Copy, RefreshCw, Share, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";

const ModelMessage = ({ content }) => {
	return (
		<div className={`w-full h-fit text-xl/8 text-zinc-300 py-4  rounded-xl prose prose-invert max-w-none`}>
			<Markdown rehypePlugins={[rehypeHighlight, remarkGfm]}>{content.trim()}</Markdown>

			<div className="flex items-center mt-2.5 text-white/80">
				<IconBtn icon={<Copy size="1.4rem" />} />
				<IconBtn icon={<ThumbsUp size="1.4rem" />} />
				<IconBtn icon={<ThumbsDown size="1.4rem" />} />
				<IconBtn icon={<Volume2 size="1.4rem" />} />
				<IconBtn icon={<Share size="1.4rem" />} />
				<IconBtn icon={<RefreshCw size="1.4rem" />} />
			</div>
		</div>
	);
};

export default ModelMessage;
