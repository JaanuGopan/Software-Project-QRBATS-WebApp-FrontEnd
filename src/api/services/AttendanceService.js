import axios from 'axios';

class AttendanceService {
  static getAllAttendanceByLectureId = async (lectureId) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture-attendance/get-all-attendance-by-lectureId/${lectureId}`
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error('Error in getting attendance for this lecture. ', error.response);
    }
  };

  static downloadLectureAttendance = async (lectureId) => {
    try {
      const response = await axios.get(`/api/v1/export/get-csv/${lectureId}`);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error('Error in getting attendance for this lecture. ', error);
      return error.response;
    }
  };
  static downloadEventAttendance = async (eventId) => {
    try {
      const response = await axios.get(`/api/v1/export/get-event-report/${eventId}`);
      return response;
    } catch (error) {
      console.error('Error in getting attendance for this lecture. ', error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static getStudentsAttendanceDetails = async (moduleId) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture-attendance/get-all-student-attendance-by-moduleId/${moduleId}`
      );

      return response;
    } catch (error) {
      console.error('Error in getting students attendance details', error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static getAllAttendanceByLectureIdAndDate = async (lectureId, date) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture-attendance/get-all-attendance-by-lectureId-and-date?lectureId=${lectureId}&date=${date}`
      );
      return response;
    } catch (error) {
      console.error('Error in getting attendance for this lecture. ', error.response.data);
      return error.response;
    }
  };

  static downloadLectureAttendanceByLectureIdAndDate = async (lectureId, date) => {
    try {
      const response = await axios.get(
        `/api/v1/export/download-attendance-by-lectureId-and-date?lectureId=${lectureId}&date=${date}`
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error('Error in getting attendance for this lecture. ', error);
      return error.response;
    }
  };

  static downloadOverallStudentReportByModuleId = async (moduleId) => {
    try {
      const response = await axios.get(`/api/v1/export/get-students-overall-report/${moduleId}`);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error('Error In Getting Overall Student Report For This Module. ', error);
      return error.response;
    }
  };
}

export default AttendanceService;
