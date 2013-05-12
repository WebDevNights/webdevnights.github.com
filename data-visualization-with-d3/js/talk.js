var dataset = [];
var graphHeight = 350;
var graphWidth = 960;
var leftPadding = 75;
var bottomPadding = 60;


$(document).ready(function () {

		dataset = stemCount;
		
		drawD3Graph();
		drawMorrisGraph();
});	