import React, { Component } from 'react';
import Header from "../../common/header";
import Sidebar from "../../common/sidebar";
import ApiCall from '../../utils/apiCall';
import VenSidebar from '../../common/ven-sidebar';
import image2base64  from 'image-to-base64';
const upload=(file)=>new Promise(resolve=>{

  var fReader = new FileReader();
fReader.readAsDataURL(file);
fReader.onloadend = function(event){
    var img = {};
    img.src = event.target.result;
    image2base64(img.src) // you can also to use url
    .then(response=>resolve(response))
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )
}
})

export default class Vensettings extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      fname: '',
      lname: '',
      phone: '',
      email: '',
      companyName: '',
      tagline: '',
      city: '',
      state: '',
      zip: '',
      location: '',
      days: [],
      services: '',
      password: '',
      newPassword: '',
      rNewPassword: '',
      vendor_image: ''
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit()
  {
    let token=localStorage.getItem('token')
    let newPassword='';
    let data={}
    let flag=0
    if(this.state.password!='')
    {
      data={
        email: this.state.email,
        name:  this.state.fname+" "+this.state.lname,
        mobile_no: this.state.phone,
        vendor_image:this.state.vendor_image,
        city: this.state.city,
        companyname: this.state.companyName,
        companytagline: this.state.tagline,
        state: this.state.state,
        zip: this.state.state,
        password: this.state.password
        }
      if(this.state.newPassword!='' && this.state.rNewPassword!='')
      {
        if(this.state.newPassword===this.state.rNewPassword)
        {
          newPassword=this.state.newPassword
          ApiCall.post('/update',data,newPassword,token).then(res=>{
            console.log(res.data)
            console.log(data)
          })
        }
        else
        {
          window.alert('New passwords do not match')
        }
      }
      else
      {
        window.alert('New Passwords Empty.')
      }
    }
    else
    {
      data={
        email: this.state.email,
        name:  this.state.fname+this.state.lname,
        mobile_no: this.state.phone,
        vendor_image:this.state.vendor_image,
        city: this.state.city,
        companyname: this.state.companyName,
        companytagline: this.state.tagline,
        state: this.state.state,
        zip: this.state.state,
        }
        ApiCall.post('/update',data,token).then(res=>{
          console.log(res.data)
          console.log(data)

        })
    }
  }
  multipleSelect=(e)=>{
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
       value.push(options[i].value);
      }
    }
    this.setState({days:value})
  }


  componentWillMount(){
    let user=JSON.parse(localStorage.getItem('user'));
    let {fname,lname,phone,email,city,companyName,state,zip,vendor_image}=this.state;

    fname=user.name.split(" ")[0];
    lname=user.name.split(" ")[1];
    phone=user.mobile_no;
    email=user.email;
    city=user.city;
    companyName=user.companyname;
    state=user.state;
    zip=user.zip;
    vendor_image=user.vendor_image;

    this.setState({fname,lname,phone,email,city,companyName,zip,state,vendor_image})
  }

    render() {
      let user=JSON.parse(localStorage.getItem('user'));
        return (
          <React.Fragment>
              <div id="wrapper">
  <Header />
  <div className="clearfix" />
  <div className="dashboard-container">
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-inner" data-simplebar>
        {user.userType==="vendor"?<VenSidebar />:<Sidebar/>}
      </div>
    </div>
    <div className="dashboard-content-container" data-simplebar>
      <div className="dashboard-content-inner">
        <div className="dashboard-headline">
          <h3>Settings</h3>
          <nav id="breadcrumbs" className="dark">
            <ul>
              <li><a href="#">Home</a>
              </li>
              <li><a href="#">Dashboard</a>
              </li>
              <li>Settings</li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">
              <div className="headline">
                <h3><i className="icon-material-outline-account-circle" /> My Account</h3>
              </div>
              <div className="content with-padding padding-bottom-0">
                <div className="row">
                  <div className="col-auto">
                    <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                      <img className="profile-pic" src={this.state.vendor_image!=''?this.state.vendor_image:"images/user-avatar-placeholder.png"} alt />
                      <div className="upload-button" />
                      <input className="file-upload" type="file" accept="image/*" onChange={(e)=>{this.state.vendor_image={file:'',name:e.target.files[0].name,type:e.target.files[0].type};upload(e.target.files[0]).then(str=>{this.state.vendor_image.file=str;})}} />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>First Name</h5>
                          <input type="text" className="with-border" placeholder="Tom" value={this.state.fname} onChange={(e)=>{this.setState({fname:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Last Name</h5>
                          <input type="text" className="with-border" placeholder="Smith" value={this.state.lname} onChange={(e)=>{this.setState({lname:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Phone</h5>
                          <input type="tel" className="with-border" placeholder="+1 (408) 6654 889" value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Email</h5>
                          <input type="text" className="with-border" placeholder="tom@example.com" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user.userType==="vendor"?
          <div className="col-xl-12">
            <div className="dashboard-box">
              <div className="headline">
                <h3><i className="icon-material-outline-face" /> Company Details</h3>
              </div>
              <div className="content">
                <ul className="fields-ul">
                  <li>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Company's Name</h5>
                          <input type="text" className="with-border" placeholder="Deluxe" value={this.state.companyName} onChange={(e)=>{this.setState({companyName:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Tagline</h5>
                          <input type="text" className="with-border" placeholder="Home Paint & Services" value={this.state.tagline} onChange={(e)=>{this.setState({tagline:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="submit-field">
                          <h5>City</h5>
                          <input type="text" className="with-border" placeholder="Las Vegas" value={this.state.city} onChange={(e)=>{this.setState({city:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="submit-field">
                          <h5>State</h5>
                          <input type="text" className="with-border" placeholder="Florida" value={this.state.state} onChange={(e)=>{this.setState({state:e.target.value})}}/>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="submit-field">
                          <h5>ZIP CODE</h5>
                          <input type="number" className="with-border" placeholder={11256} value={this.state.zip} onChange={(e)=>{this.setState({zip:e.target.value})}}/>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>:null}
          
                    <div className="col-xl-12">
            <div id="test1" className="dashboard-box">
              <div className="headline">
                <h3><i className="icon-material-outline-lock" /> Password &amp; Security</h3>
              </div>
              <div className="content with-padding">
                <div className="row">
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Current Password</h5>
                      <input type="password" className="with-border" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>New Password</h5>
                      <input type="password" className="with-border" value={this.state.newPassword} onChange={(e)=>{this.setState({newPassword:e.target.value})}}/>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Repeat New Password</h5>
                      <input type="password" className="with-border" value={this.state.rNewPassword} onChange={(e)=>{this.setState({rNewPassword:e.target.value})}}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">	<a href="javascript:void(0);" className="button ripple-effect big margin-top-30" onClick={this.handleSubmit}>Save Changes</a>
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

          </React.Fragment>
        )
    }
}
