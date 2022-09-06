import React from "react";
import "./dashboard.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
        doctor: "false",
      },
    };
  }
  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onReset = (eve) => {
    this.setState({ data: { ...this.state.data, email: "", password: "" } });
  };
  onChangeToggle = (e) => {
    if (e.target.value === "false") {
      this.setState({ data: { ...this.state.data, [e.target.name]: "true" } });
    } else {
      this.setState({ data: { ...this.state.data, [e.target.name]: "false" } });
    }
    console.log(this.state.data.doctor);
  };
  onSubmitSignIn = (event) => {
    console.log(this.state.data);
    event.preventDefault();
    fetch("https://veersaserver.herokuapp.com/api/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.data.email,
        password: this.state.data.password,
        doctor: this.state.data.doctor,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user.doctor);
        if (user.email && user.doctor === false) {
          localStorage.setItem("user", JSON.stringify(user));
          this.props.history.push("/dashboard");
        } else if (user.email && user.doctor === true) {
          localStorage.setItem("user", JSON.stringify(user));
          this.props.history.push("/dashboarddoc");
        } else {
          alert("No matching Credentials!");
        }
      });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <section className="h-100 bg-dark">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card card-registration my-4">
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img
                        src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img4.jpg"
                        alt="img"
                        className="img-fluid"
                        style={{
                          height:"100%",
                          borderTopLeftRadius: ".25rem",
                          borderBottomLeftRadius: ".25rem",
                        }}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">Login</h3>

                        <div className="row">
                          <div className="form-outline mb-4">
                            <div className="form-outline">
                              <input
                                type="email"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                name="email"
                                value={data.email}
                                onChange={this.onChange}
                                required
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Email
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form3Example97"
                            className="form-control form-control-lg"
                            name="password"
                            value={data.password}
                            onChange={this.onChange}
                            required
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example97"
                          >
                            Password
                          </label>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            name="doctor"
                            value={data.doctor}
                            onChange={this.onChangeToggle}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Login as Doctor
                          </label>
                        </div>
                        <div className="d-flex justify-content-end pt-3">
                          <button
                            type="button"
                            className="btn btn-light btn-lg b2-color"
                            onClick={this.onReset}
                          >
                            Reset all
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning btn-lg ms-2 b1-color"
                            onClick={this.onSubmitSignIn}
                          >
                            Login
                          </button>
                        </div>
                        <div className="d-flex justify-content-end pt-3">
                          <a
                            type="button"
                            className="btn btn-light btn-lg b2-color"
                            href="/registerdoc"
                          >
                            Register as a Doctor.
                          </a>
                          <a
                            type="button"
                            className="btn btn-light btn-lg b2-color"
                            href="/register"
                          >
                            Register as a Patient.
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LoginPage;
