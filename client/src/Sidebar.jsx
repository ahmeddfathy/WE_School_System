import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main Menu</span>
              </li>



              <li className="submenu">

                <a href="#">
                  <i className="feather-grid" /><span> <Link to={"/information"} style={{ fontSize: "14px" }}>students Information<span className="menu-arrow" /></Link></span>

                </a>



              </li>

              <li className="submenu">

                <a href="#">
                  <i className="feather-grid" /><span> <Link to={"/home"}> home <span className="menu-arrow" /></Link></span>

                </a>



              </li>



              <li className="submenu">

                <a href="#">
                  <i className="feather-grid" /><span> <Link to={"/attendence"}> Absent <span className="menu-arrow" /></Link></span>

                </a>



              </li>

              <li className="submenu">

                <a href="#">
                  <i className="feather-grid" /><span><Link to={"/Permiisions"} ><span className="menu-arrow" />   Permiisions</Link></span>

                </a>



              </li>

              <li className="submenu">
                <a href="#">
                  <i className="feather-grid" /><span><Link to={"/addstudent"}><span className="menu-arrow" />  Add Student</Link></span> {" "}
                </a>
                <ul>

                </ul>


              </li>


              <li className="submenu">
                <a href="#">
                  <i className="feather-grid" /><span><Link to={"/EditStudent"}><span className="menu-arrow" /> Edit Student</Link></span> {" "}
                </a>
                <ul>

                </ul>


              </li>

              <li className="submenu">
                <a href="#">
                  <i className="feather-grid" /><span><Link to={"/Competitions"}><span className="menu-arrow" /> Competitions</Link></span> {" "}
                </a>
                <ul>

                </ul>


              </li>

              <li className="submenu">
                <a href="#">
                  <i className="feather-grid" /><span><Link to={"/Violations"}><span className="menu-arrow" /> Violations</Link></span> {" "}
                </a>
                <ul>

                </ul>


              </li>


            </ul>
          </div>
        </div>
      </div>


    </>
  )
}
