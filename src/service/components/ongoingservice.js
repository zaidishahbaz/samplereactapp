import React, { Component } from 'react'
import Header from "../../common/header";
import Sidebar from '../../common/sidebar';
import {Modal} from 'antd';
import ApiCall from '../../utils/apiCall'

export default class Ongoingservice extends Component {
	constructor(props){
		super(props);
		this.state = {
			activeservice:{visibility:false,step:0},
			data: [],
			review: false
		}
	}

 onClose(){
	 this.setState({activeservice:{visibility:false}})
 }
  componentWillMount()
  {
	let token=localStorage.getItem('token');
    ApiCall.get('/service/ongoing/all',token).then(res=>{
		this.setState({data:res.data.result})
      console.log(this.state.data)
    })
  }

    render() {
        return (
            <div>
            <Header />
            <div id="wrapper">
		
		<div className="clearfix"></div>
		<div className="full-page-container">
        <div classNameName="dashboard-sidebar-inner" data-simplebar style={{flex: '0 0 280px'}}>
				<Sidebar/>
			</div>
			<div className="full-page-content-container" data-simplebar>
				<div className="dashboard-content-inner">
					<div className="dashboard-headline">
						<h3>Ongoing Services</h3>
						<nav id="breadcrumbs" className="dark">
							<ul>
								<li><a href="#">Home</a>
								</li>
								<li>Dashboard</li>
								<li>Ongoing Services</li>
							</ul>
						</nav>
					</div>
					<div className="row"></div>
					<div className="row">
						<div className="col-xl-12">
							<div className="dashboard-box margin-top-30">
								
								<div className="headline"><i className="icon-material-outline-business-center"></i> Ongoing Services</div>
								<div className="content">
									<ul className="dashboard-box-list">
										
											{this.state.data!=undefined?
												this.state.data.map((item)=>{ 
													return <li>
													<div className="job-listing">
													<div className="job-listing-details">
														<a href="#" className="job-listing-company-logo">
															<img src="images/company-logo-05.png" alt=""/>
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
											<div className="buttons-to-right"><a href="#small-dialog-1"
												onClick={()=>{
													this.setState({activeservice:Object.assign({},this.state.activeservice,{visibility:true})})
												}}
											 className="popup-with-zoom-anim button button-sliding-icon ripple-effect">View Details <i className="icon-material-outline-arrow-right-alt"></i>
											</a>
											</div>
											</li>
												})	
											:null}
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
	<Modal
        visible={this.state.activeservice.visibility}
        footer={null}
        onCancel={()=>this.onClose()}
        >
		{this.state.review?
			<div className="sign-in-form">
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Leave a Review</h3>
					</div>
					<form method="post" id="leave-review-form">
						<div className="feedback-yes-no">	<strong>Your Rating</strong>
							<div className="leave-rating">
								<input type="radio" name="rating" id="rating-radio-1" value="1" required/>
								<label for="rating-radio-1" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-2" value="2" required/>
								<label for="rating-radio-2" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-3" value="3" required/>
								<label for="rating-radio-3" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-4" value="4" required/>
								<label for="rating-radio-4" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-5" value="5" required/>
								<label for="rating-radio-5" className="icon-material-outline-star"></label>
							</div>
							<div className="clearfix"></div>
						</div>
						<textarea className="with-border" placeholder="Comment" name="message2" id="message2" cols="7" required></textarea>
					</form>
					<br/>
					<br/>
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form" onclick="location.href='payment.html'" >Leave a Review <i className="icon-material-outline-arrow-right-alt"></i>
					</button>
				</div>
			</div>
		</div>
	   :<div className="popup-tabs-container">
  			<div className="popup-tab-content" id="tab1">
    			<div className="welcome-text">
      				<h3>Washing Machine Cleaning</h3>
    			</div>
    			<div className="data-box">
      				<ul className="detailsul">
        				<li><strong>Order ID </strong>1568</li>
        				<li><strong>Cost </strong>$150</li>
        				<li><strong>Address </strong>10 Browning Street, LA, USA</li>
      				</ul>
    			</div>
    			{/* <a href="Javascript:void(0);">
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style={{width: '46%!important', display: 'inline-block', margin: '20px 10px 0px'}}>Chat<i className="icon-material-outline-arrow-right-alt" />
      				</button>
				</a> */}
    			<a href="Javascript:void(0);" className="popup-with-zoom-anim">
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style={{width: '46%!important', display: 'inline-block', margin: '20px 10px 0px'}} onClick={(e)=>{this.setState({review:true})}}>Finish Service <i className="icon-material-outline-arrow-right-alt" />
      				</button>
				</a>
  			</div>
		</div>}
      </Modal>


	  
{/* <div id="small-dialog-2" className="zoom-anim-dialog mfp-hide dialog-with-tabs"> */}
		{/* <div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab2">
					<div className="welcome-text">
						<h3>Leave a Review</h3>
						<span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span>
					</div>
					<form method="post" id="leave-review-form">
						<div className="feedback-yes-no">	<strong>Your Rating</strong>
							<div className="leave-rating">
								<input type="radio" name="rating" id="rating-radio-1" value="1" required/>
								<label for="rating-radio-1" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-2" value="2" required/>
								<label for="rating-radio-2" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-3" value="3" required/>
								<label for="rating-radio-3" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-4" value="4" required/>
								<label for="rating-radio-4" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-radio-5" value="5" required/>
								<label for="rating-radio-5" className="icon-material-outline-star"></label>
							</div>
							<div className="clearfix"></div>
						</div>
						<textarea className="with-border" placeholder="Comment" name="message2" id="message2" cols="7" required></textarea>
					</form>
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form" onclick="location.href='payment.html'" >Leave a Review <i className="icon-material-outline-arrow-right-alt"></i>
					</button>
				</div>
			</div>
		</div> */}
	{/* </div> */}
                </div>
            
        )
    }
}



// -----------------------------------MODAL DATA---------------------------------------------
{
/* 
<div id="small-dialog-1" class="zoom-anim-dialog mfp-hide dialog-with-tabs" style="max-width: 650px;">
<div class="sign-in-form">
	<ul class="popup-tabs-nav"></ul>
	<div class="popup-tabs-container">
		<div class="popup-tab-content" id="tab1">
			<div class="welcome-text">
				<h3>Washing Machine Cleaning</h3>
			</div>
			<div class="data-box">
				<ul class="detailsul">
					<li>	<strong>Order ID </strong>1568</li>
					<li>	<strong>Cost </strong>$150</li>
					<li>	<strong>Address </strong>10 Browning Street, LA, USA</li>
				</ul>
			</div>
			<a href="uongoingsms.html"><button class="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style="width: 46%!important;display: inline-block;margin: 20px 10px 0px;">Chat<i class="icon-material-outline-arrow-right-alt"></i>
			</button></a>
			<a href="#small-dialog-2" class="popup-with-zoom-anim"> <button class="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form" style="width: 46%!important;display: inline-block;margin: 20px 10px 0px;">Finish Service <i class="icon-material-outline-arrow-right-alt"></i>
			</button></a>
		</div>
	</div>
</div>
</div> */}