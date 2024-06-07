import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class LectureService {
  static createLecture = async () => {};

  static getAllLecturesByUserId = async (userId) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllLecturesByUserId(userId)
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("get all lectures by userId failed:", error);
    }
  };

  static updateLecture = async (
    lectureId,
    lectureName,
    lectureModuleCode,
    lectureVenue,
    lectureDay,
    lectureStartTime,
    lectureEndTime
  ) => {
    try {
      const response = await axios.put(
        ApiConstants.updateLectureUrl(lectureId),
        {
          lectureName: lectureName,
          lectureModuleCode: lectureModuleCode,
          lectureVenue: lectureVenue,
          lectureDay: lectureDay,
          lectureStartTime: lectureStartTime,
          lectureEndTime: lectureEndTime,
        }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Fail to update lecture.", error.response.data);
      return error.response.data;
    }
  };

  static deleteLecture = async (lectureId) => {
    try {
      const response = await axios.delete(
        ApiConstants.deleteLectureUrl(lectureId)
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in Delete Lecture. ", error);
    }
  };

  static getAllLecturesByModuleCode = async (moduleCode) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllLectureByModuleCode(moduleCode)
      );
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return response.data;
      }
    } catch (error) {
      console.error("failed to fetch lectures by moduleCode. ", error);
    }
  };
}

export default LectureService;
