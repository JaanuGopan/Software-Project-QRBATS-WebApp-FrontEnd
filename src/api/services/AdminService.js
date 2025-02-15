import axios from 'axios';

class AdminService {
  static async fetchStaffs() {
    try {
      const response = await axios.get('/api/v1/admin/get-all-staffs');
      return response.data;
    } catch (error) {
      console.error('Error fetching staffs:', error);
      throw error;
    }
  }
}

export default AdminService;
