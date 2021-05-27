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
var svgHeight = 700;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 90,
  left: 100
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
// initial params for yaxis
var chosenYAxis = "healthcare";

// funcition used for updating x-scale when axis label clicked RETURNS xLinearscale
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);
  return xLinearScale  
}

// funcition used for updating x-scale when axis label clicked RETURNS yLinearscale
function yScale(data, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
      d3.max(data, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);
  return yLinearScale  
}

// function used for updating x-scale var when clicked
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

function renderYAxes(newYScale, yAxis) {

  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}

// function for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, yLinearScale, chosenXAxis, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]));
  return circlesGroup;  
}

// function for updating y circles group with a transition to new circles
function renderYCircles(circlesGroup, newYScale, xLinearScale, chosenYAxis, chosenXAxis) {
  
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;  
}

// function for updaiting tooltip on circles
function updateToolTip(chosenXAxis, circlesGroup) {
  var label;

  //  lebels ={"poverty": "In Povrty (%)"} I can put Y axis here in the dict also
  // `${labels[chosenXAxis]}`
  // d3 tip unbind 

  if (chosenXAxis === "poverty") {
    label = "In Poverty (%)";
  }
  else if (chosenXAxis === "age") {
    label = "Age (Median";
  }
  else {
    label = "Househole Income (Median)";
  }
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(d => (`${label} ${d[chosenXAxis]}`));
  
  circlesGroup.call(toolTip);
  
  circlesGroup.on("mouseover", function(data) {
    toolTip.hide(data);
  })
    // onmouseout event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });

  return circlesGroup;
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
    var yLinearScale = yScale(data, chosenYAxis);

    // create y scale function
    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(data, d => d.healthcare)])
    //   .range([height, 0]);

    // create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale); //she mentioned y is reversed when used scale in D3

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
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("r", 10)
      .attr("fill", "blue")
      .attr("opacity", ".5")
      .text(d => d.abbr);

    // create group for three x-axis labels
    var labelsXGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("In Poverty (%)");

    var ageLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age") // value to grab for event listener
      .classed("inactive", true)
      .text("Age (Median");

    var incomeLabel = labelsXGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Househole Income (Median)"); 

    // create group for three y-axis labels
    var labelsYGroup = chartGroup.append("g")
      .call(leftAxis);
      // .attr("transform", `translate(${height / 2}, ${75 - margin.left})`);
   
    // append y-axis
    var healthcareLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .attr("value", "healthcare")
      .classed("active", true)
      .classed("aText", true)
      .text("Lacks Healthcare (%)");
       
    var smokesLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)") 
      .attr("y", 25 - margin.left)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .attr("value", "smokes")
      .classed("inactive", true)
      .classed("aText", true)
      .text("Smokes (%)");

    var obesityLabel = labelsYGroup.append("text")
      .attr("transform", "rotate(-90)") 
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .attr("value", "obesity")
      .classed("inactive", true)
      .classed("aText", true)
      .text("Obese (%)");
      

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);  

    // xaxis labes event listener
    labelsXGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value != chosenXAxis) {

          // replaces chosenxaxis with value
          chosenXAxis = value;
          console.log(chosenXAxis);
          

          // functions above csv iport
          // updates x scale for new data
          xLinearScale = xScale(data, chosenXAxis);
          yLinearScale = yScale(data, chosenYAxis);

          // updates x axis wth transition
          xAxis = renderAxes(xLinearScale, xAxis);
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
          // updates tooltips
          circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

          // change classes to change bold text
          if (chosenXAxis === "poverty") {
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "age") {
            ageLabel
              .classed("active", true)
              .classed("inactive", false);
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
          }
            
        }
      });

    // yaxis labes event listener
    labelsYGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value != chosenYAxis) {

          // replaces chosenYaxis with value
          chosenYAxis = value;
          console.log(chosenYAxis);
          console.log(chosenXAxis);

          // functions above csv iport
          // updates y scale for new data
          yLinearScale = yScale(data, chosenYAxis);
          xLinearScale = xScale(data, chosenXAxis);
          
          // updates y axis wth transition
          yAxis = renderYAxes(yLinearScale, yAxis);
          // updates circles with new y values
          circlesGroup = renderYCircles(circlesGroup, yLinearScale, xLinearScale, chosenYAxis, chosenXAxis);
          // updates tooltips
          circlesGroup = updateToolTip(chosenYAxis, circlesGroup);
            
        }
      });

      // changes clsses to change bold text

    
    // upddateData(chartGroup, data, "ycol", "xcol");
}).catch(error => {
    // handle error
    console.log(error);   
 });