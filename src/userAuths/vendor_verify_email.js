import React, { Component } from 'react'
import apiCall from '../utils/apiCall';
import { message } from 'antd';
import { withRouter } from 'react-router';
import Vendor_info from '../userAuths/vendor_info';

class Vendor_verify_email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            emailVerified: false
        }
    }

    componentWillMount() {
        document.title = "Verify Vendor Email || HorseTask"
    }


    verifyVendor() {
        if (localStorage.getItem('userID') !== null) {
            let data = { otp: this.state.otp, userid: localStorage.getItem('userID'), userType: 'vendor' }
            apiCall.post("/user/verify", data).then(res => {
                if (res.data.status) {
                    this.setState({ emailVerified: true });
                    let path = '/vendor_info';
                    this.props.history.push(path)
                }
                else {
                    message.error(res.data.message[0], 1);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="wrapper">
                    <header id="header-container" className="fullwidth transparent">
                        <div id="header">
                            <div className="container">
                                <div className="left-side">
                                    <div id="logo">
                                        <a href="/">
                                            <img src="myimg/logo.png" alt="" />
                                        </a>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="clearfix"></div>
                    <div className="dashboard-container">
                        <div className="dashboard-content-container" data-simplebar>
                            <div className="dashboard-content-inner">
                                <div className="dashboard-headline">

                                </div>
                                <div className="row">
                                    <div className="col-xl-7" style={{ margin: '0 auto 50px' }}>
                                        <div className="dashboard-box margin-top-0">
                                            <div className="content with-padding padding-bottom-10" style={{ margin: '0 7%', padding: '6% 6% 3%!important' }}>
                                                <div className="row">
                                                    <div className="col-xl-12" style={{ textAlign: 'center', paddingBottom: '30px' }} >
                                                        <h1 style={{ fontWeight: 'bold', marginBottom: '25px' }}>Verify Email</h1>
                                                        <span>Kindly enter the verification code sent to your registered email id</span>
                                                    </div>
                                                    <div className="col-xl-12">
                                                        <div className="submit-field">
                                                            <input type="text" className="with-border" placeholder="Verification Code" onChange={(e) => this.setState({ otp: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-12"> <a href="" onClick={(e) => { e.preventDefault(); this.verifyVendor() }} className="button ripple-effect big margin-top-0 margin-bottom-30" style={{ width: '260px', textAlign: 'center', margin: ' 0 auto', display: ' block' }}> Verify</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-footer-spacer"></div>
                                <div className="small-footer margin-top-15">
                                    <div className="small-footer-copyrights">© 2018 <strong>Horsetask</strong>. All Rights Reserved.</div>
                                    <ul className="footer-social-links">
                                        <li>
                                            <a href="#" title="Facebook" data-tippy-placement="top">    <i className="icon-brand-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Twitter" data-tippy-placement="top"> <i className="icon-brand-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Google Plus" data-tippy-placement="top"> <i className="icon-brand-google-plus-g"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="LinkedIn" data-tippy-placement="top">    <i className="icon-brand-linkedin-in"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
export default withRouter(Vendor_verify_email);