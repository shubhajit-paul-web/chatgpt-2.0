import PageLoader from "./components/PageLoader";
import useAuthenticateUser from "./hooks/useAuthenticateUser";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
	const isLoading = useAuthenticateUser();

	return isLoading ? <PageLoader /> : <AppRoutes />;
};

export default App;
