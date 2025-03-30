import axios from 'axios';

class LectureService {
  static createSingleLecture = async (requestData) => {
    const response = await axios.post('/api/v1/lecture/create-single-lecture', requestData);
    return response.data;
  };

  static getAllLecturesByUserId = async () => {
    try {
      const response = await axios.get(`/api/v1/lecture/get-all-lecture-for-user`);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('get all lectures by userId failed:', error);
    }
  };

  static getAllLecturesByModuleIdAndUserId = async (moduleId) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture/get-all-lecture-for-user-by-moduleId?moduleId=${moduleId}`
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error('get all lectures by userId failed:', error);
    }
  };

  static updateLecture = async (
    lectureId,
    lectureName,
    locationId,
    lectureDate,
    lectureStartTime,
    lectureEndTime
  ) => {
    const response = await axios.put(`/api/v1/lecture/update-single-lecture`, {
      id: lectureId,
      name: lectureName,
      locationId: locationId,
      lectureDate: lectureDate,
      lectureStartTime: lectureStartTime,
      lectureEndTime: lectureEndTime,
    });
    if (response.data) {
      return response.data;
    }
  };

  static deleteLecture = async (lectureId) => {
    const response = await axios.delete(`/api/v1/lecture/delete-lecture?id=${lectureId}`);
    return response.data;
  };

  static getAllFinishedLecturesByModuleId = async (moduleId) => {
    const response = await axios.get(
      `/api/v1/lecture/get-all-finished-lecture-for-user-by-moduleId?moduleId=${moduleId}`
    );
    return response.data;
  };

  static async getAllLecturesByDayAndVenue(day, venue) {
    try {
      const response = await axios.get(
        `/api/v1/lecture/get-all-lectures-by-day-and-venue?venue=${venue}&day=${day}`
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getLectureReportByLectureId(lectureId) {
    const response = await axios.get(
      `/api/v1/attendance/get-all-attendance-by-lectureId?lectureId=${lectureId}`
    );
    return response.data;
  }
}

export default LectureService;
