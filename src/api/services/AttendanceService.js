import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class AttendanceService {
  static getAllAttendanceByLectureId = async (lectureId) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllLectureAttendanceByLectureIdUrl(lectureId)
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(
        "Error in getting attendance for this lecture. ",
        error.response
      );
    }
  };

  static downloadLectureAttendance = async (lectureId) => {
    try {
      const response = await axios.get(
        ApiConstants.downloadLectureAttendanceByLectureIdUrl(lectureId)
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Error in getting attendance for this lecture. ", error);
      return error.response;
    }
  };
  static downloadEventAttendance = async (eventId) => {
    try {
      const response = await axios.get(
        ApiConstants.downloadEventAttendanceByEventIdUrl(eventId)
      );
      return response;
    } catch (error) {
      console.error("Error in getting attendance for this lecture. ", error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static getStudentsAttendanceDetails = async (moduleId) => {
    try {
      const response = await axios.get(
        ApiConstants.getStudentAttendanceDetails(moduleId)
      );

      return response;
    } catch (error) {
      console.error("Error in getting students attendance details", error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static getAllAttendanceByLectureIdAndDate = async (lectureId, date) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllLectureAttendanceByLectureIdAndDateUrl(
          lectureId,
          date
        )
      );
      return response;
    } catch (error) {
      console.error(
        "Error in getting attendance for this lecture. ",
        error.response.data
      );
      return error.response;
    }
  };

  static downloadLectureAttendanceByLectureIdAndDate = async (
    lectureId,
    date
  ) => {
    try {
      const response = await axios.get(
        ApiConstants.downloadLectureAttendanceByLectureIdAndDateUrl(
          lectureId,
          date
        )
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Error in getting attendance for this lecture. ", error);
      return error.response;
    }
  };
}

export default AttendanceService;
