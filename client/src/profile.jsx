import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { format } from 'date-fns';
import WEImage from './WE.png';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'

const Profile = () => {


  let [myData, SetMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  function getdata() {



    axios.get(`http://localhost:8080/api/get/student/${id}`)
      .then(response => {
        SetMyData(response.data.student);


        setLoading(false);
      })
      .catch(error => {
        console.error('Error retrieving student information:', error);
        setLoading(false);
      });
  }


  useEffect(() => {
    getdata();
  })






  const getUniqueDates = () => {
    const selectedStudent = myData;

    if (selectedStudent && selectedStudent.date_of_absence) {
      return selectedStudent.date_of_absence ? selectedStudent.date_of_absence.split(',').map((date) => date.trim()) : "";
    }

    return [];
  };
  const getUniqueDates2 = () => {
    const selectedStudent = myData;

    if (selectedStudent && selectedStudent.date_of_absence) {
      return selectedStudent.date_of_delay ? selectedStudent.date_of_delay.split(',').map((date) => date.trim()) : "";
    }

    return [];
  };



  const originalDate = myData.date_of_birth;
  const dateObject = new Date(originalDate);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;


  let [Competitions, setCompetitions] = useState([]);

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

  useEffect(() => {
    getViolations();
    getCompetitions();
  })

  function formatDate(dateString) {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    return formattedDate;
  }


  axios.get("http://localhost:8080/api/get/delay_absence")
    .then(response => {

      return;
    })
    .catch(error => {

      console.error('حدث خطأ في الطلب:', error.message);
    });

  const filteredData = Competitions.length > 0 ? Competitions.filter(student => student.joined === "After" && student.student_id === myData.student_id) : "";
  const filteredDataLength = filteredData.length;




  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0"
      />
      <title>Preskool - Student Details</title>
      {/* Favicon */}
      <link rel="shortcut icon" href="assets/img/favicon.png" />
      {/* Fontfamily */}
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

      <div className="">


        <div className="page-wrapper">

          <div className="content container-fluid">

            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="about-info">
                      <h4>
                        Profile{" "}
                        <span>
                          <a href="javascript:;">
                            <i className="feather-more-vertical" />
                          </a>
                        </span>
                      </h4>
                    </div>
                    <div className="student-profile-head">

                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="profile-user-box">

                            <div className="names-profiles">
                              <h5>student name</h5>
                              <h4>{myData.name}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 d-flex align-items-center">
                          <div className="follow-group">
                            <div className="students-follows">
                              <h5 style={{ marginLeft: "-50px" }}>Absent</h5>
                              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal10">
                                {myData.absence}
                              </button>
                              <div class="modal fade" id="exampleModal10" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <table class="table table-bordered">
                                        <thead class="thead-dark">
                                          <tr>
                                            <th colSpan={3}>Date Of Absence</th>

                                          </tr>
                                        </thead>
                                        <tbody>
                                          <>
                                            {getUniqueDates().map((date, index) => (
                                              <tr>
                                                <td colSpan={3}>{date}</td>
                                              </tr>

                                            ))}

                                            {getUniqueDates2() ?
                                              getUniqueDates2().map((date, index) => (
                                                <tr>
                                                  <td colSpan={3}>{date}</td>
                                                </tr> 

                                              )) :""
                                            }

                                            <tr>
                                              {getUniqueDates().length === 0 && <td >لا يوجد تواريخ  ايام غياب</td>}
                                            </tr>
                                          </>


                                        </tbody>

                                      </table>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div className="students-follows" style={{ marginLeft: "50px" }} >
                              <h5>Competition</h5>

                              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                {filteredDataLength}
                              </button>


                              <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <table class="table table-bordered">
                                        <thead class="thead-dark">
                                          <tr>
                                            <th>Competition Name</th>
                                            <th>Competition Date</th>
                                            <th>Competition Rank</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Competitions.length > 0 ? Competitions.filter(el => el.student_id === myData.student_id && el.joined === "After").map(el => (
                                            <tr key={el.id}>
                                              <td className='text-center'>
                                                {el.name_of_competition}
                                              </td>
                                              <td className='text-center'>
                                                {formatDate(el.date_of_competition)}
                                              </td>
                                              <td className='text-center'>
                                                {el.rank}
                                              </td>
                                            </tr>
                                          )) : ""}
                                        </tbody>
                                      </table>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>


                            </div>

                            <div className="students-follows" style={{ marginLeft: "50px" }}>
                              <h5>Violation Num</h5>
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                {myData.violations}
                              </button>


                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <table class="table table-bordered">
                                        <thead class="thead-dark">
                                          <tr>
                                            <th className='text-center'>violation type</th>
                                            <th className='text-center'>violation date</th>

                                          </tr>
                                        </thead>

                                        <tbody>
                                          {violations.length > 0 ?
                                            violations.filter(el => el.student_id == myData.student_id).map(el =>
                                              <>
                                                <tr>
                                                  <td className='text-center'>
                                                    {el.name_of_violation}
                                                  </td>

                                                  <td className='text-center'>
                                                    {formatDate(el.date_of_violation)}
                                                  </td>
                                                </tr>

                                              </>
                                            ) : ""
                                          }</tbody>
                                      </table>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                    </div>
                                  </div>
                                </div>
                              </div>


                            </div>

                            <div className="students-follows" style={{ marginLeft: "50px" }}>
                              <h5>Permission Num</h5>
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                {myData.permissions}
                              </button>


                              <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <table class="table table-bordered">
                                        <thead class="thead-dark">
                                          <tr>
                                            <th className='text-center'>Permission Date</th>
                                            <th className='text-center'>Permisson Reason</th>

                                          </tr>
                                        </thead>

                                        <tbody>
                                          {
                                            permissions.length > 0 ? permissions.filter(el => el.student_id == myData.student_id).map(el =>
                                              <>
                                                <tr>
                                                  <td className='text-center'>
                                                    {formatDate(el.date_of_permission)}
                                                  </td>

                                                  <td className='text-center'>
                                                    {el.note}
                                                  </td>
                                                </tr>

                                              </>
                                            ) : ''
                                          }

                                        </tbody>
                                      </table>
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div className="students-follows" style={{ marginLeft: "100px" }}>
                              {myData.absence >= 7 ? <h4 >case</h4> : ""}

                              {myData.absence >= 7 && myData.absence < 14 ? <h5 id='txtt'>
                                انذار اول
                              </h5> : myData.absence >= 14 && myData.absence < 21 ? <h5 id='txtt'>انذار تاني</h5> :
                                myData.absence >= 21 && myData.absence < 30 ? <h5 id='txtt'>انذار ثالث</h5> :
                                  myData.absence >= 30 ? <h4>مرفوض</h4> : ""
                              }





                            </div>


                          </div>
                        </div>




                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="student-personals-grp">
                      <div className="card">
                        <div className="card-body">
                          <div className="heading-detail">
                            <h4>Personal Details :</h4>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-user" />
                            </div>
                            <div className="views-personal">
                              <h4>Name</h4>
                              <h5>{myData.name}</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <img
                                src="assets/img/icons/buliding-icon.svg"
                                alt=""
                              />
                            </div>
                            <div className="views-personal">
                              <h4>Department </h4>
                              <h5>{myData.specialization}</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-phone-call" />
                            </div>
                            <div className="views-personal">
                              <h4>Mobile</h4>
                              <h5>{myData.phone}</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-mail" />
                            </div>
                            <div className="views-personal">
                              <h4>Email</h4>
                              <h5>
                                <a
                                  href="#"
                                  className="_cf_email_"
                                  data-cfemail="6c080d051f152c0b010d0500420f0301"
                                >

                                  {myData.email}
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-user" />
                            </div>
                            <div className="views-personal">
                              <h4>Gender</h4>
                              <h5>{myData.gender}</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-calendar" />
                            </div>
                            <div className="views-personal">
                              <h4>Date of Birth</h4>
                              <h5>{ }
                                {formattedDate}


                              </h5>
                            </div>
                          </div>

                          <div className="personal-activity mb-0">
                            <div className="personal-icons">
                              <i className="feather-map-pin" />
                            </div>
                            <div className="views-personal">
                              <h4>Address</h4>
                              <h5>{myData.address}</h5>
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

        </div>

      </div>

    </>

  );
};

export default Profile;