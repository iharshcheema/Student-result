import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StudentList from './components/StudentList'
import AddStudent from './components/AddStudent'

const App = () => {
  const [students, setStudents] = useState([])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/')
      setStudents(response.data.rankedStudents)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <h1>Student Rankings</h1>
      <StudentList students={students} />
      <h2>Add New Student</h2>
      <AddStudent fetchStudents={fetchStudents} />
    </div>
  )
}

export default App
