const Student = require("../models/studentModel");
const generateStudentReceipt = require("./generateReceipt");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) {
      return res.status(404).json({ message: "Students not found." });
    }
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching students." });
  }
};

const getStudent = async (req, res) => {
  const findStudent = req.params.id;
  try {
    const student = await Student.findById(findStudent);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching student." });
  }
};

const createStudents = async (req, res) => {
  const { name, stream, year, phone, fees, feesPaid } = req.body;
  if (!name || !stream || !year || !phone || !fees) {
    return res.status(400).json({ message: "Name, Stream, Year, Phone, and Fees are required." });
  }
  try {
    const student = await Student.create({
      name,
      stream,
      year,
      phone,
      fees,
      feesPaid: feesPaid || false,
    });
    res.status(201).json(student);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while creating student." });
  }
};

const updateStudent = async (req, res) => {
  const getId = req.params.id;
  try {
    const updateId = await Student.findByIdAndUpdate(getId, req.body, { new: true });
    if (!updateId) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json(updateId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while updating student." });
  }
};

const deleteStudent = async (req, res) => {
  const getId = req.params.id;
  try {
    const deleteId = await Student.findByIdAndDelete(getId);
    if (!deleteId) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.status(200).json(deleteId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while deleting student." });
  }
};

const sendReceipt = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const pdfBuffer = await generateStudentReceipt(student);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${student.name.replace(
        /\s+/g,
        "_"
      )}_receipt.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generating receipt:", err);
    res.status(500).json({ message: "Failed to generate receipt" });
  }
};

const addPayment = async (req, res) => {
  const { amountPaid } = req.body;
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const totalPaid = student.paymentHistory.reduce((total, payment) => total + payment.amountPaid, 0);
    const remainingBalance = student.fees - totalPaid;

    if (amountPaid > remainingBalance) {
      return res.status(400).json({
        message: `Payment exceeds the remaining balance of ₹${remainingBalance}.`,
      });
    }

    const newRemainingBalance = remainingBalance - amountPaid;

    student.paymentHistory.push({
      amountPaid,
      remainingBalance: newRemainingBalance,
      date: new Date(),
    });

    student.feesPaid = newRemainingBalance <= 0;

    await student.save();

    res.status(200).json({
      message: "Payment added successfully.",
      student,
    });
  } catch (err) {
    console.error("Error while adding payment:", err);
    res.status(500).json({
      message: "An error occurred while processing the payment.",
      error: err.message,
    });
  }
};

module.exports = {
  getStudent,
  getStudents,
  createStudents,
  updateStudent,
  deleteStudent,
  sendReceipt,
  addPayment,
};