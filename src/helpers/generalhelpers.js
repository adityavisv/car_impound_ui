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