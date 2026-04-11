import Joi  from "joi"

const RegisterUserDTO = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().allow("customer", "seller").optional().default("customer"),
  address: Joi.string().allow(null, "").optional().default(null),
  phone: Joi.string().allow(null, "").optional().default(null),
  gender: Joi.string().allow("male", "female", "other").required(),
  dob: Joi.date().greater("now"),
  image: Joi.string().allow(null, "").optional().default(null),
});

export {RegisterUserDTO}