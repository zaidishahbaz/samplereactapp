import React, { Component } from 'react';
import Header from "../../common/header";
import VenSidebar from "../../common/ven-sidebar";
import ApiCall from '../../utils/apiCall';

export default class Venreviews extends Component {
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
    let userid=JSON.parse(localStorage.getItem('user'))._id;
    ApiCall.get('/viewreview/'+userid,token).then(res=>{
      this.setState({data:res.data.result})
      console.log(res.data)
    })

  }
  render() {
    return (
      <div>
  <div id="wrapper">
    <Header />
    <div className="clearfix" />
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner" data-simplebar>
        <VenSidebar/>
          </div>
      </div>
      <div className="dashboard-content-container" data-simplebar>
        <div className="dashboard-content-inner">
          <div className="dashboard-headline">
            <h3>Reviews</h3>
            <nav id="breadcrumbs" className="dark">
              <ul>
                <li><a href="#">Home</a>
                </li>
                <li><a href="#">Dashboard</a>
                </li>
                <li>Reviews</li>
              </ul>
            </nav>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">
                <div className="headline">
                  <h3><i className="icon-material-outline-business" />Ratings &amp; Reviews</h3>
                </div>
                <div className="content">
                  <ul className="dashboard-box-list">
                    {this.state.data!=undefined?this.state.data.map((item)=>{
                      return <li>
                      <div className="boxed-list-item">
                        <div className="item-content">
                          <h4>{item.username}</h4>
                          <div className="item-details margin-top-10">
                            <div className="star-rating" data-rating={item.rating} />
                            <div className="detail-item"><i className="icon-material-outline-date-range" />{item.timestamp}</div>
                          </div>
                          <div className="item-description">
                            <p>{item.comment}</p>
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
  <div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
    <div className="sign-in-form">
      <ul className="popup-tabs-nav" />
      <div className="popup-tabs-container">
        <div className="popup-tab-content" id="tab1">
          <div className="welcome-text">
            <h3>Change Review</h3>
            <span>Rate <a href="#">Herman Ewout</a> for the project <a href="#">WordPress Theme Installation</a> </span>
          </div>
          <form method="post" id="change-review-form">
            <div className="feedback-yes-no">	<strong>Was this delivered on budget?</strong>
              <div className="radio">
                <input id="radio-rating-1" name="radio" type="radio" defaultChecked />
                <label htmlFor="radio-rating-1"><span className="radio-label" /> Yes</label>
              </div>
              <div className="radio">
                <input id="radio-rating-2" name="radio" type="radio" />
                <label htmlFor="radio-rating-2"><span className="radio-label" /> No</label>
              </div>
            </div>
            <div className="feedback-yes-no">	<strong>Was this delivered on time?</strong>
              <div className="radio">
                <input id="radio-rating-3" name="radio2" type="radio" defaultChecked />
                <label htmlFor="radio-rating-3"><span className="radio-label" /> Yes</label>
              </div>
              <div className="radio">
                <input id="radio-rating-4" name="radio2" type="radio" />
                <label htmlFor="radio-rating-4"><span className="radio-label" /> No</label>
              </div>
            </div>
            <div className="feedback-yes-no">	<strong>Your Rating</strong>
              <div className="leave-rating">
                <input type="radio" name="rating" id="rating-1" defaultValue={1} defaultChecked />
                <label htmlFor="rating-1" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-2" defaultValue={2} />
                <label htmlFor="rating-2" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-3" defaultValue={3} />
                <label htmlFor="rating-3" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-4" defaultValue={4} />
                <label htmlFor="rating-4" className="icon-material-outline-star" />
                <input type="radio" name="rating" id="rating-5" defaultValue={5} />
                <label htmlFor="rating-5" className="icon-material-outline-star" />
              </div>
              <div className="clearfix" />
            </div>
            <textarea className="with-border" placeholder="Comment" name="message" id="message" cols={7} required defaultValue={"Excellent programmer - helped me fixing small issue."} />
          </form>
          <button className="button full-width button-sliding-icon ripple-effect" type="submit" form="change-review-form">Save Changes <i className="icon-material-outline-arrow-right-alt" />
          </button>
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
            <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span>
          </div>
          <form method="post" id="leave-review-form">
            <div className="feedback-yes-no">	<strong>Was this delivered on budget?</strong>
              <div className="radio">
                <input id="radio-1" name="radio" type="radio" required />
                <label htmlFor="radio-1"><span className="radio-label" /> Yes</label>
              </div>
              <div className="radio">
                <input id="radio-2" name="radio" type="radio" required />
                <label htmlFor="radio-2"><span className="radio-label" /> No</label>
              </div>
            </div>
            <div className="feedback-yes-no">	<strong>Was this delivered on time?</strong>
              <div className="radio">
                <input id="radio-3" name="radio2" type="radio" required />
                <label htmlFor="radio-3"><span className="radio-label" /> Yes</label>
              </div>
              <div className="radio">
                <input id="radio-4" name="radio2" type="radio" required />
                <label htmlFor="radio-4"><span className="radio-label" /> No</label>
              </div>
            </div>
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
  </div>
</div>

    )
  }
}
