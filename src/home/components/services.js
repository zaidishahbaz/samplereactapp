import React, { Component } from 'react'
import dataJson from '../../dataJson.json';
import { Link } from 'react-router-dom';
import ApiCall from '../../utils/apiCall'

export default class Services extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      featuredServices: []
    }
  }
  componentWillMount(){
    var data = JSON.parse(localStorage.getItem('homepage')).listofcategory;
    this.setState({featuredServices:data})
  }
    render(){
      return(
        <div className="section margin-top-65 margin-bottom-30">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-headline centered margin-top-0 margin-bottom-45">
                  <h3>All Services</h3>
                </div>
              </div>
            {
              this.state.featuredServices.map((item,indx)=>{
                return <div className="col-xl-3 col-md-6" key={indx}>
                <Link to="/services" className="photo-box small" data-background-image={item.image}>
                  <div className="photo-box-content">
                    <h3>{item.service}</h3>
                    <span>{item.servicesnumber} services</span>
                  </div>
                </Link>
              </div>
              })
            }            
            </div>
          </div>
        </div>
      )
    }
  }
