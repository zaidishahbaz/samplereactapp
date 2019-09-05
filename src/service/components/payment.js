import React, { Component } from "react";
import Header from "../../common/header";
import Footer from "../../common/footer";

export default class Payment extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div id="wrapper">
          <div className="clearfix" />
          <div id="titlebar" className="gradient">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Checkout</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 content-right-offset">
                <h3>Payment Method</h3>
                <div className="payment margin-top-30">
                  <div className="payment-tab payment-tab-active">
                    <div className="payment-tab-trigger">
                      <label>Credit / Debit Card</label>
                      <img
                        className="payment-logo"
                        src="myimg/IHEKLgm.png"
                        alt=""
                      />
                    </div>
                    <div className="payment-tab-content">
                      <div className="row payment-form-row">
                        <div className="col-md-6">
                          <div className="card-label">
                            <input
                              id="nameOnCard"
                              name="nameOnCard"
                              required
                              type="text"
                              placeholder="Cardholder Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-label">
                            <input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="Credit Card Number"
                              required
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card-label">
                            <input
                              id="expiryDate"
                              placeholder="Expiry Month"
                              required
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card-label">
                            <label for="expiryDate">Expiry Year</label>
                            <input
                              id="expirynDate"
                              placeholder="Expiry Year"
                              required
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card-label">
                            <input
                              id="cvv"
                              required
                              type="text"
                              placeholder="CVV"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <a
                  href="#"
                  className="button big ripple-effect margin-top-40 margin-bottom-65"
                >
                  Proceed Payment
                </a>
              </div>
              <div className="col-xl-4 col-lg-4 margin-top-0 margin-bottom-60">
                <div className="boxed-widget summary margin-top-0">
                  <div className="boxed-widget-headline">
                    <h3>Summary</h3>
                  </div>
                  <div className="boxed-widget-inner">
                    <ul>
                      <li>
                        Standard Plan <span>$49.00</span>
                      </li>
                      <li>
                        VAT (20%) <span>$9.80</span>
                      </li>
                      <li className="total-costs">
                        Final Price <span>$58.80</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="checkbox margin-top-30">
                  <input type="checkbox" id="two-step" />
                  <label for="two-step">
                    <span className="checkbox-icon" /> I agree to the{" "}
                    <a href="#">Terms and Conditions</a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
