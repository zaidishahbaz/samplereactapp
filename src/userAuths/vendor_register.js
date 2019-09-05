import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import apiCall from '../utils/apiCall';
import { message } from 'antd';
import Loader from 'react-loader-spinner';
import Vendor_verify_email from './vendor_verify_email';
import { withRouter } from 'react-router';



class Vendor_register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerData: {
                email: "",
                name: "",
                password: "",
                password2: "",
                status: 2,
                mobile_no: ""
            },
            isLoading: false,
            validationMsg: { field: "", msg: "" }
        }
    }

    componentWillMount() {
        document.title = "Vendor Registration || HorseTask"
    }

    registerVendor(data) {
        this.setState({ isLoading: true })
        data.userType = 'vendor';
        apiCall.post("/user/register", data).then(res => {
            if (res.data.status) {
                this.setState({ verifyModal: true, isLoading: false })
                localStorage.setItem('userID', res.data.result);
                let path = '/vendor_verify';
                this.props.history.push(path)

            }
            else {
                message.error(res.data.message, 1);
            }
        })
    }

    validateFields(data) {
        let { validationMsg } = this.state;
        if (data.name.length === 0) {
            validationMsg.field = "name";
            validationMsg.msg = "Name can't be empty"
            // return;
        }
        else if (data.mobile_no.length === 0) {
            validationMsg.field = "mobile";
            validationMsg.msg = "Mobile Number can't be empty"
            // return;
        }
        else if (data.mobile_no.length > 10 || data.mobile_no.length < 10 || parseInt(data.mobile_no) === NaN) {
            validationMsg.field = "mobile";
            validationMsg.msg = "Invalid mobileNumber"
            // return;
        }
        else if (data.email.length === 0) {
            validationMsg.field = "email";
            validationMsg.msg = "Email Id can't be empty"
            // return;
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) === false) {
            validationMsg.field = "email";
            validationMsg.msg = "Invalid Email Id"
        }
        else if (data.password.length === 0) {
            validationMsg.field = "password";
            validationMsg.msg = "Password can't be empty";
            // return;
        }
        else if (data.password.length < 8) {
            validationMsg.field = "password";
            validationMsg.msg = "Password must be 8 character long";
        }
        else if (data.password2 !== data.password) {
            validationMsg.field = "password2";
            validationMsg.msg = "Repeat Password doesn't match";
            // return;
        }
        else {
            // console.log('Trigggered')
            validationMsg.field = "";
            validationMsg.msg = ""
            data.userType = this.state.activeUserState;
            this.registerVendor(data);
        }
        this.setState({ validationMsg })
    }

    render() {
        const { registerData, validationMsg } = this.state;
        return (
            <React.Fragment>
                <div id="wrapper">
                    <header id="header-container" className="fullwidth transparent">
                        <div id="header">
                            <div className="container">
                                <div className="left-side">
                                    <div id="logo">
                                        <a href="/">
                                            <img src="/myimg/logo.png" alt="" />
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
                                    <div className="col-xl-9" style={{ margin: '0 auto 50px' }}>
                                        <div className="dashboard-box margin-top-0">
                                            <div className="content with-padding padding-bottom-10" style={{ margin: '0 7%', padding: '6% 6% 3%!important' }}>
                                                <div className="row">

                                                    <div className="col-xl-12" style={{ textAlign: 'center', paddingBottom: ' 30px' }} >
                                                        <h1 style={{ fontWeight: 'bold' }}>Signup as a partner on Horsetask</h1>
                                                    </div>
                                                    <div className="col-xl-12">
                                                        <div className="submit-field">
                                                            <h5>Full Name</h5>
                                                            <input type="text" className="with-border" placeholder="" onChange={(e) => registerData.name = e.target.value} />
                                                            {validationMsg.field === "name" ? <span>{validationMsg.msg}</span> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Phone Number</h5>
                                                            <input type="text" className="with-border" placeholder="" onChange={(e) => registerData.mobile_no = e.target.value} />
                                                            {validationMsg.field === "mobile" ? <span>{validationMsg.msg}</span> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Your Email</h5>
                                                            <input type="text" className="with-border" placeholder="" onChange={(e) => registerData.email = e.target.value} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Enter Password</h5>
                                                            <input type="password" className="with-border" placeholder="" onChange={(e) => registerData.password = e.target.value} />
                                                            {validationMsg.field === "password" ? <span>{validationMsg.msg}</span> : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Re-enter Password</h5>
                                                            <input type="password" className="with-border" placeholder="" onChange={(e) => registerData.password2 = e.target.value} />
                                                            {validationMsg.field === "password2" ? <span>{validationMsg.msg}</span> : null}
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-12"> <a href="" disabled={this.state.isLoading} onClick={(e) => { e.preventDefault(); this.validateFields(registerData) }} className="button ripple-effect big margin-top-0 margin-bottom-30" style={{ width: '260px', textAlign: 'center', margin: '0 auto', display: 'block' }}> {this.state.isLoading ? <Loader
                                                        type="Oval"
                                                        color="white"
                                                        height="30"
                                                        width="30"
                                                    /> : "Continue"}</a>
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
                <div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
                    <div className="sign-in-form">
                        <ul className="popup-tabs-nav">
                            <li><a href="#login">Log In</a>
                            </li>
                            <li><a href="#register">Register</a>
                            </li>
                        </ul>
                        <div className="popup-tabs-container">
                            <div className="popup-tab-content" id="login">
                                <div className="welcome-text">
                                    <h3>We're glad to see you again!</h3>
                                    <span>Don't have an account? <a href="#" className="register-tab">Sign Up!</a></span>
                                </div>
                                <div className="status-switch" id="snackbar-user-status">
                                    <label className="user-online current-status">Customer</label>
                                    <label className="user-invisible">Vendor</label>
                                    {/* <!-- Status Indicator --> */}
                                    <span className="status-indicator" aria-hidden="true"></span>
                                </div>
                                <form method="post" id="login-form">
                                    <div className="input-with-icon-left">  <i className="icon-material-baseline-mail-outline"></i>
                                        <input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder="Email Address" required />
                                    </div>
                                    <div className="input-with-icon-left">  <i className="icon-material-outline-lock"></i>
                                        <input type="password" className="input-text with-border" name="password" id="password" placeholder="Password" required />
                                    </div>  <a href="#" className="forgot-password">Forgot Password?</a>
                                </form>
                                <a href="indexlogged.html" className="button button-sliding-icon ripple-effect">Login <i className="icon-material-outline-arrow-right-alt"></i></a>
                                {/* </button> */}
                                <div className="social-login-separator"><span>or</span>
                                </div>
                                <div className="social-login-buttons">
                                    <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Log In via Facebook</button>
                                    <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Log In via Google+</button>
                                </div>
                            </div>
                            <div className="popup-tab-content" id="register">
                                <div className="welcome-text">
                                    <h3>Let's create your account!</h3>
                                </div>
                                <form method="post" id="register-account-form">
                                    <div className="input-with-icon-left">  <i className="icon-material-baseline-mail-outline"></i>
                                        <input type="text" className="input-text with-border" name="emailaddress-register" id="emailaddress-register" placeholder="Email Address" required />
                                    </div>
                                    <div className="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">   <i className="icon-material-outline-lock"></i>
                                        <input type="password" className="input-text with-border" name="password-register" id="password-register" placeholder="Password" required />
                                    </div>
                                    <div className="input-with-icon-left">  <i className="icon-material-outline-lock"></i>
                                        <input type="password" className="input-text with-border" name="password-repeat-register" id="password-repeat-register" placeholder="Repeat Password" required />
                                    </div>
                                </form>
                                <a href="indexlogged.html" className="button button-sliding-icon ripple-effect">Register <i className="icon-material-outline-arrow-right-alt"></i></a>
                                <div className="social-login-separator"><span>or</span>
                                </div>
                                <div className="social-login-buttons">
                                    <button className="facebook-login ripple-effect"><i className="icon-brand-facebook-f"></i> Register via Facebook</button>
                                    <button className="google-login ripple-effect"><i className="icon-brand-google-plus-g"></i> Register via Google+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default withRouter(Vendor_register);