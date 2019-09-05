import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../common/header';
import {message} from 'antd';
import Footer from './../common/footer';
import dataJson from '../dataJson.json';
import Similar_vendors from './components/similar_vendors';
import Modals from '../utils/Modals.js';
import ApiCall from '../utils/apiCall';
import {Modal} from 'antd';
import 'antd/dist/antd.css'; 

class Vendor_details extends Component {
    constructor(props){
        super(props);
        this.state={
            activeVendorId : '5d25bb5da032a709906d7707',
			activeVendorInfo:{},
			isLoading:false,
            verifyModal:false,
			activeModal:"",
			bookingModal: false,
			display:false,
			time: '',
			date: '',
			location: '',
			description: '',
			data: [],
			shortlisted: false,
			review: []
		}
		this.shortlist=this.shortlist.bind(this)
	}
	showModal = () => {
		if(localStorage.getItem('token')!==null){
			this.setState({
				bookingModal: true,
			  });
		}
		else{
			this.setState({activeModal:"signin_up",verifyModal:true})
		}
	  };
	
	  handleOk = e => {
		console.log(e);
		this.setState({
		  bookingModal: false,
		});
	  };
	
	  handleCancel = e => {
		console.log(e);
		this.setState({
		  bookingModal: false,
		});
	  };

	componentWillMount(){
        document.title="Horse Task"
      }
   
      userLogin(data){
       this.setState({isLoading:true})
         ApiCall.post("/user/login",data).then(res=>{
           if(res.data.status){
             localStorage.setItem('token',res.data.token);
             message.success("Logged In!",1);
			var self=this;
             setTimeout(function(){
               self.props.history.push("/vendor/"+self.props.match.params.id)
             },1200)
             
             // this.setState({isLoading:false})
             }
           else{
             this.setState({isLoading:false})
             message.error(res.data.message,1);
             return;
           }
         })
       
      }
   
      openModal(name){
        console.log(name)
       this.setState({activeModal:name,verifyEmailvisible:true})
      }
   
      userSignup(data){
       this.setState({isLoading:true})
     
         ApiCall.post("/user/register",data).then(res=>{
           if(res.data.status){
             this.setState({verifyModal:true,isLoading:false})
             localStorage.setItem('userID',res.data.result);
             this.setState({activeModal:"verify_email"});
           }
           else{
             message.error(res.data.message,1);
           }
         })
      }
   
      verifyUser(otp){
        this.setState({isLoading:true})
       let userId=localStorage.getItem('userID');
       if(userId!==undefined){
         let data={
           otp:otp,
           userid:userId
         }
           ApiCall.post("/user/verify",data).then(res=>{
             if(res.data.status){
               message.success(res.data.message,1)
               if(localStorage.getItem('fg_pw')===null){
             this.setState({isLoading:false});
   
                 window.location.href="/";
               }
               else{
             this.setState({isLoading:false});
   
                 this.openModal('change_pw')
               }
               
             }
             else{
             this.setState({isLoading:false});
   
               message.error(res.data.message,1);
             }
           }).catch(err=>{
             console.log(err)
           })
       }
     }
   
     resetPass(data){
       this.setState({isLoading:true})
       let userId=localStorage.getItem('userID');
       if(data.password===data.password2){
         if(userId!=null){
           ApiCall.post("/user/reset_password",{password:data.password,userid:userId}).then(res=>{
             // this.setState({isLoading:false})
             if(res.data.status){
               message.success(res.data.message,1);
               var self=this;
               setTimeout(function(){
                 self.setState({isLoading:false})
                 self.openModal('signin_up');
               },1300)
             }
             else{
             this.setState({isLoading:false});
   
               message.error(res.data.message,1);
             }
           })
         }
       }   
     }

    componentWillMount(){
		let token=localStorage.getItem('token');
		ApiCall.get('/vendordetails/'+this.props.match.params.id,token).then(res=>{
			this.setState({data:res.data[0],display:res.data.isBooked,shortlisted:res.data.shortlisted,review:res.data.review})
			console.log(res.data)
		})
        document.body.scrollTop = document.documentElement.scrollTop = 0;


	}
	handleSubmit=e=>{
		// console.log(this.state)
		let data={
			'vendorId': this.props.match.params.id,
			'time': this.state.time,
			'date': this.state.date,
			'city': this.state.location,
			'description': this.state.description
		}
		let token=localStorage.getItem('token');
		ApiCall.post('/vendor/book',data,token).then(res=>
			{
				if(res.data.status)
				{
					console.log("Sent");
					this.setState({
						display:true,
					})
					console.log(this.state.display)
				}
				else
				{
					message.error(res.data.message,1);
				}
			})
	}
	shortlist(){
		let vendorId=this.props.match.params.id;
		let token=localStorage.getItem('token');
		ApiCall.post("/shortlist/vendor",{vendorid:vendorId},token).then(res=>{
			if(res.data.status)
			{
				console.log("Sent");
				
			}
			else
			{
				message.error(res.data.message,1);
			}
		})
	  }


  render() {
	  const {activeVendorInfo}=this.state;
	  console.log(this.state.review)
    return (
        <React.Fragment>
            <div id="wrapper">
            <Header openModal={()=>{this.setState({activeModal:"signin_up",verifyModal:true})}} />
			<Modals mode={this.state.activeModal} resetPass={(data)=>{this.resetPass(data)}} verifyUser={(otp)=>{this.verifyUser(otp)}} verifyEmailvisible={this.state.verifyModal} openModal={(name)=>this.openModal(name)} closeVerify={()=>{this.setState({verifyModal:false})}} isLoading={this.state.isLoading} userLogin={(data)=>this.userLogin(data)} userSignup={(data)=>this.userSignup(data)} />
		<div className="clearfix"></div>
		<div className="single-page-header freelancer-header" data-background-image="/images/single-freelancer.jpg">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="single-page-header-inner">
							<div className="left-side">
								<div className="header-image freelancer-avatar">
									<img src={this.state.data!=undefined?this.state.data.vendor_image:null} alt="" />
								</div>
								<div className="header-details">
									<h3>  {this.state.data!=undefined?this.state.data.name:null}  <span>{this.state.data.service_name!=undefined?this.state.data.service_name.map((item)=>{return item.name}):null}</span></h3>
									<ul>
										<li>
											<div className="star-rating" data-rating={parseFloat(this.state.data.rating)}></div>
										</li>
										{this.state.data.verified?<li>
											<div className="verified-badge-with-title">Verified</div>
										</li>:null}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="container">
			<div className="row">
				<div className="col-xl-8 col-lg-8 content-right-offset">
					<div className="single-page-section">
						<h3 className="margin-bottom-25">About Service</h3>
						{   this.state.data.description!=undefined?
							<p>{this.state.data.description}</p>
                            :null
						}
					</div>
					<div className="boxed-list margin-bottom-60">
				<div className="boxed-list-headline">
					<h3><i className="icon-material-outline-thumb-up"></i> Reviews</h3>
				</div>
				<ul className="boxed-list-ul">
					{	this.state.review!=undefined?
						this.state.review.map((item)=>{
						return <li>
						<div className="boxed-list-item">
							<div className="item-content">
								<h4> <span>{item.username}</span></h4>
								<div className="item-details margin-top-10">
									<div className="star-rating" data-rating={item.rating}></div>
									<div className="detail-item"><i className="icon-material-outline-date-range"></i>{item.timestamp}</div>
								</div>
								<div className="item-description">
									<p>{item.comment}</p>
								</div>
							</div>
						</div>
					</li>
					}):null}
				</ul>


			</div>
				</div>
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">
						<div className="profile-overview">
							<div className="overview-item"><strong>${this.state.data.service_charge}</strong><span>Rate</span>
							</div>
							<div className="overview-item"><strong>4</strong><span>Workers</span>
							</div>
							<div className="overview-item"><strong>{this.state.data.hired_count}</strong><span>Hired</span>
							</div>
						</div>	<a onClick={this.showModal} className="apply-now-button popup-with-zoom-anim margin-bottom-50" style={{color:'white'}}>{this.state.display?<div>Booked<i className="icon-feather-check" /></div>:<div>Book Now<i className="icon-material-outline-arrow-right-alt"></i></div>}</a>
						
						<div className="sidebar-widget">
							{localStorage.getItem('token')!==null?<React.Fragment><h3>Bookmark or Share</h3>
								<button className={this.state.shortlisted==true?"bookmark-button margin-bottom-25 bookmarked":"bookmark-button margin-bottom-25"} onClick={this.shortlist}>	<span className="bookmark-icon"></span>
									<span className="bookmark-text">Shortlist</span>
									<span className="bookmarked-text">Shortlisted</span>
								</button></React.Fragment>:null}
							<div className="share-buttons margin-top-25">
								<div className="share-buttons-trigger"><i className="icon-feather-share-2"></i>
								</div>
								<div className="share-buttons-content">	<span>Interesting? <strong>Share It!</strong></span>
									<ul className="share-buttons-icons">
										<li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f"></i></a>
										</li>
										<li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a>
										</li>
										<li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g"></i></a>
										</li>
										<li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in"></i></a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<Similar_vendors type={this.state.data.service_type} activeVendor={this.state.data.name} />
					</div>
				</div>
			</div>
		</div>
		<div className="margin-top-15"></div>
		<Footer />
	</div>
	<div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav">
				<li><a href="#login">Log In</a>
				</li>
				<li><a href="#register">Register</a>
				</li>
			</ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="login">
					<div className="welcome-text">
						<h3>We're glad to see you again!</h3>
						<span>Don't have an account? <a href="#" className="register-tab">Sign Up!</a></span>
					</div>
					<div className="status-switch" id="snackbar-user-status">
									<label className="user-online current-status">Customer</label>
									<label className="user-invisible">Vendor</label>
									{/* <!-- Status Indicator --> */}
									<span className="status-indicator" aria-hidden="true"></span>
								</div>	
					<form method="post" id="login-form">
						<div className="input-with-icon-left">	<i className="icon-material-baseline-mail-outline"></i>
							<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
						</div>
						<div className="input-with-icon-left">	<i className="icon-material-outline-lock"></i>
							<input type="password" className="input-text with-border" name="password" id="password" placeholder="Password" required />
						</div>	<a href="#small-dialog-3" className="popup-with-zoom-anim forgot-password">Forgot Password?</a>
					</form>
                    <button>
					<a href="singlelogged.html" className="button button-sliding-icon ripple-effect">Login <i className="icon-material-outline-arrow-right-alt"></i></a>
					</button>
					<div className="social-login-separator"><span>or</span>
					</div>
					<div className="social-login-buttons">
						<button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Log In via Facebook</button>
						<button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Log In via Google+</button>
					</div>
				</div>
				<div className="popup-tab-content" id="register">
					<div className="welcome-text">
						<h3>Let's create your account!</h3>
					</div>
					<form method="post" id="register-account-form">
						<div className="input-with-icon-left">	<i className="icon-material-baseline-mail-outline"></i>
							<input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Name" required/>
						</div>
						<div className="input-with-icon-left">	<i className="icon-material-baseline-mail-outline"></i>
							<input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Phone number" required/>
						</div>
						<div className="input-with-icon-left">	<i className="icon-material-baseline-mail-outline"></i>
							<input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required/>
						</div>
						<div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">	<i className="icon-material-outline-lock"></i>
							<input type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required/>
						</div>
						<div className="input-with-icon-left">	<i className="icon-material-outline-lock"></i>
							<input type="password" className="input-text with-border" name="password-repeat-register" id="password-repeat-register" placeholder="Repeat Password" required/>
						</div>
					</form>
					<a href="#small-dialog-2" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">Register <i className="icon-material-outline-arrow-right-alt"></i></a>
					<div className="social-login-separator"><span>or</span>
					</div>
					<div className="social-login-buttons">
						<button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Register via Facebook</button>
						<button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Register via Google+</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-2" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Verfiy Email</h3>
						<span>Kindly enter the verification code sent to your registered email id</span>
					</div>
					<form method="post" id="leave-review-form">
						<input type="text" className="input-text with-border" name="code" id="code" placeholder="Verification Code" />
					</form>
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form">Verify <i className="icon-material-outline-arrow-right-alt"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-3" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Forgot Password?</h3>
						<span>Kindly enter the Email ID registered to your account</span>
					</div>
					<form method="post" id="leave-review-form">
						<input type="text" className="input-text with-border" name="code" id="code" placeholder="Email" />
					</form>
					<a href="#small-dialog-4" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">Send Verification Code <i className="icon-material-outline-arrow-right-alt"></i></a>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-4" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Verfiy Email</h3>
						<span>Kindly enter the verification code sent to your registered email id</span>
					</div>
					<form method="post" id="leave-review-form">
						<input type="text" className="input-text with-border" name="code" id="code" placeholder="Verification Code" />
					</form>
					<a href="#small-dialog-5" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">Verify <i className="icon-material-outline-arrow-right-alt"></i></a>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-5" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Change Password</h3>
					</div>
					<form method="post" id="leave-review-form">
						<input type="password" className="input-text with-border" name="code" id="code" placeholder="Enter Password" />
						<input type="password" className="input-text with-border" name="code" id="code" placeholder="Re-enter Password" />
					</form>
					<a href="#sign-in-dialog" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">Change Password <i className="icon-material-outline-arrow-right-alt"></i></a>
				</div>
			</div>
		</div>
	</div>
	<Modal
        title="Book Vendor"
        visible={this.state.bookingModal}
        onOk={this.handleOk}
		onCancel={this.handleCancel}
		footer={null}
		style={{top:'10px'}}
    >
	{
		this.state.display==false?
		  <div className="popup-tab-content" id="tab">
			<div className="welcome-text">
				<h3>Request your service with {this.state.data.name}</h3>
			</div>
			<form method="post">
			<div className="row">
				<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-watch" />
					<input type="text" className="input-text with-border" name="name" id="name" placeholder="Select Time" value={this.state.time} onChange={(e)=>{this.setState({time:e.target.value})}}/>
				</div>
				<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-date-range" />
					<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Date" value={this.state.date} onChange={(e)=>{this.setState({date:e.target.value})}}/>
				</div>
			</div>
			<div className="input-with-icon-left">	<i className="icon-line-awesome-map-marker" />
				<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Where Do you Want this Service?" value={this.state.location} onChange={(e)=>{this.setState({location:e.target.value})}}/>
			</div>
			<textarea name="textarea" cols={10} placeholder="Service Description (if any)" className="with-border" defaultValue={""} value={this.state.description} onChange={(e)=>{this.setState({description:e.target.value})}}/>
			{/* <div className="uploadButton margin-top-25">
				<input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
				<label className="uploadButton-button ripple-effect" htmlFor="upload">Add Attachments</label>	<span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files size: 50 MB.</span>
			</div> */}
			</form>
			<a className="popup-with-zoom-anim">
				<button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit" onClick={this.handleSubmit}>Request Service <i className="icon-material-outline-arrow-right-alt" /> 
				</button>
			</a>
		  	</div>:
      					<div className="popup-tab-content" id="tab2">
        					<div className="order-confirmation-page" style={{paddingBottom: 0}}>
          						<div className="breathing-icon"><i className="icon-feather-check" /></div>
          						<h3 className="margin-top-30">Service Placed</h3>
          						<p>We will notify you once the vendor replies!</p>
        					</div>
      					</div>
				  }
        </Modal>
        </React.Fragment>
    )
  }
}


export default withRouter(Vendor_details);