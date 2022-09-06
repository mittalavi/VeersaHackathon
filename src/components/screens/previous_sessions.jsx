import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

class PreviousSessions extends React.Component {
  handleSignOut() {
    localStorage.removeItem("user");
  }
  previous_sessions = [];

  constructor(props) {
    super(props);
    this.state = {
      data: this.previous_sessions,
      u: JSON.parse(localStorage.getItem("user")),
    };
  }
  componentDidMount = () => {
    if (this.state.u.doctor) {
      fetch("http://localhost:3001/api/usersessions", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: this.state.u.email,
          upcoming: "false",
          doctor: "true",
        }),
      })
        .then((response) => response.json())
        .then((resp) => {
          console.log(resp);
          this.setState({
            data: resp,
          });
        });
    } else {
      fetch("http://localhost:3001/api/usersessions", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: this.state.u.email,
          upcoming: "false",
          doctor: "false",
        }),
      })
        .then((response) => response.json())
        .then((resp) => {
          console.log(resp);
          this.setState({
            data: resp,
          });
        });
    }
  };
  addpresc = (e) => {
    e.preventDefault();
    const sid = e.target.id;
    const email = e.target.title;
    this.props.history.push("/addpresc/" + email + "/" + sid);
  };
  details = (e) => {
    e.preventDefault();
    const sid = e.target.id;
    this.props.history.push("/session/" + sid);
  };
  handleClick = (sid) => {
    this.props.history.push(`/session/${sid}`);
  };
  render() {
    if (this.state.u.doctor) {
      return (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                s4s
              </a>
              <form className="d-flex">
                <Link
                  to="/"
                  className="button btn btn-outline-success me-2"
                  onClick={this.handleSignOut}
                >
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
                    <a className="nav-link text-light" href="/dashboarddoc">
                      Homepage
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-light"
                      href="/upcoming-sessions"
                    >
                      Upcoming Sessions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-light"
                      href="/previous-sessions"
                    >
                      Previous Sessions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/patients">
                      Patients
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/pending-session">
                      Pending Sessions
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
                <h1 className="text-dark">Previous Sessions</h1>
                <h2 className="lead d-none d-sm-block">
                  Click on Card to add prescription
                </h2>
                <div className="row">
                  {this.state.data.map((ele, i) => (
                    <div
                      key={i}
                      onClick={() => this.handleClick(ele._id)}
                      className="col-sm-6"
                    >
                      <Tilt>
                        <div id={ele._id} className="ses-info">
                          <h1>User: {ele.user}</h1>
                          <h1>Title: {ele.title}</h1>
                          <p>Date: {ele.date}</p>
                          <p>Time: {ele.time}</p>
                        </div>
                        <div
                          onClick={this.addpresc}
                          title={ele.user}
                          id={ele._id}
                        ></div>
                      </Tilt>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                s4s
              </a>
              <form className="d-flex">
                <Link
                  to="/"
                  className="button btn btn-outline-success me-2"
                  onClick={this.handleSignOut}
                >
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
                    <a className="nav-link text-light" href="/dashboard">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-light"
                      href="/upcoming-sessions"
                    >
                      Upcoming Sessions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-light"
                      href="/previous-sessions"
                    >
                      Previous Sessions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/routines">
                      Routines
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/prescriptions">
                      Prescriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/newsession">
                      New Session
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/find-doctor">
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
                <h1 className="text-dark">Previous Sessions</h1>
                <div className="row">
                  {this.state.data.map((ele, i) => (
                    <div key={i} className="col-xl-6 col-sm-12 py-2">
                      <Tilt
                        style={{
                          width: "250px",
                          height: "130px",
                          margin: "15px",
                        }}
                      >
                        <div
                          className="ses-info"
                          style={{
                            width: "250px",
                            height: "130px",
                            margin: "15px",
                          }}
                        >
                          <h1>{ele.title}</h1>
                          <p>{ele.date}</p>
                          <p>{ele.time}</p>
                        </div>
                        <div
                          onClick={this.details}
                          title={ele.user}
                          id={ele._id}
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            display: "inline-block",
                            width: "250px",
                            height: "130px",
                            ZIndex: "0",
                          }}
                        ></div>
                      </Tilt>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PreviousSessions;
