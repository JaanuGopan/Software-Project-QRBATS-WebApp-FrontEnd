import axios from 'axios';

class LocationService {
  static getAllLocationNames = async () => {
    try {
      const response = await axios.get('/api/v1/location/get-all-location-names');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default LocationService;
