import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class FetchStaffService {
  static async fetchStaffs() {
    try {
      const response = await axios.post(ApiConstants.getAllStaffUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching staffs:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default FetchStaffService;
