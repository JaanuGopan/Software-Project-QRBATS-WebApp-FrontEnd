import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class GetAllStudentsService {
  static async getAllStudent() {
    try {
      const response = await axios.post(ApiConstants.getAllStudentUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error; // Re-throw the error to handle it in the component
    }
  }
}

export default GetAllStudentsService;
