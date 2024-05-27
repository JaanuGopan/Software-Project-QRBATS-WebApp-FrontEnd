import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class EventService {
  static async fetchEvents() {
    try {
      const response = await axios.post(ApiConstants.getAllEventUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  static async saveEvent(
    eventName,
    eventDate,
    eventValidDate,
    eventTime,
    eventEndTime,
    eventVenue,
    eventRole,
    moduleName,
    userId
  ) {
    try {
      const response = await axios.post(ApiConstants.createEventUrl, {
        eventName: eventName,
        eventDate: eventDate,
        eventValidDate: eventValidDate,
        eventTime: eventTime,
        eventEndTime: eventEndTime,
        eventVenue: eventVenue,
        eventRole: eventRole,
        eventModuleName: moduleName,
        eventAssignedUserId: userId,
      });
      return response.data;
    } catch (error) {
      console.error("Event creation failed", error);
    }
  }

  static async getEventByUserID(userId) {
    try {
      const response = await axios.get(
        ApiConstants.getAllEventByUserIdUrl + "/" + userId
      );
      return response.data;
    } catch (error) {
      console.log("Event Get Failed ", error);
    }
  }

  static async deleteEvent(eventId) {
    try {
      const response = await axios.delete(
        ApiConstants.deleteEventUrl + "/" + `${eventId}`
      );
      console.log("deleted Successfully..");
      return response.data.token;
    } catch (error) {
      throw new Error("Delete Failed ", error);
    }
  }
}

export default EventService;
