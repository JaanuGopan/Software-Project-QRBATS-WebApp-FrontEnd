class ApiConstants {
  static get baseUrl() {
    return "http://localhost:8080/api/v1";
  }
  static get loginUrl() {
    return ApiConstants.baseUrl + "/auth/signin";
  }
  static get signupUrl() {
    return ApiConstants.baseUrl + "/auth/signup";
  }
  static get createEventUrl() {
    return ApiConstants.baseUrl + "/auth/create";
  }
  static get getEventUrl() {
    return ApiConstants.baseUrl + "/event";
  }
  static get getStaffUrl() {
    return ApiConstants.baseUrl + "/staff";
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
