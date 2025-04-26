// validation/studentValidation.js
const Joi = require('joi');
const { sendErrorResponse } = require('../controllers/students'); // Adjust the path if needed

// Validation schema for creating a student
const createStudentSchema = Joi.object({
  firstName: Joi.string().trim().required(), //  .notEmpty() is part of Joi.string().required()
  lastName: Joi.string().trim().required(),
  dob: Joi.date().iso().required(),
  hometown: Joi.string().trim().required(),
  nameOfParent: Joi.string().trim().required(),
  contactPerson: Joi.string().trim().required(),
  house: Joi.string().trim().required(),
  course: Joi.string().trim().required(),
  class: Joi.string().trim().required(),
  club: Joi.string().trim().required(),
  allergies: Joi.string().trim().required(),
  dateReportedToSchool: Joi.date().iso().required(),
});

// Validation schema for updating a student
const updateStudentSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  dob: Joi.date().iso(),
  hometown: Joi.string().trim(),
  nameOfParent: Joi.string().trim(),
  contactPerson: Joi.string().trim(),
  house: Joi.string().trim(),
  course: Joi.string().trim(),
  class: Joi.string().trim(),
  club: Joi.string().trim(),
  allergies: Joi.string().trim(),
  dateReportedToSchool: Joi.date().iso(),
});

// Middleware to handle Joi validation
const validateRequest = (req, res, next) => {
  const schema = req.method === 'POST' ? createStudentSchema : updateStudentSchema;
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map(detail => ({
      message: detail.message,
      path: detail.path.join('.'),
    }));
    return sendErrorResponse(res, 422, 'Validation error', errorDetails);
  }
  req.body = value;
  next();
};

module.exports = {
  validateRequest,
};
