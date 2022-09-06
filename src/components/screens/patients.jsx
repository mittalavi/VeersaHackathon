import React from "react";
import { Link } from "react-router-dom";

class Patients extends React.Component {
  patients_info = [
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: this.patients_info,
      u:JSON.parse(localStorage.getItem("user"))
    };
  }
  componentDidMount=()=>{
    fetch("http://localhost:3001/api/get_patient",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email:this.state.u.email
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
  seeProfile=(e)=>{
    var email=e.target.title;
    console.log(email);
    this.props.history.push("/patient-profile/"+email);
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
            <div className="col main pt-5 mt=3">
              <div className="row">
                {this.state.data.map((ele) => (
                  <div className="col-md-4 mt-4">
                    <div className="card profile-card-5">
                      <div className="card-img-block">
                        <img className="card-img-top" src={ele.picture} alt="img" style={{height:"200px"}} />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{ele.firstname} {ele.lastname}</h4>
                        <p className="card-text">{ele.dob}</p>
                        <p className="card-text">{ele.address} {ele.city} {ele.pincode}</p>
                        <p className="card-text">{ele.state}</p>
                        <p className="card-text">{ele.phone}</p>
                        <button title={ele.email} onClick={this.seeProfile} className="btn btn-primary">
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

export default Patients;
