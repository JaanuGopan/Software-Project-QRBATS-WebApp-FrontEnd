// FetchEventsService.js
import axios from "axios";

class FetchAttendanceByEventIdService {
  static async fetchAttendance(eventId) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/attendance/getallattendancebyeventid",
        {
          eventId: eventId,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default FetchAttendanceByEventIdService;
