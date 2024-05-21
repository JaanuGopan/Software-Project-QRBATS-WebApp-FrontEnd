import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class UpdateUserService {
    static async updateUser(user) {
        return await axios
            .put(ApiConstants.baseUrl + ApiConstants.updateUserUrl, user)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}