const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateResetPassword(data){

  let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword: '';
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword: '';

  if (Validator.isEmpty(data.newPassword)){
    errors.newPassword= 'New password field is required';
  }

  if (Validator.isEmpty(data.rePassword)){
    errors.rePassword = 'Confirm password field is required';
  }

  if (!Validator.isLength(data.newPassword,{min:6,max:30})){
    errors.newPassword= 'Password must be at least 6 character';
  }

  if (!Validator.equals(data.newPassword,data.rePassword)){
    errors.password2 = 'password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
