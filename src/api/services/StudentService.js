import axios from 'axios';

class StudentService {
  /* static getStudentsByDepartmentIdAndSemester = async (
    departmentId,
    semester
  ) => {
    const response = await axios.get(ApiConstants.getAllStudentsByDepartmentIdAndSemester + `?deptId=${departmentId}&sem=${semester}`
    )
      .then(() => {
        return response.data;
      })
      .catch((e) => {
        throw console.error(e);
      });
  }; */

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
      const response = await axios.post('/api/v1/mobile/createstudentbyadmin', {
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
      const response = await axios.post('/api/v1/mobile/getallstudents');
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  static async deleteStudent(studentId) {
    try {
      const response = await axios.delete(`/api/v1/mobile/deletestudentbystudentid?studentId=${studentId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error('Delete Failed ', error);
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
      const response = await axios.put('/api/v1/mobile/updatestudent', {
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
