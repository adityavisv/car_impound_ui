import {
    makeModelData
} from '../newcardb';

export const getAllModelsByMake = (make) => {
    console.log(makeModelData);
    const makeModelObjectsByMake = makeModelData.filter((element) => (
        element.brand === make
    ));
    const onlyModelArray = makeModelObjectsByMake.map((element) => (element.model));
    return onlyModelArray;
}