import axios from 'axios';

class CreateUserService {
  static async saveUser(firstName, lastName, email, password, userName, departmentId, role) {
    try {
      const response = await axios.post('/api/v1/auth/signup', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: userName,
        departmentId: departmentId,
        role: role,
      });
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

export default CreateUserService;
