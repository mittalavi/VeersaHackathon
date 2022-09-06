import React from "react";
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

class AddPresc extends React.Component {
    onChange = (e) =>
    this.setState({uemail:e.target.value});
  handleSignOut() {
    localStorage.removeItem("user");
  }
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      selectedFile: null,
      uemail:"",
      sid:""
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
        this.setState({
          data: res,
        });
        fetch("http://localhost:3001/api/add_presciption",{
      method:"post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email:this.state.uemail,
        id:this.state.sid,
        prescription:this.state.data
      }),
    })
    .then((response) => response.json())
    .then((resp) => {
        console.log(resp);
    });
  
        // setTimeout(()=>{},5000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  componentDidMount=()=>{
    console.log(this.props.match.params.email);
    const email = this.props.match.params.email;
    console.log(this.props.match.params.sid);
    const sid1 = this.props.match.params.sid;
    this.setState({uemail:email,sid:sid1});
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
              <h1 className="text-dark">Upload Patient Prescriptions</h1>
              <p className="lead d-none d-sm-block">Upload Prescription for Email: {this.state.uemail} and SessionId: {this.state.sid}</p>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPresc;