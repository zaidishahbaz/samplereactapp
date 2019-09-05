import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'antd/dist/antd.css';
import {Modal, message} from 'antd';
import apiCall from './apiCall';






class VerifyEmailModal extends Component{
  constructor(props){
    super(props);
    this.state={
      otp:"",
      userid:""
    }
  }
  

    render(){
      return(
        <Modal
          visible={this.props.visible}
          footer={[]}
          style={{backgroundColor:'transparent',border:'none',boxShadow:'none'}}
          onCancel={()=>this.props.onClose()}
        >
              <div id="small-dialog-2" style={this.props.visible?{display:'block'}:{display:'inline-block'}} className="zoom-anim-dialog  dialog-with-tabs">
            <div className="sign-in-form">
              <ul className="popup-tabs-nav"></ul>
              <div className="popup-tabs-container">
                <div className="popup-tab-content" id="tab2">
                  <div className="welcome-text">
                    <h3>Verfiy Email</h3>
                    <span>Kindly enter the verification code sent to your registered email id</span>
                  </div>
                  <form id="leave-review-form" onSubmit={(e)=>{e.preventDefault();this.props.verifyUser(this.state.otp)}}>
                    <input type="text" className="input-text with-border" onChange={(e)=>{this.setState({otp:e.target.value})}} name="code" id="code" placeholder="Verification Code" />
                  </form>
                  <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form">{this.props.isLoading?<Loader 
                type="Oval"
                color="white"
                height="30"	
                width="30"
              />:"Verify"} <i className="icon-material-outline-arrow-right-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        

      )
    }
  }
  
  class AuthenticationModal extends Component{
    constructor(props){
      super(props);
      this.state={
        loginData:{
          email:"",
          password:""
        },
        registerData:{
          email:"",
          name:"",
          password:"",
          password2:"",
          status:2,
          mobile_no:""
        },
        activeTab:'login',
        disabled:true,
        // isLoading:false,
        activeUserState:"customer",
        validationMsg:{field:"",msg:""}
      }
    }


    loginCheck(data){
      let {validationMsg}=this.state;

      if(data.email.length===0){
        validationMsg.field="email";
        validationMsg.msg="Email can't be empty!";
        this.setState({validationMsg});
        return;  
      }
      else if(data.password.length===0){
        validationMsg.field="password";
        validationMsg.msg="Password can't be empty!";
        this.setState({validationMsg});
        return;  
      }
      else{
        validationMsg.field="";
        validationMsg.msg="";
        this.setState({validationMsg,isLoading:true})
        data.userType=this.state.activeUserState;
        this.props.userLogin(data);
      }
    }

    registerCheck(data){
      let {validationMsg}=this.state;
      if(data.name.length===0){
        validationMsg.field="name";
        validationMsg.msg="Name can't be empty" 
        // return;
      }
      else if(data.mobile_no.length===0){
        validationMsg.field="mobile";
        validationMsg.msg="Mobile Number can't be empty" 
        // return;
      }
      else if(data.mobile_no.length>10 || data.mobile_no.length<10 || parseInt(data.mobile_no)===NaN){
        validationMsg.field="mobile";
        validationMsg.msg="Invalid mobileNumber" 
        // return;
      }
      else if(data.email.length===0 ){
        validationMsg.field="email";
        validationMsg.msg="Email Id can't be empty" 
        // return;
      }
      else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)===false){
        validationMsg.field="email";
        validationMsg.msg="Invalid Email Id" 
      }
      else if(data.password.length===0){
        validationMsg.field="password";
        validationMsg.msg="Password can't be empty";
        // return;
      }
      else if (data.password.length<8){
        validationMsg.field="password";
        validationMsg.msg="Password must be 8 character long"; 
      }
      else if(data.password2!==data.password){
        validationMsg.field="password2";
        validationMsg.msg="Repeat Password doesn't match"; 
        // return;
      }
      else{
        // console.log('Trigggered')
        validationMsg.field="";
        validationMsg.msg="" 
        data.userType=this.state.activeUserState;
       this.props.userSignup(data);
      }
      this.setState({validationMsg})
    }

    validator(data){
      // 
      let {validationMsg}=this.state;
       console.log(data)
      if(data.name.length!==0){
        validationMsg.field="";
        validationMsg.msg="" 
        // return;
      }
      else if(data.mobile_no.length!==0){
        validationMsg.field="";
        validationMsg.msg="" 
        // return;
      }
      else if(data.mobile_no.length>10 || data.mobile_no.length<10 && parseInt(data.mobile_no)===NaN){
        validationMsg.field="";
        validationMsg.msg="" 
        // return;
      }
      else if(data.email.length!==0 ){
        validationMsg.field="";
        validationMsg.msg="" 
        // return;
      }
      else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)===true){
        validationMsg.field="";
        validationMsg.msg="" 
      }
      else if(data.password.length!==0){
        validationMsg.field="";
        validationMsg.msg="";
        // return;
      }
      else if (data.password.length>8){
        validationMsg.field="";
        validationMsg.msg=""; 
      }
      else if(data.password2===data.password){
        validationMsg.field="";
        validationMsg.msg=""; 
        // return;
      }
      this.setState({validationMsg})
    }

    loginValidator(data){
       // 
       let {validationMsg}=this.state;
       
       if(data.email.length!==0 ){
        validationMsg.field="";
        validationMsg.msg="" 
        // return;
      }
      else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)===true){
        validationMsg.field="";
        validationMsg.msg="" 
      }
      else if(data.password.length!==0){
        validationMsg.field="";
        validationMsg.msg="";
        // return;
      }
      else if (data.password.length>8){
        validationMsg.field="";
        validationMsg.msg=""; 
      }
      
      this.setState({validationMsg})
    }

    render(){
      let {loginData,registerData,validationMsg}=this.state;
      // console.log(this.state.activeUserState)
      return(

        <Modal
        visible={this.props.visible}
        footer={[]}
        onCancel={()=>this.props.onClose()}
        >

        <div id="sign-in-dialog" style={this.props.visible?{display:'block'}:null} className="zoom-anim-dialog dialog-with-tabs">
        <div className="sign-in-form">
          <ul className="popup-tabs-nav">
            <li className={this.state.activeTab==='login'?"active":null}><a href="#" onClick={()=>{this.setState({activeTab:'login'})}}>Log In</a>
            </li>
            <li className={this.state.activeTab==='register'?"active":null}><a href="#" onClick={()=>{this.setState({activeTab:'register'})}}>Register</a>
            </li>
          </ul>
          <div className="popup-tabs-container">
            {this.state.activeTab==='login'?<div className="popup-tab-content" id="login">
              <div className="welcome-text">
                <h3>We're glad to see you again!</h3>
                <span>Don't have an account? <a href="#" className="register-tab" onClick={()=>{this.setState({activeTab:'register'})}}>Sign Up!</a></span>
              </div>
              <div className="status-switch" id="snackbar-user-status">
                      <label className={this.state.activeUserState==='customer'?"user-online current-status":"user-invisible"} onClick={()=>this.setState({activeUserState:'customer'})}>Customer</label>
                      <label className={this.state.activeUserState==='vendor'?"user-online current-status":"user-invisible"} onClick={()=>this.setState({activeUserState:'vendor'})}>Vendor</label>
                      {/* <!-- Status Indicator --> */}
                      <span className={this.state.activeUserState==='customer'?"status-indicator":"status-indicator right"} aria-hidden="true"></span>
                    </div>	
             
                    <form onClick={(e)=>{e.preventDefault();}}>
                      <div className="input-with-icon-left">	
                      {validationMsg.field==="email"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                      <i className="icon-material-baseline-mail-outline" style={validationMsg.field==="email"?{top:'20.5px'}:null}></i>
                        <input type="text" className="input-text with-border" onChange={(e)=>{loginData.email=e.target.value;this.loginValidator(loginData)}} name="emailaddress" id="emailaddress" placeholder="Email Address" required/>
                      </div>
                      <div className="input-with-icon-left">	
                      {validationMsg.field==="password"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                      <i className="icon-material-outline-lock" style={validationMsg.field==="password"?{top:'20.5px'}:null}></i>
                        <input type="password" className="input-text with-border" onChange={(e)=>{loginData.password=e.target.value;this.loginValidator(loginData)}} name="password" id="password" placeholder="Password" required/>
                       
                      </div>	<a href="#small-dialog-3" onClick={()=>this.props.openModal("forget_pw")} className="popup-with-zoom-anim forgot-password">Forgot Password?</a>
                    </form>
                    
              <button onClick={()=>{this.loginCheck(loginData)}} className="button button-sliding-icon ripple-effect">
              {this.props.isLoading?<Loader 
                type="Oval"
                color="white"
                height="30"	
                width="30"
              />:"Login"} <i className="icon-material-outline-arrow-right-alt"></i></button>
              {/* <div className="social-login-separator"><span>or</span>
              </div> */}
              {/* <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Log In via Facebook</button>
                <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Log In via Google+</button>
              </div> */}
            </div>
            :

            <div className="popup-tab-content" id="register">
              <div className="welcome-text">
                <h3>Let's create your account!</h3>
              </div>
              <div className="status-switch" id="snackbar-user-status">
                      <label className={this.state.activeUserState==='customer'?"user-online current-status":"user-invisible"} onClick={()=>this.setState({activeUserState:'customer'})}>Customer</label>
                      <label className={this.state.activeUserState==='vendor'?"user-online current-status":"user-invisible"} onClick={()=>this.setState({activeUserState:'vendor'})}>Vendor</label>
                      {/* <!-- Status Indicator --> */}
                      <span className={this.state.activeUserState==='customer'?"status-indicator":"status-indicator right"} aria-hidden="true"></span>
                    </div>	
              <form onSubmit={(e)=>{e.preventDefault();this.registerCheck(registerData)}}>
                <div className="input-with-icon-left">
                  {validationMsg.field==="name"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                	<i className="icon-material-baseline-mail-outline" style={validationMsg.field==="name"?{top:'20.5px'}:null}></i>
                  <input type="text" className="input-text with-border" onChange={(e)=>{registerData.name=e.target.value;this.validator(registerData)}}  name="emailaddress-register" id="emailaddress-register" placeholder="Name" required/>
                </div>
                <div className="input-with-icon-left">	
                {validationMsg.field==="mobile"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                <i className="icon-material-baseline-mail-outline" style={validationMsg.field==="mobile"?{top:'20.5px'}:null}></i>
                  <input type="text" min="0" ma="10" defaultValue={registerData.mobile_no} className="input-text with-border" onChange={(e)=>{registerData.mobile_no.length<10?registerData.mobile_no=e.target.value:console.log(e);this.setState({registerData});this.validator(registerData)}}  name="emailaddress-register" id="emailaddress-register" placeholder="Phone number" required/>
                </div>
                <div className="input-with-icon-left">
                {validationMsg.field==="email"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                	<i className="icon-material-baseline-mail-outline" style={validationMsg.field==="email"?{top:'20.5px'}:null}></i>
                  <input type="text" className="input-text with-border" name="emailaddress-register" onChange={(e)=>{registerData.email=e.target.value;this.validator(registerData)}}  id="emailaddress-register" placeholder="Email Address" required/>
                </div>
                <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                {validationMsg.field==="password"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                	<i className="icon-material-outline-lock" style={validationMsg.field==="password"?{top:'20.5px'}:null}></i>
                  <input type="password" className="input-text with-border" onChange={(e)=>{registerData.password=e.target.value;this.validator(registerData)}}  name="password-register" id="password-register" placeholder="Password" required/>
                </div>
                <div className="input-with-icon-left">	
                {validationMsg.field==="password2"?<span style={{color:'red'}}>{validationMsg.msg}</span>:null}
                <i className="icon-material-outline-lock" style={validationMsg.field==="password2"?{top:'20.5px'}:null}></i>
                  <input type="password" className="input-text with-border" name="password-repeat-register" onChange={(e)=>{registerData.password2=e.target.value;this.validator(registerData)}}  id="password-repeat-register" placeholder="Repeat Password" required/>
                </div>
              </form>
              <button type="submit" onClick={(e)=>{e.preventDefault();this.registerCheck(registerData)}}  className="popup-with-zoom-anim button button-sliding-icon ripple-effect">{this.props.isLoading?<Loader 
                type="Oval"
                color="white"
                height="30"	
                width="30"
              />:"Register"}<i className="icon-material-outline-arrow-right-alt"></i></button>
              {/* <div className="social-login-separator"><span>or</span>
              </div>
              <div className="social-login-buttons">
                <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Register via Facebook</button>
                <button className="google-login ripple-effect" onClick={()=>this.props.googleLogin(this.state.activeUserState)}><i className="icon-brand-google-plus-g"></i> Register via Google+</button>
              </div> */}
            </div>}
          </div>
        </div>
      </div>
      
      </Modal>
      )
    }
  }
  
  class ForgotPassword extends Component{
    constructor(props){
      super(props);
      this.state={
        email:"",
        // isLoading:""
      }
    }
    
    sendVerifyCode(){
      message.loading("Please Wait",1);
      let data={
        email:this.state.email
      }
      apiCall.post('/user/forget_password',data).then(res=>{
        if(res.data.status){
          localStorage.setItem('userID',res.data.userid);
          localStorage.setItem('fg_pw',true);
          this.props.openModal('verify_email')
        }
        else{
          message.error(res.data.message,1);
        }
      })
    }
    

    render(){
      return(
        <Modal
        visible={this.props.visible}
        footer={[]}
        onCancel={()=>this.props.onClose()}
        >
        <div id="small-dialog-3" style={this.props.visible?{display:'block'}:null} className="zoom-anim-dialog dialog-with-tabs">
        <div className="sign-in-form">
          <ul className="popup-tabs-nav"></ul>
          <div className="popup-tabs-container">
            <div className="popup-tab-content" id="tab2">
              <div className="welcome-text">
                <h3>Forgot Password?</h3>
                <span>Kindly enter the Email ID registered to your account</span>
              </div>
              <form method="post" id="leave-review-form" >
                <input type="email" className="input-text with-border" onChange={(e)=>{this.setState({email:e.target.value})}} required name="code" id="code" placeholder="Email" />
              </form>
              <button style={{cursor:'pointer'}} onClick={(e)=>{e.preventDefault();this.sendVerifyCode()}} className="popup-with-zoom-anim button button-sliding-icon ripple-effect">Send Verification Code <i className="icon-material-outline-arrow-right-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
      </Modal>
      )
    }
  }
  
  class ChangePassword extends Component {
    constructor(props){
      super(props);
      this.state={
          password:"",
          password2:""
      }
    }




    render(){
      return(
        <Modal
        visible={this.props.visible}
        footer={[]}
        onCancel={()=>this.props.onClose()}
        >
        <div id="small-dialog-5" style={this.props.visible?{display:'block'}:null} className="zoom-anim-dialog dialog-with-tabs">
        <div className="sign-in-form">
          <ul className="popup-tabs-nav"></ul>
          <div className="popup-tabs-container">
            <div className="popup-tab-content" id="tab2">
              <div className="welcome-text">
                <h3>Change Password</h3>
              </div>
              <form id="leave-review-form">
                <input type="password" className="input-text with-border" name="code" id="code" placeholder="Enter Password" onChange={(e)=>this.setState({password:e.target.value})} />
                <input type="password" className="input-text with-border" name="code" id="code" placeholder="Re-enter Password" onChange={(e)=>this.setState({password2:e.target.value})} />
              </form>
              <a href="" className="popup-with-zoom-anim button button-sliding-icon ripple-effect" onClick={(e)=>{e.preventDefault();this.props.resetPass(this.state)}}>{this.props.isLoading?<Loader 
                type="Oval"
                color="white"
                height="30"	
                width="30"
              />:"Change Password "}<i className="icon-material-outline-arrow-right-alt"></i></a>
            </div>
          </div>
        </div>
      </div>
      </Modal>
      )
    }
  }
  

export default class Modals extends Component {
    constructor(props){
        super(props)
        this.state={
          visibleModal:""
        }
    }
    componentWillMount(){
      // MaginificPopup.trigger('.element-with-popup', 'open');
    }
    
  render() {
      // console.log(this.props)
      let {mode}=this.props;
      
        if(mode==='verify_email'){
            return <VerifyEmailModal visible={this.props.verifyEmailvisible} verifyUser={(otp)=>{this.props.verifyUser(otp)}}  onClose={()=>this.props.closeVerify()} />
        }
        else if(mode==='forget_pw'){
            return <ForgotPassword visible={this.props.verifyEmailvisible} openModal={(name)=>this.props.openModal(name)} onClose={()=>this.props.closeVerify()}  />
        }
        else if(mode==='change_pw'){
            return <ChangePassword resetPass={(data)=>this.props.resetPass(data)} visible={this.props.verifyEmailvisible} openModal={(name)=>this.props.openModal(name)} onClose={()=>this.props.closeVerify()} />
        }
        else if(mode==='signin_up'){
            return <AuthenticationModal googleLogin={(userType)=>this.props.googleLogin(userType)} visible={this.props.verifyEmailvisible} openModal={(name)=>this.props.openModal(name)} onClose={()=>this.props.closeVerify()} userSignup={(data)=>this.props.userSignup(data)} isLoading={this.props.isLoading} userLogin={(data)=>this.props.userLogin(data)} />
        }
        else{
          return <div></div>
        }
  }
}
