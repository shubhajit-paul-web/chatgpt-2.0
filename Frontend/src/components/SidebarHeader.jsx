import { useSelector } from "react-redux";
import Logo from "../assets/logo.png";
import { PanelLeft } from "lucide-react";

const SidebarHeader = () => {
	const { isSocketConnected } = useSelector((state) => state.messagesReducer);

	return (
		<div className="fixed w-[20vw] left-0 top-0 px-4 py-5 pb-3 bg-inherit border-b border-zinc-800">
			<div className="flex items-center justify-between">
				<img src={Logo} className="w-9" />

				{/* indicator */}
				<div className="flex items-center gap-2 bg-zinc-600/25 py-1.5 px-4 rounded-3xl cursor-default">
					<div className={`w-2 h-2 ${isSocketConnected ? "bg-green-500" : "bg-red-500"} rounded-full animate-pulse`}></div>
					<span className="text-sm font-mono text-zinc-400">{isSocketConnected ? "Connected" : "Disconnected"}</span>
				</div>

				<button className="text-zinc-400" style={{ cursor: "e-resize" }}>
					<PanelLeft size="1.4rem" />
				</button>
			</div>
		</div>
	);
};

export default SidebarHeader;
