class ApiConstants {
  static get hostedBaseIpUrl() {
    return "intelligent-creation-skyticker-backend-8761.up.railway.app";
  }
  static get baseIpUrl() {
    return "localhost:8082";
  }
  static get awsBaseIpUrl() {
    return "13.51.170.30:8082";
  }
  static get baseUrl() {
    return "http://" + ApiConstants.baseIpUrl + "/api/v1"; // "http://localhost:8080";
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
  static get updateEventUrl() {
    return ApiConstants.baseUrl + "/event/update"; //http://localhost:8080/api/v1/event/update
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
  static getAttendanceByEventIdUrl(eventId) {
    return (
      ApiConstants.baseUrl + `/attendance/getallattendancebyeventid/${eventId}`
    ); //http://localhost:8080/api/v1/attendance/getallattendancebyeventid
  }
  static get getAllStudentUrl() {
    return ApiConstants.baseUrl + "/mobile/getallstudents"; //http://localhost:8080/api/v1/mobile/getallstudents
  }
  static deleteStudentUrl(studentId) {
    return (
      ApiConstants.baseUrl + `/mobile/deletestudentbystudentid/${studentId}`
    ); //http://localhost:8080/api/v1/mobile/deletestudentbystudentid
  }
  static get updateStudentUrl() {
    return ApiConstants.baseUrl + "/mobile/updatestudent"; //http://localhost:8080/api/v1/mobile/updatestudent
  }
  static get getAllEventByUserIdUrl() {
    return ApiConstants.baseUrl + "/event/geteventbyuserid"; //localhost:8080/api/v1/event/geteventbyuserid
  }
  static getAllLecturesByModuleCode(moduleCode) {
    return (
      ApiConstants.baseUrl +
      `/event/getalleventbymodulecode?moduleCode=${moduleCode}`
    ); //localhost:8080/api/v1/event/getalleventbymodulecode?moduleCode=EE1234
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
  static get updateModuleUrl() {
    return ApiConstants.baseUrl + "/module/updatemodule"; //localhost:8080/api/v1/module/updatemodule
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

  static get createLectureUrl() {
    return ApiConstants.baseUrl + "/lecture/createlecture"; //http://localhost:8080/api/v1/lecture/createlecture
  }

  static getAllLecturesByUserId(userId) {
    return ApiConstants.baseUrl + `/lecture/getalllecturebyuserid/${userId}`; //http://localhost:8080/api/v1/lecture/getalllecturebyuserid/{id}
  }

  static updateLectureUrl(lectureId) {
    return ApiConstants.baseUrl + `/lecture/updatelecture/${lectureId}`; //http://localhost:8080/api/v1/lecture/updatelecture/${lectureId}
  }

  static deleteLectureUrl(lectureId) {
    return ApiConstants.baseUrl + `/lecture/deletelecture/${lectureId}`; //http://lecalhost:8080/api/v1/lecture/deletelecture/${lectureId}
  }

  static getAllLectureByModuleCode(moduleCode) {
    return (
      ApiConstants.baseUrl +
      `/lecture/getalllecturebymodulecode?moduleCode=${moduleCode}`
    );
  }

  static getAllLectureAttendanceByLectureIdUrl(lectureId) {
    return (
      ApiConstants.baseUrl +
      `/lectureattendance/getallattendancebylectureid/${lectureId}`
    );
  }
  static getAllLectureAttendanceByLectureIdAndDateUrl(lectureId, date) {
    return (
      ApiConstants.baseUrl +
      `/lectureattendance/getallattendancebylectureidanddate?lectureId=${lectureId}&date=${date}`
    );
  }
  static downloadLectureAttendanceByLectureIdUrl(lectureId) {
    return ApiConstants.baseUrl + `/export/getcsv/${lectureId}`;
  }
  static downloadLectureAttendanceByLectureIdAndDateUrl(lectureId, date) {
    return (
      ApiConstants.baseUrl +
      `/export/donwloadattendancebylectureidanddate?lectureId=${lectureId}&date=${date}`
    );
  }

  static downloadOverallStudentReportByModuleIdUrl(moduleId) {
    return (
      ApiConstants.baseUrl + `/export/getstudentsoverallreport/${moduleId}`
    );
  }
  static downloadEventAttendanceByEventIdUrl(eventId) {
    return ApiConstants.baseUrl + `/export/geteventreport/${eventId}`;
  }

  static getAllLectureByDayAndVenueUrl(day, venue) {
    return (
      ApiConstants.baseUrl +
      `/lecture/getalllecturesbydayandvenue?venue=${venue}&day=${day}`
    );
  }

  static get createStudentByAdminUrl() {
    return ApiConstants.baseUrl + "/mobile/createstudentbyadmin"; //http://lecalhost:8080/api/v1/mobile/createstudentbyadmin
  }

  static getStudentAttendanceDetails(moduleId) {
    return (
      ApiConstants.baseUrl +
      `/lectureattendance/getallstudentattendancebymoduleId/${moduleId}`
    );
  }

  static getAllLectureWithDateList(lectureId) {
    return (
      ApiConstants.baseUrl +
      `/lectureattendance/getalllecturewithdatefordaylecture/${lectureId}`
    );
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
