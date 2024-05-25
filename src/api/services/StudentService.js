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
}
