const serviceTemplate = `
import { {{uppercaseFileName}} } from "./{{lowercaseFileName}}.model";
import QueryBuilder from "../../helpers/QueryBuilder";
import {T{{uppercaseFileName}}} from "./{{lowercaseFileName}}.interface";
// Declare the Services 

const create{{uppercaseFileName}} = async (payload: T{{uppercaseFileName}}) => {
    const result = await {{uppercaseFileName}}.create(payload);
    return result;
}
const getAll{{uppercaseFileName}} = async (query: Record<string, unknown>) => {
    const {{lowercaseFileName}}SearchableFields = [];
    const resultQuery = new QueryBuilder({{uppercaseFileName}}.find(), query).search({{lowercaseFileName}}SearchableFields).filter().sort().fields().paginate().limit();
    const result = await resultQuery.modelQuery;
    const meta = await resultQuery.countTotal();

    return {
        data: result,
        meta
    }
}
const getSingle{{uppercaseFileName}} = async (id: String) => {
    const result = await {{uppercaseFileName}}.findById(id);
    return result;
}
const update{{uppercaseFileName}} = async (id: String, payload: Partial<T{{uppercaseFileName}}>) => {
    const result = await {{uppercaseFileName}}.findByIdAndUpdate(id, payload);
    return result;
}
const delete{{uppercaseFileName}} = async (id: String) => {
    const result = await {{uppercaseFileName}}.findByIdAndDelete(id);
    return result;
}

export const {{uppercaseFileName}}Services = {
    create{{uppercaseFileName}},
    getAll{{uppercaseFileName}},
    getSingle{{uppercaseFileName}},
    update{{uppercaseFileName}},
    delete{{uppercaseFileName}}
}
`;

module.exports = serviceTemplate;
