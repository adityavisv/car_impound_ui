import dayjs from 'dayjs';
import {
    makeModelData
} from '../newcardb';

import {
    parkingSlotNumberMap
} from '../parkingSlotMap';

export const getAllModelsByMake = (make) => {
    const makeModelObjectsByMake = makeModelData.filter((element) => (
        element.brand === make
    ));
    const onlyModelArray = makeModelObjectsByMake.map((element) => (element.model));
    return onlyModelArray;
}

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {
        type: contentType
    });
    return blob;
}

export const generateFileObjectsFromData = (fileDataArray) => {
    let fileObjArray = [];
    for (const file of fileDataArray) {
        var fileContentBlob = b64toBlob(file.base64EncodedBlob);
        var fileObj = new File([fileContentBlob], "filename", {
            type: file.contentType
        });
        fileObjArray.push(fileObj);
    }
    return fileObjArray;
}

export const translateColor = (t, colorInEnglish) => {
    switch(colorInEnglish) {
        case "RED":
            return t("car_registration_form_color_dropdown_red");
        case "YELLOW":
            return t("car_registration_form_color_dropdown_yellow");
        case "GREEN":
            return t("car_registration_form_color_dropdown_green");
        case "BLUE":
            return t("car_registration_form_color_dropdown_blue");
        case "BLACK":
            return t("car_registration_form_color_dropdown_black");
        case "WHITE":
            return t("car_registration_form_color_dropdown_white");
        case "PINK":
            return t("car_registration_form_color_dropdown_pink");
        case "GREY":
            return t("car_registration_form_color_dropdown_grey");
        case "SILVER":
            return t("car_registration_form_color_dropdown_silver");
        case "BROWN":
            return t("car_registration_form_color_dropdown_brown");
        default:
            return colorInEnglish;
    }
}

export const translateEmirate = (t, emirateInEnglish) => {
    switch(emirateInEnglish) {
        case "ABU_DHABI":
            return t("car_registration_form_emirate_dropdown_abu_dhabi");
        case "AJMAN":
            return t("car_registration_form_emirate_dropdown_ajman");
        case "DUBAI":
            return t("car_registration_form_emirate_dropdown_dubai");
        case "FUJAIRAH":
            return t("car_registration_form_emirate_dropdown_fujairah");
        case "RAS_AL_KHAYMAH":
            return t("car_registration_form_emirate_dropdown_ras_al_khaymah");
        case "SHARJAH":
            return t("car_registration_form_emirate_dropdown_sharjah");
        case "UMM_AL_QUWAIN":
            return t("car_registration_form_emirate_dropdown_umm_al_quwain");
        default:
            return emirateInEnglish;

    }
}

export const translateStatus = (t, statusValue) => {
    switch(statusValue) {
        case "APPROVED_FOR_RELEASE":
            return t("search_page_form_status_dropdown_approved_for_release");
        case "REGISTERED":
            return t("search_page_form_status_dropdown_registered");
        case "RELEASED":
            return t("search_page_form_status_dropdown_released");
    }
}

export const translateIsWanted = (t, wantedValue) => {
    return wantedValue ? t("car_registration_form_wanted_dropdown_yes") : t("car_registration_form_wanted_dropdown_no");
}

export const translateVehicleType = (t, vehicleType) => {
    switch(vehicleType) {
        case "CAR":
            return t("car_registration_form_type_dropdown_car");
        case "MOTORCYCLE":
            return t( "car_registration_form_type_dropdown_motorcycle");
        case "TRUCK":
            return t("car_registration_form_type_dropdown_truck");
        default:
            return vehicleType;
    }
}


export const getDateTimeString = (dateValue) => {
    if (dateValue !== '' && dateValue !== null) {
        const parsedDate = dayjs(dateValue, 'YYYY-MM-DD HH:mm');
        return parsedDate.format('DD/MM/YYYY HH:mm');
    }
}

export const getDateString = (dateValue) => {
    if (dateValue !== '' && dateValue !== null) {
        const parsedDate = dayjs(dateValue, 'YYYY-MM-DD');
        return parsedDate.format('DD/MM/YYYY');
    }
}

export const convertResultsToCsv = (resultsArray) => {
    const headerArray = ['Parking Slot', 'Registration Date/Time', 'Status', 'Make', 'Model', 'Colour', 'Vehicle Type', 'Emirate', 'Category', 'Code', 'Number Plate',
        'Chassis Number', 'Department', 'Is Wanted?', 'Case Number', 'Owner First Name', 'Owner Last Name', 'Owner Nationality', 'Owner Contact Number', 'Owner Email ID',
        'Owner ID Type', 'Owner ID Number', 'Release Identity First Name', 'Release Identity Last Name', 'Release Identity Nationality', 'Release Identity Contact Number',
        'Release Identity Email ID', 'Release Identity ID Type', 'Release Identity ID Number', 'Estimated Release Date', 'Release Date/Time'
    ];
    var csvStr = headerArray.join(',');
    for (let resultObj of resultsArray) {
        if (resultObj.releaseIdentity === null)
            resultObj.releaseIdentity = {};
        const {
            make,
            model,
            type,
            vehicleStatus,
            registrationDateTime,
            estimatedReleaseDate,
            caseNumber,
            chassisNumber,
            color,
            parkingSlot,
            isWanted,
            numberPlate,
            owner: {
                idType: ownerIdType,
                firstName: ownerFirstName,
                lastName: ownerLastName,
                emailAddress: ownerEmailAddress,
                idNumber: ownerIdNumber,
                contactNumber: ownerContactNumber,
                nationality: ownerNationality,
            } = {},
            department,
            emirate,
            category,
            code,
            releaseIdentity: {
                firstName: releaseIdentityFirstName = '',
                lastName: releaseIdentityLastName = '',
                idType: releaseIdentityIdType = '',
                idNumber: releaseIdentityIdNumber = '',
                contactNumber: releaseIdentityContactNumber = '',
                emailAddress: releaseIdentityEmailAddress = '',
                nationality: releaseIdentityNationality = '',
                releaseDateTime = ''
            } = {}
        } = resultObj;
        const entryLine = `\r\n${parkingSlot !== null ? parkingSlot : ''}, ${registrationDateTime}, ${vehicleStatus}, ${make}, ${model}, ${color}, ${type}, ${emirate}, ${category}, ${code}, ${numberPlate}, ${chassisNumber !== null ? chassisNumber : ''}, ${department}, ${isWanted ? 'Yes' : 'No'}, ${caseNumber !== null ? caseNumber : ''}, ${ownerFirstName !== null ? ownerFirstName : ''}, ${ownerLastName !== null ? ownerLastName : ''}, ${ownerNationality !== null ? ownerNationality : ''}, ${ownerContactNumber !== null ? ownerContactNumber : ''}, ${ownerEmailAddress !== null ? ownerEmailAddress : ''}, ${ownerIdType}, ${ownerIdNumber !== null ? ownerIdNumber : ''}, ${releaseIdentityFirstName !== null ? releaseIdentityFirstName : ''}, ${releaseIdentityLastName !== null ? releaseIdentityLastName : ''}, ${releaseIdentityNationality !== null ? releaseIdentityNationality : ''}, ${releaseIdentityContactNumber !== null ? releaseIdentityContactNumber : ''}, ${releaseIdentityEmailAddress !== null ? releaseIdentityEmailAddress : ''}, ${releaseIdentityIdType !== null ? releaseIdentityIdType : ''}, ${releaseIdentityIdNumber !== null ? releaseIdentityIdNumber : ''}, ${getDateString(estimatedReleaseDate)}, ${getDateTimeString(releaseDateTime)}`;
        csvStr += entryLine;
    }
    return csvStr;
}


export const getSlotsByZone = (zoneLabel) => {
    const zoneObj = parkingSlotNumberMap.filter((zone) => (zone.zoneLabel === zoneLabel));
    if (zoneObj.length > 0) {
        return Array.from(Array(zoneObj[0].count).keys());
    }
}

export const getVehicleStatusDisplay = (status) => {
    switch (status) {
        case 'APPROVED_FOR_RELEASE':
            return "Approved for release"
        case 'RELEASED':
            return "Released"
        case 'REGISTERED':
            return "Registered"
    }
}

export const getEmirateDisplay = (emirate) => {
    switch (emirate) {
        case "ABU_DHABI":
            return "Abu Dhabi"
        case "DUBAI":
            return "Dubai"
        case "FUJAIRAH":
            return "Fujairah"
        case "AJMAN":
            return "Ajman"
        case "RAS_AL_KHAYMAH":
            return "Ras Al Khaymah"
        case "UMM_AL_QUWAIN":
            return "Umm Al Quwain"
        case "SHARJAH":
            return "Sharjah"
    }
}

export const getAdjacentSpots = (spot) => {
    const {
        zoneLabel,
        slotNumber
    } = spot;
    switch (zoneLabel) {
        case 'A':
            {
                if (slotNumber === 28 || slotNumber === 56 || slotNumber === 88) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 29 || slotNumber === 57) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'B':
            {
                if (slotNumber === 34 || slotNumber === 71) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 35) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'C':
            {
                if (slotNumber === 37 || slotNumber === 75) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 38) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'D':
            {
                if (slotNumber === 39 || slotNumber === 84) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 40) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'E':
            {
                if (slotNumber === 46 || slotNumber === 95) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 47) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'F':
            {
                if (slotNumber === 49 || slotNumber === 101) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 50) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'G':
            {
                if (slotNumber === 53 || slotNumber === 109) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 54) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'H':
            {
                if (slotNumber === 57 || slotNumber === 117) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 58) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'I':
            {
                if (slotNumber === 62 || slotNumber === 129) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 63) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'J':
            {
                if (slotNumber === 69 || slotNumber === 144) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 70) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'K':
            {
                if (slotNumber === 78 || slotNumber === 165) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 79) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'L':
            {
                if (slotNumber === 92 || slotNumber === 193) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 93) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'M':
            {
                if (slotNumber === 104 || slotNumber === 213) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1 || slotNumber === 105) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'N':
            {
                if (slotNumber === 111) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
        case 'O':
            {
                if (slotNumber === 134) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }];
                } else if (slotNumber === 1) {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                } else {
                    return [{
                        zoneLabel,
                        slotNumber: slotNumber - 1
                    }, {
                        zoneLabel,
                        slotNumber: slotNumber + 1
                    }];
                }
                break;
            }
    }
}


export const getAvailableSpotPairs = (allSpotData) => {
    var spotAdjacentSpotsPairing = [];
    for (const spot of allSpotData) {
        var adjacentSpots = getAdjacentSpots(spot);
        var availableAdjacentSpots = [];
        for (const adjSpot of adjacentSpots) {
            const {
                zoneLabel,
                slotNumber
            } = adjSpot;
            const actualSpotData = allSpotData.find(s => (s.zoneLabel === zoneLabel && s.slotNumber === slotNumber));
            if (actualSpotData !== undefined && actualSpotData !== null) {
                availableAdjacentSpots.push(actualSpotData);

            }

        }
        spotAdjacentSpotsPairing.push({
            spot,
            availableAdjacentSpots
        });
    }
    return spotAdjacentSpotsPairing;
}