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

export const convertResultsToCsv = (resultsArray) => {
    const headerArray = ['make', 'model', 'type', 'vehicleStatus', 'registrationDateTime', 'estimatedReleaseDate', 'caseNumber', 'chassisNumber', 'color',
        'parkingSlot', 'isWanted', 'numberPlate', 'ownerIdType', 'ownerFirstName', 'ownerLastName', 'ownerEmailAddress', 'ownerIdNumber', 'ownerContactNumber',
        'ownerNationality', 'department', 'emirate', 'category', 'code', 'releaseIdentityFirstName', 'releaseIdentityLastName',
        'releaseIdentityIdType', 'releaseIdentityIdNumber', 'releaseIdentityContactNumber', 'releaseIdentityEmailAddress', 'releaseIdentityNationality', 'releaseDateTime'
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
        const entryLine = `\r\n"${make}", "${model}", "${type}", "${vehicleStatus}", "${registrationDateTime}", "${estimatedReleaseDate}", "${caseNumber}", "${chassisNumber}", "${color}","${parkingSlot}", "${isWanted}", "${numberPlate}", "${ownerIdType}", "${ownerFirstName}", "${ownerLastName}", "${ownerEmailAddress}", "${ownerIdNumber}", "${ownerContactNumber}","${ownerNationality}", "${department}", "${emirate}", "${category}", "${code}", "${releaseIdentityFirstName}", "${releaseIdentityLastName}", "${releaseIdentityIdType}","${releaseIdentityIdNumber}", "${releaseIdentityContactNumber}", "${releaseIdentityEmailAddress}", "${releaseIdentityNationality}", "${releaseDateTime}"`;
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