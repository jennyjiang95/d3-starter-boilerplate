
// this is my App

console.log("this is assignment 2 by Shangjun (Jenny) Jiang")

// making a d3 selection of the canvas element

var canvas = d3.select('canvas');

// then we get access to the Canvas Web API
var context = canvas.node().getContext('2d');
//direct stuff

// width and height of canvas
// use ParseInt to converse to numbers
var width = parseInt(canvas.attr('width'));
var height = parseInt(canvas.attr('height'));

//context.fillStyle = 'yellow';
//context.fillRect (0,0,width,height);

//create borders 
context.strokeStyle = "magenta";
context.strokeRect(0, 0, width, height);    //rectangle without a fill. with a stroke. 

//specifiy margins in an object
var margin = {
	top: 20,
	bottom: 40,
	left: 30,
	right: 20
};

// reassign width and height to account for margins
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

//breath an extra space
context.translate(margin.left,margin.top);

// draw another rectangle
context.strokeStyle = "blue";
//context.strokeRect(0,0,width,height);

var data = [21, 50, 10, 35, 90, 12, 67, 5, 180];

//method change

// set up a y scale function with domain and range
var yScale = d3.scaleLinear()
.domain([0, d3.max(data)])
.rangeRound([height, 0]);  // draw from bottom up. 
//rangeRound

// set up a x scale function with domain and range
var xScale = d3.scaleBand()
.domain(data)
.range([0,width])
.padding(0.1);


context.fillStyle = "teal"

// scale for x-axis and y-axis
// d for data i for index
// loop over the data


data.forEach(function(d, i) {   //use our index


	// context.fillRect(x1, y1, x2, y2)   x2 bar width  y2 bar height
	//var barPadding = 5;
	//var barWidth = 30;

	// draw some bars!
	// context.fillRect(
	//	(i * barWidth) + barPadding, 
	//	height - d, 
	//	30, 
	//	d
	//	);


	//START OVER

	context.fillRect(
		xScale(d), 
		yScale(d), 
		xScale.bandwidth(), 
		height - yScale(d)
		);
}); 



// scale trying to solve the manual thing. 

//xScale.bandwidth


// Draw an x-axis tick marks at the bottom of our bars
// tell canvas we want to draw a new path

context.beginPath();

// iterate over x domain values
xScale.domain().forEach(function(d) {
	context.moveTo(xScale(d) + xScale.bandwidth() / 2, height);
	context.lineTo(xScale(d) + xScale.bandwidth() / 2, height + 6);
});

// line one move the pen
// line two draw the line


// set the fill style
context.fillStyle= "#000";
//context.strokeStyle = "#000";
//create the stoke
context.stroke();


// create labels
// labels for the x-axies
// set up text properties 
context.textAlign = 'center';
context.textBaseline = 'top'; 


//render x lables
xScale.domain().forEach(function(d, i) {
	context.fillText(i, xScale(d) + xScale.bandwidth() / 2, height + 10);
});


// lables for each bar's value
context.textBaseline = "bottom";
// values for each bar
xScale.domain().forEach(function(d, i) {
	context.fillText(d, xScale(d) + xScale.bandwidth() / 2, yScale(d));
});


// y axis
var yTickCount = 10;
var yTicks = yScale.ticks(yTickCount);

//
yTicks.forEach(function(d) {
	context.moveTo(0, yScale(d) + 0.5);
	context.lineTo(-6, yScale(d) + 0.5);
});


context.stroke();

// y axis labels
context.textAlign = "right";
context.textBaseline = "middle";

yTicks.forEach(function(d){
	context.fillText(d, -9, yScale(d));
});


// how about that vertical line for the y axis?

context.beginPath();
context.lineTo(0.5, 0.5);
context.lineTo(0.5, height + 0.5);
context.stroke();

//transition from 0 0 to others
context.save();
context.rotate(- Math.PI / 2);
context.textAlign = 'right';
context.textBaseline = 'top';
context.fillText('Fake Values', -10, 10);
context.restore();















































