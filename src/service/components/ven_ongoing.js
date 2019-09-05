import React, { Component } from 'react';
import Header from "../../common/header";
import VenSidebar from "../../common/ven-sidebar";
import ApiCall from '../../utils/apiCall'

export default class Venongoing extends Component {
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
		ApiCall.get('/ongoingvendorservice/'+userid,token).then((res)=>{
			this.setState({data:res.data.result})
		})
	}
    render() {
        return (
            <React.Fragment>
  <div id="wrapper">
    <Header />
    <div className="clearfix" />
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner" data-simplebar>
          <div className="dashboard-nav-container">
            <a href="#" className="dashboard-responsive-nav-trigger">	<span className="hamburger hamburger--collapse">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>	<span className="trigger-title">Dashboard Navigation</span>
            </a>
            <div className="dashboard-nav">
              <VenSidebar />
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner">
          <div className="dashboard-headline">
            <h3>Ongoing Services</h3>
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a>
                </li>
                <li><a href="#">Dashboard</a>
                </li>
                <li>Ongoing Services</li>
              </ul>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                {/* <div class="headline" style="    text-align: -webkit-right;">
									<div class="col-md-4">
											<div class="submit-field" style="margin-bottom: 0px;">
												<input type="text" class="with-border" placeholder="Search" style="margin-bottom: 0px;">
											</div>
										</div>
								</div> */}
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
										  <h4><a href="#">{item.servicename[0]!=undefined?item.servicename[0].name:null}</a></h4>
										  <span>{item.username[0].name}</span>
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
  {/* <div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs" style={{maxWidth: '650px'}}>
    <div className="sign-in-form">
      <ul className="popup-tabs-nav" />
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="tab1">
          <div className="welcome-text">
            <h3>Washing Machine Cleaning</h3>
          </div>
          <div className="data-box" style={{padding: '0 15px'}}>
            <ul className="detailsul">
              <li>	<strong>Order ID </strong>1568</li>
              <li>	<strong>Cost </strong>$150</li>
              <li>	<strong>Address </strong>10 Browning Street, LA, USA</li>
            </ul>
          </div>
          <hr />
          <div className="col-auto">
            <span style={{margin: '10px 0', display: 'block'}}> <strong>Before Service Photos</strong></span>
            <div className="avatar-wrapper" data-tippy-placement="bottom">
              <img className="profile-pic" src="images/user-avatar-placeholder.png" alt />
              <div className="upload-button" />
              <input className="file-upload" type="file" accept="image/*" />
            </div>
          </div>
          <a href="uongoingsms.html"><button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style={{width: '46%!important', display: 'inline-block', margin: '20px 10px 0px'}}>Chat<i className="icon-material-outline-arrow-right-alt" />
            </button></a>
          <a href="#small-dialog-2" className="popup-with-zoom-anim"> <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style={{width: '46%!important', display: 'inline-block', margin: '20px 10px 0px'}}>Finish Service <i className="icon-material-outline-arrow-right-alt" />
            </button></a>
        </div>
      </div>
    </div>
  </div>
  <div id="small-dialog-2" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
    <div className="sign-in-form">
      <ul className="popup-tabs-nav" />
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="tab2">
          <div className="welcome-text">
            <h3>Leave a Review</h3>
            <span>Rate <a href="#">Peter Valentín</a> </span>
          </div>
          <form method="post" id="leave-review-form">
            <div className="feedback-yes-no">	<strong>Your Rating</strong>
              <div className="leave-rating">
                <input type="radio" name="rating" id="rating-radio-1" defaultValue={1} required />
                <label htmlFor="rating-radio-1" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-radio-2" defaultValue={2} required />
                <label htmlFor="rating-radio-2" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-radio-3" defaultValue={3} required />
                <label htmlFor="rating-radio-3" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-radio-4" defaultValue={4} required />
                <label htmlFor="rating-radio-4" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-radio-5" defaultValue={5} required />
                <label htmlFor="rating-radio-5" className="icon-material-outline-star" />
              </div>
              <div className="clearfix" />
            </div>
            <textarea className="with-border" placeholder="Comment" name="message2" id="message2" cols={7} required defaultValue={""} />
          </form>
          <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form">Leave a Review <i className="icon-material-outline-arrow-right-alt" />
          </button>
        </div>
      </div>
    </div>
  </div> */}



            </React.Fragment>
        )
    }
}
