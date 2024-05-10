import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class ModuleService {
  static getModulesByUserId = async (userId) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllModulesByUserIdUrl + `/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log("Fail to get modules. " + error);
    }
  };
}

export default ModuleService;
