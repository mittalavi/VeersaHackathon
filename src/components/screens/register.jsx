import React from "react";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        gender: "",
        state: "",
        city: "",
        dob: "",
        pincode: "",
        email: "",
        password: "",
        cnfrmpassword: "",
        doctor: "false",
        userspouse:""
      },
    };
  }
  onChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };
  onReset = (eve) => {
    eve.preventDefault();
    this.setState({
      data: {
        ...this.state.data,
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        gender: "",
        state: "",
        city: "",
        dob: "",
        pincode: "",
        email: "",
        password: "",
        cnfrmpassword: "",
        userspouse:""
      },
    });
  };
  onSubmitSignup = (event) => {
    event.preventDefault();
    console.log(this.state.data);
    if (
      this.state.data.password.length >= 8 &&
      this.state.data.cnfrmpassword.length >= 8 &&
      this.state.data.phone.length === 13
    ) {
      if (
        this.state.data.password === this.state.data.cnfrmpassword &&
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          this.state.data.email
        )
      ) {
        fetch("https://veersaserver.herokuapp.com/api/signup", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstname: this.state.data.firstName,
            doctor: this.state.data.doctor,
            lastname: this.state.data.lastName,
            email: this.state.data.email,
            phone: this.state.data.phone,
            address: this.state.data.address,
            city: this.state.data.city,
            state: this.state.data.state,
            dob: this.state.data.dob,
            gender: this.state.data.gender,
            pincode: this.state.data.pincode,
            password: this.state.data.password,
            userspouse:this.state.data.userspouse,
            picture:
              "https://firebasestorage.googleapis.com/v0/b/shrink4shrink.appspot.com/o/img.png?alt=media&token=9ea01296-80dd-44ad-a3e8-1442110f179b",
          }),
        })
          .then((response) => response.json())
          .then((user) => {
            console.log(user);
            if (user.email) {
              // this.props.loadUser(user);
              console.log(this.props);
              // this.props.onRouteChange('home');
              //this.props.history.push("/welcome");
              //localStorage.removeItem("user");
              alert("you have successfully registered. Help us know you better!!");
              localStorage.setItem("user", JSON.stringify(user));
              this.props.history.push("/form");
            } else {
              alert(user);
            }
          });
      } else {
        alert("Check both passwords or Email format");
      }
    } else {
      alert("Check password length or contact number format");
    }
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
													height: "100%",
													borderTopLeftRadius: ".25rem",
													borderBottomLeftRadius: ".25rem",
												}}
											/>
										</div>
										<div className="col-xl-6">
											<div className="card-body p-md-5 text-black">
												<h3 className="mb-5 text-uppercase">Signup with us!</h3>

												<div className="row">
													<div className="col-md-6 mb-4">
														<div className="form-outline">
															<input
																type="text"
																id="form3Example1m"
																className="form-control form-control-lg"
																name="firstName"
																value={data.firstName}
																onChange={this.onChange}
																required
															/>
															<label
																className="form-label"
																htmlFor="form3Example1m"
															>
																First name*
															</label>
														</div>
													</div>
													<div className="col-md-6 mb-4">
														<div className="form-outline">
															<input
																type="text"
																id="form3Example1n"
																className="form-control form-control-lg"
																name="lastName"
																value={data.lastName}
																onChange={this.onChange}
																required
															/>
															<label
																className="form-label"
																htmlFor="form3Example1n"
															>
																Last name*
															</label>
														</div>
													</div>
												</div>
												<div className="col-md-6 mb-4">
													<div className="form-outline">
														<input
															type="text"
															id="form3Example1m"
															className="form-control form-control-lg"
															name="phone"
															value={data.phone}
															onChange={this.onChange}
															required
														/>
														<label
															className="form-label"
															htmlFor="form3Example1m"
														>
															Contact Number*(in "+91" format)
														</label>
													</div>
												</div>

												<div className="form-outline mb-4">
													<input
														type="text"
														id="form3Example8"
														className="form-control form-control-lg"
														name="address"
														value={data.address}
														onChange={this.onChange}
														required
													/>
													<label className="form-label" htmlFor="form3Example8">
														Address
													</label>
												</div>

												<div
													className="d-md-flex justify-content-start align-items-center mb-4 py-2"
													onChange={this.onChange}
												>
													<h6 className="mb-0 me-4">Gender*: </h6>

													<div className="form-check form-check-inline mb-0 me-4">
														<input
															className="form-check-input"
															type="radio"
															name="gender"
															id="femaleGender"
															value="female"
														/>
														<label
															className="form-check-label"
															htmlFor="femaleGender"
														>
															Female
														</label>
													</div>

													<div className="form-check form-check-inline mb-0 me-4">
														<input
															className="form-check-input"
															type="radio"
															name="gender"
															id="maleGender"
															value="male"
														/>
														<label
															className="form-check-label"
															htmlFor="maleGender"
														>
															Male
														</label>
													</div>

													<div className="form-check form-check-inline mb-0">
														<input
															className="form-check-input"
															type="radio"
															name="gender"
															id="otherGender"
															value="pns"
														/>
														<label
															className="form-check-label"
															htmlFor="otherGender"
														>
															Preferably not say
														</label>
													</div>
												</div>

												<div className="row">
													<div className="col-md-6 mb-4">
														<select
															name="state"
															id="state"
															className="form-control"
															onChange={this.onChange}
														>
															<option value="">Select State</option>
															<option value="Andhra Pradesh">
																Andhra Pradesh
															</option>
															<option value="Andaman and Nicobar Islands">
																Andaman and Nicobar Islands
															</option>
															<option value="Arunachal Pradesh">
																Arunachal Pradesh
															</option>
															<option value="Assam">Assam</option>
															<option value="Bihar">Bihar</option>
															<option value="Chandigarh">Chandigarh</option>
															<option value="Chhattisgarh">Chhattisgarh</option>
															<option value="Dadar and Nagar Haveli">
																Dadar and Nagar Haveli
															</option>
															<option value="Daman and Diu">
																Daman and Diu
															</option>
															<option value="Delhi">Delhi</option>
															<option value="Lakshadweep">Lakshadweep</option>
															<option value="Puducherry">Puducherry</option>
															<option value="Goa">Goa</option>
															<option value="Gujarat">Gujarat</option>
															<option value="Haryana">Haryana</option>
															<option value="Himachal Pradesh">
																Himachal Pradesh
															</option>
															<option value="Jammu and Kashmir">
																Jammu and Kashmir
															</option>
															<option value="Jharkhand">Jharkhand</option>
															<option value="Karnataka">Karnataka</option>
															<option value="Kerala">Kerala</option>
															<option value="Madhya Pradesh">
																Madhya Pradesh
															</option>
															<option value="Maharashtra">Maharashtra</option>
															<option value="Manipur">Manipur</option>
															<option value="Meghalaya">Meghalaya</option>
															<option value="Mizoram">Mizoram</option>
															<option value="Nagaland">Nagaland</option>
															<option value="Odisha">Odisha</option>
															<option value="Punjab">Punjab</option>
															<option value="Rajasthan">Rajasthan</option>
															<option value="Sikkim">Sikkim</option>
															<option value="Tamil Nadu">Tamil Nadu</option>
															<option value="Telangana">Telangana</option>
															<option value="Tripura">Tripura</option>
															<option value="Uttar Pradesh">
																Uttar Pradesh
															</option>
															<option value="Uttarakhand">Uttarakhand</option>
															<option value="West Bengal">West Bengal</option>
														</select>
														<label
															className="form-label"
															htmlFor="form3Example1n"
														>
															State
														</label>
													</div>
												</div>

												<div className="col-md-6 mb-4">
													<div className="form-outline">
														<input
															type="text"
															id="form3Example1n"
															className="form-control form-control-lg"
															name="city"
															value={data.city}
															onChange={this.onChange}
															required
														/>
														<label
															className="form-label"
															htmlFor="form3Example1n"
														>
															City
														</label>
													</div>
												</div>

												<div className="form-outline mb-4">
													<input
														type="date"
														id="form3Example9"
														className="form-control form-control-lg"
														name="dob"
														value={data.dob}
														onChange={this.onChange}
														required
													/>
													<label className="form-label" htmlFor="form3Example9">
														DOB*
													</label>
												</div>

												<div className="form-outline mb-4">
													<input
														type="text"
														id="form3Example90"
														className="form-control form-control-lg"
														name="pincode"
														value={data.pincode}
														onChange={this.onChange}
														required
													/>
													<label
														className="form-label"
														htmlFor="form3Example90"
													>
														Pincode
													</label>
												</div>

												<div className="form-outline mb-4">
													<input
														type="email"
														id="form3Example97"
														className="form-control form-control-lg"
														name="email"
														value={data.email}
														onChange={this.onChange}
														required
													/>
													<label
														className="form-label"
														htmlFor="form3Example97"
													>
														Email ID*
													</label>
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
														Password*
													</label>
												</div>

												<div className="form-outline mb-4">
													<input
														type="password"
														id="form3Example97"
														className="form-control form-control-lg"
														name="cnfrmpassword"
														value={data.cnfrmpassword}
														onChange={this.onChange}
														required
													/>
													<label
														className="form-label"
														htmlFor="form3Example97"
													>
														Confirm Password*
													</label>
												</div>
												<div className="form-outline mb-4">
													<input
														type="text"
														id="form3Example97"
														className="form-control form-control-lg"
														name="userspouse"
														value={data.userspouse}
														onChange={this.onChange}
														// required
													/>
													<label
														className="form-label"
														htmlFor="form3Example97"
													>
														user spouse
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
														onClick={this.onSubmitSignup}
													>
														Register
													</button>
												</div>
												<div className="d-flex justify-content-end pt-3">
													<a
														type="button"
														className="btn btn-light btn-lg b2-color"
														href="/login"
													>
														Already Registered.Continue to Login!
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

export default RegisterPage;
