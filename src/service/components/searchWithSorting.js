import React, { Component } from 'react'

export default class SearchWithSorting extends Component {
  render() {
    return (
        <div class="notify-box margin-top-15">
        <div class="switch-container" style={{width: '60%',height: '50px'}}>
            <div class="input-with-icon-left no-border">
                <i class="icon-material-outline-search"></i>
                <input type="text" class="input-text" placeholder="Search" />
            </div>
            
        </div>
        <div class="sort-by" style={{marginTop: '10px'}}>	<span>Sort by:</span>
            <select class="selectpicker hide-tick" onChange={(e)=>{this.props.sortList(e.target.value)}}>
                <option value="popular">Popular</option>
                <option value="top_rated">Highest Rated</option>
                <option value="price_to_high">Price Low to High</option>
                <option value="price_to_low">Price High to Low</option>
            </select>
        </div>
    </div>
    )
  }
}
