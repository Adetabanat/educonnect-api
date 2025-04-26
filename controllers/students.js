const { ObjectId } = require("mongodb");
const { getDatabase } = require("../data/database"); // Consistent import

// Standardize error response structure
const sendErrorResponse = (res, statusCode, message, error) => {
  const response = { message };
  if (error) {
    response.error = error.message || error; // Include more error detail
  }
  res.status(statusCode).json(response);
};

// --- Student CRUD Operations ---

const getAllStudents = async (req, res) => {
  try {
    const students = await getDatabase().collection("students").find().toArray();
    res.json(students); // Consistent:  shorthand for res.setHeader + res.status(200)
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to retrieve students", error);
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const student = await getDatabase().collection("students").findOne({ _id: studentId });

    if (!student) {
      return sendErrorResponse(res, 404, "Student not found");
    }

    res.json(student);
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to retrieve student", error);
  }
};

const createStudent = async (req, res) => {
  try {
    const newStudent = { // Consistent naming
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      hometown: req.body.hometown,
      nameOfParent: req.body.nameOfParent,
      contactPerson: req.body.contactPerson,
      house: req.body.house,
      course: req.body.course,
      class: req.body.class,
      club: req.body.club,
      allergies: req.body.allergies,
      dateReportedToSchool: req.body.dateReportedToSchool,
    };

    const result = await getDatabase().collection("students").insertOne(newStudent);

    if (result.acknowledged) {
      res.status(201).json({
        message: "Student created successfully",
        insertedId: result.insertedId, // Include the inserted ID
      });
    } else {
      sendErrorResponse(res, 500, "Failed to create student");
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to create student", error);
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const updatedStudentData = { // Consistent naming
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      hometown: req.body.hometown,
      nameOfParent: req.body.nameOfParent,
      contactPerson: req.body.contactPerson,
      house: req.body.house,
      course: req.body.course,
      class: req.body.class,
      club: req.body.club,
      allergies: req.body.allergies,
      dateReportedToSchool: req.body.dateReportedToSchool,
    };

    const result = await getDatabase().collection("students").updateOne(
      { _id: studentId },
      { $set: updatedStudentData }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: "Student updated successfully" });
    } else {
      sendErrorResponse(res, 404, "Student not found or no changes needed");
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to update student", error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const result = await getDatabase().collection("students").deleteOne({ _id: studentId });

    if (result.deletedCount > 0) {
      res.json({ message: "Student deleted successfully" });
    } else {
      sendErrorResponse(res, 404, "Student not found");
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to delete student", error);
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
