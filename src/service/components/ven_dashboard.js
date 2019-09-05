import React, { Component } from 'react';
import Header from "../../common/header";
import VenSidebar from "../../common/ven-sidebar";
import ApiCall from '../../utils/apiCall';

export default class Vendashboard extends Component {
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
      ApiCall.get('/vendordashboard',token).then(res=>{
        this.setState({data:res.data})
        console.log(res.data)
      })
    }
    render() {
      let username=JSON.parse(localStorage.getItem('user')).name
        return (
           <React.Fragment>
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
            <h3>Howdy, {username}!</h3>
            <span>We are glad to see you again!</span>
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a>
                </li>
                <li>Dashboard</li>
              </ul>
            </nav>
          </div>
          <div className="fun-facts-container">
            <div className="fun-fact" data-fun-fact-color="#36bd78">
              <div className="fun-fact-text">	<span>Ongoing Bids</span>
                <h4>{this.state.data!=undefined?this.state.data.ongoingbids:null}</h4>
              </div>
              <div className="fun-fact-icon"><i className="icon-material-outline-gavel" />
              </div>
            </div>
            <div className="fun-fact" data-fun-fact-color="#b81b7f">
              <div className="fun-fact-text">	<span>Active Services</span>
                <h4>{this.state.data!=undefined?this.state.data.activeservices:null}</h4>
              </div>
              <div className="fun-fact-icon"><i className="icon-material-outline-business-center" />
              </div>
            </div>
            <div className="fun-fact" data-fun-fact-color="#efa80f">
              <div className="fun-fact-text">	<span>Reviews</span>
                <h4>28</h4>
              </div>
              <div className="fun-fact-icon"><i className="icon-material-outline-rate-review" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-7">
              <div className="dashboard-box margin-top-30">
                {/* Headline */}
                <div className="headline"><i className="icon-material-outline-business-center" /> Recent Services
                </div>
                <div className="content">
                  <ul className="dashboard-box-list">
                    {this.state.data.recentservices!=undefined?this.state.data.recentservices.map(item=>{
                      return <li>
                      <div className="job-listing">
                        <div className="job-listing-details">
                          <a href="#" className="job-listing-company-logo">
                            <img src={item.service_name[0].bg_image} alt />
                          </a>
                          <div className="job-listing-description">
                            <h3 className="job-listing-title"><a href="#">{item.service_name[0].name}</a></h3>
                            <div className="job-listing-footer">
                              <ul>
                                <li><i className="icon-material-outline-location-on" />{item.service_name[0].city}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    }):null}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="dashboard-box margin-top-30">
                {/* Headline */}
                <div className="headline">
                  <h3><i className="icon-material-outline-business" /> Recent Reviews</h3>
                </div>
                <div className="content">
                  <ul className="dashboard-box-list">
                    {this.state.data.reviews!=undefined?this.state.data.reviews.map(item=>{
                      return <li>
                      <div className="boxed-list-item">
                        {/* Content */}
                        <div className="item-content">
                          <h4>{item.username}</h4>
                          <div className="item-details margin-top-10">
                            <div className="star-rating" data-rating={item.rating} />
                            <div className="detail-item"><i className="icon-material-outline-date-range" />{item.timestamp}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    }):null}
                  </ul>
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
  <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
    <div className="sign-in-form">
      <ul className="popup-tabs-nav">
        <li><a href="#tab">Service Request Details</a>
        </li>
      </ul>
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="tab">
          <ul>
            <li style={{width: '45%'}}><strong>User </strong> Chris Evans</li>
            <li style={{width: '45%'}}><strong>Service </strong> Car Paint</li>
            <li><strong>Address </strong> 10 Browning Street, Las Vegas</li>
            <li><strong>Time </strong> 11:00 am</li>
            <li><strong>Description </strong> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</li>
            <li><strong>Attachments </strong> <img src="images/blog-04.jpg" style={{width: '40%'}} /></li>
          </ul>
          <button className="button red full-width  ripple-effect" type="submit" form="add-note">Decline
          </button>
          <button className="button full-width ripple-effect" type="submit" form="add-note">Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

           </React.Fragment>
        )
    }
}
