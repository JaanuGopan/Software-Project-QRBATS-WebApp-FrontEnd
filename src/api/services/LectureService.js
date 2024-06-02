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
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Fail to update lecture.", error);
    }
  };
}

export default LectureService;
