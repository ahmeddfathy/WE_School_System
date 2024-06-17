const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const query = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoz',
});

query.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

function handleState(res, err, action, result) {
  if (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  // Successful case
  if (result && result.affectedRows > 0) {
    return res.status(200).json({ success: true, message: `${action} successfully` });
  } else {
    return res.status(200).json({ success: false, message: `No rows affected for ${action}`, result });
  }
}

function executeQuery(querys, values, res, successMessage = null) {
  query.query(querys, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (successMessage) {
      console.log(`${successMessage} successfully:`, results);
    }

    res.json(results);
  });
}

function insertFormativeData(req, res) {
  const dataArray = Array.isArray(req.body) ? req.body : [req.body];
  const errors = [];

  dataArray.forEach(data => {
    const {
      student_id,  Num_Of_Questions, T, W, NA, Percentage, FinalEvaluation, num_of_competenceis, num_of_competency_questions, StudentCase, Formative_Num
      , subject_name, Competency_Assessments, The_NA_in_competencies, The_W_in_competencies
    } = data;

    const insertQuery = `
      INSERT INTO ${Formative_Num} (student_id,  Num_Of_Questions, T, W, NA, Percentage, FinalEvaluation, num_of_competenceis, num_of_competency_questions, StudentCase
        , subject_name , Competency_Assessments , The_NA_in_competencies , The_W_in_competencies  )
      VALUES (?,  ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ?);
    `;

    const values = [
      student_id,  Num_Of_Questions, T, W, NA, Percentage, FinalEvaluation, num_of_competenceis, num_of_competency_questions, StudentCase
      , subject_name, Competency_Assessments, The_NA_in_competencies, The_W_in_competencies
    ];

    if (values.some(value => !value)) {
      errors.push({ error: 'Missing required parameters for an object in the array' });
    } else {
      // Use the query method provided by your database library
      query.query(insertQuery, values, (err, result) => {
        handleState(res, err, 'inserted', result);
      });
    }
  });

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
}




function deleteTopStudent(req, res) {
  const { student_id, Formative } = req.body;

  const deleteQuery = `
	DELETE FROM Top_Student
	WHERE student_id = ? AND Formative = ?;
  `;

  const values = [student_id, Formative];

  if (values.some(value => value === undefined)) {
    return res.status(400).json({ error: 'Missing required parameters' });
  } else {
    query.query(deleteQuery, values, (err, result) => {
      handleState(res, err, 'deleted', result);
    });
  }
}

function deleteFormativeData(req, res) {
  const { student_id, Formative_Num, subject_name } = req.body;

  const deleteQuery = `
	DELETE FROM ${Formative_Num}
	WHERE student_id = ? AND subject_name = ?;
  `;

  const values = [student_id, Formative_Num, subject_name];

  if (values.some(value => value === undefined)) {
    return res.status(400).json({ error: 'Missing required parameters' });
  } else {
    query.query(deleteQuery, values, (err, result) => {
      handleState(res, err, 'deleted', result);
    });
  }
}

function executeSelectQuery(query) {
  return new Promise((resolve, reject) => {
    query.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function selectAllSubjectsData(req, res) {
  const tableNames = [
    'Specialty',
    'Arabic',
    'English',
    'Math',
    'Physics',
    'Social_Studies',
    'Economy',
    'Auto_Cad',
    'ICT',
    'National_Education'
  ];

  const selectQueries = tableNames.map(tableName => `SELECT * FROM ${mysql.escapeId(tableName)}`);

  Promise.all(selectQueries.map(query => executeSelectQuery(query)))
    .then(results => {
      const combinedResults = results.reduce((acc, result, index) => {
        acc[tableNames[index]] = result;
        return acc;
      }, {});

      res.json(combinedResults);
    })
    .catch(error => {
      console.error('Error executing SELECT queries:', error.stack);
      res.status(500).send('Internal Server Error');
    });
}
function executeSelectQuery(queryStatement) {
  return new Promise((resolve, reject) => {
    query.query(queryStatement, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function calculateStudentPercentages(req, res) {
  const query = `
    SELECT Arabic.student_id, 
      Arabic.Percentage AS Arabic, 
      English.Percentage AS English, 
      Math.Percentage AS Math, 
      Physics.Percentage AS Physics, 
      Social_Studies.Percentage AS Social_Studies, 
      Economy.Percentage AS Economy, 
      Auto_Cad.Percentage AS Auto_Cad, 
      ICT.Percentage AS ICT, 
      National_Education.Percentage AS National_Education
    FROM Arabic
    LEFT JOIN English ON Arabic.student_id = English.student_id
    LEFT JOIN Math ON Arabic.student_id = Math.student_id
    LEFT JOIN Physics ON Arabic.student_id = Physics.student_id
    LEFT JOIN Social_Studies ON Arabic.student_id = Social_Studies.student_id
    LEFT JOIN Economy ON Arabic.student_id = Economy.student_id
    LEFT JOIN Auto_Cad ON Arabic.student_id = Auto_Cad.student_id
    LEFT JOIN ICT ON Arabic.student_id = ICT.student_id
    LEFT JOIN National_Education ON Arabic.student_id = National_Education.student_id;
  `;

  executeQuery(query, [], res);
}



app.get('/allStudentsPercentages', calculateStudentPercentages);

app.get('/api/subject/percentage/:subject', async (req, res) => {
  try {
    const subject = req.params.subject;

    const queryStatement = `
            SELECT student_id, Percentage
            FROM ${mysql.escapeId(subject)};
        `;

    const result = await executeSelectQuery(queryStatement);
    res.json(result);
  } catch (error) {
    console.error('Error fetching percentage data:', error.stack);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/allFormativeData/:Formative_Num', (req, res) => {
  const Formative_Num = req.params.Formative_Num;

  const query = `SELECT * FROM ${mysql.escapeId(Formative_Num)}`;
  executeQuery(query, [], res);
});

app.get('/StudentSubjectsData/:subject/:student_id', (req, res) => {
  const Formative_Num = req.params.Formative_Num;
  const student_id = req.params.student_id;

  const query = `
	SELECT * FROM ${mysql.escapeId(Formative_Num)}
	WHERE student_id = '${student_id}';
  `;

  executeQuery(query, [], res);
});

app.put('/update/Formative', (req, res) => {
  const { student_id, Formative_num } = req.body;
  const sql = `
	UPDATE ${Formative_num}
	SET Num_Of_Questions = ?, T = ?, W = ?, NA = ?, Percentage = ?, FinalEvaluation = ? 
  , num_of_competenceis = ? , num_of_competency_questions = ? , StudentCase = ? 
  , subject_name = ? , Competency_Assessments = ? , The_NA_in_competencies = ? , The_W_in_competencies = ?
	WHERE student_id = ? AND subject_name = ?;
  `;

  const values = [
    req.body.Num_Of_Questions,
    req.body.T,
    req.body.W,
    req.body.NA,
    req.body.Percentage,
    req.body.FinalEvaluation,
    req.body.num_of_competenceis,
    req.body.num_of_competency_questions,
    req.body.StudentCase,
    req.body.Competency_Assessments,
    req.body.The_NA_in_competencies,
    req.body.The_W_in_competencies,
    req.body.subject_name,
    student_id,
    Formative_num,

  ];

  // Execute the SQL query
  query.query(sql, values, (error, results) => {
    handleState(res, error, 'subject', results);
  });
});

app.post('/api/Formative', insertFormativeData);

app.post('/api/optimization', (req, res) => {
  const {
    student_id, Formative, Subjects, Percentagee
  } = req.body;

  const values = [
    student_id, Formative, Subjects, Percentagee
  ];

  const insertQuery = `
	INSERT INTO Optimization (student_id, Formative, Subjects, Percentagee)
	VALUES (?, ?, ?, ?);
  `;

  if (values.some(value => !value)) {
    return res.status(400).json({ error: 'Missing required parameters' });
  } else {
    query.query(insertQuery, values, (err, result) => {
      handleState(res, err, 'inserted', result);
    });
  }
});






app.get('/api/studentsData', (req, res) => {
  const queryAllFormativeData = `
    SELECT 
      s.student_id,
      COALESCE(f1.subject_name, '') AS Formative1_Subject,
      COALESCE(f1.Percentage, 0) AS Formative1_Percentage,
      COALESCE(f1.FinalEvaluation, '') AS Formative1_FinalEvaluation,
      COALESCE(f2.subject_name, '') AS Formative2_Subject,
      COALESCE(f2.Percentage, 0) AS Formative2_Percentage,
      COALESCE(f2.FinalEvaluation, '') AS Formative2_FinalEvaluation,
      COALESCE(f3.subject_name, '') AS Formative3_Subject,
      COALESCE(f3.Percentage, 0) AS Formative3_Percentage,
      COALESCE(f3.FinalEvaluation, '') AS Formative3_FinalEvaluation,
      COALESCE(f4.subject_name, '') AS Formative4_Subject,
      COALESCE(f4.Percentage, 0) AS Formative4_Percentage,
      COALESCE(f4.FinalEvaluation, '') AS Formative4_FinalEvaluation,
      COALESCE(f5.subject_name, '') AS Formative5_Subject,
      COALESCE(f5.Percentage, 0) AS Formative5_Percentage,
      COALESCE(f5.FinalEvaluation, '') AS Formative5_FinalEvaluation,
      COALESCE(f6.subject_name, '') AS Formative6_Subject,
      COALESCE(f6.Percentage, 0) AS Formative6_Percentage,
      COALESCE(f6.FinalEvaluation, '') AS Formative6_FinalEvaluation,
      COALESCE(f7.subject_name, '') AS Formative7_Subject,
      COALESCE(f7.Percentage, 0) AS Formative7_Percentage,
      COALESCE(f7.FinalEvaluation, '') AS Formative7_FinalEvaluation,
      COALESCE(f8.subject_name, '') AS Formative8_Subject,
      COALESCE(f8.Percentage, 0) AS Formative8_Percentage,
      COALESCE(f8.FinalEvaluation, '') AS Formative8_FinalEvaluation
    FROM 
      student_info s
    LEFT JOIN Formative1 f1 ON s.student_id = f1.student_id
    LEFT JOIN Formative2 f2 ON s.student_id = f2.student_id
    LEFT JOIN Formative3 f3 ON s.student_id = f3.student_id
    LEFT JOIN Formative4 f4 ON s.student_id = f4.student_id
    LEFT JOIN Formative5 f5 ON s.student_id = f5.student_id
    LEFT JOIN Formative6 f6 ON s.student_id = f6.student_id
    LEFT JOIN Formative7 f7 ON s.student_id = f7.student_id
    LEFT JOIN Formative8 f8 ON s.student_id = f8.student_id
    WHERE
      COALESCE(f1.student_id, f2.student_id, f3.student_id, f4.student_id, f5.student_id, f6.student_id, f7.student_id, f8.student_id) IS NOT NULL;
  `;

  query.query(queryAllFormativeData, (err, results) => {
    if (err) {
      console.error('Error fetching students data:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Reformat data and send response
    const studentsData = formatData(results);
    res.json(studentsData);
  });  
});



function formatData(results) {
  const studentsData = {};

  results.forEach(row => {
    const student_id = row.student_id;

    let student = studentsData[student_id];

    if (!student) {
      student = {
        student_id: student_id,
        formativeGrades: {} // تغيير النوع إلى كائن لتخزين بيانات المواد داخله
      };
      studentsData[student_id] = student;
    }

    // إضافة بيانات التقويم للطالب
    for (let i = 1; i <= 8; i++) {
      const formativeKey = `Formative${i}`;
      const subjectKey = `${formativeKey}_Subject`;
      if (row[subjectKey]) {
        if (!student.formativeGrades[formativeKey]) {
          student.formativeGrades[formativeKey] = new Set(); // استخدام مجموعة لتجنب التكرار
        }
        student.formativeGrades[formativeKey].add(JSON.stringify({ // تحويل البيانات إلى سلسلة نصية لاستخدامها كمفتاح في المجموعة
          Subject: row[subjectKey],
          Percentage: row[`${formativeKey}_Percentage`],
          FinalEvaluation: row[`${formativeKey}_FinalEvaluation`]
        }));
      }
    }
  });

  // تحويل البيانات إلى مصفوفة من الأشكال
  return Object.values(studentsData).map(student => {
    // تحويل المجموعات إلى قائمة عادية من الكائنات
    for (const key in student.formativeGrades) {
      student.formativeGrades[key] = Array.from(student.formativeGrades[key], item => JSON.parse(item));
    }
    return student;
  });
}



app.get('/api/ClassData', (req, res) => {
  
  const queryAllFormativeData = `
  SELECT 
  s.student_id,
  si.class,
  COALESCE(f1.subject_name, '') AS Formative1_Subject,
  COALESCE(f1.Percentage, 0) AS Formative1_Percentage,
  COALESCE(f1.FinalEvaluation, '') AS Formative1_FinalEvaluation,
  COALESCE(f2.subject_name, '') AS Formative2_Subject,
  COALESCE(f2.Percentage, 0) AS Formative2_Percentage,
  COALESCE(f2.FinalEvaluation, '') AS Formative2_FinalEvaluation,
  COALESCE(f3.subject_name, '') AS Formative3_Subject,
  COALESCE(f3.Percentage, 0) AS Formative3_Percentage,
  COALESCE(f3.FinalEvaluation, '') AS Formative3_FinalEvaluation,
  COALESCE(f4.subject_name, '') AS Formative4_Subject,
  COALESCE(f4.Percentage, 0) AS Formative4_Percentage,
  COALESCE(f4.FinalEvaluation, '') AS Formative4_FinalEvaluation,
  COALESCE(f5.subject_name, '') AS Formative5_Subject,
  COALESCE(f5.Percentage, 0) AS Formative5_Percentage,
  COALESCE(f5.FinalEvaluation, '') AS Formative5_FinalEvaluation,
  COALESCE(f6.subject_name, '') AS Formative6_Subject,
  COALESCE(f6.Percentage, 0) AS Formative6_Percentage,
  COALESCE(f6.FinalEvaluation, '') AS Formative6_FinalEvaluation,
  COALESCE(f7.subject_name, '') AS Formative7_Subject,
  COALESCE(f7.Percentage, 0) AS Formative7_Percentage,
  COALESCE(f7.FinalEvaluation, '') AS Formative7_FinalEvaluation,
  COALESCE(f8.subject_name, '') AS Formative8_Subject,
  COALESCE(f8.Percentage, 0) AS Formative8_Percentage,
  COALESCE(f8.FinalEvaluation, '') AS Formative8_FinalEvaluation
FROM 
  student_info s
LEFT JOIN school_info si ON s.student_id = si.student_id
LEFT JOIN Formative1 f1 ON s.student_id = f1.student_id
LEFT JOIN Formative2 f2 ON s.student_id = f2.student_id
LEFT JOIN Formative3 f3 ON s.student_id = f3.student_id
LEFT JOIN Formative4 f4 ON s.student_id = f4.student_id
LEFT JOIN Formative5 f5 ON s.student_id = f5.student_id
LEFT JOIN Formative6 f6 ON s.student_id = f6.student_id
LEFT JOIN Formative7 f7 ON s.student_id = f7.student_id
LEFT JOIN Formative8 f8 ON s.student_id = f8.student_id
WHERE
  COALESCE(f1.student_id, f2.student_id, f3.student_id, f4.student_id, f5.student_id, f6.student_id, f7.student_id, f8.student_id) IS NOT NULL;

  `;

  query.query(queryAllFormativeData, (err, results) => {
    if (err) {
      console.error('Error fetching students data:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Reformat data and send response
    const studentsData = formatData2(results);
    res.json(studentsData);
  });  
});


function formatData2(results) {
  const studentsData = {};

  results.forEach(row => {
    const class_name = row.class;

    if (!studentsData[class_name]) {
      studentsData[class_name] = {};
    }

    for (let i = 1; i <= 8; i++) {
      const formativeKey = `Formative${i}`;
      const subjectKey = `${formativeKey}_Subject`;

      if (row[subjectKey]) {
        const formativeName = row[subjectKey];
        const studentId = formativeKey;

        if (!studentsData[class_name][formativeName]) {
          studentsData[class_name][formativeName] = {}; // إنشاء كائن لتخزين الطلاب ودرجاتهم
        }

        if (!studentsData[class_name][formativeName][studentId]) {
          studentsData[class_name][formativeName][studentId] = []; // إنشاء مصفوفة لتخزين درجات الطالب في التقييم
        }

    
        const processedStudents = new Set(studentsData[class_name][formativeName][studentId].map(item => JSON.stringify(item)));
        const currentStudentData = { Percentage: row[`${formativeKey}_Percentage`], FinalEvaluation: row[`${formativeKey}_FinalEvaluation`] };
        if (!processedStudents.has(JSON.stringify(currentStudentData))) {
          // إضافة درجات الطالب إلى المصفوفة
          studentsData[class_name][formativeName][studentId].push(currentStudentData);
        }
      }
    }
  });

  return studentsData;
}



app.delete('/api/delete/top_student', deleteTopStudent);
app.delete('/api/delete/Formative', deleteFormativeData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
