class ApiConstants {
  static get baseIpUrl() {
    return "localhost";
  }
  static get baseUrl() {
    return "http://" + ApiConstants.baseIpUrl + ":8080/api/v1"; // "http://localhost:8080";
  }
  static get loginUrl() {
    return ApiConstants.baseUrl + "/auth/signin"; //http://localhost:8080/api/v1/auth/signin
  }
  static get signupUrl() {
    return ApiConstants.baseUrl + "/auth/signup";
  }
  static get createEventUrl() {
    return ApiConstants.baseUrl + "/event/create"; //http://localhost:8080/api/v1/event/create
  }
  static get getAllEventUrl() {
    return ApiConstants.baseUrl + "/event/getallevents"; //http://localhost:8080/api/v1/event/getallevents
  }
  static get deleteEventUrl() {
    return ApiConstants.baseUrl + "/event/deletebyid"; //http://localhost:8080/api/v1/event/deletebyid
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
