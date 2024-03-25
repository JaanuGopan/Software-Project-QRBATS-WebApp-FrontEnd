import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

class Logout {
  static handleLogout = (e) => {
    e.preventDefault();
    const dispatch = useDispatch();
    dispatch(logout());
  };
}
