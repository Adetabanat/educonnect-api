const Joi = require('joi');
const { validateRequest } = require('../middleware/validateRequest'); // Adjust the path
const { sendErrorResponse } = require('../controllers/students'); // Adjust the path

// Mock the sendErrorResponse function
jest.mock('../controllers/students', () => ({
  sendErrorResponse: jest.fn(),
}));

describe('validateRequest Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    // Initialize mock objects for each test
    req = {
      method: 'POST', // Default method
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    sendErrorResponse.mockClear(); // Clear mock calls
  });

  it('should call next() when validation is successful for POST', () => {
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      dob: '2000-01-01',
      hometown: 'Exampleville',
      nameOfParent: 'Jane Doe',
      contactPerson: 'Peter Pan',
      house: 'Griffindor',
      course: 'Magic',
      class: 'Beginner',
      club: 'Chess',
      allergies: 'None',
      dateReportedToSchool: '2024-09-05',
    };

    validateRequest(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(sendErrorResponse).not.toHaveBeenCalled();
  });

  it('should call next() when validation is successful for PUT', () => {
    req.method = 'PUT';
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
    };

    validateRequest(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(sendErrorResponse).not.toHaveBeenCalled();
  });

  it('should call sendErrorResponse with 422 for POST validation error', () => {
    req.body = { firstName: '' }; // Missing required fields
    validateRequest(req, res, next);

    expect(sendErrorResponse).toHaveBeenCalledWith(
      res,
      422,
      'Validation error',
      expect.any(Array) // Check for an array of errors
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call sendErrorResponse with 422 for PUT validation error', () => {
    req.method = 'PUT';
    req.body = { dob: 'invalid-date' };
    validateRequest(req, res, next);

    expect(sendErrorResponse).toHaveBeenCalledWith(
      res,
      422,
      'Validation error',
      expect.any(Array)
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should pass the validated and casted value in req.body', () => {
        req.body = {
            firstName: '  John  ', // with spaces
            lastName: 'Doe',
            dob: '2000-01-01',
            hometown: 'Exampleville',
            nameOfParent: 'Jane Doe',
            contactPerson: 'Peter Pan',
            house: 'Griffindor',
            course: 'Magic',
            class: 'Beginner',
            club: 'Chess',
            allergies: 'None',
            dateReportedToSchool: '2024-09-05'
        };

        validateRequest(req, res, next);

        expect(req.body.firstName).toBe('John'); // check that trim() worked
        expect(next).toHaveBeenCalled();
    });
});
