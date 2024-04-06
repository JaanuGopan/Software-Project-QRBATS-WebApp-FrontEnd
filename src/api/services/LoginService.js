import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class LoginService {
  static async loginUser(userName, password) {
    try {
      const response = await axios.post(ApiConstants.loginUrl, {
        userName: userName,
        password: password,
      });
      return response.data.token;
    } catch (error) {
      throw new Error("Login failed", error);
    }
  }
}

export default LoginService;
