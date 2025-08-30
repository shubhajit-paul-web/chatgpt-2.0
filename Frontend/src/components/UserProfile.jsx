import { LogOut } from "lucide-react";

const UserProfile = () => {
	return (
		<div className="fixed bottom-0 left-0 w-[20vw] h-20">
			<div className="w-full h-full bg-zinc-900 flex items-center justify-between px-3.5 border-t border-zinc-800">
				<div className="flex items-center gap-4">
					<div className="w-9 h-9 rounded-full overflow-hidden">
						<img className="w-full h-full object-cover object-center" src="https://sb.kaleidousercontent.com/67418/1920x1545/c5f15ac173/samuel-raita-ridxdghg7pw-unsplash.jpg" alt="profile picture" />
					</div>
					<div>
						<p className="text-lg leading-tight">Shubhajit Paul</p>
						<p className="text-md font-light leading-tight opacity-60">Free</p>
					</div>
				</div>
				<button className="flex items-center gap-1.5 text-zinc-50 text-sm font-medium bg-zinc-600/30 hover:bg-red-700/80 px-3 py-2 rounded-lg transition-all">
					<LogOut size="1rem" />
					Logout
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
