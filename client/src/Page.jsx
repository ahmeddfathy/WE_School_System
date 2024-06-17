import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import moment from 'moment'
import WEImage from './WE.png';

function UpdatedDayPage() {
  let [Competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCompetitions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/get/competitions`);
      setCompetitions(response.data);
      setLoading(false);

    } catch (error) {
      console.error('Error retrieving Competitions:', error);
      setLoading(false);
    }
  };



  let [violations, setViolations] = useState([]);


  const getViolations = async (val) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getViolations`);
      setViolations(response.data);
      setLoading(false);

    } catch (error) {
      console.error('Error retrieving violations:', error);
      setLoading(false);
    }
  };

  const [permissions, SetPermissionData] = useState([]);

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

  const [absence, setAbsenceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get/absence');
        setAbsenceData(response.data.absence);
      } catch (error) {
        console.error('حدث خطأ أثناء استرجاع البيانات:', error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    getCompetitions();
    getViolations();

  })
  function formatDate(dateString) {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    return formattedDate;
  }

  var today = new Date();
  var todayDate = today.toISOString().split('T')[0];
  var filteredViolationsDay = violations.length > 0 ? violations.filter(function (violation) {

    return formatDate(violation.date_of_violation) === todayDate;
  }) : "";


  var filteredCompetitionssDay = Competitions.length > 0 ? Competitions.filter(function (Competition) {

    return formatDate(Competition.date_of_competition) === todayDate;
  }) : "";


  var filteredPermissionsDay = permissions.length > 0 ? permissions.filter(function (permission) {

    return formatDate(permission.date_of_permission) === todayDate;
  }) : "";




  var filteredAbsenceDay = absence.length > 0 ? absence.filter(function (absence) {
    const dates = absence.date_of_absence.split(',').map(date => date.trim());
    return dates.some(date => formatDate(date) === todayDate);
  }) : "";



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
            <div className="row">
              {/* Absence Table */}
              <div className="col-6">
                <div className="card card-table common-shadow">
                  <div className="card-body">
                    <h3 className="page-title">Absence</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-center mb-0 datatable table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th>Name</th>
                            <th>Class</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAbsenceDay.length > 0 ? (
                            filteredAbsenceDay.map((e, index) => (
                              <tr key={index}>
                                <td>{e.name}</td>
                                <td>{e.class}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2">No absence records for today</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitions Table */}
              <div className="col-6">
                <div className="card card-table common-shadow">
                  <div className="card-body">
                    <h3 className="page-title">Competitions</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-center mb-0 datatable table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCompetitionssDay.length > 0 ? (
                            filteredCompetitionssDay.map((el, index) => (
                              <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.class}</td>
                                <td>{el.joined}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No competition records for today</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Violations Table */}
              <div className="col-6">
                <div className="card card-table common-shadow">
                  <div className="card-body">
                    <h3 className="page-title">Violations</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-center mb-0 datatable table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Type Of Violation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredViolationsDay.length > 0 ? (
                            filteredViolationsDay.map((el, index) => (
                              <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.class}</td>
                                <td>{el.name_of_violation}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No violation records for today</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions Table */}
              <div className="col-6">
                <div className="card card-table common-shadow">
                  <div className="card-body">
                    <h3 className="page-title">Permissions</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-center mb-0 datatable table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPermissionsDay.length > 0 ? (
                            filteredPermissionsDay.map((el, index) => (
                              <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.class}</td>
                                <td>{el.note}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No permission records for today</td>
                            </tr>
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
      </div>
    </>

  );
}

export default UpdatedDayPage;