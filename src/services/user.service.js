import axios from 'axios';
import authHeader from './auth-header';
import {
    SERVICE_URL
} from '../config';

const API_URL = `${SERVICE_URL}/api/v1/zone`;
const VEHICLE_API_URL = `${SERVICE_URL}/api/v1/vehicle`;

class UserService {
    getZone(zone) {
        return axios.get(API_URL, {
            params: {
                zone: zone
            },
            headers: authHeader()
        });
    }

    getZoneSummary(zone) {
        return axios.get(API_URL + '/summary', {
            params: {
                zone: zone
            },
            headers: authHeader()
        }).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    getAllZoneSummaries() {
        return axios.get(API_URL + '/summary', {
            headers: authHeader()
        })
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

    assignCarToSpot(vehicle, spots) {
        var params = new URLSearchParams();
        for (const spot of spots) {
            params.append("spot", spot);
        }
        return axios({
            method: 'put',
            url: API_URL + '/assign',
            params,
            data: {
                ...vehicle
            },
            headers: authHeader()
        });
    }

    searchVehicles(searchterms) {
        return axios({
            method: 'put',
            url: VEHICLE_API_URL + '/search',
            headers: authHeader(),
            data: {
                ...searchterms
            }
        });
    }

    retrieveReleaseQueue() {
        return axios({
            method: 'get',
            url: VEHICLE_API_URL + '/releasequeue',
            headers: authHeader()
        });
    }

    releaseVehicle(zone, slotNumber, releasePayload) {
        return axios({
            method: 'put',
            url: API_URL + '/release',
            headers: authHeader(),
            params: {
                zone,
                slotNumber
            },
            data: {
                ...releasePayload
            }
        });
    }

    uploadReleaseDocument(vehicleId, file) {
        var imageParam = new FormData();
        imageParam.append("file", file);

        return axios.post(
            VEHICLE_API_URL + '/releasedocument',
            imageParam, {
                headers: {...authHeader(),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    vehicleId
                }
            }
        );
    }

    assignImageToVehicle(vehicleId, files) {
        var imageparams = new FormData();
        for (const file of files) {
            imageparams.append("file", file);
        }
        return axios.post(
            VEHICLE_API_URL + '/image',
            imageparams, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    vehicleId
                }
            }
        );
    }

    finalRelease(vehicleId) {
        return axios({
            method: 'put',
            url: VEHICLE_API_URL + '/finalrelease',
            params: {
                vehicleId
            },
            headers: {
                ...authHeader()
            }
        })
    }

    getUpcomingReleases() {
        return axios({
            method: 'get',
            url: API_URL + '/upcomingreleases',
            headers: {
                ...authHeader()
            },
        })
    }
}

export default new UserService();