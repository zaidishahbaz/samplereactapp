import React, { Component } from 'react'
import Header from "../../common/header";
import Sidebar from '../../common/sidebar';
import {Modal} from 'antd';
import ApiCall from '../../utils/apiCall';
import {Link} from 'react-router-dom';

export default class UserDashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
            data: [],
            fname: '',
            lname: '',
            phone: '',
            email: '',
            vendor_image: '',
		}
    }
    
  componentWillMount()
  {
    let user=JSON.parse(localStorage.getItem('user'));
    let {fname,lname,phone,email,vendor_image}=this.state;

    fname=user.name.split(" ")[0];
    lname=user.name.split(" ")[1];
    phone=user.mobile_no;
    email=user.email;
    vendor_image=user.vendor_image
    this.setState({fname,lname,phone,email,vendor_image})
  }
  render()
  {  
      return(
          <div>
            <Header/>
            <div id="wrapper">
                <div className="clearfix"></div>
                <div className="full-page-container">
                    <div classNameName="dashboard-sidebar-inner" data-simplebar style={{flex: '0 0 280px'}}>
                        <Sidebar/>
			        </div>
                    <div className="full-page-content-container" data-simplebar>
                        <div className="dashboard-content-inner">
                            <div className="dashboard-headline">
                                <h3>Shortlist</h3>
                                <nav id="breadcrumbs" className="dark">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Dashboard</a></li>
                                </ul>
                                </nav>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="dashboard-box margin-top-0">
                                        <div className="headline">
                                            <h3><i className="icon-material-outline-account-circle" /> My Account</h3>
                                        </div>
                                        <div className="content with-padding padding-bottom-0">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                                        <img className="profile-pic" src={this.state.vendor_image!=''?this.state.vendor_image:"images/user-avatar-placeholder.png"} alt />
                                                        <div className="upload-button" />
                                                        <input className="file-upload" type="file" accept="image/*" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <div className="submit-field">
                                                                <h5>First Name</h5>
                                                                <input type="text" className="with-border" placeholder="Tom" defaultValue={this.state.fname} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="submit-field">
                                                            <h5>Last Name</h5>
                                                            <input type="text" className="with-border" placeholder="Smith" defaultValue={this.state.lname} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Phone</h5>
                                                            <input type="tel" className="with-border" defaultValue={this.state.phone} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Email</h5>
                                                            <input type="text" className="with-border" defaultValue={this.state.email} disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">	<Link to="/settings" className="button ripple-effect big margin-top-30">Edit Details</Link></div></div>
                            <div className="dashboard-footer-spacer" />
                                <div className="small-footer margin-top-15">
                                    <div className="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
                                        <ul className="footer-social-links">
                                            <li>
                                                <a href="#" title="Facebook" data-tippy-placement="top">	<i className="icon-brand-facebook-f" /></a>
                                            </li>
                                            <li>
                                                <a href="#" title="Twitter" data-tippy-placement="top">	<i className="icon-brand-twitter" /></a>
                                            </li>
                                            <li>
                                                <a href="#" title="Google Plus" data-tippy-placement="top">	<i className="icon-brand-google-plus-g" /></a>
                                            </li>
                                            <li>
                                                <a href="#" title="LinkedIn" data-tippy-placement="top">	<i className="icon-brand-linkedin-in" /></a>
                                            </li>
                                        </ul>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      )
  }
}