import Joi from "joi";

const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\w_])[a-zA-Z\d\w_]{8,25}$/;
const RegisterUserDTO = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(strongPasswordPattern).required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string()
    .regex(/^(customer|seller)$/)
    .optional()
    .default("customer"),
  address: Joi.string().allow(null, "").optional().default(null),
  phone: Joi.string().allow(null, "").optional().default(null),
  gender: Joi.string()
    .regex(/^(male|female|other)$/)
    .required(),
  dob: Joi.date().greater("now"),
  image: Joi.string().allow(null, "").optional().default(null),
});

const LoginUserDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { RegisterUserDTO , LoginUserDTO };
