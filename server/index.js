const express = require('express');
const app = express();
const port = 8080;
const mysql = require("mysql2");
var cors = require("cors");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const query = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zoz"
});
app.get('/status', (req, res) => {
    res.status(200).json({ status: 'Server is online' });
});
app.get('/api/get/delay_absence', (req, res) => {
    const query = 'SELECT * FROM delay_absence';
    queryPromise(query)
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.error('Error fetching data from delay_absence:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
app.get('/api/get/accounts', async (req, res) => {
    try {
        const accountsData = await queryPromise(`SELECT * FROM account `);

        res.json({ accounts: accountsData });
    } catch (error) {
        console.error('Error retrieving accounts information:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
app.get('/api/get/absence', async (req, res) => {
    try {
        const absenceData = await queryPromise( `
        SELECT absence.*, student_info.name, school_info.class
        FROM absence
        JOIN student_info ON absence.student_id = student_info.student_id
        JOIN school_info ON absence.student_id = school_info.student_id
      `);

        res.json({ absence : absenceData });
    } catch (error) {
        console.error('Error retrieving accounts information:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    query.execute(`SELECT * FROM account WHERE email = '${email}' AND password = '${password}'`, (err, data) => {
        if (err) {
            res.json({ error: 'Internal Server Error', err });
        } else {
            if (data.length > 0) {
                res.json({ role: data[0].role, data: data });
            }
        }
    });
});
app.put('/api/change/:email', (req, res) => {
    const email = req.params.email;
    const { password } = req.body;
    query.execute(
        'UPDATE account SET password = ? WHERE email = ?',
        [password, email],
        (err, data) => {
            if (err) {
                res.json({ error: 'Internal Server Error', err });
            } else {
                res.json({ message: 'password updated successfully' });
            }
        }
    );
});
app.post('/api/register/student', (req, res) => {
    const {
        id, name, phone, date_of_birth, address, birth_certificate, middle_school_certificate,
        grade, specialization, class_num, parent_name, parent_email, parent_phone, id_card,
        religion, gender, nationality, email
    } = req.body;
    console.log('Received request body:', req.body);
    if (!id || !name || !phone || !date_of_birth || !address || !birth_certificate || !middle_school_certificate ||
        !grade || !specialization || !class_num || !parent_name || !parent_email || !parent_phone || !id_card ||
        !religion || !gender || !nationality || !email) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    query.execute(
        `INSERT INTO student_info (student_id, name, phone, email, religion, gender, nationality, date_of_birth, address, birth_certificate, middle_school_certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, phone, email, religion, gender, nationality, date_of_birth, address, birth_certificate, middle_school_certificate],
        (err, result) => {
            if (err) {
                console.error('Error registering student info:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                query.execute(
                    `INSERT INTO parent_info (student_id, parent_name, parent_email, parent_phone, id_card) VALUES (?, ?, ?, ?, ?)`,
                    [id, parent_name, parent_email, parent_phone, id_card],
                    (parentErr, parentResult) => {
                        if (parentErr) {
                            console.error('Error registering parent info:', parentErr);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            query.execute(
                                `INSERT INTO school_info (student_id, class, grade, specialization, absence, delays, permissions, competitions, violations) VALUES (?, ?, ?, ?, 0, 0, 0, 0, 0)`,
                                [id, class_num, grade, specialization],
                                (schoolErr, schoolResult) => {
                                    if (schoolErr) {
                                        console.error('Error registering school info:', schoolErr);
                                        res.status(500).json({ error: 'Internal Server Error' });
                                    } else {
                                        query.execute(
                                            `INSERT INTO absence (student_id) VALUES (?)`,
                                            [id],
                                            (absenceErr, absenceResult) => {
                                                if (absenceErr) {
                                                    console.error('Error adding student to absence table:', absenceErr);
                                                    res.status(500).json({ error: 'Internal Server Error' });
                                                } else {
                                                    query.execute(
                                                        `INSERT INTO delay_absence (student_id) VALUES (?)`,
                                                        [id],
                                                        (absenceErr, absenceResult) => {
                                                            if (absenceErr) {
                                                                console.error('Error adding student to absence table:', absenceErr);
                                                                res.status(500).json({ error: 'Internal Server Error' });
                                                            } else {
                                                                res.json({ message: 'Student registered successfully' });
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});
app.put('/api/update/student/:id', (req, res) => {
    const studentId = req.params.id;
    const {
        name, phone, date_of_birth, address, birth_certificate, middle_school_certificate,
        grade, specialization, class_num, parent_name, parent_email, parent_phone, id_card,
        religion, gender, nationality, email
    } = req.body;
    console.log('Received update request body:', req.body);

    if (!name || !phone || !date_of_birth || !address || !birth_certificate || !middle_school_certificate ||
        !grade || !specialization || !class_num || !parent_name || !parent_email || !parent_phone || !id_card ||
        !religion || !gender || !nationality || !email) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    query.execute(
        `UPDATE student_info 
        SET name = ?, phone = ?, email = ?, religion = ?, gender = ?, nationality = ?, date_of_birth = ?, 
            address = ?, birth_certificate = ?, middle_school_certificate = ? 
        WHERE student_id = ?`,
        [name, phone, email, religion, gender, nationality, date_of_birth, address, birth_certificate, middle_school_certificate, studentId],
        (err, result) => {
            if (err) {
                console.error('Error updating student info:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                query.execute(
                    `UPDATE parent_info 
                    SET parent_name = ?, parent_email = ?, parent_phone = ?, id_card = ? 
                    WHERE student_id = ?`,
                    [parent_name, parent_email, parent_phone, id_card, studentId],
                    (parentErr, parentResult) => {
                        if (parentErr) {
                            console.error('Error updating parent info:', parentErr);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            query.execute(
                                `UPDATE school_info 
                                SET class = ?, grade = ?, specialization = ? 
                                WHERE student_id = ?`,
                                [class_num, grade, specialization, studentId],
                                (schoolErr, schoolResult) => {
                                    if (schoolErr) {
                                        console.error('Error updating school info:', schoolErr);
                                        res.status(500).json({ error: 'Internal Server Error' });
                                    } else {
                                        res.json({ message: 'Student information updated successfully' });
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});
async function updateViolationsCount(student) {
    const violationsResult = await queryPromise('SELECT COUNT(*) AS violationCount FROM violations WHERE student_id = ?', [student.student_id]);
    const violationCount = violationsResult[0].violationCount;
    await queryPromise('UPDATE school_info SET violations = ? WHERE student_id = ?', [violationCount, student.student_id]);
    const delaysResult = await queryPromise('SELECT COUNT(*) AS delayCount, GROUP_CONCAT(date_of_violation) AS lastDelayDates FROM violations WHERE student_id = ? AND name_of_violation = "delay" GROUP BY student_id', [student.student_id]);
    if (delaysResult[0]) {
        const delayCount = delaysResult[0].delayCount;
        await queryPromise('UPDATE school_info SET delays = ? WHERE student_id = ?', [delayCount, student.student_id]);
        if (delayCount && (delayCount >= 7 || delayCount % 7 === 0)) {
            const lastDelayDates = delaysResult[0].lastDelayDates;
            student.lastDelay = lastDelayDates.split(',');
            let array_days = [];
            for (let index = 0; index < student.lastDelay.length; index++) {
                let test = index + 1;
                if (test % 7 === 0) {
                    array_days.push(student.lastDelay[index]);
                }
            }
            student.lastDelay = array_days;
        }
    }
}
async function updateCompetitionsCount(student) {
    const competitionsResult = await queryPromise('SELECT COUNT(*) AS competitionsCount FROM competitions WHERE student_id = ? AND joined="After"', [student.student_id]);
    const competitionsCount = competitionsResult[0].competitionsCount;
    await queryPromise('UPDATE school_info SET competitions = ? WHERE student_id = ?', [competitionsCount, student.student_id]);
}
async function updatePermissionsCount(student) {
    const permissionsResult = await queryPromise('SELECT COUNT(*) AS permissionsCount FROM permissions WHERE student_id = ?', [student.student_id]);
    const permissionsCount = permissionsResult[0].permissionsCount;
    await queryPromise('UPDATE school_info SET permissions = ? WHERE student_id = ?', [permissionsCount, student.student_id]);
}
async function updateDelayInAbsence(student) {
    try {
        const delayResult = await queryPromise(`SELECT date_of_delay FROM delay_absence WHERE student_id = '${student.student_id}'`);
        const delayData = delayResult[0];
        let len;
        if (!delayData.date_of_delay) {
            len = 0;
        } else {
            const delayArray = delayData.date_of_delay.split(",");
            len = delayArray.length;
        }
        await queryPromise(`UPDATE absence SET date_of_delay ='${len}' WHERE student_id = '${student.student_id}'`);
    } catch (error) {
        console.error('Error updating delay in absence:', error);
        throw error;
    }
}
async function updateAbsenceInSchoolInfo(student) {
    try {
        const absenceResult = await queryPromise(`SELECT date_of_absence, date_of_delay FROM absence WHERE student_id = '${student.student_id}'`);
        const absenceData = absenceResult[0];
        let len;
        if (!absenceData.date_of_absence) {
            absenceData.date_of_absence = 0;
            len = absenceData.date_of_absence + absenceData.date_of_delay;
        } else {
            const absenceArray = absenceData.date_of_absence.split(",");
            len = absenceArray.length + absenceData.date_of_delay;
        }
        await queryPromise(`UPDATE school_info SET absence ='${len}' WHERE student_id = '${student.student_id}'`);
    } catch (error) {
        console.error('Error updating absence in school_info:', error);
        throw error;
    }
}
function queryPromise(sql, params) {
    return new Promise((resolve, reject) => {
        query.execute(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
app.get('/api/home', async (req, res) => {
    try {
        const studentsData = await queryPromise(`
            SELECT 
                s.student_id, s.name, s.phone, 
                sc.class, sc.grade, sc.specialization, 
                sc.absence, sc.delays, sc.permissions, sc.competitions, sc.violations,
                a.date_of_absence,
                p.parent_email, p.parent_phone
            FROM 
                student_info s
            JOIN 
                school_info sc ON s.student_id = sc.student_id
            JOIN 
                parent_info p ON s.student_id = p.student_id
            LEFT JOIN 
                absence a ON s.student_id = a.student_id
        `);
        if (studentsData.length === 0) {
            res.json({ error: 'No student data available' });
            return;
        }
        for (const student of studentsData) {
            await updateViolationsCount(student);
            await updateCompetitionsCount(student);
            await updatePermissionsCount(student);
            await updateDelayInAbsence(student);
            await updateAbsenceInSchoolInfo(student);
        }
        res.json({ students: studentsData });
    } catch (error) {
        console.error('Error retrieving and updating student information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/get/student/:id', async (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        return res.status(400).json({ error: 'Missing student ID parameter' });
    }
    try {
        const studentsData = await queryPromise(`SELECT 
            s.*, 
            p.parent_email, p.parent_phone, 
            sc.class, sc.grade, sc.specialization, 
            sc.absence, sc.delays, sc.permissions, sc.competitions, sc.violations,
            a.date_of_absence,
            da.date_of_delay  -- اضفت هذا الجزء للحصول على قيمة date_of_delay
        FROM 
            student_info s
        LEFT JOIN 
            parent_info p ON s.student_id = p.student_id
        LEFT JOIN 
            school_info sc ON s.student_id = sc.student_id
        LEFT JOIN
            absence a ON s.student_id = a.student_id
        LEFT JOIN
            delay_Absence da ON s.student_id = da.student_id -- اضفت هذا الجزء للانضمام إلى جدول delay_Absence
        WHERE 
            s.student_id = ?`, [studentId]);
        if (studentsData.length === 0) {
            return res.json({ error: 'No student data available' });
        }
        const student = studentsData[0];
        await updateCount('violations', 'violationCount', '', 'delays', '', student);
        await updateCount('competitions', 'competitionsCount', null, null, null, student);
        await updateCount('permissions', 'permissionsCount', null, null, null, student);
        await updateDelayInAbsence(student);
        await updateAbsenceInSchoolInfo(student);
        res.json({ student });
    } catch (error) {
        console.error('Error retrieving and updating student information:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
async function updateCount(table, countField, conditionField, conditionValue, additionalField, student) {
    const countQuery = `SELECT COUNT(*) AS ${countField} FROM ${table} WHERE student_id = ?${conditionField ? ` AND ${conditionField} = "${conditionValue}"` : ''}`;
    const countResult = await queryPromise(countQuery, [student.student_id]);
    const count = countResult[0][countField];
    const updateQuery = `UPDATE school_info SET ${table} = ?${additionalField ? `, ${additionalField} = ?` : ''} WHERE student_id = ?`;
    const updateParams = [count];
    if (additionalField) {
        updateParams.push(count, student.student_id);
    } else {
        updateParams.push(student.student_id);
    }
    await queryPromise(updateQuery, updateParams);
}
app.get('/api/get/students', async (req, res) => {
    try {
        const studentsData = await queryPromise( `SELECT 
        s.*, 
        p.parent_name,  /* Include parent_name in the SELECT statement */
        p.parent_email, p.parent_phone, 
        sc.class, sc.grade, sc.specialization, 
        sc.absence, sc.delays, sc.permissions, sc.competitions, sc.violations,
        a.date_of_absence,
        da.date_of_delay
    FROM 
        student_info s
    LEFT JOIN 
        parent_info p ON s.student_id = p.student_id
    LEFT JOIN 
        school_info sc ON s.student_id = sc.student_id
    LEFT JOIN
        absence a ON s.student_id = a.student_id
    LEFT JOIN
        delay_absence da ON s.student_id = da.student_id`);
        
        if (studentsData.length === 0) {
            res.status(404).json({ error: 'No students found' });
            return;
        }
        for (const student of studentsData) {
            await updateViolationsCount(student);
            await updateCompetitionsCount(student);
            await updatePermissionsCount(student);
            await updateDelayInAbsence(student);
            await updateAbsenceInSchoolInfo(student);
        }
        res.json({ students: studentsData });
    } catch (error) {
        console.error('Error retrieving and updating student information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/api/del/student/:id', (req, res) => {
    const studentId = req.params.id;

    // ترتيب الجداول بحسب الأولوية
    const tablesOrder = [
        'competitions',
        'permissions',
        'violations',
        'parent_info',
        'school_info',
        'absence',
        'delay_absence  ',
        'student_info'
    ];

    // تنفيذ الحذف بحسب الترتيب
    const deleteTable = (index) => {
        if (index < tablesOrder.length) {
            const tableName = tablesOrder[index];
            query.execute(`DELETE FROM ${tableName} WHERE student_id = ?`, [studentId], (err, data) => {
                if (err) {
                    res.json({ error: 'Internal Server Error', err });
                } else {
                    // الانتقال إلى الجدول التالي في الترتيب
                    deleteTable(index + 1);
                }
            });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    };

    // بدء الترتيب من أول جدول
    deleteTable(0);
});
app.put('/api/absence/:id', (req, res) => {
    const studentId = req.params.id;
    const { date_of_absence } = req.body;
    query.execute(
        'UPDATE absence SET date_of_absence =? WHERE student_id = ?',
        [date_of_absence, studentId],
        (err, data) => {
            if (err) {
                res.json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'absence update successfully' });
            }
        }
    );
});
app.put('/api/delay_absence/:id', (req, res) => {
    const studentId = req.params.id;
    const { date_of_delay } = req.body;
    query.execute(
        'UPDATE delay_absence SET date_of_delay =? WHERE student_id = ?',
        [date_of_delay, studentId],
        (err, data) => {
            if (err) {
                res.json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'delay update successfully' });
            }
        }
    );
});
app.put('/api/absence', (req, res) => {
    const updates = req.body;
    if (!Array.isArray(updates)) {
        res.status(400).json({ error: 'Invalid updates format. It should be an array of objects.' });
        return;
    }
    Promise.all(
        updates.map(update => {
            const { studentId, date_of_absence } = update;
            return new Promise((resolve, reject) => {
                query.execute(
                    'UPDATE absence SET date_of_absence = ? WHERE student_id = ?',
                    [date_of_absence, studentId],
                    (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        })
    )
        .then(() => {
            res.json({ message: 'absence updated successfully' });
        })
        .catch((error) => {
            console.error('Error updating absence:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
app.put('/api/delay_absence', (req, res) => {
    const updates = req.body;
    if (!Array.isArray(updates)) {
        res.status(400).json({ error: 'Invalid updates format. It should be an array of objects.' });
        return;
    }
    Promise.all(
        updates.map(update => {
            const { studentId, date_of_delay } = update;
            return new Promise((resolve, reject) => {
                query.execute(
                    'UPDATE delay_absence SET date_of_delay = ? WHERE student_id = ?',
                    [date_of_delay, studentId],
                    (err, data) => {
                        if (err) {
                            console.error('Error updating date_of_delay in delay_absence:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        })
    )
        .then(() => {
            res.json({ message: 'delay updated successfully' });
        })
        .catch((error) => {
            console.error('Error updating absence:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
app.post('/api/addViolation', (req, res) => {
    const { name, name_of_violation, date_of_violation, note } = req.body;
    if (!name || !name_of_violation || !date_of_violation || !note) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    query.execute(
        'SELECT student_id FROM student_info WHERE name = ?',
        [name],
        (err, result) => {
            if (err) {
                console.error('Error retrieving student ID:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            const studentId = result[0].student_id;
            query.execute(
                'INSERT INTO violations (student_id, name_of_violation, date_of_violation, note,name) VALUES (?, ?, ?, ?,?)',
                [studentId, name_of_violation, date_of_violation, note, name],
                (violationErr, violationResult) => {
                    if (violationErr) {
                        console.error('Error adding violation:', violationErr);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    res.json({ message: 'Violation added successfully' });
                }
            );
        }
    );
});
app.get('/api/getViolations/:id', (req, res) => {
    const studentId = req.params.id;
    query.execute(`SELECT * FROM violations where student_id='${studentId}'`, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'No violations found' });
            }
        }
    });
});
app.get('/api/getViolations', (req, res) => {
    query.execute(`
    SELECT violations.*, school_info.class
    FROM violations
    JOIN school_info ON violations.student_id = school_info.student_id`, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'No violations found' });
            }
        }
    });
});
app.delete('/api/deleteViolation', (req, res) => {
    const { studentId, violationName, dateOfViolation } = req.body;
    if (!studentId || !violationName || !dateOfViolation) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    query.execute(
        'DELETE FROM violations WHERE student_id = ? AND name_of_violation = ? AND date_of_violation = ?',
        [studentId, violationName, dateOfViolation],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ message: 'Violation deleted successfully' });
                } else {
                    res.json({ error: 'No matching violation found' });
                }
            }
        }
    );
});
app.post('/api/add/competitions', (req, res) => {
    const { name, name_of_competition, rank ,date_of_competition,joined	} = req.body;
    if (!name || !name_of_competition ||!date_of_competition||!joined) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    if (!rank) {
        rank=0.1
    }
    query.execute(
        'SELECT student_id FROM student_info WHERE name = ?',
        [name],
        (err, results) => {
            if (err) {
                console.error('Error fetching student IDs:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            results.forEach(result => {
                const studentId = result.student_id;
                query.execute(
                    'INSERT INTO competitions (student_id, name_of_competition, rank,date_of_competition,joined) VALUES (?, ?, ?,?,?)',
                    [studentId, name_of_competition, rank,date_of_competition,joined],
                    (insertErr, insertResult) => {
                        if (insertErr) {
                            console.error('Error adding competitions:', insertErr);
                            res.status(500).json({ error: 'Internal Server Error' });
                        }
                    }
                );
            });
            res.json({ message: 'competitions added successfully' });
        }
    );
});
app.get('/api/get/competitions', (req, res) => {
    query.execute('SELECT competitions.*, school_info.grade, school_info.class, student_info.name FROM competitions JOIN school_info ON competitions.student_id = school_info.student_id JOIN student_info ON competitions.student_id = student_info.student_id', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (data.length > 0) {
                // تحقق مما إذا كان هناك معلومات عن الصف والفصل
                const competitionsWithGradeAndClass = data.map(competition => {
                    return {
                        ...competition,
                        grade: competition.grade || 'N/A', // استخدام 'N/A' إذا لم يتم العثور على معلومات الصف
                        class: competition.class || 'N/A', // استخدام 'N/A' إذا لم يتم العثور على معلومات الفصل
                        name: competition.name || 'N/A', // استخدام 'N/A' إذا لم يتم العثور على معلومات الاسم
                    };
                });
                res.json(competitionsWithGradeAndClass);
            } else {
                res.json({ message: 'No competitions found' });
            }
        }
    });
});
app.get('/api/get/competitions/:id', (req, res) => {
    const studentId = req.params.id;

    query.execute(
        'SELECT competitions.*, school_info.grade, school_info.class FROM competitions JOIN school_info ON competitions.student_id = school_info.student_id WHERE competitions.student_id = ?',
        [studentId],
        (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (data.length > 0) {
                    // Check if there is information about the grade and class
                    const competitionsWithGradeAndClass = data.map(competition => {
                        return {
                            ...competition,
                            grade: competition.grade || 'N/A',
                            class: competition.class || 'N/A',
                        };
                    });
                    res.json(competitionsWithGradeAndClass);
                } else {
                    res.json({ message: 'No competitions found for the specified student ID' });
                }
            }
        }
    );
});
app.delete('/api/del/competitions', (req, res) => {
    const { studentId, name_of_competition, date_of_competition, rank , joined } = req.body;
    if (!studentId || !name_of_competition ||!date_of_competition || !joined) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    if (!rank) {
        rank = 0
    }
    query.execute(
        'DELETE FROM competitions WHERE student_id = ? AND name_of_competition = ? AND date_of_competition=? AND rank =? AND joined =?',
        [studentId, name_of_competition,date_of_competition ,rank , joined],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ message: 'competitions deleted successfully' });
                } else {
                    res.json({ error: 'No matching competitions found' });
                }
            }
        }
    );
});


app.post('/api/add/permissions', (req, res) => {
    const { name, date_of_permission, note } = req.body;
    if (!name || !date_of_permission || !note) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    query.execute(
        'SELECT student_id FROM student_info WHERE name = ?',
        [name],
        (err, results) => {
            if (err) {
                console.error('Error fetching student IDs:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            results.forEach(result => {
                const studentId = result.student_id;
                query.execute(
                    'INSERT INTO permissions (student_id, date_of_permission, note,name) VALUES (?, ?, ?,?)',
                    [studentId, date_of_permission, note, name],
                    (insertErr, insertResult) => {
                        if (insertErr) {
                            console.error('Error adding permission:', insertErr);
                            res.status(500).json({ error: 'Internal Server Error' });
                        }
                    }
                );
            });
            res.json({ message: 'Permissions added successfully' });
        }
    );
});


app.get('/api/get/permissions/:id', (req, res) => {
    const studentId = req.params.id;
    query.execute(`SELECT * FROM permissions where student_id='${studentId}'`, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'No permissions found' });
            }
        }
    });
});
app.get('/api/get/permissions', (req, res) => {
    query.execute(`
    SELECT permissions.*, school_info.class
    FROM permissions
    JOIN school_info ON permissions.student_id = school_info.student_id` 
    , (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: 'No permissions found' });
            }
        }
    });
});
app.delete('/api/del/permissions', (req, res) => {
    const { studentId, dateOfpermission } = req.body;
    if (!studentId || !dateOfpermission) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    query.execute(
        'DELETE FROM permissions WHERE student_id = ? AND date_of_permission = ?',
        [studentId, dateOfpermission],
        (err, result) => {
            if (err) {
                console.error(err); // سجل الخطأ هنا
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows > 0) {
                    res.json({ message: 'Permission deleted successfully' });
                } else {
                    res.json({ error: 'No matching permission found' });
                }
            }
        }
    );
});





  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

