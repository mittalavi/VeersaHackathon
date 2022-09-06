import React from "react";
import Tilt from "react-parallax-tilt";

class PatientProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            u:JSON.parse(localStorage.getItem("user")),
            upcoming_session:[],
            personal_data:{},
            previous_session:[],
            routines:[],
        }
    }
    componentDidMount=()=>{
        const email = this.props.match.params.name;
        fetch("https://veersaserver.herokuapp.com/api/userdata",{
           method:"post",
           headers: { "Content-type": "application/json" },
           body: JSON.stringify({
               email:email,
           }),
       })
       .then((response) => response.json())
       .then((resp) => {
           console.log(resp);
           this.setState({
           personal_data: resp
           });
       });

       fetch("https://veersaserver.herokuapp.com/api/usersessions",{
        method:"post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            email:email,
            upcoming:"false",
            doctor:"false"
        }),
        })
        .then((response) => response.json())
        .then((resp) => {
            console.log(resp);
            this.setState({
            previous_session: resp
            });
        });
        fetch("https://veersaserver.herokuapp.com/api/usersessions",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email:email,
                upcoming:"true",
                doctor:"false"
                }),
            })
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp);
                this.setState({
                upcoming_session: resp
                });
            });
        fetch("https://veersaserver.herokuapp.com/api/get_routine",{
            method:"post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                    email:email
            }),
            })
            .then((response) => response.json())
            .then((resp) => {
                console.log(resp);
                this.setState({
                routine: resp
                });
            });
     }
    render(){
        //const { data } = this.state;
        const name = this.state.personal_data.firstname+" "+this.state.personal_data.lastname
        return(
            <div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#Profile">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Upcoming-sessions">Upcoming Sessions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Previous-sessions">Previous Sessions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#Routines">Routines</a>
                    </li>
                    </ul>
                    <div id="Profile">
                        <div>
                            <div class="container">
                            <div class="row gutters">
                            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="account-settings">
                                        <div class="user-profile">
                                            <div class="user-avatar">
                                                <img src={this.state.personal_data.picture} alt={this.state.personal_data.firstname}/>
                                            </div>
                                            <h5 class="user-name">{this.state.personal_data.firstname} {this.state.personal_data.lastname}</h5>
                                            <h6 class="user-email">{this.state.personal_data.email}</h6>
                                            <h6 className="user-email">Assigned Doctor:</h6>
                                            <h5 class="user-email">{this.state.personal_data.doctor_assigned}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 class="mb-2 text-primary">Personal Details</h6>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <label for="Name">Name</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={name}/>
                                                
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">Email</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.email}/>
                                                
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">Phone</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.phone}/>
                                                
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">Date of Birth</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.dob}/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 class="mt-3 mb-2 text-primary">Location</h6>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">Address</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.address}/>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">City</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.city}/>
                                                
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">State</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.state}/>
                                                
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <label for="Name">Pincode</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.personal_data.pincode}/>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="text-right">
                                            <button type="button" name="submit" class="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div id="Upcoming-sessions">
                        <h1 className="text-dark">Upcoming Sessions</h1>
                        <div className="row">
                        {this.state.upcoming_session.map((ele,i) => (
                            ele.doctor===this.state.u.email?(<div key={i} className="col-sm-6">
                                <Tilt>
                                <div className="ses-info">
                                    <h1>{ele.title}</h1>
                                    <p style={{color:ele.status==='1'?"green":(ele.status==='-1'?"red":"black")}}></p>
                                    <p>{ele.date}</p>
                                    <p>{ele.time}</p>
                                    <p>{ele.Outcome}</p>
                                </div>
                                </Tilt>
                            </div>):(<div></div>)
                        ))}
                        </div>
                    </div>

                {this.state.previous_session.length!==0?(<div id="Previous-sessions">
                <h1 className="text-dark">Previous Sessions</h1>
                    <div className="row">
                    {this.state.previous_session.map((ele,i) => (
                        ele.doctor===this.state.u.email?(<div key={i} className="col-sm-6">
                        <Tilt>
                        <div className="ses-info">
                            <h1>{ele.title}</h1>
                            <p style={{color:ele.status==='1'?"green":(ele.status==='-1'?"red":"black")}}></p>
                            <p>{ele.date}</p>
                            <p>{ele.time}</p>
                            <p>{ele.Outcome}</p>
                        </div>
                        </Tilt>
                    </div>):(<div></div>)
                    ))}
                    </div>
                </div>):(<div></div>)}

                {this.state.routines.length!==0?(<div id="Routines">
                   <h1 className="text-dark">Routines</h1>
                        <div className="row">
                            {this.state.routines.map((ele, i) => (
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
                    </div>):(<div></div>)}
            </div>
        )
    }
}

export default PatientProfile