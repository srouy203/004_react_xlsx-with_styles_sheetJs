import React from "react";
import ExcelExportHelper from "./components/ExcelExportHelper";
import Excel from "./components/Excel"

const DATA = [
  {
   STUDENT_DETAILS: {
      id: 101,
      name: "Suman Kumar",
      parentName: "Suresh Kumar",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    }, 
    MARKS: {
      maths: 75,
      physics: 65,
      chemistry: 72,
      english: 62,
      computerScience: 80,
    },
  },
  {
    STUDENT_DETAILS: {
      id: 102,
      name: "Rahul Kumar",
      parentName: "Aatma Ram",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    },
    MARKS: {
      maths: 70,
      physics: 75,
      chemistry: 82,
      english: 72,
      computerScience: 60,
    },
  },
  {
    STUDENT_DETAILS: {
      id: 103,
      name: "Anuj Kumar",
      parentName: "Ashok Kumar",
      classroom: "12th",
      subject: "Non Medical",
      division: "1st",
      status: "Pass",
    },
    MARKS: {
      maths: 60,
      physics: 65,
      chemistry: 92,
      english: 77,
      computerScience: 80,
    },
  },
];

const App = () => {
  return (
    <div style={{ padding: "30px" }}>
      <Excel data={DATA} />
      <ExcelExportHelper data={DATA} />
      <h3>Student Details</h3>
      <table class="table table-bordered">
        <thead style={{ background: "red" }}>
          <tr>
            <th scope="col">Enrolment No.</th>
            <th scope="col">Student Name</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Class</th>
            <th scope="col">Subject</th>
            <th scope="col">Division</th>
            <th scope="col">Result Status</th>
          </tr>
        </thead>
        <tbody>
          {DATA.map((studentsData) => (
            <tr>
              <td>
                <strong>{studentsData.STUDENT_DETAILS.id}</strong>{" "}
              </td>
              <td>{studentsData.STUDENT_DETAILS.name}</td>
              <td>{studentsData.STUDENT_DETAILS.parentName}</td>
              <td>{studentsData.STUDENT_DETAILS.classroom}</td>
              <td>{studentsData.STUDENT_DETAILS.subject}</td>
              <td>{studentsData.STUDENT_DETAILS.division}</td>
              <td>
                <strong>{studentsData.STUDENT_DETAILS.status}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Marks</h3>
      <table class="table table-bordered">
        <thead style={{ background: "gray", color: "#fff" }}>
          <tr>
            <th scope="col">Enrolment No.</th>
            <th scope="col">Student Name</th>
            <th scope="col">Mathematics</th>
            <th scope="col">Physics</th>
            <th scope="col">Chemistry</th>
            <th scope="col">English</th>
            <th scope="col">Computer Science</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {DATA.map((studentsData) => (
            <tr>
              <td>
                <strong>{studentsData.STUDENT_DETAILS.id}</strong>
              </td>
              <td>{studentsData.STUDENT_DETAILS.name}</td>
              <td>{studentsData.MARKS.maths}</td>
              <td>{studentsData.MARKS.physics}</td>
              <td>{studentsData.MARKS.chemistry}</td>
              <td>{studentsData.MARKS.english}</td>
              <td>{studentsData.MARKS.computerScience}</td>
              <td>
                <strong>
                  {" "}
                  {studentsData.MARKS.maths +
                    studentsData.MARKS.physics +
                    studentsData.MARKS.chemistry +
                    studentsData.MARKS.english +
                    studentsData.MARKS.computerScience}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
