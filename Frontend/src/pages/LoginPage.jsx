import api from "../axios/axios";
import { useForm } from "react-hook-form";
import InputField from "../components/Form/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	async function onSubmit(data) {
		const response = await api.post("/auth/login", data);

		if (response.status === 200) {
			dispatch(login(response.data.user));
			navigate("/chat");
		}
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<form onSubmit={handleSubmit(onSubmit)} className="w-[35vw] bg-zinc-900 rounded-xl p-8">
				<h1 className="text-xl font-medium text-zinc-300">Login</h1>
				<div className="mt-8 flex flex-col gap-4">
					<InputField register={register} registerName="email" errors={errors} label="Email" placeholder="Enter your email" />
					<InputField register={register} registerName="password" errors={errors} label="Password" placeholder="Enter password" inputType="password" />
				</div>
				<button className="mt-5 text-lg font-medium bg-blue-500/60 px-10 py-3.5 rounded-2xl">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
