const OptionBtn = ({ icon, text }) => {
	return (
		<button type="button" className="flex items-center gap-2.5 rounded-full py-2.5 px-3 text-lg font-medium text-zinc-300/70 hover:bg-zinc-700/30 transition-all">
			{icon}
			{text}
		</button>
	);
};

export default OptionBtn;
