import React, { Component } from 'react'
import {firebase} from "../../utils/Firebase"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {getCurrentProfile,createProfileNew} from "../../Store/actions/authAction"
import {Alert} from "react-bootstrap"
import {Row,Col} from "react-bootstrap"
import {Card,CardBody} from "shards-react"
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
             phone:"",
             otp:"",
             otpPresence:false,
             recaptchaVerifier:null,
             error:null,
             confirmResult:null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onOtp = this.onOtp.bind(this)
    }
    
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    componentDidMount(){
       window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
        {
           size:"invisible"
            // other options
        });
    }
    onSubmit(e){
        e.preventDefault()
        // e.preventDefault()
        //changing
        this.state.confirmResult.confirm(this.state.otp).then(object=>{
            console.log(object,"success")
            if(object.additionalUserInfo.isNewUser){
                localStorage.setItem("uid",object.user.uid)
                // this.props.history.push("/user/register/"+this.state.phone)
                this.props.createProfileNew(object.user.uid,object.user.providerData[0],this.props.history)
            }else{
                localStorage.setItem("uid",object.user.uid)
                this.props.getCurrentProfile(object.user.uid)
                this.props.history.push("/dashboard")
            }    
    })    
    }
    onOtp(){
        const phoneNumber = this.state.phone;
        const appVerifier = window.recaptchaVerifier;
        firebase.database().ref('user').orderByChild('phoneNumber').equalTo(`+91${phoneNumber}`).once('value').then(snapshot=>{
            const data = snapshot.val()
            if(data){
                firebase
            .auth()
            .signInWithPhoneNumber("+91"+phoneNumber, appVerifier)
            .then(confirmResult1 => {
              // success
              console.log(confirmResult1)
              this.setState({confirmResult:confirmResult1})
            })
            .catch(error => {
              // error
              this.setState({error:error})
              console.log(error)
            });
            }else{
                this.setState({error:true})
            }
            // console.log(data)
        })
        .catch(err=>{
            this.setState({error:err})
        })
    }
    render() {
        return (
            <div>
                <Row className='mt5'>
                     <Col md={12} className="center ml5">
                    <Card style={{maxWidth:"300px"}} className='center'>
                        <CardBody>
                <form onSubmit={this.onSubmit}>
  <div class="form-group">
    <label for="exampleInputphone1">Contact no.</label>
    <input type="text" name='phone' class="form-control" id="exampleInputphone1" onChange={this.onChange} aria-describedby="phoneHelp" placeholder="Enter phone number" />
    <small id="emailHelp" class="form-text text-muted">We'll never share your contact no with anyone else.</small>
    <input id="recaptcha-container" type="button" value="get OTP" className="btn btn-warning" onClick={this.onOtp} />
  </div>
  {this.state.confirmResult?<div><div className="form-group">
  <label for="exampleInputotp1">otp</label>
    <input type="text" name='otp' class="form-control" id="exampleInputotp1" onChange={this.onChange} aria-describedby="otpHelp" placeholder="Enter otp..." />
</div>
  <button type="submit" class="btn btn-primary">Submit</button></div>:null}
</form>
</CardBody>
</Card>
</Col>
</Row>
{this.state.error?<Row>
    <Col md={5} className="center">
    <Alert variant='danger'>
        some error occured try again later
    </Alert>
    </Col>
</Row>:null}
            </div>
        )
    }
}
export default connect(null,{getCurrentProfile,createProfileNew})(withRouter(Login));