import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dataJson from '../dataJson.json';

export default class Footer extends Component {
  render() {
    return (
        <div id="footer">
        <div class="footer-top-section">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="footer-rows-container">
                  <div class="footer-rows-left">
                    <div class="footer-row">
                      <div class="footer-row-inner footer-logo">
                        <img src="myimg/logo.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="footer-rows-right">
                    <div class="footer-row">
                      <div class="footer-row-inner">
                        <ul class="footer-social-links">
                          <li>
                            <a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="light">	<i class="icon-brand-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="light">	<i class="icon-brand-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="light">	<i class="icon-brand-google-plus-g"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="light">	<i class="icon-brand-linkedin-in"></i>
                            </a>
                          </li>
                        </ul>
                        <div class="clearfix"></div>
                      </div>
                    </div>
                    <div class="footer-row">
                      <div class="footer-row-inner">
                        <Link to="/vendor_signup" class="button ripple-effect" style={{verticalAlign: 'middle'}}>Become A Professional</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-middle-section">
          <div class="container">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-3">
                <div class="footer-links">
                  <h3>Our Services</h3>
                  <ul>
                  {
                    dataJson.service_categories.map((item,indx)=>{
                      return <li><a href="#"><span>{item.name}</span></a></li>
                    })
                  }
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-lg-2 col-md-3">
                <div class="footer-links">
                  <h3>Helpful Links</h3>
                  <ul>
                    <li><a href="#"><span>Contact</span></a>
                    </li>
                    <li><a href="#"><span>Privacy Policy</span></a>
                    </li>
                    <li><a href="#"><span>Terms of Use</span></a>
                    </li>
                    <li><a href="#"><span>FAQ</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3">
                <div class="footer-links">
                  <h3>Account</h3>
                  <ul>
                    <li><a href="#"><span>My Dashboard</span></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-12">
                <h3><i class="icon-feather-mail"></i> Sign Up For a Newsletter</h3>
                <p>Weekly breaking news, analysis and cutting edge advices on service searching.</p>
                <form action="#" method="get" class="newsletter">
                  <input type="text" name="fname" placeholder="Enter your email address" />
                  <button type="submit"><i class="icon-feather-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom-section">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          
          .ant-modal-body{
            padding:0 !important;
          }
          .ant-modal-footer {
            padding:0px !important; 
            border-top: 0 !important;
          }

        `}</style>
      </div>
    )
  }
}
