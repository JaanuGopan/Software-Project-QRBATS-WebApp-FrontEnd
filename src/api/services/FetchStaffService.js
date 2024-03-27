import axios from "axios";

class FetchStaffService {
  static async fetchStaffs() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/getallstaffs"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching staffs:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default FetchStaffService;
