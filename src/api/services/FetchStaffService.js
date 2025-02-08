import axios from 'axios';

class FetchStaffService {
  static async fetchStaffs() {
    try {
      const response = await axios.post('/api/v1/auth/getallstaffs');
      return response.data;
    } catch (error) {
      console.error('Error fetching staffs:', error);
      throw error;
    }
  }
}

export default FetchStaffService;
