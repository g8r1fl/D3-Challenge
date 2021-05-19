// @TODO: YOUR CODE HERE!
// get selector to svg 16-1 ex #7
// var svg = d3.select("#scatter").append("svg")

// svg.attr("width", "400px").attr("height", "300px");

// //  make a function
// function upddateData(selection, data, ycol, xcol){
    
//     selection.selectAll("which svg element goes here?")
//     .data(data)
//     .enter()
//     .append()
//     .attr("cx" /*set x position based on xcol */)
//     .attr("cy" /*set xyposition based on xcol */)
// }
    
// need to create axis labels and binding click events

// read in the data csv
const mydata = d3.csv('data/data.csv');
mydata.then(data => {
    console.log(data);
    // create update function 16-1 Ex04
    // then run update func on the data
    // you can hardcode the col to start (lacks healthcare, in poverty )
    // here is where we'll bind our click events to not have to call d3.json again
    // d3.select();

}).catch(error => {
    // handle error
    console.log(error);   
 });