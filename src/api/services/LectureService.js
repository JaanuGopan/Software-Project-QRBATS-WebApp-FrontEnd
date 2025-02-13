import axios from 'axios';

class LectureService {
  static createLecture = async (requestData) => {
    try {
      console.log(requestData);

      const response = await axios.post('/api/v1/lecture/create-lecture', requestData);
      return response;
    } catch (error) {
      console.error('Fail to create lecture.', error);
      return error.response;
    }
  };

  static getAllLecturesByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture/get-all-lecture-by-userId?userId=${userId}`
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
    lectureModuleCode,
    lectureVenue,
    lectureDay,
    lectureStartTime,
    lectureEndTime
  ) => {
    try {
      const response = await axios.put(`/api/v1/lecture/update-lecture/${lectureId}`, {
        lectureName: lectureName,
        lectureModuleCode: lectureModuleCode,
        lectureVenue: lectureVenue,
        lectureDay: lectureDay,
        lectureStartTime: lectureStartTime,
        lectureEndTime: lectureEndTime,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error('Fail to update lecture.', error.response.data);
      return error.response.data;
    }
  };

  static deleteLecture = async (lectureId) => {
    try {
      const response = await axios.delete(`/api/v1/lecture/delete-lecture/${lectureId}`);
      return response;
    } catch (error) {
      console.error('Error in Delete Lecture. ', error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static getAllLecturesByModuleCode = async (moduleCode) => {
    try {
      const response = await axios.get(
        `/api/v1/lecture/get-all-lecture-by-module-code?moduleCode=${moduleCode}`
      );
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return response.data;
      }
    } catch (error) {
      console.error('failed to fetch lectures by moduleCode. ', error);
    }
  };

  static async getAllLecturesByDayAndVenue(day, venue) {
    try {
      const response = await axios.get(
        `/api/v1/lecture/get-all-lectures-by-day-and-venue?venue=${venue}&day=${day}`
      );
      if (response.status === 200) {
        console.log(response.data);
        return response;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getAllLectureWithDateByLectureId(lectureId) {
    try {
      const response = await axios.get(
        `/api/v1/lecture-attendance/get-all-lecture-with-date-for-day-lecture/${lectureId}`
      );

      return response;
    } catch (error) {
      if (error.response.status === 400) {
        return error.response;
      }
    }
  }
}

export default LectureService;
