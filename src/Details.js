import React from "react";
import { display } from "@material-ui/system";

export default class Details extends React.Component {
state={
  employeeData:{
    age: '',
    city: "",
    company_name: "",
    email: "",
    first_name: "",
    id: undefined,
    last_name: "",
    state: "",
    web: "",
    zip: undefined
  }
}
  componentDidMount(){
    this.setState({employeeData:this.props.location.state})
  }

  createDetailRow(title,value){
    return(
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid silver'}}>
      <h6>{title}</h6>
      <p>{value}</p>
    </div>
    )
  }
    render() {
      return(
          <div style={{flex:1,paddingRight:'4vw',paddingLeft:'4vw'}}>
            {
              console.log(this.props)
            }
            <img src="https://www.pinclipart.com/picdir/big/371-3711445_left-png-icon-free-download-onlinewebfonts-com-android.png" 
            alt="Back Button" 
            height="20" width="20" 
            style={{marginTop:20}}
            onClick={()=>this.props.history.goBack()}/>
          {
            this.createDetailRow("Company",this.state.employeeData.company_name)
          }
          {
            this.createDetailRow("City",this.state.employeeData.city)
          }
          {
            this.createDetailRow("State",this.state.employeeData.state)
          }
          {
            this.createDetailRow("ZIP",this.state.employeeData.zip)
          }
          {
            this.createDetailRow("Email",this.state.employeeData.email)
          }
          {
            this.createDetailRow("Website",this.state.employeeData.web)
          }
          {
            this.createDetailRow("Age",this.state.employeeData.age)
          }
          </div>
      )
    }
  }