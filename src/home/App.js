import React,{Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Services from './components/services.js';
import IntroBanner from './components/introbanner';
import FeaturedServices from './components/featuredservices';
import RecommendedServices from './components/recommended_services';
import TopVendors from './components/topVendors';
import Modals from '../utils/Modals.js';
import ApiCall from '../utils/apiCall';

import {withRouter} from 'react-router-dom';
import { message } from 'antd';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDnlaM-RbPVcjvHXmzkuLdHCo13veNEx9E",
  authDomain: "horsetask-4d1e2.firebaseapp.com",
  databaseURL: "https://horsetask-4d1e2.firebaseio.com",
  projectId: "horsetask-4d1e2",
  storageBucket: "",
  messagingSenderId: "591500750038",
  appId: "1:591500750038:web:7671aeab8bcb9e5c"
});


 class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      verifyModal:false,
      activeModal:"",
      userType:''
      
    }
  }

   componentWillMount(){
     document.title="Horse Task"
     localStorage.removeItem('searchResult');
     ApiCall.post('/homepage').then(res=>{
      localStorage.setItem('homepage',JSON.stringify(res.data))
      console.log(res.data)
   })
   }

  //  componentWillUnmount()
  //  {
  //    localStorage.removeItem('homepage');
  //  }

   userLogin(data){
    this.setState({isLoading:true})
      ApiCall.post("/user/login",data).then(res=>{
        if(res.data.status){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('user',JSON.stringify(res.data.admin));
          message.success("Logged In!",1);

          setTimeout(function(){
            window.location.href="/";
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



   googleLogin(userType){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      let info={
        name:user.displayName,
        email:user.email,
        mobile_no:user.phoneNumber,
        userType:userType
      }

      console.log(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
   }

   openModal(name){
    this.setState({activeModal:name,verifyEmailvisible:true})
   }

   userSignup(data){
    this.setState({isLoading:true,userType:data.userType})
  
      ApiCall.post("/user/register",data).then(res=>{
        if(res.data.status){
          localStorage.setItem('userID', res.data.result);
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
              if(this.state.userType==='vendor'){

                setTimeout(function(){
                  window.location.href="/vendor_info";
                },1000);
                
              }
              else{
    
          this.setState({isLoading:false});

              window.location.href="/";
              }
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

  render() {
    return (
      <div id="wrapper">
      <Header openModal={()=>{this.setState({activeModal:"signin_up",verifyModal:true})}} />
      <div class="clearfix"></div>
      <IntroBanner/>
      <Services />
      <FeaturedServices  />
      <RecommendedServices />
      <TopVendors />
      <Footer/>

      <Modals mode={this.state.activeModal} googleLogin={(userType)=>this.googleLogin(userType)} resetPass={(data)=>{this.resetPass(data)}} verifyUser={(otp)=>{this.verifyUser(otp)}} verifyEmailvisible={this.state.verifyModal} openModal={(name)=>this.openModal(name)} closeVerify={()=>{this.setState({verifyModal:false})}} isLoading={this.state.isLoading} userLogin={(data)=>this.userLogin(data)} userSignup={(data)=>this.userSignup(data)} />
    

     </div>
     
    )
  }
}


export default withRouter(App);
