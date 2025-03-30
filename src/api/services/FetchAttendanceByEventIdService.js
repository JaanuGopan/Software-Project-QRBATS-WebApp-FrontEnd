import axios from 'axios';

class FetchAttendanceByEventIdService {
  static async fetchEventAttendance(eventId) {
    const response = await axios.get(
      `/api/v1/attendance/get-all-attendance-for-event?eventId=${eventId}`
    );

    return response.data;
  }
}

export default FetchAttendanceByEventIdService;
