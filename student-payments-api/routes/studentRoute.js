const express = require('express');
const router = express.Router();
const {getStudent,getStudents,createStudents,updateStudent,deleteStudent,sendReceipt,addPayment} = require('../controllers/studentControllers');
router.route('/').get(getStudents).post(createStudents);
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);
router.route('/:id/payment').post(addPayment);
router.get('/:id/receipt',sendReceipt);

module.exports = router;