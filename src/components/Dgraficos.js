import React, { Component } from 'react';
import * as d3 from "d3";

class PrimerGrafico extends Component {

   componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    //const data = [12, 5, 6, 6, 9, 10];
    const data = this.props.data;
    
    
    const svg = d3.select("#" + this.props.id)
        .append("svg")
        .attr("width", this.props.width)
        .attr("height", this.props.height)
        .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => this.props.height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
  }
        
  render(){
    return <div></div>
  }
}



export default PrimerGrafico;