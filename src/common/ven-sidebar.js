import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class VenSidebar extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      services: false,
    }
  }
  render() {
    return (
      <div class="dashboard-container">
        <div class="dashboard-sidebar">
          <div class="dashboard-sidebar-inner" data-simplebar>
            <div class="dashboard-nav-container">
              <a href="#" class="dashboard-responsive-nav-trigger">
                {" "}
                <span class="hamburger hamburger--collapse">
                  <span class="hamburger-box">
                    <span class="hamburger-inner" />
                  </span>
                </span>{" "}
                <span class="trigger-title">Dashboard Navigation</span>
              </a>
              <div class="dashboard-nav">
                <div class="dashboard-nav-inner">
                  <ul>
                    <li>
                      <Link to="/vendor/dashboard">
                        <i class="icon-material-outline-dashboard" /> Dashboard
                      </Link>
                    </li>
                    {/* <li>

                      <a href="javascript:void(0);">
                        <i class="icon-material-outline-star-border" /> Payments
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="#">
                        <i class="icon-material-outline-business-center" />{" "}
                        Messages
                      </a>
                      <ul>
                        <li>
                          <a href="ongoingsms.html">
                            Ongoing Services <span class="nav-tag">3</span>
                          </a>
                        </li>
                        <li>
                          <a href="completedsms.html">Completed Services</a>
                        </li>
                      </ul>
                    </li> */}

                    <li>
                      <Link to="/vendor/reviews">
                        <i class="icon-material-outline-rate-review" /> Reviews
                      </Link>
                    </li>
                  </ul>
                  <ul data-submenu-title="Organize and Manage">

                      {/* <li>
                      <a href="javascript:void(0);">
                        <i class="icon-material-outline-dashboard" /> My Bids
                      </a>
                      </li> */}
                      <li onClick={(e)=>{this.setState(prevState => ({services: !prevState.services}));}} class={this.state.services?"active-submenu":""}>
                        <a href="javascript:void(0);">
                          <i class="icon-material-outline-business-center" />{" "}
                          Services
                        </a>
                        <ul>
                          <li>
                            <Link to="/vendor/ongoing">
                              Ongoing Services
                            </Link>
                          </li>
                          <li>
                            <Link to="/vendor/completed">Completed Services</Link>
                          </li>
                        </ul>

                    </li>
                    {/* <li><a href="javascript:void(0);"><i className="icon-material-outline-rate-review"></i> Shortlist</a></li> */}
                  </ul>
                  <ul data-submenu-title="Account">
                    <li>
                      <Link to="/vendor/addservice">
                        <i class="icon-material-outline-business-center" /> Add
                        A Job
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings">
                        <i class="icon-material-outline-settings" /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i class="icon-material-outline-power-settings-new" />{" "}
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
