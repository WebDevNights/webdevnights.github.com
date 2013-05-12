function drawD3Graph() {
var maxValue = d3.entries(dataset.stems)
    .sort(function(a, b) { return d3.descending(a.count, b.count); })
    [0].value.count; 

var xScale = d3.scale.ordinal()
	.domain(d3.range(dataset.stems.length))
	.rangeRoundBands([leftPadding, graphWidth - leftPadding], 0.05);  //randgeRound ensures whole numbers
			
var yScale = d3.scale.linear()  //how to scale domain to range could also be pow, sqrt
	.domain([0, maxValue])  //range of input values
	.range([0, graphHeight - bottomPadding]); //range of output values
			
var yAxisScale = d3.scale.linear()  //how to scale domain to range could also be pow, sqrt
	.domain([0, maxValue])  //range of input values
	.range([graphHeight - bottomPadding, 0]); //range of output values			
				
//Define X axis
var xAxis = d3.svg.axis()
	  .scale(xScale)
	  .orient("bottom")
	  .ticks(5) //aprox numebr of ticks
	  .tickFormat(function(i) {
	  	 return dataset.stems[i].stem;
	  });
				 

//Define Y axis
var yAxis = d3.svg.axis()
	  .scale(yAxisScale)
	  .orient("left")
	  .ticks(5);			

//Create SVG element
var svg = d3.select("#samesame-d3")
	.append("svg")
	.attr("width", graphWidth)
	.attr("height", graphHeight);

//Create bars
svg.selectAll("rect")
   .data(dataset.stems)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {  //d is the data object, i is a counter
   		return xScale(i); //2 * i gives some padding between bars
   })
   .attr("y", function(d) {
   		return graphHeight - yScale(d.count) - bottomPadding;
   })
   .attr("width", xScale.rangeBand() - 2)
   .attr("height", function(d) {
   		return yScale(d.count);
   })
   .attr("fill", function(d) {
		//return "rgb(0, 0, " + (d.capital * 256) + ")";
		return "blue";
   })
   .on("mouseover", function(d) {

		//Get this bar's x/y values, then augment for the tooltip
		var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
		var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + graphHeight / 2;
	
		//Update the tooltip position and value
		d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px");					
		d3.select("#count")
			.text(d.count);
		d3.select("#stem")
			.text(d.stem);
	   
			//Show the tooltip
		d3.select("#tooltip").classed("hidden", false);

   })
   .on("mouseout", function() {
		//Hide the tooltip
		d3.select("#tooltip").classed("hidden", true);		
   });
   

   //Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + (graphHeight - bottomPadding) + ")")
	.call(xAxis)
	.selectAll("text")  //http://www.d3noob.org/2013/01/how-to-rotate-text-labels-for-x-axis-of.html
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)" 
            });;

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + leftPadding + ",0)")
	.call(yAxis);

}