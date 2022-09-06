import React from "react";
import "./feedback.css";
import Alert from "@mui/material/Alert";

class PatientFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      u: JSON.parse(localStorage.getItem("user")),
      feedback: "",
      success: false,
    };
  }
  onChange = (e) =>
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  handleClick = async () => {
    console.log(this.props.match.params.sessionId);
    let data = await fetch(
      "http://localhost:3001/api/patient_feedback",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("user")).email,
          id: this.props.match.params.sessionId,
          patient_feedback: this.state.feedback,
        }),
      }
    );
    data = await data.json();
    console.log(data);
    if (data) {
      this.setState({
        ...this.state,
        success: true,
      });
    }
    setTimeout(() => {
      this.props.history.push("/dashboard");
    }, 1500);
  };
  render() {
    return (
      <div>
        <div
          lcassName="container-contact100"
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FAF3F3",
          }}
        >
          <div className="wrap-contact100">
            {this.state.success && (
              <Alert severity="success">Thanks for your feedback</Alert>
            )}
            <form className="contact100-form validate-form mt-3">
              <h1 className="contact100-from-title">Feedback</h1>
              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter your name"
              >
                <input
                  className="input100"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
                <span class="focus-input100"></span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter your name"
              >
                <textarea
                  className="input100"
                  type="text"
                  name="feedback"
                  placeholder="Your Feedback"
                  value={this.state.feedback}
                  onChange={this.onChange}
                />
                <span class="focus-input100"></span>
              </div>
              <div
                className="container-contact100-from-btn"
                style={{
                  cursor: "pointer",
                }}
                onClick={this.handleClick}
              >
                <p className="contact100-form-btn">Send Feedback</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientFeedback;
