import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class CreateUserService {
  static async saveUser(
    firstName,
    lastName,
    email,
    password,
    userName,
    departmentId,
    role
  ) {
    const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
    const userRoleList = ["ADMIN", "LECTURER"];
    try {
      const response = await axios.post(ApiConstants.signupUrl, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: userName,
        departmentId: departmentId,
        role: role,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response.status === 400) {
        return error.response;
      }
    }
  }
}

export default CreateUserService;
