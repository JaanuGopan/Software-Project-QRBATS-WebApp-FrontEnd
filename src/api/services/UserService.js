import axios from "axios";
import ApiConstants from "../config/ApiConstants";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import JwtService from "./JwtService";
class UserService {
  static verifyPassword = async (userName, password) => {
    try {
      const response = await axios.get(
        ApiConstants.verifyPasswordUrl(userName, password)
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("Fail to verify password. " + error);
    }
  };

  static async updateUser(
    userId,
    firstName,
    lastName,
    email,
    userName,
    password,
    departmentId
  ) {
    return await axios
      .put(ApiConstants.updateUserUrl, {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: password,
        departmentId: departmentId,
      })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 400) {
          return error.response;
        }
      });
  }

  static async loginUser(userName, password, dispatch) {
    try {
      const response = await axios.get(
        ApiConstants.loginUrl(userName, password)
      );
      if (response.status === 200) {
        if (response.data.token) {
          const decodedToken = JwtService.parseJwt(response.data.token);
          const loginUserName = decodedToken.sub;
          const loginUserFirstName = decodedToken.firstName;
          const loginUserLastName = decodedToken.lastName;
          const loginUserEmail = decodedToken.email;
          const loginUserRole = decodedToken.role;
          const loginUserId = decodedToken.userId;
          const loginUserDepartmentId = decodedToken.departmentId;
          localStorage.setItem("token", response.data.token);

          const userData = {
            token: response.data.token,
            userId: loginUserId,
            firstName: loginUserFirstName,
            lastName: loginUserLastName,
            email: loginUserEmail,
            role: loginUserRole,
            departmentId: loginUserDepartmentId,
            userName: loginUserName,
          };
          localStorage.setItem("user", JSON.stringify(userData));

          dispatch(
            login({
              token: response.data.token,
              userId: loginUserId,
              userName: loginUserName,
              firstName: loginUserFirstName,
              lastName: loginUserLastName,
              email: loginUserEmail,
              role: loginUserRole,
              departmentId: loginUserDepartmentId,
              loggedIn: true,
            })
          );
          return response;
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      return error.response;
    }
  }
}

export default UserService;
