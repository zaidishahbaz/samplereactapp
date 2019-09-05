import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class VendorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationsize: 8,
      pages: []
    };
  }

  getPaginations() {
    let sizes = [];
    this.props.list.map((item, indx) => {
      if (indx % this.state.paginationsize === 0) {
        sizes.push(sizes.length + 1);
      }
    });

    this.setState({ pages: sizes });
  }

  componentWillMount() {
    this.getPaginations();
  }

  render() {
    return [
      this.props.list.length > 0 ? (
        <React.Fragment>
          <div className="listings-container grid-layout margin-top-35">
            {this.props.list.map((item, indx) => {
              return (
                <Link to={"/vendor/"+item._id} key={indx} className="job-listing">
                  <div className="job-listing-details">
                    <div className="job-listing-company-logo">
                      <img src={item.vendor_image} alt="" />
                    </div>
                    <div className="job-listing-description">
                      <h3 className="job-listing-title">{item.name}</h3>
                      <h4 className="job-listing-company">
                        {item.service_type}{" "}
                        <span
                          className="verified-badge"
                          title="Verified Employer"
                          data-tippy-placement="top"
                        />
                      </h4>
                    </div>
                  </div>
                  <div className="job-listing-footer">
                    {" "}
                    <span className="bookmark-icon" />
                    <ul>
                      <li>
                        <i className="icon-material-outline-star" />{" "}
                        {item.rating}
                      </li>
                      <li>
                        <i className="icon-material-outline-account-balance-wallet" />{" "}
                        ${item.service_charge}
                      </li>
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="clearfix" />
          <div className="row">
            <div className="col-md-12">
              <div className="pagination-container margin-top-30 margin-bottom-60">
                <nav className="pagination">
                  <ul>
                    <li className="pagination-arrow">
                      <a href="#">
                        <i className="icon-material-outline-keyboard-arrow-left" />
                      </a>
                    </li>
                    {this.state.pages.map((item, indx) => {
                      return (
                        <li>
                          <a href="#">{item}</a>
                        </li>
                      );
                    })}

                    <li className="pagination-arrow">
                      <a href="#">
                        <i className="icon-material-outline-keyboard-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="listings-container grid-layout margin-top-35">
          <p>No Vendors found!</p>
        </div>
      )
    ];
  }
}
