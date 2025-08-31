import Logo from "../assets/logo.png";

const PageLoader = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div>
				<div className="w-30 h-30 p-3.5 rounded-full border-8 border-x-zinc-700 border-y-transparent flex justify-center items-center animate-spin">
					<img className="w-13 h-13" src={Logo} alt="logo" />
				</div>
				<h1 className="text-2xl text-center italic text-zinc-400 mt-7 animate-pulse">Loading...</h1>
			</div>
		</div>
	);
};

export default PageLoader;
