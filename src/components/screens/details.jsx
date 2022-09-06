import React from "react";
import { Link } from "react-router-dom";

class Details extends React.Component {
  handleSignOut() {
    localStorage.removeItem("user");
  }
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      uemail: "",
      sid: null,
      u: JSON.parse(localStorage.getItem("user")),
    };
  }
  componentDidMount = async () => {
    const email = this.state.u.email;
    console.log(this.props.match.params.sid);
    const sid1 = this.props.match.params.sid;
    await this.setState({ uemail: email, sid: sid1 });
    fetch("http://localhost:3001/api/session", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: this.state.sid, //"618cee47a5344a0023f8d2e7"
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        this.setState({
          data: resp,
        });
      });
  };
  render() {
    if(!this.state.u.doctor)
    {return (
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
                  <a className="nav-link text-light" href="/upcoming-sessions">
                    Upcoming Sessions
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/previous-sessions">
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
              <h1 className="text-dark">Details of Previous session</h1>
              <div className="container mt-5 mb-5">
                <div className="row no-gutters">
                  <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                        <h3 className="display-5">{this.state.data.title}</h3>
                        <i className="fa fa-facebook"></i>
                        <i className="fa fa-google"></i>
                        <i className="fa fa-youtube-play"></i>
                        <i className="fa fa-dribbble"></i>
                        <i className="fa fa-linkedin"></i>
                      </div>
                      {this.state.u.doctor && (
                        <button
                          onClick={() => {
                            const a = document.createElement("a");
                            a.href = this.state.data.notes;
                            a.click();
                          }}
                          type="button"
                          class="btn btn-success"
                        >
                          View notes for this session
                        </button>
                      )}
                      <div className="p-3 bg-dark text-light">
                        <h6>Email ID: {this.state.data.user}</h6>
                      </div>
                      <div className="d-flex flex-row text-white">
                        {this.state.u.doctor ? (
                          <div className="p-4 bg-primary text-center skill-block">
                            <button
                              onClick={() =>
                                this.props.history.push(
                                  `/addpresc/${this.state.uemail}/${this.props.match.params.sid}}`
                                )
                              }
                              type="button"
                              class="btn btn-success"
                            >
                              Add Prescription
                            </button>
                          </div>
                        ) : (
                          <div className="p-4 bg-primary text-center skill-block">
                            <a
                              className="text-dark"
                              href={this.state.data.prescription}
                            >
                              Click Here
                            </a>
                            <h6>Prescription</h6>
                          </div>
                        )}
                        <div className="p-3 bg-success text-center skill-block">
                          <h4>{this.state.data.doctor}</h4>
                          <h6>Doctor</h6>
                        </div>
                        <div className="p-3 bg-warning text-center skill-block">
                          <h4>{this.state.data.date}</h4>
                          <h6>Date</h6>
                        </div>
                        <div className="p-3 bg-danger text-center skill-block">
                          <h4>{this.state.data.time}</h4>
                          <h6>Time</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      else{
        return(
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
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/upcoming-sessions">
                      Upcoming Sessions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="/previous-sessions">
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
                <h1 className="text-dark">Details of Previous session</h1>
                <div className="container mt-5 mb-5">
                  <div className="row no-gutters">
                    <div className="col-md-8 col-lg-8">
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                          <h3 className="display-5">{this.state.data.title}</h3>
                          <i className="fa fa-facebook"></i>
                          <i className="fa fa-google"></i>
                          <i className="fa fa-youtube-play"></i>
                          <i className="fa fa-dribbble"></i>
                          <i className="fa fa-linkedin"></i>
                        </div>
                        {this.state.u.doctor && (
                          <button
                            onClick={() => {
                              const a = document.createElement("a");
                              a.href = this.state.data.notes;
                              a.click();
                            }}
                            type="button"
                            class="btn btn-success"
                          >
                            View notes for this session
                          </button>
                        )}
                        <div className="p-3 bg-dark text-light">
                          <h6>Email ID: {this.state.data.user}</h6>
                        </div>
                        <div className="d-flex flex-row text-white">
                          {this.state.u.doctor ? (
                            <div className="p-4 bg-primary text-center skill-block">
                              <button
                                onClick={() =>
                                  this.props.history.push(
                                    `/addpresc/${this.state.uemail}/${this.props.match.params.sid}}`
                                  )
                                }
                                type="button"
                                class="btn btn-success"
                              >
                                Add Prescription
                              </button>
                            </div>
                          ) : (
                            <div className="p-4 bg-primary text-center skill-block">
                              <a
                                className="text-dark"
                                href={this.state.data.prescription}
                              >
                                Click Here
                              </a>
                              <h6>Prescription</h6>
                            </div>
                          )}
                          <div className="p-3 bg-success text-center skill-block">
                            <h4>{this.state.data.doctor}</h4>
                            <h6>Doctor</h6>
                          </div>
                          <div className="p-3 bg-warning text-center skill-block">
                            <h4>{this.state.data.date}</h4>
                            <h6>Date</h6>
                          </div>
                          <div className="p-3 bg-danger text-center skill-block">
                            <h4>{this.state.data.time}</h4>
                            <h6>Time</h6>
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
        )
      }
  };
}

export default Details;
