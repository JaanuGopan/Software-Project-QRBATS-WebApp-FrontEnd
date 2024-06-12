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

  static createModule = async (
    moduleCode,
    moduleName,
    moduleEnrolmentKey,
    semester,
    departmentId,
    userId
  ) => {
    const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];

    try {
      const response = await axios.post(ApiConstants.createModuleUrl, {
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleEnrolmentKey: moduleEnrolmentKey,
        semester: semester,
        departmentId: departmentId,
        userId: userId,
      });
      return response;
    } catch (error) {
      console.log("Fail to create modules. " + error);
      return error.response.data;
    }
  };

  static deleteModuleById = async (moduleId) => {
    try {
      const response = await axios.delete(
        ApiConstants.deleteModuleUrl + "/" + `${moduleId}`
      );
      return response;
    } catch (error) {
      console.error("fail to delete module : " + error);
      return error.response.data;
    }
  };

  static getAllModulesByDepartmentId = async (departmentId) => {
    try {
      const response = await axios.get(
        ApiConstants.getAllModulesByDepartmentId + "/" + `${departmentId}`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log("Error in getting modules " + e);
    }
  };
}

export default ModuleService;
