class ApiConstants {
  static get baseIpUrl() {
    return "localhost";
  }
  static get baseUrl() {
    return "http://" + ApiConstants.baseIpUrl + ":8080/api/v1"; // "http://localhost:8080";
  }
  static loginUrl(userName, password) {
    return (
      ApiConstants.baseUrl +
      `/auth/signin?userName=${userName}&password=${password}`
    ); //http://localhost:8080/api/v1/auth/signin
  }
  static get signupUrl() {
    return ApiConstants.baseUrl + "/auth/signup";
  }
  static verifyPasswordUrl(userName, password) {
    return (
      ApiConstants.baseUrl +
      `/auth/verifypassword?userName=${userName}&password=${password}`
    ); //localhost:8080/api/v1/auth/verifypassword?userName=----&password=----
  }
  static get createEventUrl() {
    return ApiConstants.baseUrl + "/event/create"; //http://localhost:8080/api/v1/event/create
  }
  static get getAllEventUrl() {
    return ApiConstants.baseUrl + "/event/getallevents"; //http://localhost:8080/api/v1/event/getallevents
  }
  static get deleteEventUrl() {
    return ApiConstants.baseUrl + "/event/deletebyid"; //http://localhost:8080/api/v1/event/deletebyid/{eventId}
  }
  static get getAllStaffUrl() {
    return ApiConstants.baseUrl + "/auth/getallstaffs"; //http://localhost:8080/api/v1/auth/getallstaffs
  }
  static get deleteStaffUrl() {
    return ApiConstants.baseUrl + "/auth/deleteuserbyuserid"; //http://localhost:8080/api/v1/auth/deleteuserbyuserid
  }
  static get getAttendanceByEventIdUrl() {
    return ApiConstants.baseUrl + "/attendance/getallattendancebyeventid"; //http://localhost:8080/api/v1/attendance/getallattendancebyeventid
  }
  static get getAllStudentUrl() {
    return ApiConstants.baseUrl + "/mobile/getallstudents"; //http://localhost:8080/api/v1/mobile/getallstudents
  }
  static get updateStudentUrl() {
    return ApiConstants.baseUrl + "/mobile/updatestudent"; //http://localhost:8080/api/v1/mobile/updatestudent
  }
  static get getAllEventByUserIdUrl() {
    return ApiConstants.baseUrl + "/event/geteventbyuserid"; //localhost:8080/api/v1/event/geteventbyuserid
  }

  static get getAllModulesByUserIdUrl() {
    return ApiConstants.baseUrl + "/module/getmodulebylecturerid"; //localhost:8080/api/v1/module/getmodulebylecturerid/{userid}
  }

  static get getAllLocationNameUrl() {
    return ApiConstants.baseUrl + "/location/getalllocationnames"; //localhost:8080/api/v1/location/getalllocationnames
  }

  static get createModuleUrl() {
    return ApiConstants.baseUrl + "/module/createmodule"; //localhost:8080/api/v1/module/createmodule
  }

  static get deleteModuleUrl() {
    return ApiConstants.baseUrl + "/module/deletemodule"; //localhost:8080/api/v1/module/deletemodule/{id}
  }

  static get getAllModulesByDepartmentId() {
    return ApiConstants.baseUrl + "/module/getallmodulebydepartmentid"; //localhost:8080/api/v1/module/getallmodulebydepartmentid/{departmentId}
  }

  static get getAllStudentsByDepartmentIdAndSemester() {
    return (
      ApiConstants.baseUrl + "/report/getallstudentsbydepartmentidandsemester"
    ); //localhost:8080/api/v1/report/getallstudentsbydepartmentidandsemester?deptId=2&sem=6
  }

  static get updateUserUrl() {
    return ApiConstants.baseUrl + "/auth/updateuser";
  }

  static get getDepartmentUrl() {
    return ApiConstants.baseUrl + "/department";
  }
  static get getDepartmentStaffUrl() {
    return ApiConstants.baseUrl + "/staff/department";
  }
  static get getDepartmentEventUrl() {
    return ApiConstants.baseUrl + "/event/department";
  }
}

export default ApiConstants;
