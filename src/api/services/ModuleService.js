import axios from 'axios';

class ModuleService {
  static getModulesByUserId = async () => {
    const response = await axios.get(`/api/v1/module/get-all-modules-for-user`);
    return response.data;
  };

  static saveModule = async (
    id,
    moduleCode,
    moduleName,
    moduleEnrolmentKey,
    semester,
    departmentId,
    studentBatch,
    statingDate,
    endingDate
  ) => {
    const response = await axios.post('/api/v1/module/save-module', {
      id: id || null,
      moduleCode: moduleCode,
      moduleName: moduleName,
      moduleEnrolmentKey: moduleEnrolmentKey,
      semester: semester,
      departmentId: departmentId,
      studentBatch: studentBatch,
      statingDate: statingDate,
      endingDate: endingDate,
    });
    return response;
  };

  static deleteModuleById = async (moduleId) => {
    const response = await axios.delete(`/api/v1/module/delete-module?moduleId=${moduleId}`);
    return response;
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
