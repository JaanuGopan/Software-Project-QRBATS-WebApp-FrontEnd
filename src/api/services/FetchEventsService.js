import axios from "axios";

class FetchEventsService {
  static async fetchEvents() {
    try {
      const response = await axios.post("/api/v1/event/getallevents");
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default FetchEventsService;
