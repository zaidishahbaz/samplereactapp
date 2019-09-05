import React, { Component } from 'react'
import Header from '../common/header';
import Footer from '../common/footer';
import dataJson from '../dataJson.json';
import {message } from 'antd';
import Modals from '../utils/Modals.js';
import ApiCall from '../utils/apiCall';

export default class All_services extends Component {
    constructor(props) {
        super(props);

        this.state={
            services:dataJson.service_categories,
            tempServices:dataJson.service_categories,
            searchValue:"",
            isLoading:false,
            verifyModal:false,
            activeModal:""
        }
    }
    componentWillMount(){
        document.title="Services|Horse Task"
      }
   
      userLogin(data){
       this.setState({isLoading:true})
         ApiCall.post("/user/login",data).then(res=>{
           if(res.data.status){
             localStorage.setItem('token',res.data.token);
             message.success("Logged In!",1);
              var self=this;
             setTimeout(function(){
               window.location.href="/services";
             },1200)
             
             // this.setState({isLoading:false})
             }
           else{
             this.setState({isLoading:false})
             message.error(res.data.message,1);
             return;
           }
         })
       
      }
   
      openModal(name){
        console.log(name)
       this.setState({activeModal:name,verifyEmailvisible:true})
      }
   
      userSignup(data){
       this.setState({isLoading:true})
     
         ApiCall.post("/user/register",data).then(res=>{
           if(res.data.status){
             this.setState({verifyModal:true,isLoading:false})
             localStorage.setItem('userID',res.data.result);
             this.setState({activeModal:"verify_email"});
           }
           else{
             message.error(res.data.message,1);
           }
         })
      }
   
      verifyUser(otp){
        this.setState({isLoading:true})
       let userId=localStorage.getItem('userID');
       if(userId!==undefined){
         let data={
           otp:otp,
           userid:userId
         }
           ApiCall.post("/user/verify",data).then(res=>{
             if(res.data.status){
               message.success(res.data.message,1)
               if(localStorage.getItem('fg_pw')===null){
             this.setState({isLoading:false});
   
                 window.location.href="/";
               }
               else{
             this.setState({isLoading:false});
   
                 this.openModal('change_pw')
               }
               
             }
             else{
             this.setState({isLoading:false});
   
               message.error(res.data.message,1);
             }
           }).catch(err=>{
             console.log(err)
           })
       }
     }
   
     resetPass(data){
       this.setState({isLoading:true})
       let userId=localStorage.getItem('userID');
       if(data.password===data.password2){
         if(userId!=null){
           ApiCall.post("/user/reset_password",{password:data.password,userid:userId}).then(res=>{
             // this.setState({isLoading:false})
             if(res.data.status){
               message.success(res.data.message,1);
               var self=this;
               setTimeout(function(){
                 self.setState({isLoading:false})
                 self.openModal('signin_up');
               },1300)
             }
             else{
             this.setState({isLoading:false});
   
               message.error(res.data.message,1);
             }
           })
         }
       }
       
       
     }
    searchVendors(){
      console.log(this.state.searchValue)
        if(this.state.searchValue.length>0){
            this.setState({services:this.state.tempServices.filter(x=>x.name.substr(0,this.state.searchValue.length).toLowerCase()===this.state.searchValue.trim().toLowerCase())});
        }

    }

    clearFilter(val) {
        if (val.length === 0) {
            this.setState({ services: this.state.tempServices });
        }
    }

    getServices() {

    ApiCall.get('/services').then(res => {
            this.setState({ services: res.data.result,tempServices:res.data.result })
        })
    }
    componentWillMount() {
        this.getServices()
        document.body.scrollTop = document.documentElement.scrollTop = 0;


    }

  render() {
    return (
        <div id="wrapper">
		<Header openModal={()=>{this.setState({activeModal:"signin_up",verifyModal:true})}} />
        <Modals mode={this.state.activeModal} resetPass={(data)=>{this.resetPass(data)}} verifyUser={(otp)=>{this.verifyUser(otp)}} verifyEmailvisible={this.state.verifyModal} openModal={(name)=>this.openModal(name)} closeVerify={()=>{this.setState({verifyModal:false})}} isLoading={this.state.isLoading} userLogin={(data)=>this.userLogin(data)} userSignup={(data)=>this.userSignup(data)} />
		<div class="clearfix"></div>
		<div class="margin-top-90"></div>
		<div class="container">
			<div class="row">
				<div class="col-xl-12 col-lg-12 content-left-offset">
					<h1 class="page-title" style={{marginBottom: '50px'}}>Services</h1>
					<div class="notify-box margin-top-15">
						<div class="switch-container" style={{width: '100%',height: '50px'}}>
							<div class="input-with-icon-left no-border">
								<i class="icon-material-outline-search" onClick={()=>{this.searchVendors()}}></i>
								<input type="text" class="input-text" placeholder="Search" onChange={(e)=>{this.setState({searchValue:e.target.value});this.clearFilter(e.target.value)}} />
							</div>
						
						</div>
					</div>
					
                            <div class="listings-container grid-layout margin-top-35">
                                {
                                    this.state.services.map((item, indx) => {
                                        return <a href={"/services/" + item._id} class="job-listing allservice">
                                            <div class="job-listing-details">
                                                <div class="job-listing-company-logo">
                                                    <img src={item.bg_image} alt="" />
                                                </div>
                                                <div class="job-listing-description">

                                                    <h3 class="job-listing-title">{item.name}</h3>
                                                </div>
                                            </div>
                                        </a>
                                    })
                                }

                            </div>
                            <div class="clearfix"></div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
