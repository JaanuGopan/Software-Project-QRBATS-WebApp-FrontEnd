import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

const UserDetails = () => {
  const user = useSelector(selectUser);
  const { userId } = user || {};

  const getUserId = () => {
    return userId;
  };
};

export default UserDetails;
