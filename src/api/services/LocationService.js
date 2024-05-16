import axios from "axios";
import ApiConstants from "../config/ApiConstants";

class LocationService {
  static getAllLocationNames = async () => {
    try {
      const response = await axios.get(ApiConstants.getAllLocationNameUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error in fetching location names: ", error);
      throw error; // rethrow the error so that calling code can handle it
    }
  };
}

export default LocationService;
