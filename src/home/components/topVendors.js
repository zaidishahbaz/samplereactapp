import React, { Component } from 'react'
import dataJson from '../../dataJson.json';
import { Link } from 'react-router-dom';
import {message} from 'antd';
import ApiCall from '../../utils/apiCall'

export default class TopVendors extends Component{
  constructor(props){
    super(props);
    this.state={
      vendors:[],
    }

  }

  componentWillMount(){
    var data = JSON.parse(localStorage.getItem('homepage')).rated;
    // console.log(data)
    this.setState({vendors:data})
  }
  componentWillReceiveProps(nextProps){
    // this.setState({vendors:dataJson.top_vendors})
    // console.log(nextProps);
  }

    render(){
      console.log(this.state.vendors)
      return(
  <div class="section gray padding-top-65 padding-bottom-70 full-width-carousel-fix">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="section-headline margin-top-0 margin-bottom-25">
                  <h3>Highest Rated Vendors</h3>
                </div>
              </div>
              <div class="col-xl-12">
                <div class="default-slick-carousel freelancers-container freelancers-grid-layout">
                {
                  this.state.vendors.map((item,indx)=>{
                    return <div class="freelancer" key={indx}>
                    <div class="freelancer-overview">
                      <div class="freelancer-overview-inner">	 
                        <div class="freelancer-avatar">
                          {item.verified?<div class="verified-badge"></div>:null}
                          <a href={"/vendor/"+item._id}>
                            <img src={item.vendor_image} alt="" />
                          </a>
                        </div>
                        <div class="freelancer-name">
                          <h4><a href={"/vendor/"+item._id}>{item.name}</a></h4>
                          <span>{item.service_name.map((item)=>{return item.name})}</span>
                        </div>
                        <div class="freelancer-rating">
                          <div class="star-rating" data-rating={parseFloat(item.rating)}></div>
                        </div>
                      </div>
                    </div>
                    <div class="freelancer-details">
                      <div class="freelancer-details-list">
                        <ul>
                          <li></li>
                          <li>Hired<strong>{item.hired_count} times</strong>
                          </li>
                          <li></li>
                          <li></li>
                          <li>Rate <strong>${item.service_charge}</strong>
                          </li>
                          <li></li>
                        </ul>
                      </div>	<a href={"/vendor/"+item._id} class="button button-sliding-icon ripple-effect">View Service <i class="icon-material-outline-arrow-right-alt"></i></a>
                    </div>
                  </div>
                  })
                }
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
