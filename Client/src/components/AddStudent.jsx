import { useState } from 'react'

const AddStudent = ({ fetchStudents }) => {
  const [name, setName] = useState('')
  const [clgname, setClgName] = useState('')
  const [round1marks, setRound1Marks] = useState('')
  const [round2marks, setRound2Marks] = useState('')
  const [round3marks, setRound3Marks] = useState('')
  const [techMarks, setTechMarks] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3000/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StudentName: name,
          CollegeName: clgname,
          Round1marks: round1marks,
          Round2marks: round2marks,
          Round3marks: round3marks,
          TechnicalRoundMarks: techMarks,
        }),
      })

      const data = await response.json()
      console.log(data.message) // Or update the UI to show success
      if (!response.ok) {
        alert('Add Student details within the constraints')
      }
      fetchStudents() // Fetch updated student list
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter Student Name"
          required
        />
        <label>College Name:</label>
        <input
          type="text"
          value={clgname}
          onChange={(e) => setClgName(e.currentTarget.value)}
          placeholder="Enter College Name"
          required
        />
        <label>Round 1 marks:</label>
        <input
          type="text"
          value={round1marks}
          onChange={(e) => setRound1Marks(e.currentTarget.value)}
          placeholder="Enter Round 1 Marks"
          required
        />
        <label>Round 2 marks:</label>
        <input
          type="text"
          value={round2marks}
          onChange={(e) => setRound2Marks(e.currentTarget.value)}
          placeholder="Enter Round 2 Marks"
          required
        />
        <label>Round 3 marks:</label>
        <input
          type="text"
          value={round3marks}
          onChange={(e) => setRound3Marks(e.currentTarget.value)}
          placeholder="Enter Round 3 Marks"
          required
        />
        <label>Technical Round Marks:</label>
        <input
          type="text"
          value={techMarks}
          onChange={(e) => setTechMarks(e.currentTarget.value)}
          placeholder="Enter Technical Round Marks"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  )
}

export default AddStudent
