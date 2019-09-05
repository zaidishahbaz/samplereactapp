import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import ApiCall from '../utils/apiCall';

export default class Header extends Component {
    constructor(props){
		super(props);
		
        this.state={
            isLogged:true,
			info:{},
			userClick: false,
			notifications: [],
			notificationClick: false,
        }
    }

    componentWillMount(){
        if(localStorage.getItem('token')!==null){
			let  token=localStorage.getItem('token')
			this.setState({isLogged:true,info:jwt.decode(localStorage.getItem('token'),'horsetask'),})
			ApiCall.get('/viewnotification/'+JSON.parse(localStorage.getItem('user'))._id,token).then(res=>{
				this.setState({notifications: res.data.result})
				console.log(res.data)
			})
        }
        else{
            this.setState({isLogged:false})
		}
		
        //console.log(jwt.decode(localStorage.getItem('token'),'horsetask'))
    }

    logOut(){
		localStorage.removeItem('token')
		localStorage.removeItem('user');
        localStorage.removeItem('userID')
        setTimeout(function(){
            window.location.href="/"
        },900);
    }

  render() {
	let user=JSON.parse(localStorage.getItem('user'));
    return (
        <header id="header-container" className="fullwidth transparent">
        <div id="header">
            <div className="container">
                <div className="left-side">
                    <div id="logo">
                        <a href="/">
                            <img src="/myimg/logo.png" alt="" />
                        </a>
                    </div>
                    <nav id="navigation">
                        <ul id="responsive">
                            
                            <li><Link to="/vendor_signup">Become A Professinal</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                </div>
                <div className="right-side">
                    {this.state.isLogged?
                    <React.Fragment>
                    {/* <!--  User Notifications --> */}
						<div class="header-widget hide-on-mobile">
							{/* <!-- Notifications --> */}
							<div className={this.state.notificationClick?"header-notifications active":"header-notifications"}>
								{/* <!-- Trigger --> */}
								<div class="header-notifications-trigger">	<a href="javascript:void(0);" onClick={(e)=>{this.setState(prevState => ({notificationClick: !prevState.notificationClick}))}}><i class="icon-feather-bell"></i><span>{this.state.notifications!=undefined?this.state.notifications.length:null}</span></a>
								</div>
								{/* <!-- Dropdown --> */}
								<div class="header-notifications-dropdown">
									<div class="header-notifications-headline">
										<h4>Notifications</h4>
										<button class="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left" onClick={(e)=>{this.setState({notifications:[]})}}>	<i class="icon-feather-check-square"></i>
										</button>
									</div>
									<div class="header-notifications-content">
										<div class="header-notifications-scroll" data-simplebar>
											<ul>
												{this.state.notifications!=undefined?this.state.notifications.map(item=>{
												return <li class="notifications-not-read">
															<a href="javascript:void(0);">
																<span class="notification-icon">
																	<i class="icon-material-outline-group"></i>
																</span>
																<span class="notification-text">
																	{item.msg}
																</span>
													</a>
														</li>
												}):null}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!--  User Notifications / End --> */}
						{/* <!-- User Menu --> */}
						<div class="header-widget">
							{/* <!-- Messages --> */}
							<div onClick={(e)=>{this.setState(prevState => ({userClick: !prevState.userClick}))}} class={this.state.userClick?"header-notifications user-menu active":"header-notifications user-menu"}>
								<div class="header-notifications-trigger">
									<a href="javascript:void(0);">
										<div class="user-avatar status-online">
											<img src={JSON.parse(localStorage.getItem('user'))!==null?JSON.parse(localStorage.getItem('user')).vendor_image:'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'} alt="user_img" />
										</div>
									</a>
								</div>
								{/* <!-- Dropdown --> */}
								<div class="header-notifications-dropdown">
									{/* <!-- User Status --> */}
									<div class="user-status">
										{/* <!-- User Name / Avatar --> */}
										<div class="user-details">
											<div class="user-avatar status-online">
												<img src={JSON.parse(localStorage.getItem('user'))!==null?JSON.parse(localStorage.getItem('user')).vendor_image:'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png'} alt="user_img" />
											</div>
											<div class="user-name">{this.state.info?this.state.info.name:null}<span></span>
											</div>
										</div>
									</div>
									<ul class="user-menu-small-nav">
										<li><Link to={user.userType==="vendor"?"/vendor/dashboard":"/dashboard"}><i class="icon-material-outline-dashboard"></i> Dashboard</Link>
										</li>
										<li><Link to="/settings"><i class="icon-material-outline-settings"></i> Settings</Link>
										</li>
										<li><a href="" onClick={(e)=>{e.preventDefault();this.logOut()}}><i class="icon-material-outline-power-settings-new"></i> Logout</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						{/* <!-- User Menu / End -->
						<!-- Mobile Navigation Button -->	 */}
                        <span class="mmenu-trigger">
										<button class="hamburger hamburger--collapse" type="button">
											<span class="hamburger-box">
												<span class="hamburger-inner"></span>
						</span>
						</button>
						</span>
                    </React.Fragment>
                    :<React.Fragment><div className="header-widget" style={{cursor:'pointer !important'}}><a onClick={()=>{this.props.openModal()}} className="popup-with-zoom-anim log-in-button"><i className="icon-feather-log-in"></i> <span>Log In / Register</span></a>
                    </div>	<span className="mmenu-trigger">
                    <button className="hamburger hamburger--collapse" type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </button>
                    </span>
                    </React.Fragment>
                    }
                </div>
            </div>
        </div>
    </header>
    )
  }
}
