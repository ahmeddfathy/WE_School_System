import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import WEImage from './WE.png';
import moment from 'moment';
function Competition() {


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
        setTimeout(() => {
            hideAlert();
        }, 5000);
    };

    const hideAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    function formatSelectedValue(selectedValue) {

        return selectedValue.replace(/^\d+-\s/, '');
    }
    let [Del_Competition_Code, SetDel_Competition_Code] = useState("");



    useEffect(() => {

        getCompetitions(Del_Competition_Code);

    }, [Del_Competition_Code]);

    const getCompetitions = async (val) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/get/competitions/${val}`);
            setCompetitions(response.data);
            setLoading(false);
            console.log(response)
        } catch (error) {
            console.error('Error retrieving Competitions:', error);
            setLoading(false);
        }
    };


    let [Del_Competition_Name, SetDel_Competition_Name] = useState("");


    let [CompetitionCode, SetCompetitionCode] = useState("");
    let [student_name, setstudent_name] = useState("");
    let [CompetitionClass, SetCompetitionClass] = useState("");
    let [CompetitionName, SetCompetitionName] = useState("");
    let [BeforeOrAfterCompetitionN, SetBeforeOrAfterCompetitionN] = useState("");
    let [DelBeforeOrAfterCompetitionN, SetDelBeforeOrAfterCompetitionN] = useState("");

    const [CompetitiondelState, setCompetitionsdelState] = useState(false);
    const [rank, Setrank] = useState("");
    const [delrank, Setdelrank] = useState("");



    const [ValditeState, SetValditeState] = useState(false);


    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const handleCheckbox1Change = () => {
        setCheckbox1(!checkbox1);
        setCheckbox2(!checkbox1);
    }

    const handleCheckbox2Change = () => {
        setCheckbox2(!checkbox2);
        setCheckbox1(!checkbox2);
    };

    const [removecheckbox1, setRemoveCheckbox1] = useState(false);
    const [removecheckbox2, setRemoveCheckbox2] = useState(false);

    const handleRemoveCheckbox1Change = () => {
        setRemoveCheckbox1(!removecheckbox1);
        setRemoveCheckbox2(!removecheckbox1);
    };

    const handleRemoveCheckbox2Change = () => {
        setRemoveCheckbox1(!removecheckbox2);
        setRemoveCheckbox2(!removecheckbox2);
    };




    const [searchDelResult, setDelSearchResult] = useState([]);
    const [searchCompetitionResult, setCompetitionSearchResult] = useState([]);





    const [mydata, setmydata] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

    let [Competitions, setCompetitions] = useState([]);


    function formatDate(dateString) {
        const formattedDate = moment(dateString).format('YYYY-MM-DD');
        return formattedDate;
    }



    const handleAddCompetitionSearch = () => {
        if (CompetitionCode.length === 0 || CompetitionName.length === 0 || CompetitionDate.length === 0
            || BeforeOrAfterCompetitionN.length === 0 || BeforeOrAfterCompetitionN === "After" ? rank.length === 0 : "") {
            showAlertWithMessage("يرجى ملء الجدول");
            setAlertColor("danger");
        } else if (CloseDataList === false) {
            showAlertWithMessage(`هذه القيمه خاطئه يرجي الاختيار من القائمه ${DataForDataList}`);
            setAlertColor("danger");
            if (HandleCloseDataList === true) {
                SetCloseDataList(true);
            }

        }
        else {
            // Check if Competitions is an array
            if (Array.isArray(Competitions)) {
                // Check if there is a match in the Competitions array
                const isDataExists = Competitions.some((competition) =>
                    competition.rank == rank &&
                    competition.name_of_competition == CompetitionName &&
                    competition.student_id == CompetitionCode &&
                    formatDate(competition.date_of_competition) == formatDate(CompetitionDate) &&
                    competition.joined == BeforeOrAfterCompetitionN
                );

                if (isDataExists) {
                    showAlertWithMessage("البيانات موجودة في قاعدة البيانات");
                    setAlertColor("danger");
                }
                else {
                    // Continue with the rest of your logic
                    const foundStudent = mydata.find((student) => student.student_id === CompetitionCode || student.name === CompetitionCode);

                    if (!foundStudent) {
                        showAlertWithMessage("الكود غير موجود في القاعدة");
                        setAlertColor("danger");
                    } else {
                        let result = [];
                        let result2 = [];
                        if (BeforeOrAfterCompetitionN === "After") {
                            result = [foundStudent.student_id, foundStudent.name, foundStudent.class, CompetitionName, CompetitionDate,
                                BeforeOrAfterCompetitionN, rank];
                            setCompetitionSearchResult(result);
                            SetValditeState(true);
                            setstudent_name(foundStudent.name);

                        }
                        if (BeforeOrAfterCompetitionN === "Before") {
                            result2 = [foundStudent.student_id, foundStudent.name, foundStudent.class, CompetitionName, CompetitionDate,
                                BeforeOrAfterCompetitionN];
                            setCompetitionSearchResult(result2);
                            SetValditeState(true);
                            setstudent_name(foundStudent.name);

                        }





                    }
                }
            }

            else {
                // Continue with the rest of your logic
                const foundStudent = mydata.find((student) => student.student_id === CompetitionCode || student.name === CompetitionCode);

                if (!foundStudent) {
                    showAlertWithMessage("الكود غير موجود في القاعدة");
                    setAlertColor("danger");
                } else {
                    let result = [];
                    let result2 = [];

                    if (BeforeOrAfterCompetitionN === "After") {
                        result = [foundStudent.student_id, foundStudent.name, foundStudent.class, CompetitionName, CompetitionDate,
                            BeforeOrAfterCompetitionN, rank];
                        setCompetitionSearchResult(result);
                        SetValditeState(true);
                        setstudent_name(foundStudent.name);

                    }
                    if (BeforeOrAfterCompetitionN === "Before") {
                        result2 = [foundStudent.student_id, foundStudent.name, foundStudent.class, CompetitionName, CompetitionDate,
                            BeforeOrAfterCompetitionN];
                        setCompetitionSearchResult(result2);
                        SetValditeState(true);
                        setstudent_name(foundStudent.name);

                    }










                }
            }
        }
    };

    const handleDelCompetitions = () => {


        if (Del_Competition_Code.length === 0 || Del_Competition_Name.length === 0 || DelCompetitionDate.length === 0 ||
            DelBeforeOrAfterCompetitionN.length === 0 || DelBeforeOrAfterCompetitionN === "After" ? delrank.length === 0 : "") {
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
            const foundStudent = mydata.find((student) => student.student_id == Del_Competition_Code || student.name == Del_Competition_Code);

            if (!foundStudent) {
                showAlertWithMessage("الكود غير موجود في القاعدة");
                setAlertColor("danger");
                SetDel_Competition_Code(Del_Competition_Code);
                SetDel_Competition_Name(Del_Competition_Name);
                Setdelrank(delrank);
                SetDelBeforeOrAfterCompetitionN(DelBeforeOrAfterCompetitionN)
                SetDelCompetitionDate(DelCompetitionDate);
            }


            else if (Del_Competition_Name === "الطالب لم يشارك في مسابقات" || delrank === "الطالب لم يشارك في مسابقات" ||
                DelBeforeOrAfterCompetitionN === "الطالب لم يشارك في مسابقات" || DelCompetitionDate === "الطالب لم يشارك في مسابقات") {
                showAlertWithMessage("الطالب لم يشارك في مسابقات")
                setAlertColor("danger");
            }




            else {
                let result = [];
                if (DelBeforeOrAfterCompetitionN === "After") {
                    result = [`${Del_Competition_Code}`, `${foundStudent.name}`, `${foundStudent.class}`,
                    `${Del_Competition_Name}`, `${DelBeforeOrAfterCompetitionN}`, `${DelCompetitionDate}`, `${delrank}`]
                    setDelSearchResult(result);
                }
                else if (DelBeforeOrAfterCompetitionN === "Before") {

                    result = [`${Del_Competition_Code}`, `${foundStudent.name}`, `${foundStudent.class}`,
                    `${Del_Competition_Name}`, `${DelBeforeOrAfterCompetitionN}`, `${DelCompetitionDate}`]
                    setDelSearchResult(result);
                }

                setCompetitionsdelState(true);




            }
        }
    };


    function removeCompetition(e) {


        if (DelBeforeOrAfterCompetitionN !== "Before" && DelBeforeOrAfterCompetitionN !== "After") {
            showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
            setAlertColor("danger");
            e.preventDefault();

            return;
        }

        if (!Del_Competition_Code && !Del_Competition_Name && !DelBeforeOrAfterCompetitionN && !DelCompetitionDate) {
            showAlertWithMessage("يرجي ملئ الجدول ببيانات لحذفها");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        }
        if (removecheckbox2 === false && CompetitiondelState === true) {
            showAlertWithMessage("يرجى اختيار الخيار لإزالة المسابقة");
            setAlertColor("danger");

            e.preventDefault(); // Prevent form submission
            return;
        }


        if (DelBeforeOrAfterCompetitionN === "After") {
            if (searchDelResult[0] !== Del_Competition_Code ||
                searchDelResult[3] !== Del_Competition_Name ||
                searchDelResult[4] !== DelBeforeOrAfterCompetitionN ||
                searchDelResult[5] !== DelCompetitionDate ||
                searchDelResult[6] !== delrank
            ) {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }
        }

        if (DelBeforeOrAfterCompetitionN === "Before") {
            if (searchDelResult[0] !== Del_Competition_Code ||
                searchDelResult[3] !== Del_Competition_Name ||
                searchDelResult[4] !== DelBeforeOrAfterCompetitionN ||
                searchDelResult[5] !== formatDate(DelCompetitionDate)

            ) {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); // Prevent form submission
                return;
            }
        }





        if (!Del_Competition_Code || !Del_Competition_Name || !DelCompetitionDate || !DelBeforeOrAfterCompetitionN
            || DelBeforeOrAfterCompetitionN === "After" ? !delrank : "") {
            showAlertWithMessage("يرجى ملء الجدول بالبيانات لحذفها");
            setAlertColor("danger");
            SetDel_Competition_Code("");
            SetDel_Competition_Name("");
            Setdelrank("");
            SetDelBeforeOrAfterCompetitionN("");
            SetDelCompetitionDate("");
            e.preventDefault();


            return;
        } else {
            // Remove competition from database
            DelCompetition_indatabase();
            setRemoveCheckbox1(false);
            setRemoveCheckbox2(false);


            setDelSearchResult("");
            SetDel_Competition_Code("");
            SetDel_Competition_Name("");

            Setdelrank("");
            SetDelCompetitionDate("");
            SetDelBeforeOrAfterCompetitionN("");


        }
    }




    async function DelCompetition_indatabase() {
        try {
            // التحقق من أن لديك بيانات صالحة لإرسالها
            if (Del_Competition_Code && Del_Competition_Name) {
                const response = await axios.delete("http://localhost:8080/api/del/competitions", {
                    data: {
                        studentId: Del_Competition_Code,
                        name_of_competition: Del_Competition_Name,
                        date_of_competition: DelCompetitionDate,
                        rank: DelBeforeOrAfterCompetitionN === 'Before' ? "0" : delrank,

                        joined: searchDelResult[4]

                    }

                });

                console.log('Competition deleted successfully', response.data);
                if (response.data.success) {
                    // إذا كان هناك نجاح في حذف المخالفة
                    console.log('competitions deleted successfully', response.data);
                } else {
                    // إذا كان هناك خطأ، قم بعرض رسالة تنبيه باستخدام خاصية 'error'
                    console.error('Error deleting Competiton:', response.data.error);
                    if (response.data.error === undefined) {
                        showAlertWithMessage("تم حذف المسابقه بنجاح");
                        setAlertColor("success");
                    }
                    else {
                        showAlertWithMessage("لقد قمت بادخال بيانات خاطئه");
                        setAlertColor("danger");
                    }


                }
            } else {

                showAlertWithMessage('الرجاء إدخال رقم الطالب واسم المسابقة لحذف السجل.');
            }
        } catch (error) {
            if (error.response) {

                console.error('Error deleting competition:', error.response.status, error.response.data);
                if (error.response.data.error === 'No matching competitions found') {
                    showAlertWithMessage('لم يتم العثور على مسابقات مطابقة.');
                } else {

                    showAlertWithMessage('حدث خطأ أثناء حذف المسابقة.');
                    setAlertColor("danger");
                }
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request', error.message);
            }
        }
    }




    async function addCompetition_indatabase() {
        try {
            const body = {
                name: student_name,
                name_of_competition: CompetitionName,
                rank: !rank ? "0.1" : parseInt(rank),
                date_of_competition: formatDate(CompetitionDate),
                joined: BeforeOrAfterCompetitionN
            };
            console.log("Request Body:", body);

            const response = await axios.post(`http://localhost:8080/api/add/competitions`, body);
            console.log('Competitions added successfully:', response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error status:', error.response.status);
                console.error('Response data:', error.response.data);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server. Request details:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
        }
    }


    function addCompetition(e) {


        if (checkbox2 === false && ValditeState === true) {
            showAlertWithMessage("يرجى اختيار الخيار لاضافه المسابقة");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            console.log("Condition not met");
            return;
        }
        if (!CompetitionName && !CompetitionCode && !BeforeOrAfterCompetitionN && !CompetitionDate) {
            showAlertWithMessage("يرجي ملئ الجدول ببيانات لاضافتها");
            setAlertColor("danger");
            e.preventDefault(); // Prevent form submission
            return;
        }



        else {

            if (BeforeOrAfterCompetitionN === "Before") {
                if (searchCompetitionResult[0] !== CompetitionCode || searchCompetitionResult[3] !== CompetitionName
                    ||
                    searchCompetitionResult[4] != formatDate(CompetitionDate) || searchCompetitionResult[5] !== BeforeOrAfterCompetitionN
                ) {
                    showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                    setAlertColor("danger");
                    e.preventDefault(); // Prevent form submission
                    return;
                }
            }

            if (BeforeOrAfterCompetitionN === "After") {
                if (searchCompetitionResult[0] !== CompetitionCode || searchCompetitionResult[3] !== CompetitionName
                    ||
                    searchCompetitionResult[4] != formatDate(CompetitionDate) || searchCompetitionResult[5] !== BeforeOrAfterCompetitionN ||
                    searchCompetitionResult[6] !== rank
                ) {
                    showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                    setAlertColor("danger");
                    e.preventDefault(); // Prevent form submission
                    return;
                }
            }

            if (BeforeOrAfterCompetitionN !== "After" && BeforeOrAfterCompetitionN !== "Before") {
                showAlertWithMessage("يجب ان تكون بيانات الانبوت مثل بيانات الجدول");
                setAlertColor("danger");
                e.preventDefault(); //
            }
            else {
                addCompetition_indatabase();
                showAlertWithMessage("تمت اضافه البيانات بنجاح")
                setAlertColor("success");

                SetCompetitionCode("");
                SetCompetitionName("");
                SetBeforeOrAfterCompetitionN("");
                SetCompetitionDate("");
                SetCompetitionClass("");
                setCompetitionSearchResult("");
                Setrank("");
                setCheckbox1(false);
                setCheckbox2(false);


                console.log(mydata);
            }

        }
    }



    let [CompetitionDate, SetCompetitionDate] = useState("");
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const currentDate = `${yyyy}-${mm}-${dd}`;

    let [DelCompetitionDate, SetDelCompetitionDate] = useState("");





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

                            style={{ height: '40px', padding: '5px', position: 'fixed', top: '60px', marginBottom: "50px", width: '75%', zIndex: "10000" }}
                        >
                            <p style={{ textAlign: 'center' }}>{alertMessage}</p>
                        </Alert>
                        <div className="row">

                            <div className="col-6">
                                <div className="card card-table comman-shadow" style={{ overflow: "auto" }}>
                                    <div className="card-body" >
                                        {/* Page Header */}
                                        <div className="page-header">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h3 className="page-title">Add Competition</h3>
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
                                                                        list="students1"
                                                                        value={CompetitionCode}
                                                                        onBlur={checkInputValue}
                                                                        onChange={(e) => { SetCompetitionCode(e.target.value); }}
                                                                    />


                                                                    <datalist id="students1">
                                                                        {mydata
                                                                            .filter(
                                                                                (student) =>
                                                                                    student.student_id.toLowerCase().includes(CompetitionCode.toLowerCase()) ||
                                                                                    student.name.toLowerCase().includes(CompetitionCode.toLowerCase())
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
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Competition name"
                                                                    value={CompetitionName}
                                                                    onChange={(e) => SetCompetitionName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Case"
                                                                    value={BeforeOrAfterCompetitionN}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => SetBeforeOrAfterCompetitionN(e.target.value)}
                                                                    list='case'
                                                                />

                                                                <datalist id='case'>
                                                                    <option value="Before" />
                                                                    <option value="After" />
                                                                </datalist>
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="date"
                                                                    className="form-control"
                                                                    placeholder="Date ..."
                                                                    value={CompetitionDate}
                                                                    onChange={(e) => SetCompetitionDate(e.target.value)}
                                                                    max={currentDate} // تحديد تاريخ الحد الأقصى
                                                                />
                                                            </div>
                                                        </div>
                                                        {BeforeOrAfterCompetitionN === "After" ?
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="form-group">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Rank ..."
                                                                        value={rank}
                                                                        min={1}
                                                                        onChange={(e) => Setrank(e.target.value)}
                                                                    />

                                                                </div>
                                                            </div>
                                                            : ""}
                                                        <div className="col-lg-2">
                                                            <div className="search-student-btn">
                                                                <button type="btn" className="btn btn-primary" onClick={handleAddCompetitionSearch}>
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
                                                        <th>Competition</th>
                                                        <th>Competition Date</th>
                                                        <th>Case</th>
                                                        {
                                                            BeforeOrAfterCompetitionN === "After" ?
                                                                <th>Rank</th> : ""
                                                        }



                                                    </tr>
                                                </thead>
                                                <tbody>




                                                    {searchCompetitionResult && searchCompetitionResult.length > 0 && (



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
                                                            {searchCompetitionResult.map((e) =>
                                                                <td>{e}</td>
                                                            )}
                                                        </tr>






                                                    )}



                                                </tbody>
                                            </table>
                                            &nbsp;
                                            <div className="col-lg-12 mx-auto">
                                                <div className="search-student-btn">
                                                    <button type="btn" className="btn btn-primary col-12" onClick={addCompetition} >
                                                        Add competition
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
                                                    <h3 className="page-title">Remove Competition</h3>
                                                </div>

                                                <br /><br /><br />
                                                <div className="student-group-form">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Serch Student"
                                                                    className="form-control"
                                                                    list="students2"
                                                                    onBlur={checkInputValue}
                                                                    value={Del_Competition_Code}
                                                                    onChange={(e) => { SetDel_Competition_Code(e.target.value); getCompetitions(e.target.value) }}
                                                                />
                                                                <datalist id="students2">
                                                                    {mydata
                                                                        .filter(
                                                                            (student) =>
                                                                                student.student_id.toLowerCase().includes(Del_Competition_Code.toLowerCase()) ||
                                                                                student.name.toLowerCase().includes(Del_Competition_Code.toLowerCase())
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
                                                                {/* الحقل النصي */}
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Competition name"
                                                                    value={Del_Competition_Name}
                                                                    onBlur={checkInputValue}
                                                                    list="students5"
                                                                    onChange={(e) => SetDel_Competition_Name(formatSelectedValue(e.target.value))}
                                                                />

                                                                <datalist id="students5">
                                                                    {/* تصفية الخيارات بناءً على DelCompetitionCode */}
                                                                    {Competitions && Competitions.length > 0 && Del_Competition_Code ? (
                                                                        Array.from(new Set(
                                                                            Competitions
                                                                                .filter(ele => ele.student_id === Del_Competition_Code) // تصفية بناءً على DelCompetitionCode
                                                                                .map(ele => ele.name_of_competition)
                                                                        )).map((uniqueValue, index) => (
                                                                            <option key={index} value={uniqueValue} />
                                                                        ))
                                                                    ) : (
                                                                        <option value="الطالب لم يشارك في مسابقات" />
                                                                    )}
                                                                </datalist>
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-3 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Case"
                                                                    value={DelBeforeOrAfterCompetitionN}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => SetDelBeforeOrAfterCompetitionN(e.target.value)}
                                                                    list='delcase'
                                                                />

                                                                <datalist id="delcase">
                                                                    {Competitions && Competitions.length > 0 ? (
                                                                        // Use a Set to store unique values
                                                                        Array.from(new Set(
                                                                            Competitions
                                                                                .filter((ele) => Del_Competition_Name ? ele.name_of_competition === Del_Competition_Name : true)
                                                                                .filter((ele) => DelBeforeOrAfterCompetitionN ? ele.joined === DelBeforeOrAfterCompetitionN : true)
                                                                                .filter((ele) => Del_Competition_Code ? ele.student_id === Del_Competition_Code : true)
                                                                                .map((student) => student.joined)
                                                                        )).map((value, index) => (
                                                                            <option key={index} value={value} />
                                                                        ))
                                                                    ) : (
                                                                        <option value="لا توجد بيانات" />
                                                                    )}
                                                                </datalist>

                                                            </div>
                                                        </div>



                                                        <div className="col-lg-4 col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Date ..."
                                                                    list='students120'
                                                                    value={DelCompetitionDate}
                                                                    onBlur={checkInputValue}
                                                                    onChange={(e) => SetDelCompetitionDate(e.target.value)}
                                                                />

                                                                <datalist id="students120">
                                                                    {Competitions && Competitions.length > 0 ? (
                                                                        Competitions
                                                                            .filter((ele) => Del_Competition_Name ? ele.name_of_competition === Del_Competition_Name : true)
                                                                            .filter((ele) => DelBeforeOrAfterCompetitionN ? ele.joined === DelBeforeOrAfterCompetitionN : true)
                                                                            .filter((ele) => Del_Competition_Code ? ele.student_id === Del_Competition_Code : true)
                                                                            .map((student) => (
                                                                                <option key={student.id} value={formatDate(student.date_of_competition)} />
                                                                            ))
                                                                    ) : (
                                                                        <option value="لا توجد بيانات" />
                                                                    )}
                                                                </datalist>




                                                            </div>
                                                        </div>
                                                        {DelBeforeOrAfterCompetitionN === "After" ?
                                                            <div className="col-lg-3 col-md-6">
                                                                <div className="form-group">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Rank ..."
                                                                        onBlur={checkInputValue}
                                                                        value={delrank}
                                                                        list='students7'
                                                                        onChange={(e) => Setdelrank(formatSelectedValue(e.target.value))}
                                                                    />
                                                                    <datalist id="students7">
                                                                        {Competitions && Competitions.length > 0 ? (
                                                                            Competitions
                                                                                .filter((ele) => Del_Competition_Name ? ele.name_of_competition === Del_Competition_Name : true)
                                                                                .filter((ele) => DelBeforeOrAfterCompetitionN ? ele.joined === DelBeforeOrAfterCompetitionN : true)
                                                                                .filter((ele) => DelCompetitionDate ? formatDate(ele.date_of_competition) == formatDate(DelCompetitionDate) : true)
                                                                                .filter((ele) => Del_Competition_Code ? ele.student_id === Del_Competition_Code : true) // إضافة تصفية بناءً على Del_Competition_Code
                                                                                .map((ele, index) => (
                                                                                    <option key={index} value={ele.rank} />
                                                                                ))
                                                                        ) : (
                                                                            <option value="الطالب لم يشارك في مسابقات" />
                                                                        )}
                                                                    </datalist>

                                                                </div>
                                                            </div>
                                                            : ""}


                                                        <div className="col-lg-2">
                                                            <div className="search-student-btn">
                                                                <button type="btn" className="btn btn-primary" onClick={handleDelCompetitions}>
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


                                                        <th>Competition</th>
                                                        <th>Case</th>
                                                        <th>Date</th>
                                                        {DelBeforeOrAfterCompetitionN === "After" ?
                                                            <th>Rank</th> : ""

                                                        }

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
                                                    <button type="btn" className="btn btn-primary col-12" onClick={removeCompetition}>
                                                        Remove competition
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

export default Competition;