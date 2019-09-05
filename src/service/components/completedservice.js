import React, { Component } from "react";
import Header from "../../common/header";
import Sidebar from "../../common/sidebar";
import ApiCall from '../../utils/apiCall';

export default class Completedservice extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			data: []
		}
	}
	componentWillMount()
	{
		let token=localStorage.getItem('token');
    	ApiCall.get('/service/completed/all',token).then(res=>{
		this.setState({data:res.data.result})
      	console.log(this.state.data)
    	})
	}
  render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
		<div class="clearfix"></div>
		<div class="full-page-container">
    <div className="dashboard-sidebar-inner" data-simplebar style={{flex: '0 0 280px'}}>
      <Sidebar />
			</div>
			<div class="full-page-content-container" data-simplebar>
				<div class="dashboard-content-inner">
					<div class="dashboard-headline">
						<h3>Completed Services</h3>
						<nav id="breadcrumbs" class="dark">
							<ul>
								<li><a href="#">Home</a>
								</li>
								<li>Dashboard</li>
								<li>Completed Services</li>
							</ul>
						</nav>
					</div>
					<div class="row"></div>
					<div class="row">
						<div class="col-xl-12">
							<div class="dashboard-box margin-top-30">
	
								<div class="headline"><i class="icon-material-outline-business-center"></i> Completed Services</div>
								<div class="content">
									<ul class="dashboard-box-list">
										{this.state.data!=undefined?this.state.data.map((item)=>{
											return <li>
											<div class="job-listing">
												<div class="job-listing-details">
													<a href="#" class="job-listing-company-logo">
														<img src="images/company-logo-05.png" alt="" />
													</a>
													<div class="job-listing-description">
														<h3 class="job-listing-title"><a href="#">{item.servicename[0]!=undefined?item.servicename[0].name:null}</a></h3>
														<div class="job-listing-footer">
															<ul>
																<li><i class="icon-material-outline-business"></i>{item.servicename[0]!=undefined?item.servicename[0].category:null}</li>
																
															</ul>
														</div>
													</div>
												</div>
											</div>
											<div class="buttons-to-right"><a href="javascript:void(0);" class="popup-with-zoom-anim button button-sliding-icon ripple-effect">View Details <i class="icon-material-outline-arrow-right-alt"></i></a>
												 
											</div>
										</li>
										}):null}
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <div class="row">
						<div class="col-md-12">
						
							<div class="pagination-container margin-top-40 margin-bottom-60">
								<nav class="pagination">
									<ul>
										<li class="pagination-arrow"><a href="#" class="ripple-effect"><i class="icon-material-outline-keyboard-arrow-left"></i></a>
										</li>
										<li><a href="#" class="ripple-effect">1</a>
										</li>
										<li><a href="#" class="current-page ripple-effect">2</a>
										</li>
										<li><a href="#" class="ripple-effect">3</a>
										</li>
										<li><a href="#" class="ripple-effect">4</a>
										</li>
										<li class="pagination-arrow"><a href="#" class="ripple-effect"><i class="icon-material-outline-keyboard-arrow-right"></i></a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div> */}
					<div class="dashboard-footer-spacer"></div>
					<div class="small-footer margin-top-15">
						<div class="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
						<ul class="footer-social-links">
							<li>
								<a href="#" title="Facebook" data-tippy-placement="top">	<i class="icon-brand-facebook-f"></i>
								</a>
							</li>
							<li>
								<a href="#" title="Twitter" data-tippy-placement="top">	<i class="icon-brand-twitter"></i>
								</a>
							</li>
							<li>
								<a href="#" title="Google Plus" data-tippy-placement="top">	<i class="icon-brand-google-plus-g"></i>
								</a>
							</li>
							<li>
								<a href="#" title="LinkedIn" data-tippy-placement="top">	<i class="icon-brand-linkedin-in"></i>
								</a>
							</li>
						</ul>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
  <div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs" style={{maxWidth: '650px'}}>
		<div class="sign-in-form">
			<ul class="popup-tabs-nav"></ul>
			<div class="popup-tabs-container">
				<div class="popup-tab-content" id="tab1">
					<div class="welcome-text">
						<h3>Service Title(sub-category)</h3>
					</div>
					<div class="data-box">
						<ul class="detailsul">
							<li>	<strong>Order ID </strong>1568</li>
							<li>	<strong>Cost </strong>$150</li>
							<li>	<strong>Address </strong>10 Browning Street, LA, USA</li>
							<li>	<strong>Rating </strong> <div class="star-rating" data-rating="5.0"></div></li>
							<li>	<strong>Review </strong> This is a review...limit is 150 words.</li>
						</ul>
					</div>
					<a href="#small-dialog" class="popup-with-zoom-anim"> <button class="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style= {{display: 'inline-block;margin: 20px 10px 0px'}}>Re-Book This Service <i class="icon-material-outline-arrow-right-alt"></i>
					</button></a>
				</div>
			</div>
		</div>
	</div>
		<div id="small-dialog" class="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div class="sign-in-form">
			<ul class="popup-tabs-nav">
				<li><a href="#tab">Book Vendor</a>
				</li>
			</ul>
			<div class="popup-tabs-container">
				<div class="popup-tab-content" id="tab">
					<div class="welcome-text">
						<h3>Request your service with Deluxe</h3>
					</div>
					<form method="post">
						<div class="input-with-icon-left col-md-6">	<i class="icon-material-outline-watch"></i>
							<input type="text" class="input-text with-border" name="name" id="name" placeholder="Select Time" />
						</div>
						<div class="input-with-icon-left col-md-6">	<i class="icon-material-outline-date-range"></i>
							<input type="text" class="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Date" />
						</div>
						<div class="input-with-icon-left">	<i class="icon-line-awesome-map-marker"></i>
							<input type="text" class="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Where Do you Want this Service?" />
						</div>
						<textarea name="textarea" cols="10" placeholder="Service Description (if any)" class="with-border"></textarea>
						<div class="uploadButton margin-top-25">
							<input class="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
							<label class="uploadButton-button ripple-effect" for="upload">Add Attachments</label>	<span class="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br/> Max. files size: 50 MB.</span>
						</div>
					</form>
					<a href="#small-dialog-3" class="popup-with-zoom-anim" ><button class="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit">Request Service <i class="icon-material-outline-arrow-right-alt"></i> 
					</button></a>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-3" class="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div class="sign-in-form">
			<ul class="popup-tabs-nav"></ul>
			<div class="popup-tabs-container">
				<div class="popup-tab-content" id="tab2">
        <div className="order-confirmation-page" style={{paddingBottom: 0}}>
      </div>
						<div class="breathing-icon"><i class="icon-feather-check"></i>
						</div>
						<h3 class="margin-top-30">Service Placed</h3>
						<p>We will notify you once the vendor replies!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
  
    );
  }
}
