import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class StudentService {
  static getStudentsByDepartmentIdAndSemester = async (
    departmentId,
    semester
  ) => {
    const response = await fetch(
      ApiConstants.getAllStudentsByDepartmentIdAndSemester +
        `?deptId=${departmentId}&sem=${semester}`
    )
      .then(() => {
        return response.json;
      })
      .catch((e) => {
        throw console.error(e);
      });
  };

  static createStudentByAdmin = async (
    studentId,
    studentName,
    indexNumber,
    studentEmail,
    userName,
    password,
    currentSemester,
    departmentId
  ) => {
    try {
      const response = await axios.post(ApiConstants.createStudentByAdminUrl, {
        studentId,
        studentName,
        indexNumber,
        studentEmail,
        userName,
        password,
        currentSemester,
        departmentId,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };

  static async getAllStudent() {
    try {
      const response = await axios.post(ApiConstants.getAllStudentUrl);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  static async deleteStudent(studentId) {
    try {
      const response = await axios.delete(
        ApiConstants.deleteStudentUrl(studentId)
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Delete Failed ", error);
    }
  }

  static async updateStudent(
    id,
    studentName,
    indexNo,
    studentEmail,
    userName,
    departmentId,
    semester
  ) {
    try {
      const response = await axios.put(ApiConstants.updateStudentUrl, {
        id: id,
        studentName: studentName,
        indexNumber: indexNo,
        studentEmail: studentEmail,
        userName: userName,
        departmentId: departmentId,
        currentSemester: semester,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      //throw new Error("Update Failed ", error);
      return error.response;
    }
  }
}

export default StudentService;
