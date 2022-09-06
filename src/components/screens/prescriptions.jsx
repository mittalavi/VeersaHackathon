import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

class Prescriptions extends React.Component {
  prescriptions = [
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: this.prescriptions,
      u:JSON.parse(localStorage.getItem("user"))
    };
  }
  handleSignOut() {
    localStorage.removeItem("user");
  }
  componentDidMount=()=>{
    fetch("http://localhost:3001/api/usersessions",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email:this.state.u.email,
                upcoming:"false",
                doctor:"false"
        }),
    })
    .then((response) => response.json())
    .then((resp) => {
        console.log(resp);
        this.setState({
          data: resp
        });
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              s4s
            </a>
            <form className="d-flex">
              <Link to="/login" className="button btn btn-outline-success me-2">
                {" "}
                Logout
              </Link>
            </form>
          </div>
        </nav>
        <div className="container-fluid" id="main">
          <div className="row row-offcanvas row-offcanvas-left">
            <div
              className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
              id="sidebar"
              role="navigation"
              style={{ backgroundColor: "#171010" }}
            >
              <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3">
                <li className="nav-item">
                  <a className="text-light nav-link" href="/dashboard">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="text-light nav-link" href="/upcoming-sessions">
                    Upcoming Sessions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="text-light nav-link" href="/previous-sessions">
                    Previous Sessions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="text-light nav-link" href="/routines">
                    Routines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="text-light nav-link" href="/prescriptions">
                    Prescriptions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/newsession">
                    New Session
                  </a>
                </li>
                <li className="nav-item">
                  <a className="text-light nav-link" href="/find-doctor">
                    Find Doctor
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/user-profile">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="col main pt-5 mt=3 border border-dark"
              style={{ backgroundColor: "#FAF3F3" }}
            >
              <h1 className="text-dark">Prescriptions</h1>
              <div className="row">
                {this.state.data.map((ele, i) => {
                  return (
                    <div
                    key={i}
                      className="col-sm-6"
                      style={{
                        margin: "30px",
                        width: "220px",
                        height: "300px",
                      }}
                    >
                      <Tilt
                        style={{
                          margin: "30px",
                          width: "220px",
                          height: "300px",
                        }}
                      >
                        <iframe
                          key={i}
                          title={i}
                          src={ele.prescription}
                          style={{
                            width: "220px",
                            height: "300px",
                            overflow: "hidden",
                          }}
                          frameBorder="0"
                          scrolling="no"
                        ></iframe>
                        <a
                          href={ele.prescription}
                          className="text-dark fw-bold"
                          style={{
                            position: "absolute",
                            top:"5px",
                            left: "10px",
                            display: "inline-block",
                            width: "220px",
                            height: "300px",
                            ZIndex: "5",
                          }}
                        >
                          Date: {ele.date}
                        </a>
                        <label>Doctor: {ele.doctor}</label>
                      </Tilt>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Prescriptions;
