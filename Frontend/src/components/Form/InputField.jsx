import { useId } from "react";

const InputField = ({ label, inputType = "text", placeholder, registerName, register, errors }) => {
	const labelId = useId();

	return (
		<div className="w-full flex flex-col gap-1 text-zinc-300">
			<label className="text-lg text-zinc-400" htmlFor={labelId}>
				{label}
			</label>
			<input {...register(registerName, { required: true })} className="w-full border border-zinc-700 text-xl py-3 px-4.5 rounded-xl" id={labelId} type={inputType} placeholder={placeholder} />
			{errors[registerName] && <p className="text-red-500/80">{label} is required</p>}
		</div>
	);
};

export default InputField;
