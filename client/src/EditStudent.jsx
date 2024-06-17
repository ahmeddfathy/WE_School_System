import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import WEImage from './WE.png';
import { Alert } from 'react-bootstrap';
function EditStudent() {
  let [id, setId] = useState("");
  let [student_id, Setstudent_id] = useState("");
  let [FirstName, SetFirstName] = useState("");
  let [nationality, Setnationality] = useState("");
  let [Gender, SetGender] = useState("");
  let [Phone, SetPhone] = useState("");
  let [middle_school_certificate, Setmiddle_school_certificate] = useState(null);
  let [DateOfBirth, SetDateOfBirth] = useState("");
  let [address, Setaddress] = useState("");
  let [Email, SetEmail] = useState("");
  let [Religion, SetReligion] = useState("");
  let [Class, SetClass] = useState("");
  let [Grade, SetGrade] = useState("");
  let [specialization, Setspecialization] = useState("");
  let [parent_email, Setparent_email] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  let [parent_name, Setparent_name] = useState("");
  let [parent_phone, Setparent_phone] = useState("");
  let [id_card, Setid_card] = useState(null);
  let [birth_certificate, Setbirth_certificate] = useState(null);
  const [myData, SetmyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');
  const [age, setAge] = useState(null);

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


  const showAlertWithMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    // قم بإخفاء الـ Alert بعد 5 ثوانٍ
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };




  useEffect(() => {
    axios.get('http://localhost:8080/api/get/students')
      .then(response => {
        SetmyData(response.data.students);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error retrieving student information:', error);
        setLoading(false);
      });
  }, []);


  function showInput(students) {
    Setstudent_id(students);
    let currentItem = myData.find((student) => student.student_id === students);

    // If the currentItem is not found with the full ID, try to find it with a partial ID (removing the last digit)
    if (!currentItem) {
      const partialId = students.slice(0, -1);
      currentItem = myData.find((student) => student.student_id === partialId);
    }

    if (currentItem) {
      SetFirstName(currentItem.name);
      Setstudent_id(currentItem.student_id);
      Setnationality(currentItem.nationality);
      SetDateOfBirth(format(new Date(currentItem.date_of_birth), 'yyyy-MM-dd'));
      Setaddress(currentItem.address);
      Setspecialization(currentItem.specialization);
      SetReligion(currentItem.religion);
      Setmiddle_school_certificate("");
      SetEmail(currentItem.email);
      SetClass(currentItem.class);
      SetGrade(currentItem.grade);
      Setparent_email(currentItem.parent_email);
      Setparent_name(currentItem.parent_name);
      Setparent_phone(currentItem.parent_phone);
      Setid_card("");
      SetPhone(currentItem.phone);
      Setbirth_certificate("");
      console.log(currentItem.middle_school_certificate);
      SetGender(currentItem.gender);
    } else {
      Setstudent_id("");
      SetFirstName("");
      Setnationality("");
      SetGender("");
      SetDateOfBirth("");
      Setaddress("");
      Setspecialization("");
      SetReligion("");
      SetClass("");
      SetEmail("");
      SetClass("");
      SetGrade("");
      Setparent_email("");
      Setparent_name("");
      Setparent_phone("");
    }
  }


  const handleSubmit = (e) => {

    if (!FirstName || !nationality || !Email || !Phone || !parent_email || !Religion || !id_card || !middle_school_certificate || !birth_certificate
      || !address || !Gender || !DateOfBirth || !Class || !Grade || !specialization || !parent_email || !parent_name || !parent_phone
    ) {
      e.preventDefault();
      showAlertWithMessage('يرجى ملء جميع الحقول المطلوبة');
      setAlertColor("danger");

    } else if (CloseDataList === false) {
      showAlertWithMessage(`هذه القيمه خاطئه يرجي الاختيار من القائمه ${DataForDataList}`);
      setAlertColor("danger");
      e.preventDefault();
      if (HandleCloseDataList === true) {
        SetCloseDataList(true);
      }

    }

    else {
      if (Grade) {
        if (Grade == 10 || Grade == 11) {
          if (age !== null && (age < 14 || age > 18)) {
            showAlertWithMessage("يجب ان يكون السن بين 14 و 18 ");
            setAlertColor("danger");
            e.preventDefault();

          }
          if (!isValidEmail || !isValidParentEmail) {
            showAlertWithMessage("هناك خطا في الايميل");
            setAlertColor("danger");
            e.preventDefault();
          }

          if (!validatePhone(Phone) || !validatePhone(parent_phone)) {
            showAlertWithMessage("يرجى إدخال رقم هاتف صحيح");
            setAlertColor("danger");
            e.preventDefault();
          }



          if (validatePhone(Phone) && validatePhone(parent_phone) && isValidEmail && isValidParentEmail
            && age !== null && (age >= 14 && age <= 18)) {
            updataStudent(student_id);

            showAlertWithMessage("تم تعديل البيانات بنجاح");
            setAlertColor("success");
          }



        }

        else if (Grade == 12) {
          if (age !== null && (age < 16 || age > 20)) {
            showAlertWithMessage("يجب ان يكون السن بين 16 و 20 ");
            console.log(age);
            setAlertColor("danger");
            e.preventDefault();


          }

          if (!isValidEmail || !isValidParentEmail) {
            showAlertWithMessage("هناك خطا في الايميل");
            setAlertColor("danger");
            e.preventDefault();
          }

          if (!validatePhone(Phone) || !validatePhone(parent_phone)) {
            showAlertWithMessage("يرجى إدخال رقم هاتف صحيح");
            setAlertColor("danger");
            e.preventDefault();
          }


          if (validatePhone(Phone) && validatePhone(parent_phone) && isValidEmail && isValidParentEmail
            && age !== null && (age >= 16 && age <= 20)) {
            updataStudent(student_id);

            showAlertWithMessage("تم تعديل البيانات بنجاح");
            setAlertColor("success");
          }


        }

      }


    }


  };


  async function updataStudent(id) {
    try {

      const user = {
        name: FirstName,
        phone: Phone,
        date_of_birth: DateOfBirth,
        address: address,
        birth_certificate: birth_certificate,
        middle_school_certificate: middle_school_certificate,
        grade: Grade,
        specialization: specialization,
        class_num: Class,
        parent_name: parent_name,
        parent_email: parent_email,
        parent_phone: parent_phone,
        id_card: id_card,
        religion: Religion,
        gender: Gender,
        nationality: nationality,
        email: Email
      };

      // Use axios.put to update the student data
      await axios.put(`http://localhost:8080/api/update/student/${id}`, user);

      // If the update is successful, show a success message
      console.log('Student data updated successfully');

      // Clear form data
      Setstudent_id("");
      SetFirstName("");
      Setnationality("");
      SetGender("");
      SetDateOfBirth("");
      Setaddress("");
      Setspecialization("");
      SetReligion("");
      Setmiddle_school_certificate(null);
      SetEmail("");
      SetClass("");
      SetGrade("");
      Setparent_email("");
      Setparent_name("");
      Setparent_phone("");
      Setid_card(null);
      Setbirth_certificate(null);

      // Optionally, you can redirect the user or perform other actions here
    } catch (error) {
      // If there's an error, log it and show an error message
      console.error('Error updating student:', error);

      // Optionally, you can show an error message to the user
    }
  }

  async function deleteuser(id) {
    try {
      const body = {
        student_id: student_id
      };

      await axios.delete(`http://localhost:8080/api/del/student/${id}`, { data: body });

      console.log('Student  deleted successfully');
      showAlertWithMessage('تم حذف الطالب بنجاح');
      setAlertColor("success")
      Setstudent_id("");
      SetFirstName("");
      Setnationality("");
      SetGender("");
      SetDateOfBirth("");
      Setaddress("");
      Setspecialization("");
      SetReligion("");
      Setmiddle_school_certificate(null);
      SetEmail("");
      SetClass("");
      SetGrade("");
      Setparent_email("");
      Setparent_name("");
      Setparent_phone("");
      Setid_card(null);
      Setbirth_certificate(null);
    } catch (error) {
      console.error('Error deleting student absence:', error);
    }
  }


  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const currentDate = `${yyyy}-${mm}-${dd}`;

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^([0-9]{9}@[\w.-]+\.moe\.edu\.eg|[\w.-]+@student\.[A-Za-z]+)$/;

    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    SetEmail(value);
    setIsValidEmail(validateEmail(value) || value === '');
  };


  const [isValidParentEmail, setIsValidParentEmail] = useState(true);

  const validateParentEmail = (email) => {
    const emailRegex = /^[\w.-]+@(gmail)\.[A-Za-z]+$/;
    return emailRegex.test(email);
  };

  const handleParentEmailChange = (e) => {
    const value = e.target.value;
    Setparent_email(value);
    setIsValidParentEmail(validateParentEmail(value) || value === '');
  };




  useEffect(() => {
    // حساب الفرق بين تاريخ الميلاد واليوم الحالي
    const calculateAge = () => {
      const birthDate = new Date(DateOfBirth);
      const currentDate = new Date();

      // الفارق بالسنوات
      const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
      ) {
        setAge(ageDifference - 1);
      } else {
        setAge(ageDifference);
      }
    };

    // تحديث الحالة عند تغيير تاريخ الميلاد
    calculateAge();
  }, [DateOfBirth]);



  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    const availableClasses = {
      "10": ["1A", "1B", "1C", "1D", "1E", "1F"],
      "11": ["2A", "2B", "2C", "2D", "2E", "2F"],
      "12": ["3A", "3B", "3C", "3D", "3E", "3F", "3G"],
    };

    // If the selected Grade does not support the currently selected Class, reset Class to a default value
    if (!availableClasses[selectedGrade]?.includes(Class)) {
      SetClass("");
    } else {
      SetClass(Class);
    }

    // Update Grade
    SetGrade(selectedGrade);

    // Set Specialization to "general" if Grade is 10
    if (selectedGrade === "10") {
      Setspecialization("general");
    } else {
      Setspecialization("");
    }
  };


  const validatePhone = (phone) => {
    const phoneRegex = /(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneBlur = (val) => {
    if (!validatePhone(val)) {
      showAlertWithMessage("(011) || (012) || (015) || (010) يجب ان يبا الرقم ب ويكون عدد ارقامه 11 رقم");
      setAlertColor("danger");
    }
  };






  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0"
      />
      <title>We School</title>
      {/* Favicon */}
      <link rel="shortcut icon" href="assets/img/favicon.png" />
      {/* Fontfamily */}
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      {/* Bootstrap CSS */}
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      {/* Feathericon CSS */}
      <link rel="stylesheet" href="assets/plugins/feather/feather.css" />
      {/* Pe7 CSS */}
      <link rel="stylesheet" href="assets/plugins/icons/flags/flags.css" />
      {/* Datepicker CSS */}
      <link rel="stylesheet" href="assets/css/bootstrap-datetimepicker.min.css" />
      {/* Fontawesome CSS */}
      <link
        rel="stylesheet"
        href="assets/plugins/fontawesome/css/fontawesome.min.css"
      />
      <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css" />
      {/* Select CSS */}
      <link rel="stylesheet" href="assets/plugins/select2/css/select2.min.css" />
      {/* Main CSS */}
      <link rel="stylesheet" href="assets/css/style.css" />
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
              placeholder="search student"
              value={id}
              className="form-control"
              list="students" onBlur={checkInputValue}
              onChange={(e) => { Setstudent_id(e.target.value); showInput(e.target.value); setId(e.target.value) }}
            />
            <datalist id="students">
              {myData
                .filter((student) => {
                  const lowerCaseStudentId = student_id ? student_id.toLowerCase() : '';
                  return (
                    student.student_id && student.student_id.toLowerCase().includes(lowerCaseStudentId) ||
                    student.name && student.name.toLowerCase().includes(lowerCaseStudentId)
                  );
                })
                .map((student) => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.name}
                  </option>
                ))}
            </datalist>



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

      <div className="main-wrapper">

        <div className="page-wrapper">
          <Alert
            show={showAlert}
            variant={alertColor}
            onClose={hideAlert}

            style={{ height: '40px', padding: '5px', position: 'fixed', top: '60px', marginBottom: "50px", width: '75%', zIndex: "10000" }}
          >
            <p style={{ textAlign: 'center' }}>{alertMessage}</p>
          </Alert>



          <div className="content container-fluid">

            <div className="row">
              <div className="col-sm-12">
                <div className="card comman-shadow">
                  <div className="card-body">




                    <form  >
                      <div className="row">
                        <div className="col-12">
                          <h5 className="form-title student-info">
                            Edit Student Information{" "}
                            <span>
                              <a href="javascript:;">
                                <i className="feather-more-vertical" />
                              </a>
                            </span>
                          </h5>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Grade <span className="login-danger">*</span>
                            </label>
                            <input disabled
                              value={Grade}
                              required
                              className="form-control"
                              onChange={handleGradeChange}
                              list='grade'
                              placeholder='please enter grade' onBlur={checkInputValue}
                            />
                            <datalist id="grade" >
                              <option value="10" />
                              <option value="11" />
                              <option value="12" />

                            </datalist>



                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              specialization  <span className="login-danger">*</span>
                            </label>
                            <input disabled
                              value={specialization} required placeholder='please enter specialization' list='specialization'
                              className="form-control select" onChange={(e) => Setspecialization(e.target.value)} onBlur={checkInputValue} />
                            <datalist id='specialization' >
                              <option value="Web" />
                              <option value="Telecommunications" />
                              <option value="Network" />
                            </datalist>

                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Student Code <span className="login-danger">*</span>
                            </label>
                            <input
                              disabled
                              className="form-control"
                              type="text"
                              placeholder="Enter student code"
                              value={student_id}
                              onChange={(e) => Setstudent_id(e.target.value)}
                              readOnly  // Make the input read-only
                            />
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">

                            <label>
                              Name <span className="login-danger">*</span>
                            </label>
                            <input required
                              className="form-control"
                              type="text"
                              placeholder="Enter First Name" value={FirstName}
                              onChange={(e) => SetFirstName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Nationality <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              list='nationality'
                              value={nationality}
                              placeholder="Enter Nationality" onBlur={checkInputValue}
                              onChange={(e) => Setnationality(e.target.value)}
                            />

                            <datalist id='nationality'>
                              <option value="Egypt" />
                            </datalist>
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Gender <span className="login-danger">*</span>
                            </label>
                            <input type="text" placeholder='Enter Grade'
                              className='form-control'
                              value={Gender} onChange={(e) => SetGender(e.target.value)}
                              list='gender' onBlur={checkInputValue} />
                            <datalist id='gender' >
                              <option value="male" />
                              <option value="female" />
                            </datalist>
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms ">
                            <label>
                              Date Of Birth <span className="login-danger">*</span>
                            </label>
                            <input
                              type="date"
                              value={DateOfBirth}
                              placeholder="DD-MM-YYYY"
                              className='form-control'
                              onChange={(e) => SetDateOfBirth(e.target.value)}
                              max={currentDate} // تحديد تاريخ الحد الأقصى
                              required
                            />
                          </div>

                          {
                            Grade == 10 || Grade == 11 ? age !== null && (age < 14 || age > 18) && (
                              <div className="alert alert-danger" style={{ height: '55px' }}>
                                يجب أن يكون العمر بين 14 و 18 سنة.
                              </div>
                            ) : Grade == 12 ? age !== null && (age < 16 || age > 20) && (
                              <div className="alert alert-danger" style={{ height: '55px' }}>
                                يجب أن يكون العمر بين  16 و 20 سنة.
                              </div>
                            ) : ""
                          }
                        </div>



                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>address </label>
                            <input required
                              className="form-control"
                              type="text" value={address}
                              placeholder="Enter address"
                              onChange={(e) => Setaddress(e.target.value)}
                            />
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Religion <span className="login-danger">*</span>
                            </label>
                            <input type="text" placeholder='Enter Religion'
                              className='form-control'
                              value={Religion} required onChange={(e) => SetReligion(e.target.value)}
                              list='Religion' onBlur={checkInputValue} />
                            <datalist id='Religion' >
                              <option value="muslim" />
                              <option value="ceristan" />
                            </datalist>
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              E-Mail <span className="login-danger">*</span>
                            </label>
                            <input
                              className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                              type="email"
                              value={Email}
                              required
                              placeholder="Enter Email Address"
                              onChange={handleEmailChange}
                            />
                            {!isValidEmail && (
                              <div className="invalid-feedback">Please enter a valid email address like("studentname@student.anything").</div>
                            )}
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Class <span className="login-danger">*</span>
                            </label>
                            <input required type="text" className='form-control' placeholder="Enter class" list='students2' value={Class} onChange={(e) => SetClass(e.target.value)} />
                            <datalist id='students2' onBlur={checkInputValue}>
                              {Grade === "10" && (
                                <>
                                  <option value={"1A"} />
                                  <option value={"1B"} />
                                  <option value={"1C"} />
                                  <option value={"1D"} />
                                  <option value={"1E"} />
                                  <option value={"1F"} />
                                </>
                              )}
                              {Grade === "11" && (
                                <>
                                  <option value={"2A"} />
                                  <option value={"2B"} />
                                  <option value={"2C"} />
                                  <option value={"2D"} />
                                  <option value={"2E"} />
                                  <option value={"2F"} />
                                </>
                              )}
                              {Grade === "12" && (
                                <>
                                  <option value={"3A"} />
                                  <option value={"3B"} />
                                  <option value={"3C"} />
                                  <option value={"3D"} />
                                  <option value={"3E"} />
                                  <option value={"3F"} />
                                  <option value={"3G"} />
                                </>
                              )}
                            </datalist>
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>Phone </label>
                            <input
                              className={`form-control`}
                              type="text"
                              value={Phone}
                              placeholder="Enter Phone Number"
                              required
                              onChange={(e) => SetPhone(e.target.value)}
                              onBlur={(e) => handlePhoneBlur(Phone)}
                            />

                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>parent_email</label>
                            <input
                              className={`form-control ${isValidParentEmail ? '' : 'is-invalid'}`}
                              type="text"
                              required
                              value={parent_email}
                              placeholder="Enter parent email"
                              onChange={handleParentEmailChange}
                            />
                            {!isValidParentEmail && (
                              <div className="invalid-feedback">Please enter a valid parent email address (username@parent.anything).</div>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>parent name</label>
                            <input
                              className="form-control"
                              type="text" value={parent_name}
                              placeholder="Enter Parent Name" required
                              onChange={(e) => Setparent_name(e.target.value)}
                            />
                          </div>
                        </div>



                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>parent Phone</label>
                            <input
                              className="form-control"
                              type="text"
                              value={parent_phone}
                              placeholder="Enter Parent's Phone Number"
                              required
                              onChange={(e) => Setparent_phone(e.target.value)}
                              onBlur={(e) => handlePhoneBlur(parent_phone)}
                            />

                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group simage-upbtn mb-0">
                            <label>Upload student birth certificate (150px X 150px)</label>
                            <div className="uplod">
                              <label className="file-upload image-upbtn mb-0">
                                Choose File <input type="file" value={middle_school_certificate} onChange={(e) => Setmiddle_school_certificate(e.target.value)} />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-sm-4">
                          <div className="form-group simage-upbtn mb-0">
                            <label>Upload student birth certificate (150px X 150px)</label>
                            <div className="uplod">
                              <label className="file-upload image-upbtn mb-0">
                                Choose File <input type="file" value={birth_certificate} onChange={(e) => Setbirth_certificate(e.target.value)} />
                              </label>
                            </div>
                          </div>
                        </div>


                        <div className="col-12 col-sm-4">
                          <div className="form-group image-upbtn mb-0">
                            <label>Upload parent card (150px X 150px)</label>
                            <div className="uplod">
                              <label className="file-upload image-upbtn mb-0">
                                Choose File <input type="file" value={id_card} onChange={(e) => Setid_card(e.target.value)} />
                              </label>
                            </div>
                          </div>
                        </div>






                        <div className="col-12">
                          <div className="student-submit">
                            <input type="submit" className="btn btn-primary" onClick={handleSubmit} />
                            <input type="submit" className="btn btn-danger ms-4" value={"delete"} onClick={(e) => deleteuser(student_id)} />

                          </div>
                        </div>


                      </div>
                    </form>



                    {showNotification && (
                      <div className="alert alert-success" role="alert">
                        تم تعديل الطالب بنجاح!
                      </div>
                    )}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





      {/* jQuery */}
      {/* Bootstrap Core JS */}
      {/* Feather Icon JS */}
      {/* Slimscroll JS */}
      {/* Select2 JS */}
      {/* Datepicker Core JS */}
      {/* Custom JS */}
    </>

  );
}

export default EditStudent;