import axios from 'axios';

class LocationService {
  static getAllLocationNames = async () => {
    try {
      const response = await axios.get('/api/v1/location/getalllocationnames');
      return response.data;
    } catch (error) {
      console.log('Error in fetching location names: ', error);
      throw error;
    }
  };
}

export default LocationService;
