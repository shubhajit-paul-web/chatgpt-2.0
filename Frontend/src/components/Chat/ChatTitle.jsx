import { NavLink } from "react-router-dom";

const ChatTitle = ({ chatId, title }) => {
	const baseStyle = "text-zinc-300 px-3 py-2.5 rounded-xl text-[1.1rem] hover:bg-zinc-800/60 block whitespace-nowrap overflow-hidden text-ellipsis";

	return (
		<NavLink to={`/chat/${chatId}`} className={({ isActive }) => (isActive ? `bg-zinc-800 ${baseStyle}` : baseStyle)}>
			{title}
		</NavLink>
	);
};

export default ChatTitle;
