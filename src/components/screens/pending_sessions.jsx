import React from "react";
import { Link } from "react-router-dom";

class PendingSessions extends React.Component {
  handleSignOut() {
    localStorage.removeItem("user");
  }
  previous_sessions = [];

  constructor(props) {
    super(props);
    this.state = {
      data: this.previous_sessions,
      u:JSON.parse(localStorage.getItem("user"))
    };
  }
   
  componentDidMount=()=>{
    console.log(this.state.u.email);
    fetch("http://localhost:3001/api/usersessions",{
        method:"post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            email:this.state.u.email,
            upcoming:"true",
            doctor:"true",      
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

  accept(e){
    const sessionId =  e.target.title;
    console.log(sessionId);
    console.log(e.target.value);
    const user_email = e.target.value;
    fetch("http://localhost:3001/api/session_status",{
          method:"post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
              email:user_email,
              id:sessionId,
              status:'1',      
      }),
    })
    .then((response) => response.json())
    .then((resp) => {
      alert(resp);
    });
  }

reject(e){
  const sessionId =  e.target.title;
  const user_email = e.target.value;
  console.log(sessionId);
  fetch("http://localhost:3001/api/session_status",{
        method:"post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            email:user_email,
            id:sessionId,
            status:'-1',      
    }),
})
.then((response) => response.json())
  .then((resp) => {
      alert(resp);
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
              </ul>
            </div>
            <div
              className="col main pt-5 mt=3 border border-dark"
              style={{ backgroundColor: "#FAF3F3" }}
            >
              <h1 className="text-dark">Pending Session Requests</h1>
              <div className="row">
                {this.state.data.map((ele) => (
                (ele.status==='0')?(<div className="col-sm-6">
                      <div className="ses-info">
                        <h1>{ele.title}</h1>
                        <p>{ele.user}</p>
                        <p>{ele.date}</p>
                        <p>{ele.time}</p>
                        <button value={this.state.u.email} title={ele._id}  onClick={this.accept}>Yes</button>
                        <button title={ele._id} onClick={this.reject}>No</button>
                      </div>
                  </div>):<div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PendingSessions;
