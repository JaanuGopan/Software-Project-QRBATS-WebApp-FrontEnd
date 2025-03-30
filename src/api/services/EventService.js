import axios from 'axios';

class EventService {
  static async saveEvent(eventName, eventDate, eventStartTime, eventEndTime, locationId) {
    const response = await axios.post('/api/v1/lecture/create-single-lecture', {
      name: eventName,
      lectureDate: eventDate,
      lectureStartTime: eventStartTime,
      lectureEndTime: eventEndTime,
      locationId: locationId,
      lectureType: 'EVENT',
    });
    return response.data;
  }

  static async updateEvent(eventId, eventName, eventDate, eventTime, eventEndTime, eventVenue) {
    const response = await axios.put('/api/v1/lecture/update-single-lecture', {
      id: eventId,
      name: eventName,
      lectureDate: eventDate,
      lectureStartTime: eventTime,
      lectureEndTime: eventEndTime,
      locationId: eventVenue,
    });
    return response.data;
  }

  static async getEventByUserID() {
    const response = await axios.get(`/api/v1/lecture/get-all-event-for-user`);
    return response.data;
  }

  static async deleteEvent(eventId) {
    const response = await axios.delete(`/api/v1/lecture/delete-lecture?id=${eventId}`);
    return response.data;
  }
}

export default EventService;
