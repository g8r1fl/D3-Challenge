// @TODO: YOUR CODE HERE!
// get selector to svg 16-1 ex #7
// HW help 2/3
// set up margins, h, w, create initial transform
// all the stuff we do at the top of our graphs from day 2
// get selector to svg
// Define SVG area dimensions
// HW help 3/3 use 16-3 Ex 12 for transitioning axes 
// min 7:30 she explains axes change checklist
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial params for xaxis
var chosenXAxis = "poverty";

// funcition used for updating x-scale when axis label clicked
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);
  return xLinearScale  
}

// function used for updating x-scale var when clicked
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

// function for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;  
}

// function for updaiting tooltip on circles
function updateToolTip(chosenXAxis, circlesGroup) {
  var label;

  if (chosenXAxis === "poverty") {
    label = "In Poverty (%)";
  }
  if (chosenXAxis === "age") {
    label = "Age (Median";
  }
  else {
    label = "Househole Income (Median)";
  }
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(d => (`${label} ${d[chosenXAxis]}`));
  circlesGroup.call(tooltip);
  circlesGroup.on("mouseover", function(data, index) {
    toolTip.hide(data);
  });

  return circlesGroup;
  
}
// //  make a function
function upddateData(chartGroup, data, ycol, xcol){
    
    chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => d.poverty)
    .attr("cy", d=> d.healthcare)
    .attr("r", 10);
}
    


// read in the data csv
d3.csv('assets/data/data.csv').then(data => {
    console.log(data);
    
    // parse data
    data.forEach(elem => {
      elem.poverty = +elem.poverty;
      elem.age = +elem.age;
      elem.income = +elem.income;
      elem.healthcare = +elem.healthcare;
      elem.obesity = +elem.obesity;
      elem.smokes = +elem.smokes;
      // console.log(elem.smokes);
    });
    
    //xLinearScale funciton from abouve csv import
    var xLinearScale = xScale(data, chosenXAxis);

    // create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed(".active", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    // append y axis
    var yAxis = chartGroup.append("g")
      .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 10)
      .attr("fill", "blue")
      .attr("opacity", ".5");

    // create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("In Poverty (%)");

    var ageLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (Median");

    var incomeLabel = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Househole Income (Median)");    
      
    // append y-axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .classed("active", true)
      .text("Lacks Healthcare (%)");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);  

    
    upddateData(chartGroup, data, "ycol", "xcol");
}).catch(error => {
    // handle error
    console.log(error);   
 });