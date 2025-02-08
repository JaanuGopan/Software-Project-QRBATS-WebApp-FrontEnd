import axios from 'axios';

class ModuleService {
  static getModulesByUserId = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/module/getmodulebylecturerid/${userId}`);
      return response.data;
    } catch (error) {
      console.log('Fail to get modules. ' + error);
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
      const response = await axios.post('/api/v1/module/createmodule', {
        moduleCode: moduleCode,
        moduleName: moduleName,
        moduleEnrolmentKey: moduleEnrolmentKey,
        semester: semester,
        departmentId: departmentId,
        userId: userId,
      });
      return response;
    } catch (error) {
      console.log('Fail to create modules. ' + error);
      if (error.response.status === 400) {
        console.log('Error Response is ', error.response);
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
      const response = await axios.put('/api/v1/module/updatemodule', {
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
        console.log('Error Response is ', error.response);
        return error.response;
      }
    }
  };

  static deleteModuleById = async (moduleId) => {
    try {
      const response = await axios.delete(`/api/v1/module/deletemodule/${moduleId}`);
      return response;
    } catch (error) {
      console.error('fail to delete module : ' + error);
      return error.response.data;
    }
  };

  static getAllModulesByDepartmentId = async (departmentId) => {
    try {
      const response = await axios.get(`/api/v1/module/getallmodulebydepartmentid/${departmentId}`);
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log('Error in getting modules ' + e);
    }
  };
}

export default ModuleService;
