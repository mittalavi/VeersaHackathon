import React from "react";
import { Link } from "react-router-dom";

class FindDoctor extends React.Component {
  handleSignOut() {
    localStorage.removeItem("user");
  }
  doctor_info = [];
  constructor(props) {
    super(props);
    this.state = {
      data: this.doctor_info,
      u:JSON.parse(localStorage.getItem("user"))
    };
  }
  componentDidMount=()=>{
    console.log(this.state.u)
    fetch("http://localhost:3001/api/get_doctors",{
      method:"post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email:this.state.u.email,
      }),
    })
    .then((response) => response.json())
    .then((resp) => {
        console.log(resp);
        this.setState({
          data: resp
        });
        console.log(this.state.data);
    });
  }

  seeProfile=(e)=>{
    var email=e.target.title;
    console.log(email);
    this.props.history.push("/doctor/"+email);
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
              <Link to="/" className="button btn btn-outline-success me-2" onClick={this.handleSignOut}>
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
              <h1 className="text-dark">Find Doctor</h1>
              <div className="row">
                {this.state.data.map((ele,i) => (
                  <div key={i} className="col-md-4 col-lg-4 col-sm-12 mt-4">
                    <div className="card profile-card-5">
                      <div className="card-img-block">
                        <img className="card-img-top" src={ele.picture} alt="img" />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">Dr.{ele.firstname} {ele.lastname}</h4>
                        <p className="card-text">{ele.username}</p>
                        <button className="btn btn-primary" style={{marginLeft:"10px"}} title={ele.username} onClick={this.seeProfile}>
                          See Profile
                        </button>
                      </div>
                    </div>
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

export default FindDoctor;
