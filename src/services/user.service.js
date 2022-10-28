import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://Adityas-MacBook-Pro.local:8080/api/v1/zone';

class UserService {
    getZone(zone) {
        return axios.get(API_URL, {
            params: { zone: zone },
            headers: authHeader()
        });
    }

    getZoneSummary(zone) {
        return axios.get(API_URL + '/summary', {
            params: { zone: zone },
            headers: authHeader()
        }).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    getAllZoneSummaries() {
        console.log("Auth header = ");
        return axios.get(API_URL + '/summary', {
                headers: authHeader()
            })
            // .then(response => {
            //     return response;
            // }).catch(error => {
            //     return error;
            // });
    }

    getParkingSpot(zone, slotNumber) {
        return axios.get(API_URL + '/parkingSpot', {
            params: {
                zone,
                slotNumber
            },
            headers: authHeader()
        });
    }

    assignCarToSpot(vehicle, zone, slotNumber) {
        return axios.put(API_URL + '/assign', vehicle, {
            params: {
                zone,
                slotNumber
            },
            headers: authHeader()
        });
    }
}

export default new UserService();