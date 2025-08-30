import Logo from "../assets/logo.png";
import { PanelLeft } from "lucide-react";

const SidebarHeader = () => {
	return (
		<div className="fixed w-[20vw] left-0 top-0 px-4 py-5 pb-3 bg-inherit border-b border-zinc-800">
			<div className="flex items-center justify-between">
				<img src={Logo} className="w-9" />
				<button className="text-zinc-400" style={{ cursor: "e-resize" }}>
					<PanelLeft size="1.4rem" />
				</button>
			</div>
		</div>
	);
};

export default SidebarHeader;
