import { useDispatch } from "react-redux";
import { openCreateChatModel } from "../features/chatModel/chatModelSlice";

const useShowChatModel = () => {
	const dispatch = useDispatch();

	function showChatModel() {
		dispatch(openCreateChatModel());
	}

	return { showChatModel };
};

export default useShowChatModel;
