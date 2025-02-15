import axios from 'axios';

class StudentService {
  static createStudentByAdmin = async (
    studentName,
    indexNumber,
    studentEmail,
    userName,
    password,
    currentSemester,
    departmentId,
    userRole
  ) => {
    try {
      const response = await axios.post('/api/v1/auth/signup', {
        firstName: studentName,
        indexNumber,
        email: studentEmail,
        userName,
        password,
        semester: currentSemester,
        departmentId,
        role: userRole,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      return error?.response?.data;
    }
  };

  static async getAllStudent() {
    try {
      const response = await axios.get('/api/v1/admin/get-all-students');
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
      const response = await axios.delete(`/api/v1/admin/delete-user?userId=${studentId}`);
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
    semester,
    StudentRole
  ) {
    try {
      const response = await axios.put('/api/v1/auth/update-user', {
        userId: id,
        firstName: studentName,
        indexNumber: indexNo,
        email: studentEmail,
        userName: userName,
        departmentId: departmentId,
        semester: semester,
        role: StudentRole,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      return error.response;
    }
  }
}

export default StudentService;
