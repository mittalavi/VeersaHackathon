import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

var storageRef = firebase.storage().ref();
const toBlob = (file) => {
  return new Blob([file], {
    type: "application/pdf",
  });
};
var metadata = {
  contentType: "application/pdf",
};

class Routines extends React.Component {
  handleSignOut() {
    localStorage.removeItem("user");
  }
  routines = [
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: this.routines,
      date:"",
      selectedFile: null,
      u:JSON.parse(localStorage.getItem("user")),
      filelink:""
    };
  }
  onFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
  };
  onFileUpload = async () => {
    const formData = new FormData();
    if (this.state.selectedFile == null) {
      alert("No file Selected!!!");
    } else {
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      console.log(this.state.selectedFile);
      try {
        const blob = toBlob(this.state.selectedFile);
        this.setState({ isLoading: true });
        console.log(blob);
        var mountainsRef = await storageRef.child(this.state.selectedFile.name);
        await mountainsRef.put(blob, metadata);
        const res = await mountainsRef.getDownloadURL();
        console.log(res);
        this.setState({filelink:res});
        var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
      this.setState({date:[year, month, day].join('-')});
      console.log(this.state.date);
      fetch("http://localhost:3001/api/add_routine",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email:this.state.u.email,
                date:this.state.date,
                link:this.state.filelink
        }),
    })
    .then((response) => response.json())
    .then((resp) => {
        alert(resp);
    });
        // setTimeout(()=>{},5000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  componentDidMount=()=>{
    fetch("http://localhost:3001/api/get_routine",{
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
              <h1 className="text-dark">Routines</h1>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                      name="licensedoc"
                      onChange={this.onFile}
                    />
                    <label className="form-label text-light" htmlFor="customFile">
                      Upload Routine(pdf)
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <button
                            type="button"
                            className="btn btn-warning btn-lg ms-2 b1-color"
                            onClick={this.onFileUpload}
                          >
                            Upload
                          </button>
                  </div>
                </div>
              </div>
              <div className="row">
                {this.state.data.map((ele, i) => (
                  <div
                    key={i}
                    className="col-sm-6"
                    style={{ margin: "50px", width: "220px", height: "300px" }}
                  >
                    <Tilt
                      style={{
                        margin: "30px",
                        width: "220px",
                        height: "300px",
                      }}
                    >
                      <iframe
                        title={i}
                        src={ele.link}
                        style={{
                          width: "220px",
                          height: "300px",
                          overflow: "hidden",
                        }}
                        frameBorder="0"
                        scrolling="no"
                      ></iframe>
                      <a
                        href={ele.link}
                        className="text-dark fw-bold"
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "10px",
                          display: "inline-block",
                          width: "220px",
                          height: "300px",
                          ZIndex: "5",
                        }}
                      >
                        Date: {ele.date}
                      </a>
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

export default Routines;
