import { v4 as uuidv4 } from 'uuid';
import data from "./data.json";

const loadInitialDataWith_UUID = () => {
    if(!data) return [];

    return data.map(item => {
        item.id = uuidv4()
        return item;
    });
}

export default loadInitialDataWith_UUID;