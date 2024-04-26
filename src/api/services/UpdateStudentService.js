import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class UpdateStudentServices {
  static async updateStudent(
    id,
    studentName,
    studentEmail,
    userName,
    departmentId
  ) {
    return await axios
      .put(ApiConstants.baseUrl + ApiConstants.updateStudentUrl, {
        id: id,
        studentName: studentName,
        studentEmail: studentEmail,
        userName: userName,
        departmentId: departmentId,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default UpdateStudentServices;
