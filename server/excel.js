const ExcelJS = require('exceljs');
const fs = require('fs');

// قراءة ملف Excel الأصلي
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('C:\\Users\\DELL\\Downloads\\we\\server\\degree.xlsx')
    .then(originalWorkbook => {
        // قائمة بأسماء الورقات في الملف الأصلي
        const originalSheetNames = ['Data', 'Groups', 'Grades'];

        // إنشاء 10 أوراق عمل جديدة
        for (let i = 1; i <= 10; i++) {
            const newWorkbook = new ExcelJS.Workbook();

            // لكل ورقة في القائمة
            originalSheetNames.forEach(originalSheetName => {
                // نسخ الورقة الأصلية إلى الورقة الجديدة
                const originalSheet = originalWorkbook.getWorksheet(originalSheetName);
                const newSheet = newWorkbook.addWorksheet(`${originalSheetName}_Copy${i}`);
                originalSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                    const newRow = newSheet.getRow(rowNumber);
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        const newCell = newRow.getCell(colNumber);
                        newCell.value = cell.value;
                    });
                });
            });

            // حفظ الورقة الجديدة في ملف Excel منفصل
            newWorkbook.xlsx.writeFile(`C:\\Users\\DELL\\Downloads\\we\\server\\degree_copy_${i}.xlsx`)
                .then(() => console.log(`File ${i} created successfully`))
                .catch(err => console.error(err));
        }
    })
    .catch(err => console.error(err));
