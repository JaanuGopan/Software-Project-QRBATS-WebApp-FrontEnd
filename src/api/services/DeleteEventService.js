import axios from 'axios';

class DeleteEventService {
  static async deleteEvent(eventId) {
    try {
      const response = await axios.post('/api/v1/event/deletebyid', {
        eventId: eventId,
      });
      console.log('deleted Successfully..');
      return response.data.token;
    } catch (error) {
      throw new Error('Delete Failed ', error);
    }
  }
}

export default DeleteEventService;
