import axios from 'axios';

class EventService {
  static async fetchEvents() {
    try {
      const response = await axios.post('/api/v1/event/get-all-events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
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
      const response = await axios.post('/api/v1/event/create', {
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
      console.error('Event creation failed', error);
      if (error.response.status === 400) {
        return error.response;
      }
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
      const response = await axios.put('/api/v1/event/update', {
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
      console.error('Event creation failed', error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  }

  static async getEventByUserID(userId) {
    try {
      const response = await axios.get(`/api/v1/event/get-event-by-userId?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.log('Event Get Failed ', error);
    }
  }

  static async deleteEvent(eventId) {
    try {
      const response = await axios.delete(`/api/v1/event/delete-by-eventId/${eventId}`);
      console.log('deleted Successfully..');
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
        `/api/v1/event/get-all-event-by-module-code?moduleCode=${moduleCode}`
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
