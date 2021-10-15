const isEmpty = value =>
    value === undefined || 
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) || //check to see if the object is not empty
    (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;