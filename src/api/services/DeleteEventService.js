import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class DeleteEventService {
  static async deleteEvent(eventId) {
    try {
      const response = await axios.post(ApiConstants.deleteEventUrl, {
        eventId: eventId,
      });
      console.log("deleted Successfully..");
      return response.data.token;
    } catch (error) {
      throw new Error("Delete Failed ", error);
    }
  }
}

export default DeleteEventService;
