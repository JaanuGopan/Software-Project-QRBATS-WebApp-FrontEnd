import { logout } from "../../redux/features/userSlice";

class Logout {
  static handleLogout = (dispatch, history) => {
    dispatch(logout());
    window.location.href = "/"; // Redirect to the home page after logout
  };
}

export default Logout;
