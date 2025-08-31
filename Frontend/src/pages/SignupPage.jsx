import api from "../axios/axios";
import { useForm } from "react-hook-form";
import InputField from "../components/Form/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	async function onSubmit(data) {
		const formData = new FormData();

		formData.append("profilePicture", data.profilePicture[0]);
		Object.keys(data).forEach((key) => {
			if (data[key]) {
				formData.append(key, data[key]);
			}
		});

		const response = await api.post("/auth/signup", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === 201) {
			dispatch(login(response.data.user));
			navigate("/chat");
		}
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<form onSubmit={handleSubmit(onSubmit)} className="w-[35vw] bg-zinc-900 rounded-xl p-8">
				<h1 className="text-xl font-medium text-zinc-300">Create a new account</h1>
				<div className="mt-8 flex flex-col gap-4">
					<InputField register={register} errors={errors} registerName="fullName" label="Full Name" placeholder="Enter your full name" />
					<InputField register={register} errors={errors} registerName="email" label="Email" placeholder="Enter your email" />
					<InputField register={register} errors={errors} registerName="password" label="Password" placeholder="Enter password" inputType="password" />
					<InputField register={register} errors={errors} registerName="profilePicture" label="Profile Picture" inputType="file" />
				</div>
				<button className="mt-5 text-lg font-medium bg-blue-500/60 px-10 py-3.5 rounded-2xl">Signup</button>
			</form>
		</div>
	);
};

export default SignupPage;
