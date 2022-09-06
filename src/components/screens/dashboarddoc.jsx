/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

class dashboarddoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      u: JSON.parse(localStorage.getItem("user")),
      nudsns: 0,
      npdsns: 0,
      latest: null,
      last: null,
      setjoin:false
    };
  }
  handleSignOut() {
    localStorage.removeItem("user");
  }
  componentDidMount = async () => {
    fetch("http://localhost:3001/api/usersessions", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.u.email,
        upcoming: "true",
        doctor: "true",
      }),
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        var datee = new Date();
      var day = datee.getDate();
      var month = datee.getMonth() + 1;
      var year = datee.getFullYear();
      var today = year + "-" + month + "-" + day;
      var ans=0
      console.log(today)
      for (let i = 0; i < resp.length; i++) {
        console.log(resp[i])
        if (resp[i].date===today && Number(resp[i].time.split(":")[0]) === datee.getHours() && Number(resp[i].time.split(":")[1])-datee.getMinutes()<= 5 && Number(resp[i].time.split(":")[1])-datee.getMinutes() >= 0) {
          ans=i
          this.setState({...this.state,setjoin:true})
          break;
        }
      }
       this.setState({
        ...this.state,
          nudns: resp.length,
          latest: resp[ans],
        });
      });
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
      .then((resp1) => {
        console.log(resp1);
        this.setState({
          ...this.state,
          npdsns: resp1.length,
          last: resp1[0],
        });
      });
    console.log(this.state.latest);
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              s4s
            </a>
            <form className="d-flex">
              <Link
                className="button btn btn-outline-success me-2"
                onClick={this.handleSignOut}
                to="/"
              >
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

            <div className="col main pt-5 mt-3">
              <h1 className="display-4 d-none d-sm-block">
                {this.state.u.firstname} {this.state.u.lastname}
              </h1>
              <h2 className="lead d-none d-sm-block">Dashboard</h2>

              <div
                className="alert alert-warning fade collapse"
                role="alert"
                id="myAlert"
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <strong>Holy guacamole!</strong> It's free.. this is an example
                theme.
              </div>
              <div className="row mb-3">
                <div className="col-xl-3 col-sm-6 py-2">
                  <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Sessions</h6>
                      <h1 className="display-4">
                        {(this.state.last || this.state.latest) &&
                          this.state.npdsns + this.state.nudns}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Upcoming Session</h6>
                      <h1 className="display-4">
                        Date:{this.state.latest && this.state.latest.date}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Previous Session</h6>
                      <h1 className="display-4">
                        Date:{this.state.last && this.state.last.date}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="ses-info">
                    <h1>Previous Sessions</h1>
                    <p>{this.state.last && this.state.last.title}</p>
                    <p>Date: {this.state.last && this.state.last.date}</p>
                    <p>Patient: {this.state.last && this.state.last.user}</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row ses-info">
                    <div className="col-sm-8">
                      <h1>Upcoming Sessions</h1>
                      <p>{this.state.latest && this.state.latest.title}</p>
                      <p>Date: {this.state.latest && this.state.latest.date}</p>
                      <p>
                        Patient: {this.state.latest && this.state.latest.user}
                      </p>
                    </div>
                    {this.state.setjoin &&
                    <button
                      onClick={() =>
                        this.props.history.push(
                          `/call/${this.state.latest._id}`
                        )
                      }
                      type="button"
                      class="btn btn-success"
                    >
                      Join now
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboarddoc;
