import React from "react";
import {} from "react-bootstrap";
import { Route } from "react-router-dom";
import "./App.css";
import VideoCall from "./components/screens/agora/VideoCall";
import Dashboard from "./components/screens/dashboard";
import dashboarddoc from "./components/screens/dashboarddoc";
import FindDoctor from "./components/screens/find_doctor";
import form from "./components/screens/initialform";
import LandingPage from "./components/screens/landing";
import LoginPage from "./components/screens/login";
import Patients from "./components/screens/patients";
import Prescriptions from "./components/screens/prescriptions";
import newsession from "./components/screens/newsessions";
import PreviousSessions from "./components/screens/previous_sessions";
import RegisterPage from "./components/screens/register";
import RegisterPageDoc from "./components/screens/registerdoc";
import Routines from "./components/screens/routines";
import AddPresc from "./components/screens/addpresc";
import UpcomingSessions from "./components/screens/upcoming_sessions";
import DoctorProfile from "./components/screens/doctor_profile";
import PatientFeedback from "./components/screens/patient-feedback";
import DoctorFeedback from "./components/screens/doctor-feedback";
import PendingSessions from "./components/screens/pending_sessions";
import AdminPanel from "./components/screens/admin_panel";
import Profile from "./components/screens/profile";
import PatientProfile from "./components/screens/patient_profile";
import Details from "./components/screens/details";
import Chat from "./components/screens/chat";
import PrivateRoute from './route/PrivateRoute';

function App() {
  return (
    <div>
      <section>
        <Route path="/" exact component={LandingPage} />
      </section>
      <section>
        <Route path="/login" exact component={LoginPage} />
      </section>
      <section>
        <Route path="/register" exact component={RegisterPage} />
      </section>
      <section>
        <Route path="/registerdoc" exact component={RegisterPageDoc} />
      </section>
      <section>
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </section>
      <section>
        <PrivateRoute path="/dashboarddoc" exact component={dashboarddoc} />
      </section>
      <section>
        <PrivateRoute path="/find-doctor" exact component={FindDoctor} />
      </section>
      <section>
        <PrivateRoute path="/upcoming-sessions" exact component={UpcomingSessions} />
      </section>
      <section>
        <PrivateRoute path="/previous-sessions" exact component={PreviousSessions} />
      </section>
      <section>
        <PrivateRoute path="/form" exact component={form} />
      </section>
      <section>
        <PrivateRoute path="/prescriptions" exact component={Prescriptions} />
      </section>
      <section>
        <PrivateRoute path="/newsession" exact component={newsession} />
      </section>
      <section>
        <PrivateRoute path="/patients" exact component={Patients} />
      </section>
      <section>
        <PrivateRoute path="/routines" exact component={Routines} />
      </section>
      <section>
        <PrivateRoute path="/addpresc/:email/:sid" exact component={AddPresc} />
      </section>
      <section>
        <PrivateRoute path="/session/:sid" exact component={Details} />
      </section>
      <section>
        <PrivateRoute exact path="/call/:sessionId" component={VideoCall} />
      </section>
      <section>
        <PrivateRoute path="/doctor/:name" component={DoctorProfile} />
      </section>
      <section>
        <PrivateRoute
          path="/patient-feedback/:sessionId"
          exact
          component={PatientFeedback}
        />
      </section>
      <section>
        <PrivateRoute
          path="/doctor-feedback/:sessionId"
          exact
          component={DoctorFeedback}
        />
      </section>
      <section>
        <PrivateRoute path="/pending-session" exact component={PendingSessions} />
      </section>
      <section>
        <Route path="/admin-panel" exact component={AdminPanel} />
      </section>
      <section>
        <PrivateRoute path="/user-profile" exact component={Profile}/>
      </section>
      <section>
        <PrivateRoute path="/patient-profile/:name" exact component={PatientProfile}/>
      </section>
      <section>
        <PrivateRoute path="/chat" exact compontent ={Chat}/>
      </section>
    </div>
  );
}

export default App;

//PrivateRoute for dashboard when database is integrated.
