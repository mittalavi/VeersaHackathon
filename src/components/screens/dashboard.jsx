import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Tilt from "react-parallax-tilt";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Chart from "./Chart";

const Dashboard = (props) => {
  console.log(props);
  const u = JSON.parse(localStorage.getItem("user"));
  const [join, setJoin] = useState(false);
  const [latestSession, setLatestSession] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const [nusns, setnusns] = useState(0);
  const [npsns, setnpsns] = useState(0);
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    const func = async () => {
      let data = await fetch(
        "https://veersaserver.herokuapp.com/api/usersessions",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("user")).email,
            upcoming: "true",
          }),
        }
      );

      data = await data.json();
      var datee = new Date();
      var day = datee.getDate();
      var month = datee.getMonth() + 1;
      var year = datee.getFullYear();
      var today = year + "-" + month + "-" + day;
      var ans = 0;
      console.log(today);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (
          data[i].date === today &&
          Number(data[i].time.split(":")[0]) === datee.getHours() &&
          Number(data[i].time.split(":")[1]) - datee.getMinutes() <= 5 &&
          Number(data[i].time.split(":")[1]) - datee.getMinutes() >= 0
        ) {
          ans = i;
          break;
        }
      }
      await setLatestSession(data[ans]);
      console.log(data);
      setnusns(data.length);
      const date = new Date(Date.now());
      if (
        data.length > 0 &&
        Number(data[ans].time.split(":")[0]) === date.getHours() &&
        Number(data[ans].time.split(":")[1]) - date.getMinutes() <= 5 &&
        Number(data[ans].time.split(":")[1]) - date.getMinutes() >= 0
      ) {
        setJoin(true);
      }
    };
    const func1 = async () => {
      let data1 = await fetch(
        "https://veersaserver.herokuapp.com/api/usersessions",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("user")).email,
            upcoming: "false",
          }),
        }
      );

      data1 = await data1.json();
      setSessions(data1);
      await setLastSession(data1[0]);
      setnpsns(data1.length);
    };
    func();
    func1();
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("user");
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          s4s
        </a>
        <form className="d-flex">
          <Link
            to="/"
            className="button btn btn-outline-success me-2"
            onClick={handleSignOut}
          >
            Logout
          </Link>
        </form>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toogle navigation">
            <span className="navbar-toggle-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class = "list-group bg-priamry d-block s-sm-none">
              <li class="list-unstyled border-0 p-2"><a class ="nav-link" href="/upcoming-sessions" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Upcoming Sessions</a></li>
              <li class="list-unstyled border-0 p-2"><a href="/upcoming-sessions">Upcoming Sessions</a></li>
              <li class="list-unstyled border-0 p-2"><a href="/upcoming-sessions">Upcoming Sessions</a></li>
              <li class="list-unstyled border-0 p-2"><a href="/upcoming-sessions">Upcoming Sessions</a></li>
            </ul>
          </div> */}
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
              {/* <li className="nav-item">
                <a className="nav-link text-light" href="/prescriptions">
                  Prescriptions
                </a>
              </li> */}
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
            className="col main pt-5 mt-3"
            style={{ backgroundColor: "#FAF3F3", height: "100vh" }}
          >
            <h1 className="display-4 d-none d-sm-block text-dark">
              {u.firstname} {u.lastname}
            </h1>
            <p className="lead d-none d-sm-block text-dark">Dashboard</p>

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
                  <Tilt>
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Sessions</h6>
                      <h1 className="display-4">{nusns + npsns}</h1>
                    </div>
                  </Tilt>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 py-2">
                <Tilt>
                  <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Upcoming Session</h6>
                      <h1 className="display-4">
                        Date: {latestSession && latestSession.date}
                      </h1>
                    </div>
                  </div>
                </Tilt>
              </div>
              <div className="col-xl-3 col-sm-6 py-2">
                <Tilt>
                  <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success">
                      <div className="rotate">
                        <i className="fa fa-user fa-4x"></i>
                      </div>
                      <h6 className="text-uppercase">Previous Session</h6>
                      <h1 className="display-4">
                        Date: {lastSession && lastSession.date}
                      </h1>
                    </div>
                  </div>
                </Tilt>
              </div>
            </div>
            {/* {sessions && (
              <div className="row mb-3 py-2">
                <div className="col-xl-6 col-sm-12">
                  <div className="ses-info p-2" style={{ width: "70vh" }}>
                    <Chart propsData={sessions} />
                  </div>
                </div>
              </div>
            )} */}
            <div className="row mb-3">
              <div className="col-xl-6 col-sm-12 py-2">
                <div className="ses-info">
                  <h1>Previous Sessions</h1>
                  <p>{lastSession && lastSession.title}</p>
                  <p>Date: {lastSession && lastSession.date}</p>
                  <p>
                    Prescription:{" "}
                    <a href={lastSession && lastSession.prescription}>
                      Click here
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12 py-2">
                <div className="row ses-info">
                  <h1>Upcoming Sessions</h1>
                  <p>{latestSession && latestSession.title}</p>
                  <p>Date: {latestSession && latestSession.date}</p>
                  <p> </p>
                  {(
                    <button
                      onClick={() =>
                        props.history.push(`/call/${latestSession._id}`)
                      }
                      type="button"
                      class="btn btn-success"
                    >
                      Join now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Fab
            aria-label="add"
            className="bg-success"
            style={{
              position: "fixed",
              bottom: 15,
              right: 15,
            }}
            onClick={() => props.history.push("/newsession")}
          >
            <AddIcon style={{ color: "#fff" }} />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
