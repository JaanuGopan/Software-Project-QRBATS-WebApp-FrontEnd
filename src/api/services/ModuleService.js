import axios from 'axios';

class ModuleService {
  static getModulesByUserId = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/module/get-module-by-lecturerId/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Fail to get modules. ' + error);
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
    try {
      const response = await axios.post('/api/v1/module/create-module', {
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleEnrolmentKey: moduleEnrolmentKey,
        semester: semester,
        departmentId: departmentId,
        userId: userId,
      });
      return response;
    } catch (error) {
      console.error('Fail to create modules. ' + error);
      if (error.response.status === 400) {
        console.error('Error Response is ', error.response);
        return error.response;
      }
    }
  };

  static updateModule = async (
    moduleId,
    moduleCode,
    moduleName,
    moduleEnrolmentKey,
    semester,
    departmentId,
    userId
  ) => {
    try {
      const response = await axios.put('/api/v1/module/update-module', {
        moduleId: moduleId,
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleEnrolmentKey: moduleEnrolmentKey,
        semester: semester,
        departmentId: departmentId,
        lectureId: userId,
      });
      return response;
    } catch (error) {
      console.error('Error In Updating Module.', error);
      if (error.response.status === 400) {
        console.error('Error Response is ', error.response);
        return error.response;
      }
    }
  };

  static deleteModuleById = async (moduleId) => {
    try {
      const response = await axios.delete(`/api/v1/module/delete-module/${moduleId}`);
      return response;
    } catch (error) {
      console.error('fail to delete module : ' + error);
      return error.response.data;
    }
  };

  static getAllModulesByDepartmentId = async (departmentId) => {
    try {
      const response = await axios.get(
        `/api/v1/module/get-all-module-by-departmentId/${departmentId}`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.error('Error in getting modules ' + e);
    }
  };
}

export default ModuleService;
