const validator = require("validator");

const validateSignUp = (data) => {
  const { firstName, lastName, emailId, password, age, skills } = data;

  if (!firstName || !lastName || !emailId || !password || !age || !skills) {
    throw new Error("all fields are required");
  }
  else if (firstName.length < 3 || firstName.length > 30) {
    throw new Error("first name must be between 3 and 30 characters");
  }
  else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  }
  // else if (!validator.isStrongPassword(password)) {
  //   throw new Error("password is not strong");
  // }
};


const validateEditProfileData=(data)=>{
const allowedEditFeilds=["firstName","lastName","age","skills","gender","photoUrl","about"];

const isEditAllowed=Object.keys(data).every((field)=>
  allowedEditFeilds.includes(field)
);
console.log(isEditAllowed);
return isEditAllowed;
};
module.exports = {
  validateSignUp,
  validateEditProfileData
};
