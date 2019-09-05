import React, { Component } from 'react'
import VenSidebar from "../../common/ven-sidebar";
import Header from "../../common/header";


export default class Ven_addservice extends Component {
    render() {
        return (
            <React.Fragment>
            
            <Header />
		<div class="clearfix"></div>
		<div class="dashboard-container">
			<div class="dashboard-sidebar">
			<VenSidebar />
			</div>
			<div class="dashboard-content-container" data-simplebar>
				<div class="dashboard-content-inner">
					<div class="dashboard-headline">
						<h3>Post a Task</h3>
						<nav id="breadcrumbs" class="dark">
							<ul>
								<li><a href="#">Home</a>
								</li>
								<li><a href="#">Dashboard</a>
								</li>
								<li>Post a Task</li>
							</ul>
						</nav>
					</div>
					<div class="row">
						<div class="col-xl-12">
							<div class="dashboard-box margin-top-0">
								<div class="headline">
									<h3><i class="icon-feather-folder-plus"></i> Add Job</h3>
								</div>
								<div class="content with-padding padding-bottom-10">
									<div class="row">
										<div class="col-xl-6">
											<div class="submit-field">
												<h5>Job Name</h5>
												<select class="selectpicker">
													<optgroup label="Main Service">
														<option>Sub service</option>
														<option>sub service</option>
														<option>sub service</option>
													</optgroup>
													<optgroup label="Main Service">
														<option>Sub service</option>
														<option>sub service</option>
														<option>sub service</option>
													</optgroup>
												</select>
											</div>
										</div>
										<div class="col-xl-6 col-sm-6">
											<div class="submit-field">
												<h5>Price</h5>
												<div class="row">
													<div class="col-xl-12">
														<div class="input-with-icon">
															<input id="perhour" class="with-border" type="text" placeholder="Total Cost" />	<i class="currency">USD</i>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xl-4 col-sm-6">
											<div class="submit-field">
												<h5>Total Working Hours</h5>
												<div class="row">
													<div class="col-xl-12">
														<div class="input-with-icon">
															<input id="perhour" class="with-border" type="text" placeholder="e.g. 72" />	<i class="currency">HOURS</i>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xl-4 col-sm-6">
											<div class="submit-field">
												<h5>Per Day Working Hours</h5>
												<div class="row">
													<div class="col-xl-12">
														<div class="input-with-icon">
															<input id="perhour" class="with-border" type="text" placeholder="e.g. 8" />	<i class="currency">HOURS</i>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xl-4 col-sm-6">
											<div class="submit-field">
												<h5>Total Workers</h5>
												<div class="row">
													<div class="col-xl-12">
														<div class="input-with-icon">
															<input id="perhour" class="with-border" type="text" placeholder="e.g. 4" />	<i class="currency">PEOPLE</i>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xl-12">
											<div class="submit-field">
												<h5>Short Description (150 words)</h5>
												<textarea cols="30" rows="5" class="with-border"></textarea>
												<div class="uploadButton margin-top-30">
													
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-12">	<a href="#" class="button ripple-effect big margin-top-30"><i class="icon-feather-plus"></i> Add Job</a>
						</div>
					</div>
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
           

            </React.Fragment>
        )
    }
}
