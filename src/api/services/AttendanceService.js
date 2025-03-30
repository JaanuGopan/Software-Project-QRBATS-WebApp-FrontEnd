import axios from 'axios';

class AttendanceService {
  static getStudentsAttendanceDetails = async (moduleId) => {
    const response = await axios.get(
      `/api/v1/attendance/get-all-attendance-by-moduleId?moduleId=${moduleId}`
    );

    return response.data;
  };
}

export default AttendanceService;
