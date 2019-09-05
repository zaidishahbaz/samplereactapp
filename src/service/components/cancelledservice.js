import React, { Component } from "react";
import Header from "../../common/header";
import Sidebar from "../../common/sidebar";
import ApiCall from '../../utils/apiCall';

export default class Cancelledservice extends Component {
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
		<React.Fragment>
      <div>
        <Header />
        <div id="wrapper">
		<div className="clearfix"></div>
		<div className="full-page-container">
    <div className="dashboard-sidebar-inner" data-simplebar style={{flex: '0 0 280px'}}>
      <Sidebar />
			</div>
			<div className="full-page-content-container" data-simplebar>
				<div className="dashboard-content-inner">
					<div className="dashboard-headline">
						<h3>Cancelled Services</h3>
						<nav id="breadcrumbs" className="dark">
							<ul>
								<li><a href="#">Home</a>
								</li>
								<li>Dashboard</li>
								<li>Cancelled Services</li>
							</ul>
						</nav>
					</div>
					<div className="row"></div>
					<div className="row">
						<div className="col-xl-12">
							<div className="dashboard-box margin-top-30">
	
								<div className="headline"><i className="icon-material-outline-business-center"></i> Cancelled Services</div>
								<div className="content">
									<ul className="dashboard-box-list">
									{this.state.data!=undefined?this.state.data.map((item)=>{
										return <li>
											<div className="job-listing">
												<div className="job-listing-details">
													<a href="#" className="job-listing-company-logo">
														<img src="images/company-logo-05.png" alt="" />
													</a>
													<div className="job-listing-description">
														<h3 className="job-listing-title"><a href="#">{item.servicename[0]!=undefined?item.servicename[0].name:null}</a></h3>
														<div className="job-listing-footer">
															<ul>
																<li><i className="icon-material-outline-business"></i>{item.servicename[0]!=undefined?item.servicename[0].category:null}</li>
																
															</ul>
														</div>
													</div>
												</div>
											</div>
											<div className="buttons-to-right"><a href="javascript:void(0);" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">View Details <i className="icon-material-outline-arrow-right-alt"></i></a>
												 
											</div>
										</li>}):null}
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="row">
						<div className="col-md-12">
						
							<div className="pagination-container margin-top-40 margin-bottom-60">
								<nav className="pagination">
									<ul>
										<li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a>
										</li>
										<li><a href="#" className="ripple-effect">1</a>
										</li>
										<li><a href="#" className="current-page ripple-effect">2</a>
										</li>
										<li><a href="#" className="ripple-effect">3</a>
										</li>
										<li><a href="#" className="ripple-effect">4</a>
										</li>
										<li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div> */}
					<div className="dashboard-footer-spacer"></div>
					<div className="small-footer margin-top-15">
						<div className="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
						<ul className="footer-social-links">
							<li>
								<a href="#" title="Facebook" data-tippy-placement="top">	<i className="icon-brand-facebook-f"></i>
								</a>
							</li>
							<li>
								<a href="#" title="Twitter" data-tippy-placement="top">	<i className="icon-brand-twitter"></i>
								</a>
							</li>
							<li>
								<a href="#" title="Google Plus" data-tippy-placement="top">	<i className="icon-brand-google-plus-g"></i>
								</a>
							</li>
							<li>
								<a href="#" title="LinkedIn" data-tippy-placement="top">	<i className="icon-brand-linkedin-in"></i>
								</a>
							</li>
						</ul>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
  <div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs" style={{maxWidth: '650px'}}>
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab1">
					<div className="welcome-text">
						<h3>Service Title(sub-category)</h3>
					</div>
					<div className="data-box">
						<ul className="detailsul">
							<li>	<strong>Order ID </strong>1568</li>
							<li>	<strong>Cost </strong>$150</li>
							<li>	<strong>Address </strong>10 Browning Street, LA, USA</li>
							<li>	<strong>Rating </strong> <div className="star-rating" data-rating="5.0"></div></li>
							<li>	<strong>Review </strong> This is a review...limit is 150 words.</li>
						</ul>
					</div>
					<a href="#small-dialog" className="popup-with-zoom-anim"> <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style= {{display: 'inline-block;margin: 20px 10px 0px'}}>Re-Book This Service <i className="icon-material-outline-arrow-right-alt"></i>
					</button></a>
				</div>
			</div>
		</div>
	</div>
		<div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav">
				<li><a href="#tab">Book Vendor</a>
				</li>
			</ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab">
					<div className="welcome-text">
						<h3>Request your service with Deluxe</h3>
					</div>
					<form method="post">
						<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-watch"></i>
							<input type="text" className="input-text with-border" name="name" id="name" placeholder="Select Time" />
						</div>
						<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-date-range"></i>
							<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Date" />
						</div>
						<div className="input-with-icon-left">	<i className="icon-line-awesome-map-marker"></i>
							<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Where Do you Want this Service?" />
						</div>
						<textarea name="textarea" cols="10" placeholder="Service Description (if any)" className="with-border"></textarea>
						<div className="uploadButton margin-top-25">
							<input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
							<label className="uploadButton-button ripple-effect" for="upload">Add Attachments</label>	<span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br/> Max. files size: 50 MB.</span>
						</div>
					</form>
					<a href="#small-dialog-3" className="popup-with-zoom-anim" ><button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit">Request Service <i className="icon-material-outline-arrow-right-alt"></i> 
					</button></a>
				</div>
			</div>
		</div>
	</div>
	<div id="small-dialog-3" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
        <div className="order-confirmation-page" style={{paddingBottom: 0}}>
      </div>
						<div className="breathing-icon"><i className="icon-feather-check"></i>
						</div>
						<h3 className="margin-top-30">Service Placed</h3>
						<p>We will notify you once the vendor replies!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	</React.Fragment>
    );
  }
}
