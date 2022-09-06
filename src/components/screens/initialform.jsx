import React from "react";
import { Widget } from '@typeform/embed-react';
import './dashboard.css';


class form extends React.Component{
    handleSignOut(){
        localStorage.removeItem("user");
    }
    onsub=(eve)=>{
        console.log("submit")
        this.props.history.push("/dashboard");
      }
    render(){return(
        <div style={{height:'100%'}}>
     <Widget id="DIPR8Fwh" style={{ width: '100%',height:'100vh' }} className="my-form" onSubmit={this.onsub}/>
     </div>
   );}
}

export default form;