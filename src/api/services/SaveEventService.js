import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8080/api/v1/event/create",
        {
          eventName: eventName,
          eventDate: eventDate,
          eventValidDate: eventValidDate,
          eventTime: eventTime,
          eventEndTime: eventEndTime,
          eventVenue: eventVenue,
          eventRole: eventRole,
          eventModuleName: eventModuleName,
          eventAssignedUserId: eventAssignedUserId,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Event is not created.", error);
    }
  }
}

export default LoginService;
