const mysql = require('mysql2/promise');
const ExcelJS = require('exceljs');
const path = require('path');

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zoz',
};

async function fetchDataAndAppendToExcel(table) {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.query(`SELECT * FROM ${table}`);
    const excelFilename = `${table}.xlsx`;

    let workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
      // Attempt to read the existing workbook
      workbook = await ExcelJS.Workbook.xlsx.readFile(excelFilename);
    } catch (readFileError) {
      // If the file doesn't exist, create a new workbook
      workbook = new ExcelJS.Workbook();
    }

    // Check if the worksheet already exists based on the configuration
    worksheet = workbook.getWorksheet(table);

    if (!worksheet) {
      // If the worksheet doesn't exist, create a new sheet
      worksheet = workbook.addWorksheet(table);

      // Add column headers for a new sheet
      if (rows.length > 0) {
        const numQuestions = rows[0].Num_Of_Questions || 0;
        const headerRow = ['student_id', 'Formative', 'Num_Of_Questions', 'T', 'W', 'NA', 'Percentage', 'FinalEvaluation', 'StudentCase','num_of_competenceis' , 'num_of_competency_questions', ...Array.from({ length: numQuestions }, (_, i) => i + 1)];
        worksheet.addRow(headerRow);
      } else {
        // If the table is empty, manually add headers
        worksheet.addRow(['student_id', 'Formative', 'Num_Of_Questions', 'T', 'W', 'NA', 'Percentage', 'FinalEvaluation', 'StudentCase' , 'num_of_competenceis' , 'num_of_competency_questions']);
      }
    }

    // Define headers outside the loop
    const headers = worksheet.columns ? worksheet.columns.map((col) => col.key) : [];

    // Process each row and update the values based on 'W' and 'NA'
    for (let i = 0; i < rows.length; i++) {
      const rowData = Object.values(rows[i]);
      const numQuestions = rows[i].Num_Of_Questions || 0;
      const wValue = rows[i].W;
      const naValue = rows[i].NA;

      // Get the values from the 'W' column
      const wValuesArray = wValue ? wValue.split(',').map(Number) : [];

      // Get the values from the 'NA' column
      const naValuesArray = naValue ? naValue.split(',').map(Number) : [];

      // Create an array with values for each column
      const valuesRow = Array.from({ length: numQuestions }, (_, j) => {
        if (wValuesArray.includes(j + 1)) {
          return 'W';
        } else if (naValuesArray.includes(j + 1)) {
          return 'NA';
        } else {
          return 'R';
        }
      });

      // Add the row to the worksheet
      worksheet.addRow([...rowData, ...valuesRow]);
    }

    // Save the Excel file
    await workbook.xlsx.writeFile(excelFilename, { flag: 'w' });

    console.log(`Data from '${table}' table has been appended to '${excelFilename}'.`);
  } catch (error) {
    console.error(`Error fetching data from '${table}':`, error);
  } finally {
    await connection.end();
  }
}


async function processTables() {
  const outputPath = 'C:\\Users\\DELL\\Downloads\\we\\server\\rsd'; // Specify the output path here

  // List of table names
  const tableNames = [
    'Optimization', 'Top_Student', 'Specialty',
    'Arabic', 'English', 'Math', 'Physics', 'Social_Studies',
    'Economy', 'Auto_Cad', 'ICT', 'National_Education'
  ];

  // Fetch data and append to a single Excel sheet for each table
  for (const tableName of tableNames) {
    await fetchDataAndAppendToExcel(tableName, outputPath);
  }
}

// Call the asynchronous function
processTables()
  .then(() => {
    console.log('Processing completed successfully.');
  })
  .catch((error) => {
    console.error('Error during processing:', error);
  });