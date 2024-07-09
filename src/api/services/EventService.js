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
        eventTime: eventTime,
        eventEndTime: eventEndTime,
        eventVenue: eventVenue,
        eventRole: eventRole,
        eventModuleName: moduleName,
        eventAssignedUserId: userId,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Event creation failed", error);
      if (error.response.status === 400) {
        return error.response;
      }
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

  static async updateEvent(
    eventId,
    eventName,
    eventDate,
    eventTime,
    eventEndTime,
    eventVenue,
    eventRole,
    moduleName,
    userId
  ) {
    try {
      const response = await axios.put(ApiConstants.updateEventUrl, {
        eventId: eventId,
        eventName: eventName,
        eventDate: eventDate,
        eventTime: eventTime,
        eventEndTime: eventEndTime,
        eventVenue: eventVenue,
        eventRole: eventRole,
        eventModuleName: moduleName,
        eventAssignedUserId: userId,
      });

      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.error("Event creation failed", error);
      if (error.response.status === 400) {
        return error.response;
      }
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
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response.status === 400) {
        return error.response;
      }
    }
  }

  static async getAllLectureByModuleCode(moduleCode) {
    try {
      const response = await axios.get(
        ApiConstants.getAllLecturesByModuleCode(moduleCode)
      );
      if (response.data) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default EventService;
