const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data){
    let errors = {}

    //another layer to check is the data is not empty
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    
    //add another layer for validation
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors),
    }
}