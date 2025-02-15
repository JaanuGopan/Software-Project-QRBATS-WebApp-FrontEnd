import axios from 'axios';

class DeleteEventService {
  static async deleteEvent(eventId) {
    try {
      const response = await axios.post('/api/v1/event/delete-by-id', {
        eventId: eventId,
      });
      return response.data.token;
    } catch (error) {
      throw new Error('Delete Failed ', error);
    }
  }
}

export default DeleteEventService;
