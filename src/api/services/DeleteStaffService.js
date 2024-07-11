import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class DeleteStaffService {
  static async deleteStaff(staffId) {
    try {
      const response = await axios.post(ApiConstants.deleteStaffUrl, {
        userId: staffId,
      });
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
}

export default DeleteStaffService;
