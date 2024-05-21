import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class DeleteStaffService {
  static async deleteStaff(staffId) {
    try {
      const response = await axios.post(ApiConstants.deleteStaffUrl, {
        userId: staffId,
      });
      console.log("deleted Successfully..");
      return response.data.token;
    } catch (error) {
      throw new Error("Delete Failed ", error);
    }
  }
}

export default DeleteStaffService;
