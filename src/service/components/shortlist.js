import React, { Component } from 'react'
import Header from "../../common/header";
import Sidebar from '../../common/sidebar';
import {Modal} from 'antd';
import ApiCall from '../../utils/apiCall';
import {message} from 'antd';

export default class Shortlist extends Component {
	constructor(props){
		super(props);
		this.state = {
            data: [],
            visible:false
        }
        this.updateShortlist=this.updateShortlist.bind(this)
    }
  removeShortlist(vendorId)
  {
      let token=localStorage.getItem('token')
      console.log(vendorId)
      ApiCall.post("/shortlist/vendor",{vendorid:vendorId},token).then(res=>{
        if(res.data.status)
        {
            this.updateShortlist();
            
        }
        else
        {
            message.error(res.data.message,1);
        }
    })
  }
  updateShortlist()
  {
    let token=localStorage.getItem('token')
    ApiCall.get('/shortlist',token).then((res)=>{
        this.setState({data:res.data.result[0].shortlistedvendors})
        
    })
  }
  componentWillMount()
  {
    let token=localStorage.getItem('token');
    ApiCall.get('/shortlist',token).then((res)=>{
        this.setState({data:res.data.result[0].shortlistedvendors})
        
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render()
  {   console.log(this.state.data)
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
                                    <li>Shortlist</li>
                                </ul>
                                </nav>
                            </div>
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="dashboard-box">
                                        <div className="headline">
                                            <h3><i className="icon-material-outline-face" /> Shorlisted Vendors</h3>
                                        </div>
                                        <div className="content">
                                            <ul className="dashboard-box-list">
                                                {this.state.data!=undefined?this.state.data.map((item)=>{
                                                    return <li>
                                                    <div className="freelancer-overview">
                                                      <div className="freelancer-overview-inner">
                                                        <div className="freelancer-avatar">
                                                          <div class="verified-badge"></div>
                                                          <a href={"http://ht-fullstack.herokuapp.com/vendor/"+item._id}>
                                                            <img src={item.vendor_image} alt />
                                                          </a>
                                                        </div>
                                                        <div className="freelancer-name">
                                                          <h4><a href={"http://ht-fullstack.herokuapp.com/vendor/"+item._id}>{item.name}</a></h4>
                                                          <span>Home Paint &amp; Services</span>
                                                          <div className="freelancer-rating" style={{marginLeft: '-300px'}}>
                                                            <div className="star-rating" data-rating="4.7" />
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="buttons-to-right"><a style={{color:'white'}} onClick={()=>{this.removeShortlist(item._id)}} className="button red ripple-effect ico" title="Remove" data-tippy-placement="left"><i className="icon-feather-trash-2" /></a>
                                                    </div>
                                                  </li>
                                                  
                                                }):null}
                                            </ul>
                                        </div>
                                        <div className="dashboard-footer">
                                            <a href="javascript:void(0);" className="popup-with-zoom-anim button button-sliding-icon ripple-effect" onClick={this.showModal}>Create Service Enquiry Group <i className="icon-material-outline-arrow-right-alt" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                <Modal
            title="Create Service Enquiry"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            style={{top:'10px'}}
            >
            <div className="popup-tab-content" id="tab">
			<div className="welcome-text">
				<h3>Create Service Enquiry Group</h3>
			</div>
			<form method="post">
            <div className="row">
                <div className="input-with-icon-left col-md-12"><i className="icon-material-outline-watch" />
					<input type="text" className="input-text with-border" name="name" id="name" placeholder="Service Title" /*value={this.state.time} onChange={(e)=>{this.setState({time:e.target.value})}}*//>
				</div>
            </div>
			<div className="row">
				<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-watch" />
					<input type="text" className="input-text with-border" name="name" id="name" placeholder="Select Time" /*value={this.state.time} onChange={(e)=>{this.setState({time:e.target.value})}}*//>
				</div>
				<div className="input-with-icon-left col-md-6">	<i className="icon-material-outline-date-range" />
					<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Date" /*value={this.state.date} onChange={(e)=>{this.setState({date:e.target.value})}}*//>
				</div>
			</div>
			<div className="input-with-icon-left">	<i className="icon-line-awesome-map-marker" />
				<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Where Do you Want this Service?" /*value={this.state.location} onChange={(e)=>{this.setState({location:e.target.value})}}*//>
			</div>
			<textarea name="textarea" cols={10} placeholder="Service Description (if any)" className="with-border" defaultValue={""} /*value={this.state.description} onChange={(e)=>{this.setState({description:e.target.value})}}*//>
			{/* <div className="uploadButton margin-top-25">
				<input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
				<label className="uploadButton-button ripple-effect" htmlFor="upload">Add Attachments</label>	<span className="uploadButton-file-name">Allowed file types: zip, pdf, png, jpg <br /> Max. files size: 50 MB.</span>
			</div> */}
			</form>
			<a className="popup-with-zoom-anim">
				<button className="button margin-top-35 full-width button-sliding-icon ripple-effect" type="submit" onClick={this.handleSubmit}>Request Service <i className="icon-material-outline-arrow-right-alt" /> 
				</button>
			</a>
		  	</div>
            </Modal>
            </div>
      )
  }
}