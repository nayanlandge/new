const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
   name:{
    type: String,
    required: [true,"Name is required"],
   },
   stream:{
    type: String,
    required:[true,"Stream is required"],
   },
   year:{
    type: Number,
    required:[true,"Year is required"],
   },
   phone:{
    type: String,
    required:[true,"Phone is required"],
   },
   fees:{
    type: Number,
    required:[true,"Fees is required"],
   },
   feesPaid:{
    type: Boolean,
    default: false,
   },
   paymentHistory: [
    {
        amountPaid: {
          type: Number,
          required: true,
        },
        date: { 
          type: Date, 
          default: Date.now,
        },
        remainingBalance: {
          type: Number,
          required: true,
        },
      }
  ],
},{
    timestamps:true,
});

module.exports = mongoose.model("Student",studentSchema);