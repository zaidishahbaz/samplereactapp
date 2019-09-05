import React, { Component } from 'react';
import dataJson from '../../dataJson.json';
import ApiCall from '../../utils/apiCall';

export default class FeaturedServices extends Component {
    constructor(props)
    {
      super(props)
      this.state={
        list:[]
      }
    }
    componentWillMount(){
      var data = JSON.parse(localStorage.getItem('homepage')).isfeatured;
        this.setState({list:data})
    }
    render(){
      const list=this.state.list;
      return(
        <div className="section margin-top-65 margin-bottom-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-headline centered margin-top-0 margin-bottom-45">
                  <h3>Featured Services</h3>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="default-slick-carousel freelancers-container freelancers-grid-layout">
                 { list!=undefined? list.map((item,indx)=>{
                   return <a key={indx} href={"/services/"+item._id} className="photo-box" data-background-image={item.bg_image}>
                    <div className="photo-box-content">
                      <h3>{item.name}</h3>
                      <span>{item.services} Vendors</span>
                    </div>
                  </a>
                 }):null
                   
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  