import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			dropdown:false
		}
	}
	
    render() {
        return (
            <div>
                <div className="clearfix"></div>
		<div className="full-page-container">
			<div className="dashboard-sidebar-inner" data-simplebar style={{flex : " 0 0 280px"}}>
				<div className="dashboard-nav-container">
					<a href="#" className="dashboard-responsive-nav-trigger">	<span className="hamburger hamburger--collapse">
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
						</span>	<span className="trigger-title">Dashboard Navigation</span>
					</a>
					<div className="dashboard-nav">
						<div className="dashboard-nav-inner">
							<ul data-submenu-title="Start">
								<li><Link to="/dashboard"><i className="icon-material-outline-dashboard"></i> Dashboard</Link>
								</li>
								{/* <li><a href="#"><i className="icon-material-outline-business-center"></i> Messages</a>
									<ul>
										<li><a href="uongoingsms.html">Ongoing Services <span className="nav-tag">3</span></a>
										</li>
										<li><a href="ucompletedsms.html">Completed Services</a>
										</li>
										<li><a href="ubids.html">Bids</a>
										</li>
									</ul>
								</li> */}
							</ul>
							<ul data-submenu-title="Organize and Manage">
								<li onClick={(e)=>{this.setState(prevState => ({dropdown: !prevState.dropdown}));}} className={this.state.dropdown?"active-submenu":""}><a className={this.state.dropdown?"active-submenu":""}><i className="icon-material-outline-business-center"></i> Services</a>
									<ul>
										<li><Link to="/ongoingservice">Ongoing Services {/*<span className="nav-tag">3</span>*/}</Link>
										</li>
										<li><Link to="/completedservice">Completed Services</Link>
										</li>
										
										<li><Link to="/cancelledservice">Cancelled Services</Link>
										</li>
									</ul>
								</li>
								<li><Link to="/shortlist"><i className="icon-material-outline-rate-review"></i> Shortlist</Link></li>
							</ul>
							<ul data-submenu-title="Account">
								<li /*className="active"*/><Link to="/settings"><i className="icon-material-outline-settings"></i> Settings</Link>
								</li>
								<li><a href="javascript:void(0)" onClick={()=>{ 
									localStorage.removeItem('token')
									localStorage.removeItem('user');
									localStorage.removeItem('userID')
									setTimeout(function(){
										window.location.href="/"
									},900);
								}}><i className="icon-material-outline-power-settings-new"></i> Logout</a>
								</li>
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