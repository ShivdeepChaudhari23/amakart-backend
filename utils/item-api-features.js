import MODEL_ATTRIBUTES from "./constants/model-attributes.js";

const EXCLUDED_FILTERING_FIELDS = ['page', 'sort', 'limit', 'fields'];

export default class ItemAPIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filterFields() {
        const queryFields = { ...this.queryString };
        EXCLUDED_FILTERING_FIELDS.forEach((field) => delete queryFields[field]);

        let queryStr = JSON.stringify(queryFields);
        queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);
        const queryObj = JSON.parse(queryStr);
        const queryKey = Object.keys(queryObj)[0];

        let findObject = queryObj;
        if (queryKey === 'searchAttribute') {
            findObject = {$or: [{[MODEL_ATTRIBUTES.TITLE]: {$regex: queryObj[queryKey]}}, {[MODEL_ATTRIBUTES.VARIANT_SKU]: {$regex: queryObj[queryKey]}}]};
        }
        this.query = this.query.find(findObject);
  
        return this;
    }
}