import React, { Component } from 'react'
import dataJson from '../../dataJson.json';

export default class Similar_vendors extends Component {
    constructor(props){
        super(props);
        this.state={
            similar_jobs:[]
        }
    }

    componentWillMount(){
        this.getSimilarJobsByType(this.props.type,this.props.activeVendor);
    }

    getSimilarJobsByType(type,name){
        console.log(type,name)
        let similar_jobs=[];
        dataJson.top_vendors.map((item,indx)=>{
            if(item.service_type===type){
                if( similar_jobs.length<=2 && name!==item.name){
                    similar_jobs.push(Object.assign({},item,{id:indx}));
                }

            }
        })

        this.setState({similar_jobs})
    }

  render() {
    //   console.log(this.state)
    return (
        <div className="single-page-section">
        {this.state.similar_jobs.length>0?<h3 className="margin-bottom-25">Similar Jobs</h3>:null}

        {/* <!-- Listings Container --> */}
        <div className="listings-container grid-layout">
            {
                this.state.similar_jobs.map((data,indx)=>{
                    return  <a href={"/vendor/"+data.id} key={indx} className="job-listing" style={{width: '100%'}}>

{/* <!-- Job Listing Details --> */}
<div className="job-listing-details">
    {/* <!-- Logo --> */}
    <div className="job-listing-company-logo">
        <img src={"/"+data.vendor_image} alt="" />
    </div>

    {/* <!-- Details --> */}
    <div className="job-listing-description">

        <h3 className="job-listing-title">{data.name}</h3>
        <h4 className="job-listing-company">{data.service_type}</h4>
    </div>
</div>

{/* <!-- Job Listing Footer --> */}
<div className="job-listing-footer">
    <ul>
        <li><i className="icon-material-outline-star"></i> {parseFloat(data.rating)}</li>
        <li><i className="icon-material-outline-account-balance-wallet"></i>${data.service_charge}</li>
    </ul>
</div>
</a>
                })
            }
               
            </div>
        </div>
    )
  }
}
