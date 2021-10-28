const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    //another layer to check is the data is not empty
    data.text = !isEmpty(data.text) ? data.text : '';

    //add another layer for validation
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters long'
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors),
    }
}