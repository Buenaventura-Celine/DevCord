const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    let errors = {}

    //another layer to check is the data is not empty
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    //add another layer for validation
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title is required'
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company is required'
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Company is required'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors),
    }
}