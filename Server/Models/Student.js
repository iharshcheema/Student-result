const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  StudentName: { type: String, max: 30 },
  CollegeName: { type: String, max: 50 },
  Round1marks: { type: Number, min: 0, max: 10 },
  Round2marks: { type: Number, min: 0, max: 10 },
  Round3marks: { type: Number, min: 0, max: 10 },
  TechnicalRoundMarks: { type: Number, min: 0, max: 20 },
  TotalMarks: { type: Number },
  Result: { type: String },
  Rank: { type: String },
})

const Student = mongoose.model('Student', StudentSchema)
module.exports = Student
