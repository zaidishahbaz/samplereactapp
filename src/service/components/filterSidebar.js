import React, { Component } from 'react';
import {Slider} from 'antd';
import 'antd/dist/antd.css';
// import ReactBootstrapSlider from ;

export default class FilterSidebar extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            sliderRange: [10,1500]
        }
    }

    onChange(value){
        console.log(value)
    }

  render() {
    return (
        <div className="sidebar-container">
						
        <div className="sidebar-widget">
            <h3>Average Rating</h3>
            <div className="switches-list">
                <div className="switch-container">
                    <div className="checkbox">
                        <input type="checkbox" id="chekcbox1" onChange={(e)=>e.target.checked?this.props.filterRating({kind:'4+',val:'4+'}):this.props.filterRating({kind:'4+',val:''})} />
                        <label for="chekcbox1"><span className="checkbox-icon"></span> 4 +</label>
                    </div>
                </div>
                <div className="switch-container">
                    <div className="checkbox">
                        <input type="checkbox" id="chekcbox2" onChange={(e)=>e.target.checked?this.props.filterRating({kind:'3+',val:'3+'}):this.props.filterRating({kind:'3+',val:''})} />
                        <label for="chekcbox2"><span className="checkbox-icon"></span> 3 +</label>
                    </div>
                </div>
                <div className="switch-container">
                    <div className="checkbox">
                        <input type="checkbox" id="chekcbox3" onChange={(e)=>e.target.checked?this.props.filterRating({kind:'2+',val:'2+'}):this.props.filterRating({kind:'2+',val:''})} />
                        <label for="chekcbox3"><span className="checkbox-icon"></span> 2 +</label>
                    </div>
                </div>
                <div className="switch-container">
                    <div className="checkbox">
                        <input type="checkbox" id="chekcbox4" onChange={(e)=>e.target.checked?this.props.filterRating({kind:'1+',val:'1+'}):this.props.filterRating({kind:'1+',val:''})} />
                        <label for="chekcbox4"><span className="checkbox-icon"></span> 1 +</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="sidebar-widget">
            <h3>Service Cost</h3>
            <div className="margin-top-55"></div>
            <div className="tooltip tooltip-max top" onClick={()=>console.log('stuff')}></div>
            <Slider range defaultValue={[1, 1500]}  onChange={this.onChange}/>
            {/* <input className="range-slider" type="text" value={this.state.sliderValue} onInput={(e)=>{this.props.rangeFilter('e')}} data-slider-currency="$" data-slider-min="10" data-slider-max="1500" data-slider-step="10" data-slider-value="[10,1500]" onChange={(e)=>{this.setState({sliderValue:e.target.value})}} /> */}
        </div>
    </div>
    )
  }
}
