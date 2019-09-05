import React, { Component } from 'react'
import Header from '../../common/header';
import Footer from '../../common/footer';
import FilterSidebar from './filterSidebar';
import VendorCard from './vendorCard';
import { withRouter } from 'react-router-dom';
import dataJson from '../../dataJson.json';
import SearchWithSorting from './searchWithSorting';

import Modals from '../../utils/Modals.js';
import ApiCall from '../../utils/apiCall';
import {message} from 'antd';

class FilterVendorsByService extends Component {
    constructor(props) {
        super(props);
        this.state={
            vendors:[],
            defaultVendors:[],
            rates:[],
            isLoading:false,
            verifyModal:false,
            activeModal:""
        }
    }
    componentWillMount(){
        document.title="Horse Task"
        this.getVendorsByService(this.props.match.params.service_name)
       
      }
   
      userLogin(data){
       this.setState({isLoading:true})
         ApiCall.post("/user/login",data).then(res=>{
           if(res.data.status){
             localStorage.setItem('token',res.data.token);
             message.success("Logged In!",1);
   
             setTimeout(function(){
               window.location.href="/";
             },1200)
             
             // this.setState({isLoading:false})
             }
           else{
             this.setState({isLoading:false})
             message.error(res.data.message[0],1);
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
    getVendorsByService(service_name){
        let activeList=dataJson.top_vendors.filter(x=>x.service_type===service_name);
        this.setState({vendors:[...activeList],defaultVendors:[...activeList]});
        var searchResult=JSON.parse(localStorage.getItem('searchResult'));
        if(searchResult===null){
          searchResult={_id:service_name}
        }
        ApiCall.post('/service/byId',searchResult).then(res=>{
            if(res.data.status){
                this.setState({vendors:[...res.data.result],defaultVendors:[...res.data.result]})
                        }
            else{
              message.error(res.data.message,1);
            }
          })
    }

    sortListBySearchDrop(sortedQuery){
        if(sortedQuery==="popular"){
            let list=[];
           this.state.defaultVendors.map(item=>{
               this.state.defaultVendors.map(data=>{
                   if(item.hired_count>data.hired_count ){
                       if(list.findIndex(x=>x.name===item.name)===-1){
                           list.push(item);
                       }
                   }
                   else{
                    if(list.findIndex(x=>x.name===data.name)===-1){
                        list.push(data);
                    }

                  }
                })
            })
            console.log(list)
            this.setState({ vendors: list });
        }
        else if (sortedQuery === "top_rated") {
            this.setState({ vendors: this.state.defaultVendors.sort((x, y) => parseFloat(x.rating) - parseFloat(y.rating)) })
        }
        else if (sortedQuery === "price_to_high") {
            console.log(this.state.defaultVendors.sort((x, y) => parseInt(x.service_charge) - parseInt(y.service_charge)))
            // this.setState({vendors:this.state.defaultVendors.sort((x,y)=>parseInt(x.service_charge)-parseInt(y.service_charge))})
        }
        else if (sortedQuery === "price_to_low") {
            console.log(this.state.defaultVendors.sort((x, y) => parseInt(y.service_charge) - parseInt(x.service_charge)))
            // this.setState({vendors:this.state.defaultVendors.sort((x,y)=>y.service_chargey-x.service_charge)})
        }
    }


    filterByRating(query) {

        let { rates } = this.state;
        if (query.val.length > 0) {
            rates.push(query.val)
        } else {
            rates.splice(rates.findIndex(x => x === query.kind), 1);
        }
        console.log(rates)
        rates.map(item => {
            if (item === '4+')
                this.setState({ vendors: this.state.defaultVendors.filter(x => parseFloat(x.rating) > 4.0) });
            else if (item === '3+')
                this.setState({ vendors: this.state.defaultVendors.filter(x => parseFloat(x.rating) > 3.0) });
            else if (item === '2+')
                this.setState({ vendors: this.state.defaultVendors.filter(x => parseFloat(x.rating) > 2.0) });
            else if (item === '1+')
                this.setState({ vendors: this.state.defaultVendors.filter(x => parseFloat(x.rating) > 1.0) });
        })

        if (rates.length === 0) {
            this.setState({ vendors: this.state.defaultVendors });
        }
    }


  render() {
    //   console.log(this.state.vendors)
    return (
      <div id="wrapper">
        <Header openModal={()=>{this.setState({activeModal:"signin_up",verifyModal:true})}} />
        <Modals mode={this.state.activeModal} resetPass={(data)=>{this.resetPass(data)}} verifyUser={(otp)=>{this.verifyUser(otp)}} verifyEmailvisible={this.state.verifyModal} openModal={(name)=>this.openModal(name)} closeVerify={()=>{this.setState({verifyModal:false})}} isLoading={this.state.isLoading} userLogin={(data)=>this.userLogin(data)} userSignup={(data)=>this.userSignup(data)} />
		<div class="clearfix"></div>
		<div class="margin-top-90"></div>
		<div class="container">
			<div class="row">
				<div class="col-xl-3 col-lg-4">
					<FilterSidebar filterRating={(query)=>this.filterByRating(query)} rangeFilter={(e)=>{console.log(e)}} />
				</div>
				<div class="col-xl-9 col-lg-8 content-left-offset">
					<h3 class="page-title">Search Results</h3>
					<SearchWithSorting sortList={(sortedQuery)=>{this.sortListBySearchDrop(sortedQuery)}}  />
                    <VendorCard list={this.state.vendors} />
					
				</div>
			</div>
		</div>
        <Footer />
      </div>
    )
  }
}



export default withRouter(FilterVendorsByService);
