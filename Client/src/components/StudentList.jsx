const StudentList = ({ students }) => {
  return (
    <ul>
      {students.map((student) => (
        <li key={student._id}>
          <div>
            <strong>Student Name:</strong> {student.StudentName}
          </div>
          <div>
            <strong>College Name:</strong> {student.CollegeName}
          </div>
          <div>
            <strong>Round 1 Marks:</strong> {student.Round1marks}
          </div>
          <div>
            <strong>Round 2 Marks:</strong> {student.Round2marks}
          </div>
          <div>
            <strong>Round 3 Marks:</strong> {student.Round3marks}
          </div>
          <div>
            <strong>Technical Round Marks:</strong>{' '}
            {student.TechnicalRoundMarks}
          </div>
          <div>
            <strong>Total Marks:</strong> {student.TotalMarks}
          </div>
          <div>
            <strong>Rank:</strong> {student.Rank}
          </div>
          <div>
            <strong>Result:</strong> {student.Result}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default StudentList
