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
        error.response.data
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
      return error.response.data;
    }
  };
}

export default AttendanceService;
