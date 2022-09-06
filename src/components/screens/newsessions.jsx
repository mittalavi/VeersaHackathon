import React from "react";
import { Link } from "react-router-dom";

class newsession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data:{
              title:"",
              date:"",
              time:"",
              u:JSON.parse(localStorage.getItem("user"))
          }
        }
      }
  handleSignOut() {
    localStorage.removeItem("user");
  }
  onChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
    console.log(this.state.data);
  };
  onSchedule=(event)=>{
    event.preventDefault();
    if(this.state.data.u.doctor_assigned==null){
      alert("You have no doctor assigned!!  Kindly select a doctor!!")
    }
    else
    {
      if(this.state.data.title.length>0 && this.state.data.date.length>0 &&this.state.data.time.length>0){
        fetch("http://localhost:3001/api/new_session",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email:this.state.data.u.email,
                title:this.state.data.title,
                date:this.state.data.date,
                time:this.state.data.time
        }),
    })
    .then((response) => response.json())
    .then((resp) => {
        alert(resp);
    });
    }
    else{
        alert("Enter valid values");
    }
  }
  };
  render() {
    const {data} = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              s4s
            </a>
            <form className="d-flex">
              <Link to="/" className="button btn btn-outline-success me-2" onClick={this.handleSignOut} >
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
            <div className="col main pt-5 mt-3" style={{ backgroundColor: "#FAF3F3" }}>
              <h1 className="display-4 d-none d-sm-block text-dark">Schedule a session</h1>
              <div class="form-outline">
              <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                name="title"
                                value={data.title}
                                onChange={this.onChange}
                                required
                                style={{width:"40%"}}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Title Of Appointment
                              </label>
                            </div>
                          </div>
                          <div className="form-helper">
                          <div className="col-md-6 mb-4">
                          <div className="form-outline mb-4">
                          <input
                            type="date"
                            id="form3Example9"
                            className="form-control form-control-lg"
                            name="date"
                            value={data.date}
                            onChange={this.onChange}
                            style={{width:"40%"}}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example9">
                            Date of Appointment
                          </label>
                        </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                          <input type="time" name="time" value={data.time} onChange={this.onChange} id="inputMDEx1" className="form-control" style={{width:"40%"}}/>
                          <label for="inputMDEx1">Choose your time</label>
                        </div>
                        </div>
                        <div className="d-flex pt-3">
                          <button
                            type="button"
                            className="btn btn-warning btn-lg ms-2 b1-color"
                            onClick={this.onSchedule}
                          >
                            Schedule
                          </button>
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

export default newsession;
