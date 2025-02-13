import axios from 'axios';
import JwtService from './JwtService';
class UserService {
  static verifyPassword = async (userName, password) => {
    try {
      const response = await axios.get(
        `/api/v1/auth/verifypassword?userName=${userName}&password=${password}`
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log('Fail to verify password. ' + error);
    }
  };

  static async updateUser(userId, firstName, lastName, email, userName, password, departmentId) {
    try {
      const response = await axios.put('/api/v1/auth/update-user', {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: password ? password : null,
        departmentId: departmentId,
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

  static sendOtp = async (email) => {
    try {
      const response = await axios.post(`/api/v1/auth/forgot-password-send-otp?email=${email}`);
      if (response.status === 200) {
        if (response.data === true) {
          return response;
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static verifyOtp = async (email, otp) => {
    try {
      const response = await axios.get(
        `/api/v1/auth/forgot-password-verify-otp?email=${email}&otp=${otp}`
      );
      if (response.status === 200) {
        if (response.data === true) {
          return response;
        }
      }
    } catch (error) {
      console.log('Fail to verify password. ' + error);
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };

  static resetPassword = async (email, password, userName) => {
    try {
      const response = await axios.put(
        `/api/v1/auth/forgot-password-reset-password?email=${email}&password=${password}&userName=${userName}`
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error.response.status === 400) {
        return error.response;
      }
    }
  };
}

export default UserService;
