const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const Student = require('./Models/Student')
const mongoose = require('mongoose')

const uri =
  'mongodb+srv://harsh:harsh@cluster0.q1ndeqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const allowedOrigins = ['http://localhost:5173']

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
)
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .sort({ TotalMarks: -1 })
      .select('-_id -__v')

    // Calculate ranks
    let currentRank = 1
    let previousMarks = null
    let rankCounter = 1

    const rankedStudents = students.map((student, index) => {
      if (student.TotalMarks !== previousMarks) {
        currentRank = rankCounter
        previousMarks = student.TotalMarks
      }
      rankCounter++

      return {
        ...student.toObject(),
        Rank: currentRank,
      }
    })

    res.json({
      message: 'Sending ranked Students',
      rankedStudents,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message, // Ensure error message is sent as a string
    })
  }
})

app.post('/result', async (req, res) => {
  try {
    const {
      StudentName,
      CollegeName,
      Round1marks,
      Round2marks,
      Round3marks,
      TechnicalRoundMarks,
    } = req.body

    // Convert marks to numbers
    const round1 = parseFloat(Round1marks) || 0
    const round2 = parseFloat(Round2marks) || 0
    const round3 = parseFloat(Round3marks) || 0
    const techMarks = parseFloat(TechnicalRoundMarks) || 0

    // Calculate the total marks
    const totalMarks = round1 + round2 + round3 + techMarks

    // Determine the result
    const result = totalMarks >= 35 ? 'Selected' : 'Rejected'

    // Create a new student
    const student = new Student({
      StudentName,
      CollegeName,
      Round1marks: round1,
      Round2marks: round2,
      Round3marks: round3,
      TechnicalRoundMarks: techMarks,
      TotalMarks: totalMarks,
      Result: result,
    })

    // Save the student
    await student.save()
    res.json({ message: 'Student added successfully' })
  } catch (err) {
    res.status(500).json({
      error: err.message, // Ensure error message is sent as a string
    })
  }
})

mongoose.connect(uri).then(() => {
  console.log('Database has been connected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
