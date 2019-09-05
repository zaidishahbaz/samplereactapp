import React, { Component } from 'react';
import Sidebar from "../../common/sidebar";
import Header from "../../common/header";


export default class Reviews extends Component {
    render() {
        
        return (
            <React.Fragment>
            <div>
                <Header />
                <div className="clearfix"></div>
		<div className="full-page-container">
        <div classNameName="dashboard-sidebar-inner" data-simplebar style={{flex: '0 0 280px'}}>
				<div className="dashboard-nav-container">
					
					<div className="dashboard-nav">
						<Sidebar />
					</div>
				</div>
			</div>
			<div className="full-page-content-container" data-simplebar>
				<div className="dashboard-content-inner">
					<div className="dashboard-headline">
						<h3>Reviews and Ratings</h3>
						<nav id="breadcrumbs" className="dark">
							<ul>
								<li><a href="#">Home</a>
								</li>
								<li>Dashboard</li>
								<li>Reviews and Ratings</li>
							</ul>
						</nav>
					</div>
					<div className="row">
						<div className="col-xl-12">
							<div className="dashboard-box margin-top-0">
								<div className="headline">
									<h3><i className="icon-material-outline-face"></i> Your Ratings</h3>
								</div>
								<div className="content">
									<ul className="dashboard-box-list">
										<li>
											<div className="boxed-list-item">
												<div className="item-content">
													<h4>Sofa Cleaning</h4>
													<span className="company-not-rated margin-bottom-5">Not Rated</span>
												</div>
											</div>	<a href="#small-dialog-2" className="popup-with-zoom-anim button ripple-effect margin-top-5 margin-bottom-10"><i className="icon-material-outline-thumb-up"></i> Leave a Review</a>
										</li>
										<li>
											<div className="boxed-list-item">
												<div className="item-content">
													<h4>Kitchen Cleaning</h4>
													<div className="item-details margin-top-10">
														<div className="star-rating" data-rating="3.5"></div>
														<div className="detail-item"><i className="icon-material-outline-date-range"></i> August 2018</div>
													</div>
													<div className="item-description">
														<p>Excellent Vendor</p>
													</div>
												</div>
											</div>	<a href="#small-dialog-1" className="popup-with-zoom-anim button gray ripple-effect margin-top-5 margin-bottom-10"><i className="icon-feather-edit"></i> Edit Review</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
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
	<div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
		<div className="sign-in-form">
			<ul className="popup-tabs-nav"></ul>
			<div className="popup-tabs-container">
				<div className="popup-tab-content" id="tab1">
					<div className="welcome-text">
						<h3>Change Review</h3>
						<span>Rate <a href="#">Herman Ewout</a> for the project <a href="#">WordPress Theme Installation</a> </span>
					</div>
					<form method="post" id="change-review-form">
						<div className="feedback-yes-no">	<strong>Was this delivered on budget?</strong>
							<div className="radio">
								<input id="radio-rating-1" name="radio" type="radio" checked/>
								<label for="radio-rating-1"><span className="radio-label"></span> Yes</label>
							</div>
							<div className="radio">
								<input id="radio-rating-2" name="radio" type="radio"/>
								<label for="radio-rating-2"><span className="radio-label"></span> No</label>
							</div>
						</div>
						<div className="feedback-yes-no">	<strong>Was this delivered on time?</strong>
							<div className="radio">
								<input id="radio-rating-3" name="radio2" type="radio" checked/>
								<label for="radio-rating-3"><span className="radio-label"></span> Yes</label>
							</div>
							<div className="radio">
								<input id="radio-rating-4" name="radio2" type="radio"/>
								<label for="radio-rating-4"><span className="radio-label"></span> No</label>
							</div>
						</div>
						<div className="feedback-yes-no">	<strong>Your Rating</strong>
							<div className="leave-rating">
								<input type="radio" name="rating" id="rating-1" value="1" checked/>
								<label for="rating-1" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-2" value="2" />
								<label for="rating-2" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-3" value="3" />
								<label for="rating-3" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-4" value="4" />
								<label for="rating-4" className="icon-material-outline-star"></label>
								<input type="radio" name="rating" id="rating-5" value="5" />
								<label for="rating-5" className="icon-material-outline-star"></label>
							</div>
							<div className="clearfix"></div>
						</div>
						<textarea className="with-border" placeholder="Comment" name="message" id="message" cols="7" required>Excellent vendor</textarea>
					</form>
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form">Save Changes <i className="icon-material-outline-arrow-right-alt"></i>
					</button>
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
						<h3>Leave a Review</h3>
						<span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span>
					</div>
					<form method="post" id="leave-review-form">
						<div className="feedback-yes-no">	<strong>Was this delivered on time?</strong>
							<div className="radio">
								<input id="radio-3" name="radio2" type="radio" required/>
								<label for="radio-3"><span className="radio-label"></span> Yes</label>
							</div>
							<div className="radio">
								<input id="radio-4" name="radio2" type="radio" required/>
								<label for="radio-4"><span className="radio-label"></span> No</label>
							</div>
						</div>
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
					<button className="button full-width button-sliding-icon ripple-effect" type="submit" form="leave-review-form">Leave a Review <i className="icon-material-outline-arrow-right-alt"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
    </React.Fragment>
        )
    }
}
