import React, { Component } from 'react'
import datajson from '../../dataJson.json';
import ApiCall from '../../utils/apiCall';

export default class RecommendedServices extends Component{
  state={
    recommended: []
  }
  componentWillMount()
  {
    var data = JSON.parse(localStorage.getItem('homepage')).recommendedservice;
      this.setState({recommended:data})
  }
  render(){
    return(
      <div class="section margin-top-65 margin-bottom-65">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="section-headline centered margin-top-0 margin-bottom-45">
                <h3>Recommended for you</h3>
              </div>
            </div>
            <div class="col-xl-12">
              <div class="default-slick-carousel freelancers-container freelancers-grid-layout">
              {
                this.state.recommended!=undefined?
                this.state.recommended.map((item,indx)=>{
                  return <a href={"/services/"+item.name} key={indx} class="photo-box" data-background-image={item.bg_image}>
                  <div class="photo-box-content">
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

