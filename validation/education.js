const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    let errors = {}

    //another layer to check is the data is not empty
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    //add another layer for validation
    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required'
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required'
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study is required'
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date is required'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors),
    }
}