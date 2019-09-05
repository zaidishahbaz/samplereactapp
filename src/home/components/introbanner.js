import React, { Component } from 'react'
import ApiCall from '../../utils/apiCall';
import {withRouter} from 'react-router-dom';
import {message} from 'antd';
import homebg from '../../home-background.jpg';
import 'antd/dist/antd.css';

import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

class IntroBanner extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            servicescompleted: '',
            servicesposted: '',
            numberofvendors: '',
            city: '',
            name: '',
            type: '',
            list: [],
            selectedID: '',
        }
        this.handleChangeCity=this.handleChangeCity.bind(this)
        this.handleChangeName=this.handleChangeName.bind(this)
    }

    handleChangeCity(value){
        this.setState({
            selectedID:value,
            city: value,
        });
    }
    handleChangeName(value){
        this.setState({
            selectedID:value,
            name: value,
        });
    }
    handleSearch=(e)=>{
        let data={
            city:this.state.city,
            name: this.state.name
        }
        ApiCall.post('/search',data).then(res=>{
            if(res.data.status){
                this.setState({list:res.data.response.list})
                //console.log(this.state.list)
            }
            else{
              message.error(res.data.message,1);
            }
          })
    }

    handleSearchSubmit=(e)=>{
        localStorage.clear();
        let list=this.state.list;
        let value=this.state.selectedID;
        let val=list[list.findIndex(x=>x._id===value)];
        var obj={}
        if(this.state.name=='')
        {
            obj={
                'city': val.city,
                'type': val.type,
                '_id' : val._id
            }
        }
        else if(this.state.city=='')
        {
            obj={
                'name': val.name,
                'type': val.type,
                '_id' : val._id
            }
        }
        else
        {
            obj={
                'name': val.name,
                'city': val.city,
                'type': val.type,
                '_id' : val._id
            }
        }
        console.log(obj)
        let path='/services/'+this.state.selectedID;
        this.props.history.push(path)
        localStorage.setItem('searchResult', JSON.stringify(obj));
        //console.log(searchResult)
    }
    componentWillMount(){
        var data = JSON.parse(localStorage.getItem('homepage'));
            this.setState({numberofvendors:data.numberofvendors,
                           servicescompleted: data.servicescompleted,
                           servicesposted: data.servicesposted})
    }
    render(){
        // console.log(this.state.numberofvendors)
        // console.log(this.state.servicescompleted)
        // console.log(this.state.servicesposted)
        const lists=this.state.list;
        const cityChildren = lists.map(list => <Option key={list.city} value={list._id}>{list.city}</Option>);
        const nameChildren = lists.map(list=><Option key={list.name} value={list._id}>{list.name}</Option>)
      return(
        <div class="intro-banner" data-background-image={homebg}>
              <div class="container">
                  <div class="row">
                      <div class="col-md-12">
                          <div class="banner-headline">
                              <h3 >
                          <strong>Hire experts or be hired for any service, any time.</strong>
                          <br />
                          <span>Thousands of small businesses use <strong class="color">Horsetask</strong> to turn their ideas into reality.</span>
                      </h3>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-10">
                          <div class="intro-banner-search-form margin-top-95">
                              <div class="intro-search-field with-autocomplete">
                                  <label for="autocomplete-input" class="field-title ripple-effect">Where?</label>
                                  <AutoComplete 
                                  style={{ width: '100%' }} 
                                  onSearch={this.handleSearch}
                                  onChange={this.handleChangeCity}
                                  placeholder="Location">
                                      {cityChildren}
                                  </AutoComplete>
                              </div>
                              <div class="intro-search-field">
                                  <label for ="intro-keywords" class="field-title ripple-effect">What job you want?</label>
                                  <AutoComplete 
                                  style={{ width: '100%' }} 
                                  
                                  onSearch={this.handleSearch} 
                                  onChange={this.handleChangeName}
                                  placeholder="Job Title or Keyword">
                                      {nameChildren}
                                  </AutoComplete>
                              </div>
                              <div class="intro-search-button">
                                  <button class="button ripple-effect" onClick={this.handleSearchSubmit}>Search</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <ul class="intro-stats margin-top-45 hide-under-992px">
                              <li>	<strong class="counter">{this.state.servicescompleted}</strong>
                                  <span>Service Completed</span>
                              </li>
                              <li>	<strong class="counter">{this.state.servicesposted}</strong>
                                  <span>Services Posted</span>
                              </li>
                              <li>	<strong class="counter">{this.state.numberofvendors}</strong>
                                  <span>Vendors</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
  }
  
export default withRouter(IntroBanner);