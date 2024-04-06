import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class SaveEventService {
  static async saveEvent(
    eventName,
    eventDate,
    eventValidDate,
    eventTime,
    eventEndTime,
    eventVenue,
    eventRole,
    eventModuleName,
    eventAssignedUserId
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
        eventModuleName: eventModuleName,
        eventAssignedUserId: eventAssignedUserId,
      });
      return response.data;
    } catch (error) {
      throw new Error("Event is not created.", error);
    }
  }
}

export default SaveEventService;
