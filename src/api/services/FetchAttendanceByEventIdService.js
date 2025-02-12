import axios from 'axios';

class FetchAttendanceByEventIdService {
  static async fetchAttendance(eventId) {
    try {
      const response = await axios.get(`/api/v1/attendance/getallattendancebyeventid?eventId=${eventId}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  }
}

export default FetchAttendanceByEventIdService;
