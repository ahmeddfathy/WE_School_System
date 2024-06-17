import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
import WEImage from './WE.png';

function BadBehaviour() {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    let [DataForDataList, SetDataForDataList] = useState("");
    let [CloseDataList, SetCloseDataList] = useState(true);
    let [HandleCloseDataList, SetHandleCloseDataList] = useState(false);
    let [Del_violation_Name, SetDel_violation_Name] = useState("");
    let [Del_violation_Class, SetDel_violation_Class] = useState("");
    let [Del_violation_Date, SetDel_violation_Date] = useState("");
    let [ViolationDate, SetViolationDate] = useState("");
    const [absentdelState, setCompetitionsdelState] = useState(false);
    const [ViolationState, SetViolationState] = useState(false);
    let [ViolationCode, SetViolationCode] = useState("");
    const [name, setName] = useState('');
    let [note, Setnote] = useState("");
    const [violationName, setViolationName] = useState('');
    const [delviolatoinName, setdelviolatoinName] = useState('');
    const [mydata, setmydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchDelResult, setDelSearchResult] = useState([]);
    const [searchViolationResult, setViolationSearchResult] = useState([]);
    let [Del_violation_Code, SetDel_violation_Code] = useState("");
    let [violations, setViolations] = useState([]);
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [removecheckbox1, setRemoveCheckbox1] = useState(false);
    const [removecheckbox2, setRemoveCheckbox2] = useState(false);


    function checkInputValue(event) {
        var inputElement = event.target;
        var dataListId = inputElement.getAttribute("list");
    
        // Check if dataListId is null
        if (!dataListId) {
            console.error("Data list ID is null");
            return;
        }
    
        var dataList = document.getElementById(dataListId);
    
        // Check if dataList is null
        if (!dataList) {
            console.error("Data list not found in the document");
            return;
        }
    
        var dataListOptions = dataList.options;
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
                setmydata(response.data.students);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error retrieving student information:', error);
                setLoading(false);
            });
    });

    function formatSelectedValue(selectedValue) {
        // استخدم regex لإزالة الرقم والفاصلة والمسافة
        return selectedValue.replace(/^\d+-\s/, '');
    }

    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
        setCheckbox2(!checkbox1);

    };

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
        setCheckbox1(!checkbox2);
    };



    const handleRemoveCheckbox1Change = () => {
        setRemoveCheckbox1(!removecheckbox1);
        setRemoveCheckbox2(!removecheckbox1);
    };

    const handleRemoveCheckbox2Change = () => {
        setRemoveCheckbox1(!removecheckbox2);
        setRemoveCheckbox2(!removecheckbox2);
    };




    useEffect(() => {
        // التحقق من وجود قيمة في ViolationCode
        if (ViolationCode && mydata.length > 0) {
            const matchingStudent = mydata.find((student) => student.student_id && student.student_id.includes(ViolationCode));

            if (matchingStudent) {
                setName(matchingStudent.name);
            }
        }

        else {
            setName("");
        }
    }, [ViolationCode, mydata]);



    const getViolations = async (val) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/getViolations/${val}`);
            setViolations(response.data);
            setLoading(false);

        } catch (error) {
            console.error('Error retrieving violations:', error);
            setLoading(false);
        }
    };

    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('YYYY-MM-DD');
        return formattedDate;
    }


    const handleViolationSearch = () => {
        if (
            ViolationCode.length === 0 ||
            ViolationDate.length === 0 ||
            note.length === 0 ||
            violationName.length === 0 ||
            name.length === 0
        ) {
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
            const foundStudent = mydata.find(
                (student) => student.student_id == ViolationCode || student.name === ViolationCode
            );

            if (!foundStudent) {
                showAlertWithMessage("الكود غير موجود في القاعدة");
                setAlertColor("danger");
                SetViolationCode(ViolationCode);
                Setnote(note);
                setViolationName(violationName);
                setName(name);
                SetViolationDate(ViolationDate);
            } else {

                const isViolationExist = Array.isArray(violations) && violations.some(
                    (violation) =>
                        violation.student_id == ViolationCode &&
                        formatDate(violation.date_of_violation) == formatDate(ViolationDate)
                        &&
                        violation.name_of_violation == violationName &&

                        violation.name == name && violation.note == note

                );

                if (isViolationExist) {
                    showAlertWithMessage("المخالفة مسجلة بالفعل في هذا التاريخ");
                    setAlertColor("danger");
                } 

                
                else {
                    const violationDates = mydata.map((item) => item.date_of_absence.split(",")).flat();

                    // التحقق من وجود طالب بنفس student_id وفحص تاريخ الغياب
                    const isViolation = violationDates.some((date) => date === ViolationDate && violationName !== "delay" );
                    
                    // إذا كان هناك مخالفة، قم بعرض الإشعار
                     if (isViolation) {
                        showAlertWithMessage("العقل والمنطق بيقولو ان الطالب غايب النهاردا ازاي عايزه تديله مخالفه ازاي ؟ اقنعيني");
                        setAlertColor("danger");
                      
                    }
                    else{
                        const result = [
                            `${foundStudent.student_id}`,
                            `${foundStudent.name}`,
                            `${foundStudent.class}`,
                            `${violationName}`,
                            `${ViolationDate}`,
                            `${note}`
                        ];
                        setViolationSearchResult(result);
                        SetViolationState(true);
                    }
                    // Code is valid, update the state with the search result
                   
                }
            }
        }
    };


    const handleDelviolations = (e) => {
        if (Del_violation_Code.length === 0 || Del_violation_Date.length === 0 || delviolatoinName.length === 0) {
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
            const foundStudent = mydata.find((student) => student.student_id == Del_violation_Code || student.name == Del_violation_Code);

            // Check if violations is an array before using find
            if (Array.isArray(violations)) {
                const foundStudent2 = violations.find((student) => student.student_id == ViolationCode || student.name === ViolationCode);

                if (!foundStudent) {
                    showAlertWithMessage("الكود غير موجود في القاعدة");
                    setAlertColor("danger");
                    SetDel_violation_Code(Del_violation_Code);
                    SetDel_violation_Date(Del_violation_Date);
                    setdelviolatoinName(delviolatoinName);
                } else {
                    const result = [
                        `${foundStudent.student_id}`,
                        `${foundStudent.name}`,
                        `${foundStudent.class}`,
                        `${delviolatoinName}`,
                        `${Del_violation_Date}`
                    ];

                    if (foundStudent2 && foundStudent2.note) {
                        result.push(`${foundStudent2.note}`);
                    } else {
                        result.push(""); // or set a default value if 'note' is not available
                    }

                    // Check if Del_violation_Date or delviolatoinName have the placeholder value
                    if (Del_violation_Date === "لم يتم تسجيل أي مخالفة حتى الآن" || delviolatoinName === "لم يتم تسجيل أي مخالفة حتى الآن") {
                        showAlertWithMessage("لا يمكن تسجيل مخالفة بقيمة 'لم يتم تسجيل أي مخالفة حتى الآن'");
                        setAlertColor("danger");
                    } else {
                        setDelSearchResult(result);
                        setCompetitionsdelState(true);
                    }
                }
            } else {
                // Handle the case where violations is not an array
                console.error("violations is not an array");
                showAlertWithMessage(" لا يمكنك اضافه هذا");
                setAlertColor("danger");
                setdelviolatoinName("");
                SetDel_violation_Date("");
                SetDel_violation_Code("");
            }
        }
    };

    function addViolations(e) {
        if (checkbox2 === false && ViolationState === true) {
            showAlertWithMessage("يرجى اختيار الطالب");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        }

        if (searchViolationResult[0] !== ViolationCode || searchViolationResult[3] !== violationName ||
            searchViolationResult[4] !== ViolationDate || searchViolationResult[5] !== note || searchViolationResult[1] !== name
        ) {
            showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        }


        // Check if any of the required fields is empty
        if (!ViolationDate || !ViolationCode || !note || !violationName || !name) {
            showAlertWithMessage("يرجى ملء الجدول ببيانات لاضافتها");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        } else {
            // fetch violation


            addViolations_indatabase();
            showAlertWithMessage("تم اضافه المخالفه");
            setAlertColor("success");
            setControl(true);
            setControl2(true);
            setViolationSearchResult("");
            setViolationName("");
            SetViolationCode("");
            Setnote("");
            SetViolationDate("");
            setName("");
            setCheckbox1(false);
            setCheckbox2(false);
        }
    }


    function removeViolations(e) {
        if (absentdelState === true || removecheckbox2 === true) {
            const findStudentIndex = mydata.findIndex((student) => student.student_id === Del_violation_Code);
            if (removecheckbox1 === false && absentdelState === true) {
                showAlertWithMessage("يرجى اختيار الطالب");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            if (searchDelResult[0] !== Del_violation_Code || searchDelResult[3] !== delviolatoinName ||
                searchDelResult[4] !== Del_violation_Date
            ) {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            // Check if any of the required fields is empty

            if (findStudentIndex !== -1) {

                DelViolations_indatabase();
                setControl(true);
                setControl2(true);
                showAlertWithMessage("لقد تم حذف المخالفه بنجاح")
                setAlertColor("danger");

                // إعادة تعيين حقول الإدخال
                SetDel_violation_Class("");
                SetDel_violation_Date("");
                SetDel_violation_Code("");
                SetDel_violation_Name("");
                setdelviolatoinName("");
                setDelSearchResult("");
           
                setRemoveCheckbox1(false);
                setRemoveCheckbox2(false);


            }
        }
        if (searchDelResult.length === 0) {
            showAlertWithMessage("يجب ملئ الجدول ببيانات لحذفها");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        }

    }

    async function addViolations_indatabase() {
        const foundStudent = mydata.find((student) => student.student_id == ViolationCode || student.name === ViolationCode);


        try {
            const body = {
                "name": foundStudent.name,
                "name_of_violation": violationName,
                "date_of_violation": ViolationDate,
                "note": note
            };
            console.log(body);

            // استخدم http:// في عنوان الخادم إذا كنت تستخدم HTTP
            await axios.post(`http://localhost:8080/api/addViolation`, body);
            console.log('Violations added successfully');
            fetchData(); 
            setControl2(true);
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }

    async function DelViolations_indatabase() {
        try {
            const originalDate = Del_violation_Date;
            const dateObject = new Date(originalDate);

            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObject.getDate().toString().padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;

            console.log("Formatted Date:", formattedDate);

            const body = {
                "studentId": Del_violation_Code,
                "violationName": delviolatoinName,
                "dateOfViolation": formattedDate
            };

            console.log("Request Body:", body);

            const response = await axios.delete("http://localhost:8080/api/deleteViolation", { data: body });

            if (response.data.success) {
                // إذا كان هناك نجاح في حذف المخالفة
                console.log('Violations deleted successfully', response.data);
            } else {
                // إذا كان هناك خطأ، قم بعرض رسالة تنبيه باستخدام خاصية 'error'
                console.error('Error deleting violation:', response.data.error);
                if (response.data.error === undefined) {
                    showAlertWithMessage("تم حذف المخالفه بنجاح");
                    setAlertColor("success");
                }
                else {
                    showAlertWithMessage("لقد قمت بادخال بيانات خاطئه");
                    setAlertColor("danger");
                }


            }
        } catch (error) {
            console.error('Error deleting violation:', error);
            showAlertWithMessage('حدث خطأ أثناء محاولة حذف المخالفة.');
        }
    }


    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;


    let getUniqueDates2 = (val) => {
        let selectedStudent = mydata.find((student) => student.student_id === val || student.name === val);
    
        if (selectedStudent && selectedStudent.date_of_delay) {
          return selectedStudent.date_of_delay ? selectedStudent.date_of_delay.split(',').map((date) => date.trim()) : "";
        }
    
        return [];
      };
    
      
      async function addDelayAbsence_InDataBase(body) {
        try {
          await axios.put(`http://localhost:8080/api/delay_absence`, body);
          console.log('Absence delay added successfully');
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }

    function processObjectsWithLastDelayKey() {


        let objectsWithLastDelay = mydata.filter(obj => obj.hasOwnProperty('lastDelay'));
    
        objectsWithLastDelay.forEach(foundObject => {
          let date = foundObject.date_of_delay !== null ? foundObject.date_of_delay.split(',') : [];
          let lastDelay = foundObject.lastDelay; // Assuming lastDelay is an arra
          lastDelay.forEach(delayItem => {
            let formattedDelay = formatDate(delayItem);
            date.push(formattedDelay);
          });
    
          let uniqueDates = getUniqueDates2(foundObject.student_id);
          if (!uniqueDates.includes(lastDelay)) {
            let data = [{
              studentId: foundObject.student_id,
              date_of_delay: Array.from(new Set(date.filter(value => value.trim() !== ''))).join(',')
    
            }];
    
            addDelayAbsence_InDataBase(data);
            setControl(false);
    
    
          }
    
    
        });
    
    
    
    
      }
      let [control , setControl] = useState(true);
    
   
    

    if (control === true) {
        
    mydata.forEach((item) => {
        if (item.lastDelay && Array.isArray(item.lastDelay)) {
            let uniqueDates2 = getUniqueDates2(item.student_id);

            if (item.lastDelay.some(date => !uniqueDates2.includes(date))) {
                processObjectsWithLastDelayKey();
                setControl(false);
              
            }

            let joinedLastDelayWithoutSpaces = item.lastDelay.filter(delay => delay.trim() !== '');

            if (uniqueDates2.length > 0 ? uniqueDates2.some(date => !joinedLastDelayWithoutSpaces.includes(date)) : "") {
                let joinedLastDelay = joinedLastDelayWithoutSpaces.join(',');

                let data = [{
                    studentId: item.student_id,
                    date_of_delay: joinedLastDelay
                }];

                addDelayAbsence_InDataBase(data);
              
            }
        }

        else if (!item.lastDelay) {
            if (item.date_of_delay !== "") {
                let data = [{
                    studentId: item.student_id,
                    date_of_delay: ""
                }];

                addDelayAbsence_InDataBase(data);
                setControl(false);
               
            }
        }
        else{
        setControl(false);
        }

    });
  
  
}

  
    

      async function addAbsence_InDataBase(body) {
        try {
          await axios.put(`http://localhost:8080/api/absence`, body);
          console.log('Absence added successfully');
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }

      let [violations2 , setViolations2] = useState([]);
      useEffect(() => {
        fetchData(); 
    }, []);
    
   
    const fetchData = () => {
        axios.get('http://localhost:8080/api/getViolations')
            .then(response => {
                setViolations2(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    
  
  
      
    
       let [control2 , setControl2] = useState(true);

       if (control2 === true) {
     
    
        mydata.forEach(student => {
            let studentviolationDates = violations2.length > 0 ? violations2
                .filter(violation => violation.student_id === student.student_id && violation.name_of_violation == "delay" )
                .map(violation => formatDate(violation.date_of_violation)) : "";
    
            let studentMyDataDates = student.date_of_absence ? student.date_of_absence.split(',') : "";
            let commonDates = studentviolationDates.length > 0 ? studentviolationDates.filter(date => studentMyDataDates.includes(date)) : "";
    
            if (commonDates.length > 0) {
                let differentDates = studentMyDataDates.filter(
                    date => !commonDates.includes(date)
                );
    
                let body = [{
                    "studentId": student.student_id, "date_of_absence": differentDates.join(',')
                }];
    
                addAbsence_InDataBase(body);
                
            }

            if(!commonDates){
                setControl2(false);
            }
        

        });
    
       
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
            <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
            <link rel="stylesheet" href="assets/plugins/feather/feather.css" />
            <link rel="stylesheet" href="assets/plugins/icons/flags/flags.css" />
            <link
                rel="stylesheet"
                href="assets/plugins/fontawesome/css/fontawesome.min.css"
            />
            <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css" />
            <link rel="stylesheet" href="assets/plugins/datatables/datatables.min.css" />
            <link rel="stylesheet" href="assets/css/style.css" />
            <div className="main-wrapper">
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

                            style={{ height: '40px', padding: '5px', position: 'fixed', top: '50px', width: '75%', zIndex: "10000" }}
                        >
                            <p style={{ textAlign: 'center' }}>{alertMessage}</p>
                        </Alert>


                        <div className="row">

                            <div className="col-12 col-md-6" >
                                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                                    <div className="card-body">
                                        {/* Page Header */}
                                        <div className="page-header">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h3 className="page-title">Add Violation</h3>
                                                </div>

                                                <br /><br /><br />
                                                <div className="student-group-form">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-6">
                                                            <div className="form-group">
                                                                <form>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="search student"
                                                                        className="form-control"
                                                                        list="students2"
                                                                        value={ViolationCode}
                                                                        onBlur={checkInputValue}
                                                                        onChange={(e) => { SetViolationCode(e.target.value); }}
                                                                    />
                                                                    <datalist id="students2">
                                                                        {mydata
                                                                            .filter(
                                                                                (student) =>
                                                                                    student.student_id.toLowerCase().includes(ViolationCode.toLowerCase()) ||
                                                                                    student.name.toLowerCase().includes(ViolationCode.toLowerCase())
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
                                                                    type="text"
                                                                    placeholder="search student"
                                                                    className="form-control"
                                                                    list="students3"
                                                                    value={name}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                />
                                                                <datalist id="students3">
                                                                    {mydata
                                                                        .filter((student) => student.student_id && student.student_id.includes(ViolationCode))
                                                                        .map((filteredStudent) => (
                                                                            <option key={filteredStudent.student_id} value={filteredStudent.name} />
                                                                        ))}
                                                                </datalist>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    placeholder="violation date ..."
                                                                    value={ViolationDate}
                                                                    onChange={(e) => SetViolationDate(e.target.value)}
                                                                    max={currentDate} // تحديد تاريخ الحد الأقصى
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="violation name  ..."
                                                                    value={violationName}
                                                                    onChange={(e) => setViolationName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Note ..." value={note} onChange={(e) => Setnote(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="search-student-btn">
                                                                <button type="btn" className="btn btn-primary col-12" onClick={handleViolationSearch}>
                                                                    Search
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                                    checked={checkbox1}
                                                                    onChange={handleCheckbox1Change}
                                                                />
                                                            </div>
                                                        </th>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Class</th>
                                                        <th>Violation_name</th>
                                                        <th>violation_date</th>

                                                        <th>Note</th>


                                                    </tr>
                                                </thead>
                                                <tbody>




                                                    {searchViolationResult && searchViolationResult.length > 0 && (



                                                        <tr>
                                                            <td>
                                                                <div className="form-check check-tables">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"

                                                                        checked={checkbox2}
                                                                        onChange={handleCheckbox2Change}
                                                                    />
                                                                </div>
                                                            </td>
                                                            {searchViolationResult.map((e) =>
                                                                <td>{e}</td>
                                                            )}
                                                        </tr>






                                                    )}



                                                </tbody>
                                            </table>
                                            &nbsp;
                                            <div className="col-lg-12 mx-auto">
                                                <div className="search-student-btn">
                                                    <button type="btn" className="btn btn-primary col-12" onClick={addViolations} >
                                                        Add Violation
                                                    </button>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                                    <div className="card-body">
                                        {/* Page Header */}
                                        <div className="page-header">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h3 className="page-title">Remove Violation</h3>
                                                </div>

                                                <br /><br /><br />
                                                <div className="student-group-form">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    placeholder="search student"
                                                                    className="form-control"
                                                                    list="students6"
                                                                    value={Del_violation_Code}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => { SetDel_violation_Code(e.target.value); getViolations(e.target.value); }}
                                                                />


                                                                <datalist id="students6">
                                                                    {mydata
                                                                        .filter(
                                                                            (student) =>
                                                                                student.student_id.toLowerCase().includes(Del_violation_Code.toLowerCase()) ||
                                                                                student.name.toLowerCase().includes(Del_violation_Code.toLowerCase())
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
                                                                    placeholder="violation name ..."
                                                                    value={delviolatoinName}
                                                                    list="students5"
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => setdelviolatoinName(formatSelectedValue(e.target.value))}
                                                                />
                                                                {Del_violation_Code ? (
                                                                    <datalist id="students5">
                                                                        {violations.length > 0 ? (
                                                                            Array.from(new Set(violations.map((ele) => ele.name_of_violation))).map((uniqueValue, index) => (
                                                                                <option key={index} value={uniqueValue} />
                                                                            ))
                                                                        ) : (
                                                                            <option value="لم يتم تسجيل أي مخالفة حتى الآن" />
                                                                        )}
                                                                    </datalist>
                                                                ) : (
                                                                    <option value="يجب إدخال كود الطالب" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="violation date  ..."
                                                                    value={Del_violation_Date}
                                                                    list='students9'
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => SetDel_violation_Date(formatSelectedValue(e.target.value))}
                                                                />
                                                                {Del_violation_Code ? (
                                                                    <datalist id="students9">
                                                                        {Array.isArray(violations) && violations.length > 0 ? (
                                                                            violations
                                                                                .filter((ele) =>
                                                                                    // Add your filtering condition here based on delviolatoinName
                                                                                    delviolatoinName ? ele.name_of_violation === delviolatoinName : true
                                                                                )
                                                                                .map((ele, index) => (
                                                                                    <option key={index} value={format(new Date(ele.date_of_violation), "yyyy-MM-dd")} />
                                                                                ))
                                                                        ) : (
                                                                            <option value="لم يتم تسجيل أي مخالفة حتى الآن" />
                                                                        )}
                                                                    </datalist>
                                                                ) : (
                                                                    <option value="يجب إدخال كود الطالب" />
                                                                )}
                                                            </div>
                                                        </div>



                                                        <div className="col-lg-3">
                                                            <div className="search-student-btn">
                                                                <button type="btn" className="btn btn-primary col-12" onClick={handleDelviolations}>
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
                                                        <th>Violation_name</th>
                                                        <th>violation_date</th>


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
                                                    <button type="btn" className="btn btn-primary col-12" onClick={removeViolations}>
                                                        Remove Violation
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


export default BadBehaviour;