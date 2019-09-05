import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./home/App";
import Vendor_register from "./userAuths/vendor_register";
import Vendor_details from "./vendor/vendor_details";
import All_services from "./service/all_services";
import FilterVendorsByService from "./service/components/filterVendorsByService";
import Vendor_verify_email from "./userAuths/vendor_verify_email";
import Vendor_info from "./userAuths/vendor_info";
import Service_lists from "./service/components/service_lists";
import Test from "./service/components/test";
import Ubids from "./service/components/ubids";
import Ongoingservice from "./service/components/ongoingservice";
import Completedservice from "./service/components/completedservice";
import Cancelledservice from "./service/components/cancelledservice";
import Reviews from "./service/components/reviews";
import Payment from "./service/components/payment";
import Ven_addservice from "./service/components/ven_addservice";
import Ven_completed from "./service/components/ven_completed";
import Ven_completedsms from "./service/components/ven_completedsms";
import Vendashboard from "./service/components/ven_dashboard";
import Venmybids from "./service/components/ven_mybids";
import Venongoing from "./service/components/ven_ongoing";
import Venongoingsms from "./service/components/ven_ongoingsms";
import Venreviews from "./service/components/ven_reviews";
import Vensettings from "./service/components/ven_settings";
import Shortlist from './service/components/shortlist';
import UserDashboard from './service/components/dashboard';

class ErrorComponent extends Component {
  render() {
    return (
      <div id="wrapper">
        <h1>404 not Found</h1>
        <br />
        <div id="logo">
          <a href="/">
            <img src="/myimg/logo.png" alt="" />
          </a>
        </div>
      </div>
    );
  }
}

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/settings" component={Vensettings} />
          <Route exact path="/" component={App} />
          <Route exact path="/vendor/addservice" component={Ven_addservice} />
          <Route exact path="/vendor/dashboard" component={Vendashboard} />
          <Route exact path="/vendor/mybids" component={Venmybids} />
          <Route exact path="/vendor/completed" component={Ven_completed} />
          <Route exact path="/vendor/ongoing" component={Venongoing} />
          <Route exact path="/vendor/ongoingsms" component={Venongoingsms} />
          <Route exact path="/vendor/reviews" component={Venreviews} />
          <Route
            exact
            path="/vendor/completedsms"
            component={Ven_completedsms}
          />

          <Route exact path="/vendor_signup" component={Vendor_register} />
          <Route exact path="/vendor_verify" component={Vendor_verify_email} />
          <Route exact path="/vendor_info" component={Vendor_info} />
          <Route exact path="/vendor/:id" component={Vendor_details} />

          <Route exact path="/services" component={All_services} />

          <Route exact path="/services/all" component={Service_lists} />
          <Route exact path="/ubids" component={Ubids} />
          <Route exact path="/ongoingservice" component={Ongoingservice} />
          <Route exact path="/completedservice" component={Completedservice} />
          <Route exact path="/cancelledservice" component={Cancelledservice} />
          <Route exact path="/shortlist" component={Shortlist} />
          <Route exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/reviews" component={Reviews} />

          <Route
            exact
            path="/services/:service_name"
            component={FilterVendorsByService}
          />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/sidebar" component={Test} />
        </Switch>
        {/* <Route exact path="" component={ErrorComponent} /> */}
      </Router>
    );
  }
}
