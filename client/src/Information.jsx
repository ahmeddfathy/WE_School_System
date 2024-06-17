import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


import WEImage from './WE.png';
// import WEImage from '../assets/image/WE.png';

const Information = () => {
    const [Students, SetStudets] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/home')
            .then(response => {
                SetStudets(response.data.students);

            })
            .catch(error => {
                console.error('Error retrieving student information:', error);

            });
    }, []);






    const [selectedGradeOption, setSelectedGradeOption] = useState('');
    const [selectedClassOption, setSelectedClassOption] = useState('');


    const handleSelectGradeChange = (event) => {
        setSelectedGradeOption(event.target.value);
    };
    const handleSelectClassChange = (event) => {
        setSelectedClassOption(event.target.value);
    };


    function showProfile(id) {
        navigate(
            {
                pathname: `/profile/${id}`
            }
        )
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

            <div className="main-wrapper">

                <div className="page-wrapper">
                    <div className="content container-fluid">

                        <div className="row">


                            <div className="col-12">
                                <div className="container mt-4">

                                    <h2 className="text-center mb-4">Student Information</h2>
                                    <div className="select ">
                                        <div>

                                            <select
                                                id="mySelect"
                                                className="form-control custom-select"
                                                value={selectedGradeOption}
                                                onChange={handleSelectGradeChange}
                                            >
                                                <option value="">Grade</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                        <div>

                                            <select
                                                id="mySelect"
                                                className="form-control custom-select"
                                                value={selectedClassOption}
                                                onChange={handleSelectClassChange}
                                            >
                                                <option value="">Class</option>
                                                {selectedGradeOption == 10 ? (
                                                    <>

                                                        <option value="1a">A</option>
                                                        <option value="1b">B</option>
                                                        <option value="1c">C</option>
                                                        <option value="1d">D</option>
                                                        <option value="1e">E</option>
                                                        <option value="1f">F</option>
                                                        <option value="1g">G</option>
                                                    </>
                                                ) : selectedGradeOption == 11 ? (
                                                    <>

                                                        <option value="2a">A</option>
                                                        <option value="2b">B</option>
                                                        <option value="2c">C</option>
                                                        <option value="2d">D</option>
                                                        <option value="2e">E</option>
                                                        <option value="2f">F</option>
                                                        <option value="2g">G</option>
                                                    </>

                                                ) : selectedGradeOption == 12 ? (<>

                                                    <option value="3a">A</option>
                                                    <option value="3b">B</option>
                                                    <option value="3c">C</option>
                                                    <option value="3d">D</option>
                                                    <option value="3e">E</option>
                                                    <option value="3f">F</option>
                                                    <option value="3g">G</option>
                                                </>) : null
                                                }



                                            </select>
                                        </div>
                                    </div>

                                    <div className="table-responsive" style={{ maxWidth: "100%" }}>
                                        <table className="table table-bordered table-hover table-center mb-1 datatable table-striped table-sm">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    <th>Class</th>
                                                    <th>Grade</th>
                                                    <th>Phone</th>
                                                    <th>Specialization</th>
                                                    <th>Absence</th>
                                                    <th>Delays</th>
                                                    <th>Permissions</th>
                                                    <th>Competitions</th>
                                                    <th>Violations</th>
                                                    <th>Parent Email</th>
                                                    <th>Parent Phone</th>
                                                    <th>Profile</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Students && (
                                                    (selectedGradeOption || selectedClassOption) ? (
                                                        Students
                                                            .filter((student) =>
                                                                (!selectedGradeOption || student.grade === selectedGradeOption) &&
                                                                (!selectedClassOption || student.class.toLowerCase() === selectedClassOption.toLowerCase())
                                                            )
                                                            .length === 0 ? (
                                                            <tr>
                                                                <td colSpan={14}>لا يوجد بيانات لعرضها</td>
                                                            </tr>
                                                        ) : (
                                                            Students
                                                                .filter((student) =>
                                                                    (!selectedGradeOption || student.grade === selectedGradeOption) &&
                                                                    (!selectedClassOption || student.class.toLowerCase() === selectedClassOption.toLowerCase())

                                                                )
                                                                .map((student) => (

                                                                    <tr key={student.student_id}>
                                                                        <td>{student.student_id}</td>
                                                                        <td>{student.name}</td>
                                                                        <td>{student.class}</td>
                                                                        <td>{student.grade}</td>
                                                                        <td>{student.phone}</td>
                                                                        <td>{student.specialization}</td>
                                                                        <td>{student.absence}</td>
                                                                        <td>{student.delays}</td>
                                                                        <td>{student.permissions}</td>
                                                                        <td>{student.competitions}</td>
                                                                        <td>{student.violations}</td>
                                                                        <td>{student.parent_email}</td>
                                                                        <td>{student.parent_phone}</td>
                                                                        <td>
                                                                            <button className="btn btn-primary" onClick={(e) => showProfile(student.student_id)}>
                                                                                show profile
                                                                            </button>
                                                                        </td>
                                                                    </tr>

                                                                ))
                                                        )
                                                    ) : (
                                                        Students
                                                            .filter((student) => student.absence >= 7)
                                                            .length === 0 ? (
                                                            <tr>
                                                                <td colSpan={14}>لا يوجد بيانات لعرضها</td>
                                                            </tr>
                                                        ) : (
                                                            Students
                                                                .filter((student) => student.absence >= 7)
                                                                .map((student) => (
                                                                    <tr key={student.student_id}>
                                                                        <td>{student.student_id}</td>
                                                                        <td>{student.name}</td>
                                                                        <td>{student.class}</td>
                                                                        <td>{student.grade}</td>
                                                                        <td>{student.phone}</td>
                                                                        <td>{student.specialization}</td>
                                                                        <td>{student.absence}</td>
                                                                        <td>{student.delays}</td>
                                                                        <td>{student.permissions}</td>
                                                                        <td>{student.competitions}</td>
                                                                        <td>{student.violations}</td>
                                                                        <td>{student.parent_email}</td>
                                                                        <td>{student.parent_phone}</td>
                                                                        <td>
                                                                            <button className="btn btn-primary" onClick={(e) => showProfile(student.student_id)}>
                                                                                show profile
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                        )
                                                    )
                                                )}
                                            </tbody>





                                        </table>
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

export default Information;