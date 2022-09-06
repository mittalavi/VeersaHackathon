import React from "react";
import { } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

class LandingPage extends React.Component {
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
                to="/register"
                className="button btn btn-outline-success me-2"
              >
                {" "}
                User Signup
              </Link>
              <Link
                to="/registerdoc"
                className="button btn btn-outline-success me-2"
              >
                {" "}
                Doctor Signup
              </Link>
              <Link to="/login" className="button btn btn-outline-success me-2">
                {" "}
                Login
              </Link>
            </form>
          </div>
        </nav>
        <div
          className="bg-image d-flex justify-content-left align-items-center"
          style={{
            backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/5291450.jpg?alt=media&token=c0775023-8cd1-4db0-8339-0fb6d15401b6')",
            height: "100vh"
          }}
        >
          <h1 className="text-dark" style={{ position: "absolute", left: "10vw", top: "38vh", fontSize: "7vh" }}>Welcome to Shrink4Shrink</h1>
          <p className="text-dark lead d-none d-sm-block" style={{ position: "absolute", left: "12vw", top: "45vh", fontSize: "4vh" }} >We are here to help you!</p>
        </div>
        <div className="row" style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/29728328.jpg?alt=media&token=211073bd-13a9-4358-ae62-7f6159dad20c')",
          width: "100vw"
        }}
        >
          <img style={{ height: "50vh", width: "50vh", margin: "20px" }} src="https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/total-shape-Ianw4RdVuoo-unsplash.jpg?alt=media&token=0edcf253-2b65-435a-b5ba-bdc36b2a2a0a" alt="Doctor" className="float-start rounded-pill"></img>
          <img style={{ height: "50vh", width: "50vh", margin: "20px", right: "1vh", position: "absolute" }} src="https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/hello-i-m-nik-z1d-LP8sjuI-unsplash.jpg?alt=media&token=442e3907-3493-4e0e-ae26-829c78d14321" alt="Doctor" className="float-end rounded-pill"></img>
        </div>

        <div
          className="bg-image d-flex justify-content-left align-items-center row "
          style={{
            backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/5291450.jpg?alt=media&token=c0775023-8cd1-4db0-8339-0fb6d15401b6')",
            height: "100vh", width: "100vw"
          }}
        >
          <div  style={{ position: "absolute", right: "20vh", height: "90vh", width: "70vw", margin: "20px", zIndex: "0" }}>
            <div className="container">
              <div className="row">
                <div className="col-xs-6">
                  <h1 className="text-dark" style={{ position: "absolute", zIndex: "1", left: "5vw", top: "30vh", fontSize: "8vh",overflow:"hidden" }}>About us!</h1>
                </div>
                <div className="col-xs-6 d-none d-sm-block">
                  <img style={{ height: "90vh", width: "30vw" }} src="https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/95278308-old-brown-paper-sheet-for-writing-text-isolate-on-white-background.jpg?alt=media&token=0fb9f01b-f0d4-48cc-992e-2e73dd82cd4b" alt="about us" className="float-end"></img>
                  <div className="text-block" style={{ zIndex: "2", position: "absolute", left: "42vw", top: "15vh", height: "30vh", width: "70vw", margin: "20px",fontSize: "1.7vh" }}>
                    <h4><b>Our Moto: Shrink Your Problems</b></h4>
                    <br></br>
                    <p>We offers access to mental health treatment to people<br/> in urban,rural or remote areas.Those who live in rural<br/>areas simply might not have access to any form of mental<br/>health treatment because there are few or no mental heal-<br/>th practices in their area.We are here to connect to you &<br/> help you</p>
                    <p>Having to drive long distances and take significant time<br/>out of a busy schedule to seek in-person therapy can be<br/> a burden for people in need of help. If you have reliable<br/> internet access, Our platform for online therapy gives you<br/> relatively quick and easy access to treatment that might <br/>not have been readily available to you otherwise.</p>
                  <p>Online therapy is usually fairly affordable and convenient.<br/> Since you will be attending therapy sessions online in the<br/> comfort of your own home, you can often schedule your<br/>therapy sessions for times that are the most convenient<br/>for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-dark text-center text-white">
          <div class="container p-4">
            <section class="">
              <form action="">
                <div class="row d-flex justify-content-center">

                  <div class="col-auto">
                    <a href="login" class="btn btn-outline-light mb-4">
                      Login
                    </a>
                  </div>
                  <div class="col-auto">
                    <a href="/register" class="btn btn-outline-light mb-4">
                      Register Patient
                    </a>
                  </div>
                  <div class="col-auto">
                    <a href="/registerdoc" class="btn btn-outline-light mb-4">
                      Register Doctor
                    </a>
                  </div>
                </div>
              </form>
            </section>
            <section class="mb-4">
              <p>
                We are students of Thapar Institute of Engineering and Technology.
              </p>
            </section>
            <section class="">
              <div class="row justify-content-center">
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Made By:-</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="https://github.com/ayushkulshrestha2001" class="text-white">Ayush Kulshrestha</a>
                    </li>
                    <li>
                      <a href="https://github.com/divanshurox" class="text-white">Divanshu Agarwal</a>
                    </li>
                    <li>
                      <a href="https://github.com/kakkarmanan" class="text-white">Manan Kakkar</a>
                    </li>
                    <li>
                      <a href="https://github.com/jinik21" class="text-white">Nikheel Jain</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            © 2021 Copyright:
            <a className="text-white" href="https://shrink4shrink.netlify.app/">shrink4shrink</a>
          </div>
        </footer>


      </div>

    );
  }
}

export default LandingPage;
