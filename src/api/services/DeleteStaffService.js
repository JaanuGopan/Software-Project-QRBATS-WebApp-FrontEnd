import axios from "axios";

class DeleteStaffService {
  static async deleteStaff(staffId) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/deleteuserbyuserid",
        {
          userId: staffId,
        }
      );
      console.log("deleted Successfully..");
      return response.data.token;
    } catch (error) {
      throw new Error("Delete Failed ", error);
    }
  }
}

export default DeleteStaffService;
