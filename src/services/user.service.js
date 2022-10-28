import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://Adityas-MacBook-Pro.local:8080/api/v1/zone';
const VEHICLE_API_URL = 'http://Adityas-MacBook-Pro.local:8080/api/v1/vehicle';

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

    searchVehicles(searchterms) {
        return axios.get(VEHICLE_API_URL + '/search', {
            params: {...searchterms },
            headers: authHeader()
        });
    }

    releaseVehicle(zone, slotNumber) {
        return axios({
            method: 'put',
            url: API_URL + '/release',
            headers: authHeader(),
            params: {
                zone,
                slotNumber
            }
        });
    }
}

export default new UserService();