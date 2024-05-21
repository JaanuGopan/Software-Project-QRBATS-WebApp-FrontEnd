// FetchEventsService.js
import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class FetchEventsService {
  static async fetchEvents() {
    try {
      const response = await axios.post(ApiConstants.getAllEventUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default FetchEventsService;
