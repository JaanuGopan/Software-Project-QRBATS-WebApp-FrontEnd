import axios from "axios";

class LoginService {
  static async loginUser(userName, password) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        {
          userName: userName,
          password: password,
        }
      );
      return response.data.token;
    } catch (error) {
      throw new Error("Login failed", error);
    }
  }
}

export default LoginService;