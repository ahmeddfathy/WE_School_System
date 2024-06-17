import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Alert } from 'react-bootstrap';
import WEImage from './WE.png';

function Permiisions() {

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

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');

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


    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('YYYY-MM-DD');
        return formattedDate;
    }

    let [mydata, SetMydata] = useState([]);

    let [note, Setnote] = useState("");


    let [PermissionCode, SetPermissionCode] = useState("");
    let [PermissionName, SetPermissionName] = useState("");
    let [PermissionClass, SetPermissionClass] = useState("");
    let [PermissionDate, SetPermissionDate] = useState("");

    let [DelPermissionCode, SetDelPermissionCode] = useState("");
    let [DelPermissionName, SetDelPermissionName] = useState("");
    let [DelPermissionClass, SetDelPermissionClass] = useState("");
    let [DelPermissionDate, SetDelPermissionDate] = useState("");




    const [PermissionState, SetPermissionState] = useState(false);
    const [DelPermissionState, SetDelPermissionState] = useState(false);
    const [permissionData, SetPermissionData] = useState([]);

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


    const [loading, setLoading] = useState(true);


    const [searchPermissionResult, setPermissionSearchResult] = useState([]);
    const [searchDelPermissionResult, setDelPermissionSearchResult] = useState([]);



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
    }, []);


    const handlePermissionSearch = () => {
        if (PermissionCode.length === 0 || PermissionDate.length === 0 || note.length === 0) {
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
            if (Array.isArray(permissionData)) {
   
                const isDataExists = permissionData.some((permission) =>
                    permission.student_id == PermissionCode &&
                    new Date(permission.date_of_permission).toLocaleDateString() === new Date(PermissionDate).toLocaleDateString()
                );

                if (isDataExists) {
                    showAlertWithMessage("البيانات موجودة في قاعدة البيانات");
                    setAlertColor("danger");
                } else {
              
                    const foundStudent = mydata.find((student) => student.student_id == PermissionCode || student.name == PermissionCode);

                    if (!foundStudent) {
                        showAlertWithMessage("الكود غير موجود في القاعدة");
                        setAlertColor("danger");

                        SetPermissionCode(PermissionCode);
                        SetPermissionDate(PermissionDate);
                        Setnote(note);
                    } else {
                        const result = [`${foundStudent.student_id}`, `${foundStudent.name}`, `${foundStudent.class}`, `${PermissionDate}`, `${note}`];
                        setPermissionSearchResult(result);
                        SetPermissionState(true);
                    }
                }
            } else {
                const foundStudent = mydata.find((student) => student.student_id == PermissionCode || student.name == PermissionCode);

                if (!foundStudent) {
                    showAlertWithMessage("الكود غير موجود في القاعدة");
                    setAlertColor("danger");

                    SetPermissionCode(PermissionCode);
                    SetPermissionDate(PermissionDate);
                    Setnote(note);
                } else {
                    const result = [`${foundStudent.student_id}`, `${foundStudent.name}`, `${foundStudent.class}`, `${PermissionDate}`, `${note}`];
                    setPermissionSearchResult(result);
                    SetPermissionState(true);
                }
            }
        }
    };



    const handleDelPermissionSearch = () => {


        if (DelPermissionCode.length === 0 || DelPermissionDate.length === 0) {
            showAlertWithMessage("يرجي ملئ جميع الحقول");
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
            const foundStudent = mydata.find((student) => student.student_id == DelPermissionCode || student.name == DelPermissionCode);

            if (!foundStudent) {
                showAlertWithMessage("الكود غير موجود في القاعدة");
                setAlertColor("danger");
                SetDelPermissionCode(DelPermissionCode);
                SetDelPermissionDate(DelPermissionDate);

            }

            else if (DelPermissionDate === "لا توجد بيانات") {
                showAlertWithMessage("هذا الطالب لم ياخذ اي اذونات");
                setAlertColor("danger");

            }

            else {
                // Code is valid, update the state with the search result
                const result = [`${foundStudent.student_id}`, `${foundStudent.name}`, `${foundStudent.class}`, `${DelPermissionDate}`];
                setDelPermissionSearchResult(result);
                SetDelPermissionState(true);
            }
        }
    };

    function addPermission(e) {
        if (checkbox2 === true && PermissionState === true) {
            const foundStudent4 = mydata.findIndex((student) => student.student_id == PermissionCode || student.name === PermissionCode);

            // Check if any of the required fields is empty
            if (!PermissionDate || !PermissionCode || !note) {
                showAlertWithMessage("يرجى ملء جميع الحقول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            if (searchPermissionResult[0] !== PermissionCode || searchPermissionResult[3] !== PermissionDate || searchPermissionResult[4] !== note) {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            // Fetch permission and update the data
            let body = {
                "name": mydata[foundStudent4].name, "date_of_permission": PermissionDate, "note": note
            }

            addPermission_InDataBase(body);
            showAlertWithMessage("تمت اضافه الاذن بنجاح");
            setAlertColor("success");
            SetControl(true);
            SetPermissionDate("");
            SetPermissionCode("");
            SetPermissionName("");
            SetPermissionClass("");
            Setnote("");
            setPermissionSearchResult("");
            setCheckbox1(false);
            setCheckbox2(false);
        }

        // التحقق من وجود بيانات في searchPermissionResult
        if (!searchPermissionResult || searchPermissionResult.length === 0) {
            showAlertWithMessage("يرجي تعبئه الجدول بالبيانات المطلوبه لاضافه الاذن");
            setAlertColor("danger");
        }
        if (searchPermissionResult.length > 0 && checkbox2 === false) {
            showAlertWithMessage("يجب تحديد الطالب لاضافه الاذن");
            setAlertColor("danger");
        }
    }

    function DelPermission(e) {
        if (Delcheckbox2 === true && DelPermissionState === true) {


            // Check if any of the required fields is empty
            if (!DelPermissionDate || !DelPermissionCode) {
                showAlertWithMessage("يرجى ملء جميع الحقول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            if (searchDelPermissionResult[0] !== DelPermissionCode || searchDelPermissionResult[3] !== DelPermissionDate) {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }

            // Fetch permission and update the data

            DelPermission_InDataBase();
            showAlertWithMessage("تمت ازاله الاذن بنجاح");
            setAlertColor("success");




            SetDelPermissionDate("");
            SetDelPermissionCode("");
            SetDelPermissionName("");
            SetDelPermissionClass("");

            setDelPermissionSearchResult("");
            setDelCheckbox1(false);
            setDelCheckbox2(false);
        }

        // التحقق من وجود بيانات في searchPermissionResult
        if (!searchDelPermissionResult || searchDelPermissionResult.length === 0) {
            showAlertWithMessage("يرجي تعبئه الجدول بالبيانات المطلوبه لازاله الاذن");
            setAlertColor("danger");
        }
        if (searchDelPermissionResult.length > 0 && Delcheckbox2 === false) {
            showAlertWithMessage("يجب تحديد الطالب لازاله الاذن");
            setAlertColor("danger");
        }
    }


    async function addPermission_InDataBase(body) {

        try {

            // استخدم http:// في عنوان الخادم إذا كنت تستخدم HTTP
            await axios.post(`http://localhost:8080/api/add/permissions`, body);
            console.log('Permissions added successfully');
        } catch (error) {
            console.error('Error adding Permiision:', error);
        }
    }

    const DelPermission_InDataBase = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/api/del/permissions', {
                data: {
                    "studentId": DelPermissionCode,
                    "dateOfpermission": new Date(DelPermissionDate).toISOString(),
                }
            });

            console.log('Permissions Deleted successfully', response.data);



        } catch (error) {
            console.error('Error Deleting Permission:', error);
        }
    };


    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
  
    const [Delcheckbox1, setDelCheckbox1] = useState(false);
    const [Delcheckbox2, setDelCheckbox2] = useState(false);

    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
        setCheckbox2(!checkbox1); // تحديث حالة الصندوق الثاني لتكون نفس قيمة الصندوق الأول
    };

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
        setCheckbox1(!checkbox2); // تحديث حالة الصندوق الأول لتكون نفس قيمة الصندوق الثاني
    };


    const handleDelCheckbox1Change = () => {
        setDelCheckbox1(!Delcheckbox1);
        setDelCheckbox2(!Delcheckbox1); // تحديث حالة الصندوق الثاني لتكون نفس قيمة الصندوق الأول
    };

    const handleDelCheckbox2Change = () => {
        setDelCheckbox2(!Delcheckbox2);
        setDelCheckbox1(!Delcheckbox2); // تحديث حالة الصندوق الأول لتكون نفس قيمة الصندوق الثاني
    };



    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;

    useEffect(() => {
        // Set the timeout for 5 seconds (5000 milliseconds)
        const timeout = setTimeout(() => {
            hideAlert();
        }, 5000);

        // Cleanup the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []); // The empty dependency array ensures the effect runs only once after the initial render

    async function addAbsence_InDataBase(body) {
        try {
          await axios.put(`http://localhost:8080/api/absence`, body);
          console.log('Absence added successfully');
        } catch (error) {
          console.error('Error adding student:', error);
        }
      }
      
    let [control, SetControl] = useState(true);
  
    if (control === true) {
        
    
        mydata.forEach(student => {
            let studentPermissionDates = permissionData.length > 0 ? permissionData
                .filter(permission => permission.student_id === student.student_id)
                .map(permission => formatDate(permission.date_of_permission)) : "";
    
            let studentMyDataDates = student.date_of_absence ? student.date_of_absence.split(',') : "";
            let commonDates = studentPermissionDates.length > 0 ? studentPermissionDates.filter(date => studentMyDataDates.includes(date)) : "";
    
            if (commonDates.length > 0) {
                let differentDates = studentMyDataDates.filter(
                    date => !commonDates.includes(date)
                );
    
                let body = [{
                    "studentId": student.student_id, "date_of_absence": differentDates.join(',')
                }];
    
                addAbsence_InDataBase(body);
                SetControl(false);
            }
           if(!commonDates){
            SetControl(false);
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

                            style={{ height: '40px', padding: '5px', position: 'fixed', top: '60px', marginBottom: "50px", width: '75%', zIndex: "10000" }}                        >
                            <p style={{ textAlign: 'center' }}>{alertMessage}</p>
                        </Alert>

                        <div className="row">




                            <div className="col-6">
                                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                                    <div className="card-body">
                                        {/* Page Header */}
                                        <div className="page-header">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h3 className="page-title">Add Leave Permission</h3>
                                                </div>

                                                <br /><br /><br />
                                                <div className="student-group-form">
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <form>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search Student"
                                                                        className="form-control"
                                                                        list="students6"
                                                                        value={PermissionCode}
                                                                        onBlur={checkInputValue}
                                                                        onChange={(e) => { SetPermissionCode(e.target.value); }}
                                                                    />
                                                                    <datalist id="students6">
                                                                        {mydata
                                                                            .filter(
                                                                                (student) =>
                                                                                    student.student_id.toLowerCase().includes(PermissionCode.toLowerCase()) ||
                                                                                    student.name.toLowerCase().includes(PermissionCode.toLowerCase())
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
                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    placeholder="Date ..."
                                                                    value={PermissionDate}
                                                                    onChange={(e) => SetPermissionDate(e.target.value)}
                                                                    max={currentDate} // تحديد تاريخ الحد الأقصى
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Note ..." value={note} onChange={(e) => Setnote(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="search-student-btn ">
                                                                <button type="btn" className="btn btn-primary" onClick={handlePermissionSearch}>
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
                                                        <th>Date</th>
                                                        <th>Note</th>



                                                    </tr>
                                                </thead>
                                                <tbody>




                                                    {searchPermissionResult && searchPermissionResult.length > 0 && (



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
                                                            {searchPermissionResult.map((e) =>
                                                                <td>{e}</td>
                                                            )}
                                                        </tr>






                                                    )}



                                                </tbody>
                                            </table>
                                            &nbsp;
                                            <div className="col-lg-12 mx-auto">
                                                <div className="search-student-btn">
                                                    <button type="btn" className="btn btn-primary col-12" onClick={addPermission} >
                                                        Add Leave Permission
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
                                                    <h3 className="page-title">Del Leave Permission</h3>
                                                </div>

                                                <br /><br /><br />
                                                <div className="student-group-form">
                                                    <div className="row">
                                                        <div className="col-lg-5 col-md-6">
                                                            <div className="form-group">
                                                                <form>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search Student"
                                                                        className="form-control"
                                                                        list="students6"
                                                                        value={DelPermissionCode}
                                                                        onBlur={checkInputValue}
                                                                        onChange={(e) => { SetDelPermissionCode(e.target.value); }}
                                                                    />



                                                                    <datalist id="students8">
                                                                        {mydata
                                                                            .filter(
                                                                                (student) =>
                                                                                    student.student_id.toLowerCase().includes(DelPermissionCode.toLowerCase()) ||
                                                                                    student.name.toLowerCase().includes(DelPermissionCode.toLowerCase())
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
                                                                    className="form-control"
                                                                    placeholder="Date ..."
                                                                    list='students12'
                                                                    value={DelPermissionDate}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => SetDelPermissionDate(e.target.value)}
                                                                />

                                                                <datalist id="students12">
                                                                    {permissionData && permissionData.length > 0 ? (
                                                                        // هنا يتم عرض الخيارات إذا كان هناك بيانات
                                                                        permissionData
                                                                            .filter((student) => student.student_id.startsWith(DelPermissionCode))
                                                                            .map((student) => (
                                                                                <option key={student.id} value={formatDate(student.date_of_permission)} />
                                                                            ))
                                                                    ) : (
                                                                        // إذا كان عدد الخيارات 0، يتم عرض الخيار الوحيد "لا توجد بيانات"
                                                                        <option value="لا توجد بيانات" />
                                                                    )}
                                                                </datalist>




                                                            </div>
                                                        </div>

                                                        <div className="col-lg-2">
                                                            <div className="search-student-btn">
                                                                <button type="btn" className="btn btn-primary col-12" onClick={handleDelPermissionSearch}>
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
                                                                    checked={Delcheckbox1}
                                                                    onChange={handleDelCheckbox1Change}
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




                                                    {searchDelPermissionResult && searchDelPermissionResult.length > 0 && (



                                                        <tr>
                                                            <td>
                                                                <div className="form-check check-tables">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"

                                                                        checked={Delcheckbox2}
                                                                        onChange={handleDelCheckbox2Change}
                                                                    />
                                                                </div>
                                                            </td>
                                                            {searchDelPermissionResult.map((e) =>
                                                                <td>{e}</td>
                                                            )}
                                                        </tr>






                                                    )}



                                                </tbody>
                                            </table>
                                            &nbsp;
                                            <div className="col-lg-12 mx-auto">
                                                <div className="search-student-btn">
                                                    <button type="btn" className="btn btn-primary col-12" onClick={DelPermission} >
                                                        Del Leave Permission
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

export default Permiisions;

