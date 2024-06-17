import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
// Inside your component or App file
import WEImage from './WE.png';
import moment from 'moment';
// Your component or App code here

function Attendance() {

  let [showAlert, setShowAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState('');
  let [alertColor, setAlertColor] = useState('');


  let [DataForDataList, SetDataForDataList] = useState("");
  let [CloseDataList, SetCloseDataList] = useState(true);
  let [HandleCloseDataList, SetHandleCloseDataList] = useState(false);

  function checkInputValue(event) {
    var inputElement = event.target;
    var dataListId = inputElement.getAttribute("list");
    var dataListOptions = document.getElementById(dataListId).options;
    var inputValue = inputElement.value;

    let isValueFound = false;

    for (let i = 0; i < dataListOptions.length; i++) {
      if (dataListOptions[i].value === inputValue) {
        isValueFound = true;
        SetCloseDataList(true);
        break;
      }
    }

    if (isValueFound) {
      SetHandleCloseDataList(true);


    } else {
      SetDataForDataList(inputValue);
      SetHandleCloseDataList(false);
      SetCloseDataList(false);
    }
  }


  let showAlertWithMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  let hideAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  useEffect(() => {

    if (showAlert) {
      let timeoutId = setTimeout(() => {
        hideAlert();
      }, 5000);


      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);


  let [mydata, SetMydata] = useState([]);
  let [Code, SetCode] = useState("");
  let [DelCode, SetDelCode] = useState("");
  let [updateCode, setUpdatedCode] = useState("");
  let [DelName, SetDelName] = useState("");
  let [DelClass, SetDelClass] = useState("");
  let [DelDate, SetDelDate] = useState("");
  let [absentdelState, setAbsentdelState] = useState(false);;
  let [absentUpdateState, setabsentUpdateState] = useState(false);
  let [updatedStudentCode, setUpdatedStudentCode] = useState("");
  let [updatedDate, setUpdatedDate] = useState("");
  let [updatedClass, setUpdatedClass] = useState("");
  let [updatedName, setUpdatedName] = useState("");
  let [updatedSearchResult, setUpdatedSearchResult] = useState("");
  let [loading, setLoading] = useState(true);
  let [searchResult, setSearchResult] = useState([]);
  let [searchDelResult, setDelSearchResult] = useState([]);
  let [UpdatedNewDate, setUpdatedNewDate] = useState('');
  let [updatecheckbox1, setupdatecheckbox1] = useState(false);
  let [updatecheckbox2, setupdateCheckbox2] = useState(false);


  let handleupdateCheckbox2Change = () => {
    setupdatecheckbox1(!updatecheckbox2);
    setupdateCheckbox2(!updatecheckbox2);
  };
  let [removecheckbox1, setRemovecheckbox1] = useState(false);
  let [removecheckbox2, setRemoveCheckbox2] = useState(false);
  let handleupdatecheckbox1Change = () => {
    setupdatecheckbox1(!updatecheckbox1);
    setupdateCheckbox2(!updatecheckbox1); // تحديث حالة الصندوق الثاني لتكون نفس قيمة الصندوق الأول
  };
  let handleRemoveCheckbox1Change = () => {
    setRemovecheckbox1(!removecheckbox1);
    setRemoveCheckbox2(!removecheckbox1); // تحديث حالة الصندوق الثاني لتكون نفس قيمة الصندوق الأول
  };
  let handleRemoveCheckbox2Change = () => {
    setRemovecheckbox1(!removecheckbox2);
    setRemoveCheckbox2(!removecheckbox2);
  };
  let [violations, setViolations] = useState([]);

  const getViolations = async (val) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/getViolations/`);
        setViolations(response.data);
        setLoading(false);

    } catch (error) {
        console.error('Error retrieving violations:', error);
        setLoading(false);
    }
};



useEffect(() => {
  getViolations();
 
})


  async function RemoveAbsence_InDataBase(body) {
    try {
      await axios.put(`http://localhost:8080/api/absence/${DelCode}`, body);
      console.log('Absence Removed successfully');
    } catch (error) {
      console.error('Error remove student:', error);
    }
  }

  async function UpdateAbsence_InDataBase(body) {
    try {

      await axios.put(`http://localhost:8080/api/absence/${updateCode}`, body);
      console.log('Absence updated successfully');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/get/students')
      .then(response => {
        SetMydata(response.data.students);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error retrieving student information:', error);
        setLoading(false);
      });
  }, [Code]);




  let [permissionData, SetPermissionData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/get/permissions`)
      .then(response => {
        SetPermissionData(response.data);

        setLoading(false);

      })
      .catch(error => {
        console.error('Error retrieving student information:', error);
        setLoading(false);
      });
  });







  let handleSearch = () => {
    if (Code.length === 0 || selectedDate.length === 0) {
      showAlertWithMessage("يرجى ملء جميع الحقول");
      setAlertColor("danger");
    }
    else if (CloseDataList === false) {
      showAlertWithMessage(`هذه القيمه خاطئه يرجي الاختيار من القائمه ${DataForDataList}`);
      setAlertColor("danger");
      if (HandleCloseDataList === true) {
        SetCloseDataList(true);
      }

    }

    else {
      let foundStudent = mydata.find((student) => student.student_id === Code || student.name === Code);

      if (!foundStudent) {
        showAlertWithMessage("الكود غير موجود في قاعدة البيانات");
        setAlertColor("danger");
        SetCode("");
        setSelectedDate("");
      } else {
        let uniqueDates = getUniqueDates(foundStudent.student_id);

        if (uniqueDates.includes(selectedDate)) {
          showAlertWithMessage("الطالب مضاف بالفعل لهذا التاريخ في قاعده البيانات");
          setAlertColor("danger");
        } else if (
          searchResult.some(
            (student) => (student.code === foundStudent.student_id || student.name === foundStudent.name) && student.date === selectedDate
          )
        ) {
          showAlertWithMessage("الطالب مضاف بالفعل لهذا التاريخ في الجدول");
          setAlertColor("danger");
        } else if (permissionData.length > 0 ? permissionData.some(permission => permission.student_id === Code && formatDate(permission.date_of_permission) === formatDate(selectedDate)) : "") {

          showAlertWithMessage("الطالب مسجل في الإذونات. لا يمكن إضافته في الغياب.");
          setAlertColor("danger");
        }
        else if (violations.length > 0 ? violations.some(violation => violation.student_id === Code && formatDate(violation.date_of_violation) === formatDate(selectedDate)) : "") {

          showAlertWithMessage("الطالب مسجل في المخالفات. لا يمكن إضافته في الغياب.");
          setAlertColor("danger");
        }

        else {
          let result = {
            code: foundStudent.student_id,
            name: foundStudent.name,
            class: foundStudent.class,
            date: selectedDate,
          };
          addAbsent(result);
          SetCode("");
          //-----------------
          setSelectedDate("");

        }
      }
    }
  };


  let addAbsent = (newStudent) => {
    setSearchResult((prevSearchResult) => [...prevSearchResult, newStudent]);
  };

  let handleCheckAll = (isChecked) => {
    let updatedSearchResult = searchResult.map((student) => ({
      ...student,
      isChecked,
    }));
    setSearchResult(updatedSearchResult);
  };

  let handleCheck = (index) => {
    let updatedSearchResult = [...searchResult];
    updatedSearchResult[index].isChecked = !updatedSearchResult[index].isChecked;
    setSearchResult(updatedSearchResult);
  };


  let handleSubmit = async () => {

    let allUsersSelected = searchResult.every((student) => student.isChecked);

    if (!allUsersSelected) {
      showAlertWithMessage("الرجاء تحديد جميع الطلاب قبل الإرسال");
      setAlertColor("danger");
      return;
    }


    if (searchResult.length === 0) {
      showAlertWithMessage("يرجي تعبئه الجدول بالبيانات المطلوبه لاضافه الغياب للطلاب");
      setAlertColor("danger");
      return;
    }

    let updatedData = searchResult.map((result) => {
      let foundStudentIndex = mydata.findIndex((student) => student.student_id === result.code);

      if (foundStudentIndex !== -1) {
        let student = mydata[foundStudentIndex];
        let updatedDates = student.date_of_absence !== null ? student.date_of_absence.split(',') : [];

        updatedDates.push(result.date);
        updatedDates = updatedDates ? updatedDates.filter(date => date.trim() !== '') : "";

        student.date_of_absence = updatedDates.join(',');

        console.log(student.date_of_absence);

        return { studentId: student.student_id, date_of_absence: student.date_of_absence };

      } else {
        showAlertWithMessage(`الكود غير موجود للطالب: ${result.name} (${result.code})`);
        setAlertColor("danger");
        return {};
      }
    });

    addAbsence_InDataBase(updatedData);
    showAlertWithMessage("تمت اضافه الغياب بنجاح")
    setAlertColor("success");

    setSearchResult([]);

  };


  let handleDelSearch = () => {


    if (DelCode.length === 0 || DelDate.length === 0) {
      showAlertWithMessage("يرجى ملء جميع الحقول");
      setAlertColor("danger");
    }
    else if (CloseDataList === false) {
      showAlertWithMessage(`هذه القيمه خاطئه يرجي الاختيار من القائمه ${DataForDataList}`);
      setAlertColor("danger");
      if (HandleCloseDataList === true) {
        SetCloseDataList(true);
      }

    }

    else {

      let foundStudent = mydata.find((student) => student.student_id === DelCode || student.name === DelCode);

      if (!foundStudent) {
        showAlertWithMessage("الكود غير موجود في القاعدة");
        setAlertColor("danger");
        SetDelCode(DelCode);
        SetDelDate(DelDate);
      }

      else if (DelDate === "الطالب لم يغيب اي يوم") {
        showAlertWithMessage("الطالب لم يغيب اي يوم");
        setAlertColor("danger");
        SetDelCode("");
        SetDelDate("");
      }


      else {

        let result = [`${foundStudent.student_id}`, `${foundStudent.name}`, `${foundStudent.class}`, `${DelDate}`];
        setDelSearchResult(result);
        console.log(searchDelResult)

        setAbsentdelState(true);


      }
    }
  };

  let handleUpdatedSearch = () => {
    if (updateCode.length === 0 || updatedDate.length === 0 || UpdatedNewDate.length === 0) {
      showAlertWithMessage("يرجى ملء جميع الحقول");
      setAlertColor("danger");
    }
    else if (CloseDataList === false) {
      showAlertWithMessage(`هذه القيمه خاطئه يرجي الاختيار من القائمه ${DataForDataList}`);
      setAlertColor("danger");
      if (HandleCloseDataList === true) {
        SetCloseDataList(true);
      }

    }

    else {
      // Check if the entered code exists in mydata array
      let foundStudent = mydata.find((student) => student.student_id == updateCode || student.name === updateCode);

      if (!foundStudent) {
        showAlertWithMessage("الكود غير موجود في القاعدة");
        setAlertColor("danger");
        setUpdatedCode(updateCode);
        setUpdatedDate(updatedDate);
        setUpdatedNewDate(UpdatedNewDate);
      } else if (updatedDate === "لا يوجد أيام لتعديلها") {
        showAlertWithMessage("لا يوجد أيام لتعديلها");
        setAlertColor("danger");
      } else {
        // Split date_of_absence array based on comma
        let datesOfAbsence = foundStudent.date_of_absence ? foundStudent.date_of_absence.split(',') : "";

        // Check if UpdatedNewDate exists in datesOfAbsence
        let isNewDateExists = datesOfAbsence.includes(UpdatedNewDate);

        if (isNewDateExists) {
          showAlertWithMessage("التاريخ الجديد موجود في قاعدة البيانات ولا يمكن التعديل عليه.");
          setAlertColor("danger");
        }
        else if (permissionData.length > 0 ? permissionData.some(permission => permission.student_id === updateCode && formatDate(permission.date_of_permission) === formatDate(UpdatedNewDate)) : "") {

          showAlertWithMessage("الطالب مسجل في الإذونات. لا يمكن إضافته في الغياب.");
          setAlertColor("danger");
        }
        else if (violations.length > 0 ? violations.some(violation => violation.student_id === updateCode && formatDate(violation.date_of_violation) === formatDate(UpdatedNewDate)) : "") {

          showAlertWithMessage("الطالب مسجل في المخالفات. لا يمكن إضافته في الغياب.");
          setAlertColor("danger");
        }
        
        else {
          // Code is valid, update the state with the search result
          let result = [`${foundStudent.student_id}`, `${foundStudent.name}`, `${foundStudent.class}`, `${updatedDate}`, `${UpdatedNewDate}`];
          setUpdatedSearchResult(result);
          setabsentUpdateState(true);
        }
      }
    }
  };


  function updateAbsent(e) {
    if (updatecheckbox2 && absentUpdateState) {
      let findStudentIndex = mydata.findIndex(
        (student) =>
          student.student_id === updateCode || student.name === updateCode
      );

      // التحقق مما إذا كان أي من الحقول المطلوبة فارغة
      if (!updateCode || !updatedDate || !UpdatedNewDate) {
        showAlertWithMessage("يرجى ملء جميع الحقول");
        setAlertColor("danger");
        e.preventDefault(); // منع إرسال النموذج
        return;
      }



      if (updatedSearchResult[0] !== updateCode || updatedSearchResult[3] !== updatedDate || updatedSearchResult[4] !== UpdatedNewDate) {
        showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
        setAlertColor("danger");
        e.preventDefault(); // Prevent form submission
        return;
      }

      if (findStudentIndex !== -1) {
        // تحديث التاريخ في السجل الخاص بالطالب
        let student = mydata[findStudentIndex];
        let updatedDates = student.date_of_absence ? student.date_of_absence.split(',') : [];

        // التحقق مما إذا كان التاريخ القديم موجودًا في المصفوفة
        let oldDateIndex = updatedDates.indexOf(updatedDate);
        if (oldDateIndex !== -1) {
          // قم بتحديث القيمة القديمة بالتاريخ الجديد
          updatedDates[oldDateIndex] = UpdatedNewDate;
        }

        student.date_of_absence = updatedDates.join(',');

        let body = {
          "studentId": student.student_id, "date_of_absence": student.date_of_absence
        }

        UpdateAbsence_InDataBase(body);
        console.log("body2 :", body);
        setUpdatedClass("");
        setUpdatedDate("");
        setUpdatedStudentCode("");
        setUpdatedName("");
        setUpdatedSearchResult("");
        setUpdatedCode("");

        setUpdatedNewDate("");
        showAlertWithMessage("تم تعديل الغياب للطالب بنجاح");
        setAlertColor("success");

        setupdatecheckbox1(false);
      } else {
        console.log("الطالب غير موجود");
      }
    }
    if (!updatedSearchResult && updatedSearchResult.length === 0) {
      showAlertWithMessage("يرجي تعبئه الجدول بالبيانات المطلوبه لتعديل الغياب");
      setAlertColor("danger");
    }

    if (updatedSearchResult.length > 0 && updatecheckbox2 === false) {
      showAlertWithMessage("يجب تحديد الطالب للتعديل عليه");
      setAlertColor("danger");
    }
  }


  function removeAbsent(e) {
    if (!DelCode || !DelDate) {
      showAlertWithMessage("يرجى تعبئة الجدول بالبيانات المطلوبة لحذف الغياب");
      setAlertColor("danger");
      e.preventDefault();
      return;
    }



    if (removecheckbox2 === false && absentdelState === true) {
      showAlertWithMessage("يرجى اختيار الخيار لإزالة الطالب");
      setAlertColor("danger");
      e.preventDefault(); // منع تقديم النموذج
    }


    else if (searchDelResult[0] !== DelCode || searchDelResult[3] !== DelDate) {
      showAlertWithMessage("يرجى التحقق من تطابق بيانات الإنبوت مع بيانات الجدول");
      setAlertColor("danger");
      e.preventDefault();
    }

    else {

      let findStudentIndex = mydata.findIndex((student) => student.student_id === DelCode || student.name === DelCode);

      if (findStudentIndex !== -1) {

        let student = mydata[findStudentIndex];
        let updatedDates = student.date_of_absence ? student.date_of_absence.split(',') : [];

        updatedDates.push(DelDate);
        student.date = updatedDates.join(',');

        // إزالة القيمة المحددة من المصفوفة date
        let filteredDates = updatedDates.filter((date) => date !== DelDate);
        student.date_of_absence = filteredDates.join(',');
        let body = {
          "studentId": student.student_id, "date_of_absence": student.date_of_absence
        }

        RemoveAbsence_InDataBase(body);
        console.log("body:", body);

        // إعادة تعيين حقول الإدخال
        SetDelClass("");
        SetDelDate("");
        SetDelCode("");
        SetDelName("");
        setDelSearchResult("");
        showAlertWithMessage("تم حذف الغياب للطالب بنجاح");
        setAlertColor("success");

        setRemovecheckbox1(false);
        setRemoveCheckbox2(false);
      }
    }

  }

  let getUniqueDates = (val) => {
    let selectedStudent = mydata.find((student) => student.student_id === val || student.name === val);

    if (selectedStudent && selectedStudent.date_of_absence) {
      return selectedStudent.date_of_absence ? selectedStudent.date_of_absence.split(',').map((date) => date.trim()) : "";
    }

    return [];
  };




  let handleCodeChange = (e) => {
    let newCode = e.target.value;
    SetDelCode(newCode);
    console.log('DelCode:', newCode);
  };

  async function addAbsence_InDataBase(body) {
    try {
      await axios.put(`http://localhost:8080/api/absence`, body);
      console.log('Absence added successfully');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
  



  let [selectedDate, setSelectedDate] = useState('');


  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let currentDate = `${yyyy}-${mm}-${dd}`;
  function formatDate(dateString) {
    let formattedDate = moment(dateString).format('YYYY-MM-DD');
    return formattedDate;
  }
 




  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0"
      />
      <title>We School</title>
      <link rel="shortcut icon" href="assets/img/favicon.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />

      <div className="main-wrapper position-relative">
        <div className="header">
          <div className="header-left">
            <a href="index.html" className="logo">
              <img src={WEImage} alt="Logo" />
            </a>
            <a href="index.html" className="logo logo-small">
              <img
                src={WEImage}
                alt="Logo"
                width={30}
                height={30}
              />
            </a>
          </div>
          <div className="menu-toggle">
            <a href="javascript:void(0);" id="toggle_btn">
              <i className="fas fa-bars" />
            </a>
          </div>
          <div className="top-nav-search">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fas fa-search" />
              </button>
            </form>
          </div>
          <a className="mobile_btn" id="mobile_btn">
            <i className="fas fa-bars" />
          </a>
          <ul className="nav user-menu">
            <li className="nav-item dropdown language-drop me-2">
              <a
                href="#"
                className="dropdown-toggle nav-link header-nav-list"
                data-bs-toggle="dropdown"
              >
                <img src="assets/img/icons/header-icon-01.svg" alt="" />
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="javascript:;">
                  <i className="flag flag-lr me-2" />
                  English
                </a>
                <a className="dropdown-item" href="javascript:;">
                  <i className="flag flag-bl me-2" />
                  Francais
                </a>
                <a className="dropdown-item" href="javascript:;">
                  <i className="flag flag-cn me-2" />
                  Turkce
                </a>
              </div>
            </li>

            <li className="nav-item dropdown has-arrow new-user-menus">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <div className="user-img">
                  <img
                    className="rounded-circle"
                    src="#"
                    width={31}
                    alt="Sahar Salah"
                  />
                  <div className="user-text">
                    <h6>Sahar Salah</h6>
                    <p className="text-muted mb-0">Administrator</p>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu">
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img
                      src="#"
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>Sahar Salah</h6>
                    <p className="text-muted mb-0">Administrator</p>
                  </div>
                </div>
                <a className="dropdown-item" href="profile.html">
                  My Profile
                </a>
                <a className="dropdown-item" href="inbox.html">
                  Inbox
                </a>
                <a className="dropdown-item" href="login.html">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>


        <div className="page-wrapper">
          <div className="content container-fluid">

            <Alert
              show={showAlert}
              variant={alertColor}
              onClose={hideAlert}

              style={{ height: '40px', padding: '5px', position: 'fixed', top: '60px', marginBottom: "50px", width: '75%', zIndex: "10000" }}
            >
              <p style={{ textAlign: 'center' }}>{alertMessage}</p>
            </Alert>

            <div className="row">

              <div className="col-sm-6">
                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                  <div className="card-body" >
                    {/* Page Header */}
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title">Add Absent Students</h3>
                        </div>

                        <br /><br /><br />
                        <div className="student-group-form">
                          <div className="row">
                            <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                <form>
                                  <input
                                    type="text"
                                    placeholder="Search Student"
                                    className="form-control"
                                    list="students1"
                                    value={Code} onBlur={checkInputValue}
                                    onChange={(e) => { SetCode(e.target.value); }}
                                  />
                                  <datalist id="students1">
                                    {mydata
                                      .filter(
                                        (student) =>
                                          student.student_id.toLowerCase().includes(Code.toLowerCase()) ||
                                          student.name.toLowerCase().includes(Code.toLowerCase())
                                      )
                                      .map((student) => (
                                        <option key={student.student_id} value={student.student_id}>
                                          {student.name}
                                        </option>
                                      ))}
                                  </datalist>
                                </form>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="form-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Date ..."
                                  value={selectedDate}
                                  onChange={(e) => setSelectedDate(e.target.value)}
                                  max={currentDate} // Setting the maximum date to the current date
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="search-student-btn">
                                <button type="btn" className="btn btn-primary col-4" onClick={handleSearch}>
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* /Page Header */}
                    <div className="table-responsive">
                      <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                        <thead className="student-thread">
                          <tr>
                            <th>
                              <div className="form-check check-tables">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={searchResult.every((student) => student.isChecked)}
                                  onChange={(e) => handleCheckAll(e.target.checked)}
                                />
                              </div>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResult.map((result, index) => (
                            <tr key={index}>
                              <td>
                                <div className="form-check check-tables">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={result.isChecked || false}
                                    onChange={() => handleCheck(index)}
                                  />
                                </div>
                              </td>
                              <td>{result.code}</td>
                              <td>{result.name}</td>
                              <td>{result.class}</td>
                              <td>{result.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      &nbsp;
                      <div className="col-lg-12 mx-auto">
                        <div className="search-student-btn">
                          <button type="btn" className="btn btn-primary col-12" onClick={handleSubmit}>
                            Add Absent Students
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="card card-table comman-shadow" style={{ overflow: "auto" }} >
                  <div className="card-body">
                    {/* Page Header */}
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title">Remove Absent Students</h3>
                        </div>

                        <br /><br /><br />
                        <div className="student-group-form">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Search Student"
                                  className="form-control"
                                  list="students2"
                                  value={DelCode}
                                  onChange={handleCodeChange}
                                  onBlur={checkInputValue}
                                />

                                <datalist id="students2">
                                  {mydata
                                    .filter(
                                      (student) =>
                                        student.student_id.toLowerCase().includes(DelCode.toLowerCase()) ||
                                        student.name.toLowerCase().includes(DelCode.toLowerCase())
                                    )
                                    .map((student) => (
                                      <option key={student.student_id} value={student.student_id}>
                                        {student.name}
                                      </option>
                                    ))}
                                </datalist>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Date ..."
                                  value={DelDate}
                                  list="students3"
                                  onChange={(e) => SetDelDate(e.target.value)}
                                  onBlur={checkInputValue}
                                />
                                <datalist id="students3" >
                                  {getUniqueDates(DelCode).length === 0 && (
                                    <option value="الطالب لم يغيب اي يوم" />
                                  )}

                                  {getUniqueDates(DelCode).map((date, index) => (
                                    <option value={date} key={index} />
                                  ))}
                                </datalist>

                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="search-student-btn">
                                <button type="btn" className="btn btn-primary" onClick={handleDelSearch}>
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* /Page Header */}
                    <div className="table-responsive">
                      <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                        <thead className="student-thread">
                          <tr>
                            <th>
                              <div className="form-check check-tables">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue="something"
                                  checked={removecheckbox1}
                                  onChange={handleRemoveCheckbox1Change}

                                />
                              </div>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchDelResult && searchDelResult.length > 0 && (
                            <tr>
                              <td>
                                <div className="form-check check-tables">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="something"
                                    checked={removecheckbox2}
                                    onChange={handleRemoveCheckbox2Change}
                                  />
                                </div>
                              </td>
                              {searchDelResult.map((e, index) => (
                                <td key={index}>{e}</td>
                              ))}
                            </tr>
                          )}
                        </tbody>

                      </table>
                      &nbsp;
                      <div className="col-lg-12 mx-auto">
                        <div className="search-student-btn">
                          <button type="btn" className="btn btn-primary col-12" onClick={removeAbsent}>
                            Remove Absent Students
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                  <div className="card-body">
                    {/* Page Header */}
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title">Update Absent Students</h3>
                        </div>

                        <br /><br /><br />
                        <div className="student-group-form">
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  placeholder="Search Student"
                                  className="form-control"
                                  list="students4"
                                  value={updateCode}
                                  onChange={(e) => setUpdatedCode(e.target.value)}
                                  onBlur={checkInputValue}
                                />
                                <datalist id="students4">
                                  {mydata
                                    .filter(
                                      (student) =>
                                        student.student_id.toLowerCase().includes(updateCode.toLowerCase()) ||
                                        student.name.toLowerCase().includes(updateCode.toLowerCase())
                                    )
                                    .map((student) => (
                                      <option key={student.student_id} value={student.student_id}>
                                        {student.name}
                                      </option>
                                    ))}
                                </datalist>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Date ..."
                                  value={updatedDate}
                                  max={currentDate}

                                  list="students5"
                                  onChange={(e) => setUpdatedDate(e.target.value)}
                                  onBlur={checkInputValue}
                                />
                                <datalist id="students5">
                                  {getUniqueDates(updateCode).length > 0 ? (
                                    getUniqueDates(updateCode).map((date, index) => (
                                      <option value={date} key={index} />
                                    ))
                                  ) : (
                                    <option value="لا يوجد أيام لتعديلها" />
                                  )}
                                </datalist>
                              </div>



                            </div>

                            <div className="col-lg-3">
                              <div className="form-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="New Date ..."
                                  value={UpdatedNewDate}
                                  onChange={(e) => setUpdatedNewDate(e.target.value)}
                                  max={currentDate}
                                />
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div className="search-student-btn">
                                <button type="btn" className="btn btn-primary" onClick={handleUpdatedSearch}>
                                  Search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* /Page Header */}
                    <div className="table-responsive">
                      <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                        <thead className="student-thread">
                          <tr>
                            <th>
                              <div className="form-check check-tables">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue="something"
                                  checked={updatecheckbox1}
                                  onChange={handleupdatecheckbox1Change}

                                />
                              </div>
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Old Date</th>
                            <th>New Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {updatedSearchResult && (
                            <tr>
                              <td>
                                <div className="form-check check-tables">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue="something"
                                    checked={updatecheckbox2}
                                    onChange={handleupdateCheckbox2Change}

                                  />
                                </div>
                              </td>
                              {updatedSearchResult.map((e, index) => (
                                <td key={index}>{e}</td>
                              ))}
                            </tr>
                          )}
                        </tbody>
                      </table>
                      &nbsp;
                      <div className="col-lg-12 mx-auto">
                        <div className="search-student-btn">
                          <button type="btn" className="btn btn-primary col-12" onClick={updateAbsent}>
                            Update Absent Students
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Attendance;