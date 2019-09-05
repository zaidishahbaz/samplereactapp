import React, { Component } from "react";
import VenSidebar from "../../common/ven-sidebar"
import Header from "../../common/header";
import ApiCall from '../../utils/apiCall';

export default class Ven_completed extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			data: []
		}
	}
	componentWillMount()
	{
		let token=localStorage.getItem('token')
		let userid=JSON.parse(localStorage.getItem('user'))._id
		ApiCall.get('/completedvendorservice/'+userid,token).then((res)=>{
			this.setState({data:res.data.result})
		})
	}
    render() {
		console.log(this.state.data)
        return (
			<div>
			<div id="wrapper">
			  <Header />
			  <div className="clearfix" />
			  <div className="dashboard-container">
				<div className="dashboard-sidebar">	
					 <VenSidebar />
				</div>
				<div className="dashboard-content-container" data-simplebar>
				  <div className="dashboard-content-inner">
					<div className="dashboard-headline">
					  <h3>Completed Services</h3>
					  <nav id="breadcrumbs" className="dark">
						<ul>
						  <li><a href="#">Home</a>
						  </li>
						  <li><a href="#">Dashboard</a>
						  </li>
						  <li>Completed Services</li>
						</ul>
					  </nav>
					</div>
					<div className="row">
					  <div className="col-xl-12">
						<div className="dashboard-box margin-top-0">
						  <div className="content">
							<div className="freelancers-container freelancers-list-layout compact-list margin-top-0" style={{boxShadow: 'none'}}>
							{this.state.data!=undefined?this.state.data.map((item)=>{
								return <div className="freelancer">
								<div className="freelancer-overview">
								  <div className="freelancer-overview-inner">	<span className="bookmark-icon" />
										<div className="freelancer-avatar">
										  <a href="javascript:void(0);">
												<img src={item.username[0].vendor_image} alt />
										  </a>
										</div>
										<div className="freelancer-name">
										  <h4><a href="#">{item.servicename[0].name}</a></h4>
										  <span>{item.username[0].name}</span>
										</div>
										<div className="freelancer-rating">
										  <span>You were rated</span>
										  <div className="star-rating" data-rating={item.review[0].rating!=undefined?item.review[0].rating:"0"} />
										</div>
								  </div>
								</div>
								<div className="freelancer-details">
								  <div className="freelancer-details-list">
										<ul>
										  <li>
												<a href="javascript:void(0);" className="popup-with-zoom-anim button button-sliding-icon ripple-effect">View Details <i className="icon-material-outline-arrow-right-alt" /></a>
										  </li>
										</ul>
								  </div>	
								</div>
						  </div>
							}):null}
							</div>
						  </div>
						</div>
					  </div>
					</div>
					<div className="dashboard-footer-spacer" />
					<div className="small-footer margin-top-15">
					  <div className="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
					  <ul className="footer-social-links">
						<li>
						  <a href="#" title="Facebook" data-tippy-placement="top">	<i className="icon-brand-facebook-f" />
						  </a>
						</li>
						<li>
						  <a href="#" title="Twitter" data-tippy-placement="top">	<i className="icon-brand-twitter" />
						  </a>
						</li>
						<li>
						  <a href="#" title="Google Plus" data-tippy-placement="top">	<i className="icon-brand-google-plus-g" />
						  </a>
						</li>
						<li>
						  <a href="#" title="LinkedIn" data-tippy-placement="top">	<i className="icon-brand-linkedin-in" />
						  </a>
						</li>
					  </ul>
					  <div className="clearfix" />
					</div>
				  </div>
				</div>
			  </div>
			</div>
			<div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs" style={{maxWidth: '650px'}}>
			  <div className="sign-in-form">
				<ul className="popup-tabs-nav" />
				<div className="popup-tabs-container">
				  <div className="popup-tab-content" id="tab1">
					<div className="welcome-text">
					  <h3>Washing Machine Cleaning</h3>
					</div>
					<div className="data-box">
					  <ul className="detailsul">
						<li>	<strong>Order ID </strong>1568</li>
						<li>	<strong>Cost </strong>$150</li>
						<li>	<strong>Address </strong>10 Browning Street, LA, USA</li>
						<li>	<strong>Your Rating </strong> <div className="star-rating" data-rating={5.0} /></li>
						<li>	<strong>Review </strong> lorem ipsum</li>
					  </ul>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		  
        )
    }
}
