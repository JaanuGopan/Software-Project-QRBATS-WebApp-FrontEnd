// FetchEventsService.js
import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class FetchAttendanceByEventIdService {
  static async fetchAttendance(eventId) {
    try {
      const response = await axios.post(
        ApiConstants.getAttendanceByEventIdUrl,
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
