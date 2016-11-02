// /*!
//  * Chart.js
//  * http://chartjs.org/
//  * Version: 1.0.2
//  *
//  * Copyright 2015 Nick Downie
//  * Released under the MIT license
//  * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
//  */
//
//
// (function(){
//
// 	"use strict";
//
// 	//Declare root variable - window in the browser, global on the server
// 	var root = this,
// 		previous = root.Chart;
//
// 	//Occupy the global variable of Chart, and create a simple base class
// 	var Chart = function(context){
// 		var chart = this;
// 		this.canvas = context.canvas;
//
// 		this.ctx = context;
//
// 		//Variables global to the chart
// 		var computeDimension = function(element,dimension)
// 		{
// 			if (element['offset'+dimension])
// 			{
// 				return element['offset'+dimension];
// 			}
// 			else
// 			{
// 				return document.defaultView.getComputedStyle(element).getPropertyValue(dimension);
// 			}
// 		}
//
// 		var width = this.width = computeDimension(context.canvas,'Width');
// 		var height = this.height = computeDimension(context.canvas,'Height');
//
// 		// Firefox requires this to work correctly
// 		context.canvas.width  = width;
// 		context.canvas.height = height;
//
// 		var width = this.width = context.canvas.width;
// 		var height = this.height = context.canvas.height;
// 		this.aspectRatio = this.width / this.height;
// 		//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
// 		helpers.retinaScale(this);
//
// 		return this;
// 	};
// 	//Globally expose the defaults to allow for user updating/changing
// 	Chart.defaults = {
// 		global: {
// 			// Boolean - Whether to animate the chart
// 			animation: true,
//
// 			// Number - Number of animation steps
// 			animationSteps: 60,
//
// 			// String - Animation easing effect
// 			animationEasing: "easeOutQuart",
//
// 			// Boolean - If we should show the scale at all
// 			showScale: true,
//
// 			// Boolean - If we want to override with a hard coded scale
// 			scaleOverride: false,
//
// 			// ** Required if scaleOverride is true **
// 			// Number - The number of steps in a hard coded scale
// 			scaleSteps: null,
// 			// Number - The value jump in the hard coded scale
// 			scaleStepWidth: null,
// 			// Number - The scale starting value
// 			scaleStartValue: null,
//
// 			// String - Colour of the scale line
// 			scaleLineColor: "rgba(0,0,0,.1)",
//
// 			// Number - Pixel width of the scale line
// 			scaleLineWidth: 1,
//
// 			// Boolean - Whether to show labels on the scale
// 			scaleShowLabels: true,
//
// 			// Interpolated JS string - can access value
// 			scaleLabel: "<%=value%>",
//
// 			// Boolean - Whether the scale should stick to integers, and not show any floats even if drawing space is there
// 			scaleIntegersOnly: true,
//
// 			// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
// 			scaleBeginAtZero: false,
//
// 			// String - Scale label font declaration for the scale label
// 			scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//
// 			// Number - Scale label font size in pixels
// 			scaleFontSize: 12,
//
// 			// String - Scale label font weight style
// 			scaleFontStyle: "normal",
//
// 			// String - Scale label font colour
// 			scaleFontColor: "#666",
//
// 			// Boolean - whether or not the chart should be responsive and resize when the browser does.
// 			responsive: false,
//
// 			// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
// 			maintainAspectRatio: true,
//
// 			// Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
// 			showTooltips: true,
//
// 			// Boolean - Determines whether to draw built-in tooltip or call custom tooltip function
// 			customTooltips: false,
//
// 			// Array - Array of string names to attach tooltip events
// 			tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
//
// 			// String - Tooltip background colour
// 			tooltipFillColor: "rgba(0,0,0,0.8)",
//
// 			// String - Tooltip label font declaration for the scale label
// 			tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//
// 			// Number - Tooltip label font size in pixels
// 			tooltipFontSize: 14,
//
// 			// String - Tooltip font weight style
// 			tooltipFontStyle: "normal",
//
// 			// String - Tooltip label font colour
// 			tooltipFontColor: "#fff",
//
// 			// String - Tooltip title font declaration for the scale label
// 			tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//
// 			// Number - Tooltip title font size in pixels
// 			tooltipTitleFontSize: 14,
//
// 			// String - Tooltip title font weight style
// 			tooltipTitleFontStyle: "bold",
//
// 			// String - Tooltip title font colour
// 			tooltipTitleFontColor: "#fff",
//
// 			// Number - pixel width of padding around tooltip text
// 			tooltipYPadding: 6,
//
// 			// Number - pixel width of padding around tooltip text
// 			tooltipXPadding: 6,
//
// 			// Number - Size of the caret on the tooltip
// 			tooltipCaretSize: 8,
//
// 			// Number - Pixel radius of the tooltip border
// 			tooltipCornerRadius: 6,
//
// 			// Number - Pixel offset from point x to tooltip edge
// 			tooltipXOffset: 10,
//
// 			// String - Template string for single tooltips
// 			tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
//
// 			// String - Template string for single tooltips
// 			multiTooltipTemplate: "<%= value %>",
//
// 			// String - Colour behind the legend colour block
// 			multiTooltipKeyBackground: '#fff',
//
// 			// Function - Will fire on animation progression.
// 			onAnimationProgress: function(){},
//
// 			// Function - Will fire on animation completion.
// 			onAnimationComplete: function(){}
//
// 		}
// 	};
//
// 	//Create a dictionary of chart types, to allow for extension of existing types
// 	Chart.types = {};
//
// 	//Global Chart helpers object for utility methods and classes
// 	var helpers = Chart.helpers = {};
//
// 		//-- Basic js utility methods
// 	var each = helpers.each = function(loopable,callback,self){
// 			var additionalArgs = Array.prototype.slice.call(arguments, 3);
// 			// Check to see if null or undefined firstly.
// 			if (loopable){
// 				if (loopable.length === +loopable.length){
// 					var i;
// 					for (i=0; i<loopable.length; i++){
// 						callback.apply(self,[loopable[i], i].concat(additionalArgs));
// 					}
// 				}
// 				else{
// 					for (var item in loopable){
// 						callback.apply(self,[loopable[item],item].concat(additionalArgs));
// 					}
// 				}
// 			}
// 		},
// 		clone = helpers.clone = function(obj){
// 			var objClone = {};
// 			each(obj,function(value,key){
// 				if (obj.hasOwnProperty(key)) objClone[key] = value;
// 			});
// 			return objClone;
// 		},
// 		extend = helpers.extend = function(base){
// 			each(Array.prototype.slice.call(arguments,1), function(extensionObject) {
// 				each(extensionObject,function(value,key){
// 					if (extensionObject.hasOwnProperty(key)) base[key] = value;
// 				});
// 			});
// 			return base;
// 		},
// 		merge = helpers.merge = function(base,master){
// 			//Merge properties in left object over to a shallow clone of object right.
// 			var args = Array.prototype.slice.call(arguments,0);
// 			args.unshift({});
// 			return extend.apply(null, args);
// 		},
// 		indexOf = helpers.indexOf = function(arrayToSearch, item){
// 			if (Array.prototype.indexOf) {
// 				return arrayToSearch.indexOf(item);
// 			}
// 			else{
// 				for (var i = 0; i < arrayToSearch.length; i++) {
// 					if (arrayToSearch[i] === item) return i;
// 				}
// 				return -1;
// 			}
// 		},
// 		where = helpers.where = function(collection, filterCallback){
// 			var filtered = [];
//
// 			helpers.each(collection, function(item){
// 				if (filterCallback(item)){
// 					filtered.push(item);
// 				}
// 			});
//
// 			return filtered;
// 		},
// 		findNextWhere = helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex){
// 			// Default to start of the array
// 			if (!startIndex){
// 				startIndex = -1;
// 			}
// 			for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
// 				var currentItem = arrayToSearch[i];
// 				if (filterCallback(currentItem)){
// 					return currentItem;
// 				}
// 			}
// 		},
// 		findPreviousWhere = helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex){
// 			// Default to end of the array
// 			if (!startIndex){
// 				startIndex = arrayToSearch.length;
// 			}
// 			for (var i = startIndex - 1; i >= 0; i--) {
// 				var currentItem = arrayToSearch[i];
// 				if (filterCallback(currentItem)){
// 					return currentItem;
// 				}
// 			}
// 		},
// 		inherits = helpers.inherits = function(extensions){
// 			//Basic javascript inheritance based on the model created in Backbone.js
// 			var parent = this;
// 			var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function(){ return parent.apply(this, arguments); };
//
// 			var Surrogate = function(){ this.constructor = ChartElement;};
// 			Surrogate.prototype = parent.prototype;
// 			ChartElement.prototype = new Surrogate();
//
// 			ChartElement.extend = inherits;
//
// 			if (extensions) extend(ChartElement.prototype, extensions);
//
// 			ChartElement.__super__ = parent.prototype;
//
// 			return ChartElement;
// 		},
// 		noop = helpers.noop = function(){},
// 		uid = helpers.uid = (function(){
// 			var id=0;
// 			return function(){
// 				return "chart-" + id++;
// 			};
// 		})(),
// 		warn = helpers.warn = function(str){
// 			//Method for warning of errors
// 			if (window.console && typeof window.console.warn == "function") console.warn(str);
// 		},
// 		amd = helpers.amd = (typeof define == 'function' && define.amd),
// 		//-- Math methods
// 		isNumber = helpers.isNumber = function(n){
// 			return !isNaN(parseFloat(n)) && isFinite(n);
// 		},
// 		max = helpers.max = function(array){
// 			return Math.max.apply( Math, array );
// 		},
// 		min = helpers.min = function(array){
// 			return Math.min.apply( Math, array );
// 		},
// 		cap = helpers.cap = function(valueToCap,maxValue,minValue){
// 			if(isNumber(maxValue)) {
// 				if( valueToCap > maxValue ) {
// 					return maxValue;
// 				}
// 			}
// 			else if(isNumber(minValue)){
// 				if ( valueToCap < minValue ){
// 					return minValue;
// 				}
// 			}
// 			return valueToCap;
// 		},
// 		getDecimalPlaces = helpers.getDecimalPlaces = function(num){
// 			if (num%1!==0 && isNumber(num)){
// 				return num.toString().split(".")[1].length;
// 			}
// 			else {
// 				return 0;
// 			}
// 		},
// 		toRadians = helpers.radians = function(degrees){
// 			return degrees * (Math.PI/180);
// 		},
// 		// Gets the angle from vertical upright to the point about a centre.
// 		getAngleFromPoint = helpers.getAngleFromPoint = function(centrePoint, anglePoint){
// 			var distanceFromXCenter = anglePoint.x - centrePoint.x,
// 				distanceFromYCenter = anglePoint.y - centrePoint.y,
// 				radialDistanceFromCenter = Math.sqrt( distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
//
//
// 			var angle = Math.PI * 2 + Math.atan2(distanceFromYCenter, distanceFromXCenter);
//
// 			//If the segment is in the top left quadrant, we need to add another rotation to the angle
// 			if (distanceFromXCenter < 0 && distanceFromYCenter < 0){
// 				angle += Math.PI*2;
// 			}
//
// 			return {
// 				angle: angle,
// 				distance: radialDistanceFromCenter
// 			};
// 		},
// 		aliasPixel = helpers.aliasPixel = function(pixelWidth){
// 			return (pixelWidth % 2 === 0) ? 0 : 0.5;
// 		},
// 		splineCurve = helpers.splineCurve = function(FirstPoint,MiddlePoint,AfterPoint,t){
// 			//Props to Rob Spencer at scaled innovation for his post on splining between points
// 			//http://scaledinnovation.com/analytics/splines/aboutSplines.html
// 			var d01=Math.sqrt(Math.pow(MiddlePoint.x-FirstPoint.x,2)+Math.pow(MiddlePoint.y-FirstPoint.y,2)),
// 				d12=Math.sqrt(Math.pow(AfterPoint.x-MiddlePoint.x,2)+Math.pow(AfterPoint.y-MiddlePoint.y,2)),
// 				fa=t*d01/(d01+d12),// scaling factor for triangle Ta
// 				fb=t*d12/(d01+d12);
// 			return {
// 				inner : {
// 					x : MiddlePoint.x-fa*(AfterPoint.x-FirstPoint.x),
// 					y : MiddlePoint.y-fa*(AfterPoint.y-FirstPoint.y)
// 				},
// 				outer : {
// 					x: MiddlePoint.x+fb*(AfterPoint.x-FirstPoint.x),
// 					y : MiddlePoint.y+fb*(AfterPoint.y-FirstPoint.y)
// 				}
// 			};
// 		},
// 		calculateOrderOfMagnitude = helpers.calculateOrderOfMagnitude = function(val){
// 			return Math.floor(Math.log(val) / Math.LN10);
// 		},
// 		calculateScaleRange = helpers.calculateScaleRange = function(valuesArray, drawingSize, textSize, startFromZero, integersOnly){
//
// 			//Set a minimum step of two - a point at the top of the graph, and a point at the base
// 			var minSteps = 2,
// 				maxSteps = Math.floor(drawingSize/(textSize * 1.5)),
// 				skipFitting = (minSteps >= maxSteps);
//
// 			var maxValue = max(valuesArray),
// 				minValue = min(valuesArray);
//
// 			// We need some degree of seperation here to calculate the scales if all the values are the same
// 			// Adding/minusing 0.5 will give us a range of 1.
// 			if (maxValue === minValue){
// 				maxValue += 0.5;
// 				// So we don't end up with a graph with a negative start value if we've said always start from zero
// 				if (minValue >= 0.5 && !startFromZero){
// 					minValue -= 0.5;
// 				}
// 				else{
// 					// Make up a whole number above the values
// 					maxValue += 0.5;
// 				}
// 			}
//
// 			var	valueRange = Math.abs(maxValue - minValue),
// 				rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange),
// 				graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
// 				graphMin = (startFromZero) ? 0 : Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
// 				graphRange = graphMax - graphMin,
// 				stepValue = Math.pow(10, rangeOrderOfMagnitude),
// 				numberOfSteps = Math.round(graphRange / stepValue);
//
// 			//If we have more space on the graph we'll use it to give more definition to the data
// 			while((numberOfSteps > maxSteps || (numberOfSteps * 2) < maxSteps) && !skipFitting) {
// 				if(numberOfSteps > maxSteps){
// 					stepValue *=2;
// 					numberOfSteps = Math.round(graphRange/stepValue);
// 					// Don't ever deal with a decimal number of steps - cancel fitting and just use the minimum number of steps.
// 					if (numberOfSteps % 1 !== 0){
// 						skipFitting = true;
// 					}
// 				}
// 				//We can fit in double the amount of scale points on the scale
// 				else{
// 					//If user has declared ints only, and the step value isn't a decimal
// 					if (integersOnly && rangeOrderOfMagnitude >= 0){
// 						//If the user has said integers only, we need to check that making the scale more granular wouldn't make it a float
// 						if(stepValue/2 % 1 === 0){
// 							stepValue /=2;
// 							numberOfSteps = Math.round(graphRange/stepValue);
// 						}
// 						//If it would make it a float break out of the loop
// 						else{
// 							break;
// 						}
// 					}
// 					//If the scale doesn't have to be an int, make the scale more granular anyway.
// 					else{
// 						stepValue /=2;
// 						numberOfSteps = Math.round(graphRange/stepValue);
// 					}
//
// 				}
// 			}
//
// 			if (skipFitting){
// 				numberOfSteps = minSteps;
// 				stepValue = graphRange / numberOfSteps;
// 			}
//
// 			return {
// 				steps : numberOfSteps,
// 				stepValue : stepValue,
// 				min : graphMin,
// 				max	: graphMin + (numberOfSteps * stepValue)
// 			};
//
// 		},
// 		/* jshint ignore:start */
// 		// Blows up jshint errors based on the new Function constructor
// 		//Templating methods
// 		//Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
// 		template = helpers.template = function(templateString, valuesObject){
//
// 			// If templateString is function rather than string-template - call the function for valuesObject
//
// 			if(templateString instanceof Function){
// 			 	return templateString(valuesObject);
// 		 	}
//
// 			var cache = {};
// 			function tmpl(str, data){
// 				// Figure out if we're getting a template, or if we need to
// 				// load the template - and be sure to cache the result.
// 				var fn = !/\W/.test(str) ?
// 				cache[str] = cache[str] :
//
// 				// Generate a reusable function that will serve as a template
// 				// generator (and which will be cached).
// 				new Function("obj",
// 					"var p=[],print=function(){p.push.apply(p,arguments);};" +
//
// 					// Introduce the data as local variables using with(){}
// 					"with(obj){p.push('" +
//
// 					// Convert the template into pure JavaScript
// 					str
// 						.replace(/[\r\t\n]/g, " ")
// 						.split("<%").join("\t")
// 						.replace(/((^|%>)[^\t]*)'/g, "$1\r")
// 						.replace(/\t=(.*?)%>/g, "',$1,'")
// 						.split("\t").join("');")
// 						.split("%>").join("p.push('")
// 						.split("\r").join("\\'") +
// 					"');}return p.join('');"
// 				);
//
// 				// Provide some basic currying to the user
// 				return data ? fn( data ) : fn;
// 			}
// 			return tmpl(templateString,valuesObject);
// 		},
// 		/* jshint ignore:end */
// 		generateLabels = helpers.generateLabels = function(templateString,numberOfSteps,graphMin,stepValue){
// 			var labelsArray = new Array(numberOfSteps);
// 			if (labelTemplateString){
// 				each(labelsArray,function(val,index){
// 					labelsArray[index] = template(templateString,{value: (graphMin + (stepValue*(index+1)))});
// 				});
// 			}
// 			return labelsArray;
// 		},
// 		//--Animation methods
// 		//Easing functions adapted from Robert Penner's easing equations
// 		//http://www.robertpenner.com/easing/
// 		easingEffects = helpers.easingEffects = {
// 			linear: function (t) {
// 				return t;
// 			},
// 			easeInQuad: function (t) {
// 				return t * t;
// 			},
// 			easeOutQuad: function (t) {
// 				return -1 * t * (t - 2);
// 			},
// 			easeInOutQuad: function (t) {
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
// 				return -1 / 2 * ((--t) * (t - 2) - 1);
// 			},
// 			easeInCubic: function (t) {
// 				return t * t * t;
// 			},
// 			easeOutCubic: function (t) {
// 				return 1 * ((t = t / 1 - 1) * t * t + 1);
// 			},
// 			easeInOutCubic: function (t) {
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
// 				return 1 / 2 * ((t -= 2) * t * t + 2);
// 			},
// 			easeInQuart: function (t) {
// 				return t * t * t * t;
// 			},
// 			easeOutQuart: function (t) {
// 				return -1 * ((t = t / 1 - 1) * t * t * t - 1);
// 			},
// 			easeInOutQuart: function (t) {
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
// 				return -1 / 2 * ((t -= 2) * t * t * t - 2);
// 			},
// 			easeInQuint: function (t) {
// 				return 1 * (t /= 1) * t * t * t * t;
// 			},
// 			easeOutQuint: function (t) {
// 				return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
// 			},
// 			easeInOutQuint: function (t) {
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
// 				return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
// 			},
// 			easeInSine: function (t) {
// 				return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
// 			},
// 			easeOutSine: function (t) {
// 				return 1 * Math.sin(t / 1 * (Math.PI / 2));
// 			},
// 			easeInOutSine: function (t) {
// 				return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
// 			},
// 			easeInExpo: function (t) {
// 				return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
// 			},
// 			easeOutExpo: function (t) {
// 				return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
// 			},
// 			easeInOutExpo: function (t) {
// 				if (t === 0) return 0;
// 				if (t === 1) return 1;
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
// 				return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
// 			},
// 			easeInCirc: function (t) {
// 				if (t >= 1) return t;
// 				return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
// 			},
// 			easeOutCirc: function (t) {
// 				return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
// 			},
// 			easeInOutCirc: function (t) {
// 				if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
// 				return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
// 			},
// 			easeInElastic: function (t) {
// 				var s = 1.70158;
// 				var p = 0;
// 				var a = 1;
// 				if (t === 0) return 0;
// 				if ((t /= 1) == 1) return 1;
// 				if (!p) p = 1 * 0.3;
// 				if (a < Math.abs(1)) {
// 					a = 1;
// 					s = p / 4;
// 				} else s = p / (2 * Math.PI) * Math.asin(1 / a);
// 				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
// 			},
// 			easeOutElastic: function (t) {
// 				var s = 1.70158;
// 				var p = 0;
// 				var a = 1;
// 				if (t === 0) return 0;
// 				if ((t /= 1) == 1) return 1;
// 				if (!p) p = 1 * 0.3;
// 				if (a < Math.abs(1)) {
// 					a = 1;
// 					s = p / 4;
// 				} else s = p / (2 * Math.PI) * Math.asin(1 / a);
// 				return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
// 			},
// 			easeInOutElastic: function (t) {
// 				var s = 1.70158;
// 				var p = 0;
// 				var a = 1;
// 				if (t === 0) return 0;
// 				if ((t /= 1 / 2) == 2) return 1;
// 				if (!p) p = 1 * (0.3 * 1.5);
// 				if (a < Math.abs(1)) {
// 					a = 1;
// 					s = p / 4;
// 				} else s = p / (2 * Math.PI) * Math.asin(1 / a);
// 				if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
// 				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
// 			},
// 			easeInBack: function (t) {
// 				var s = 1.70158;
// 				return 1 * (t /= 1) * t * ((s + 1) * t - s);
// 			},
// 			easeOutBack: function (t) {
// 				var s = 1.70158;
// 				return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
// 			},
// 			easeInOutBack: function (t) {
// 				var s = 1.70158;
// 				if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
// 				return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
// 			},
// 			easeInBounce: function (t) {
// 				return 1 - easingEffects.easeOutBounce(1 - t);
// 			},
// 			easeOutBounce: function (t) {
// 				if ((t /= 1) < (1 / 2.75)) {
// 					return 1 * (7.5625 * t * t);
// 				} else if (t < (2 / 2.75)) {
// 					return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
// 				} else if (t < (2.5 / 2.75)) {
// 					return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
// 				} else {
// 					return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
// 				}
// 			},
// 			easeInOutBounce: function (t) {
// 				if (t < 1 / 2) return easingEffects.easeInBounce(t * 2) * 0.5;
// 				return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
// 			}
// 		},
// 		//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// 		requestAnimFrame = helpers.requestAnimFrame = (function(){
// 			return window.requestAnimationFrame ||
// 				window.webkitRequestAnimationFrame ||
// 				window.mozRequestAnimationFrame ||
// 				window.oRequestAnimationFrame ||
// 				window.msRequestAnimationFrame ||
// 				function(callback) {
// 					return window.setTimeout(callback, 1000 / 60);
// 				};
// 		})(),
// 		cancelAnimFrame = helpers.cancelAnimFrame = (function(){
// 			return window.cancelAnimationFrame ||
// 				window.webkitCancelAnimationFrame ||
// 				window.mozCancelAnimationFrame ||
// 				window.oCancelAnimationFrame ||
// 				window.msCancelAnimationFrame ||
// 				function(callback) {
// 					return window.clearTimeout(callback, 1000 / 60);
// 				};
// 		})(),
// 		animationLoop = helpers.animationLoop = function(callback,totalSteps,easingString,onProgress,onComplete,chartInstance){
//
// 			var currentStep = 0,
// 				easingFunction = easingEffects[easingString] || easingEffects.linear;
//
// 			var animationFrame = function(){
// 				currentStep++;
// 				var stepDecimal = currentStep/totalSteps;
// 				var easeDecimal = easingFunction(stepDecimal);
//
// 				callback.call(chartInstance,easeDecimal,stepDecimal, currentStep);
// 				onProgress.call(chartInstance,easeDecimal,stepDecimal);
// 				if (currentStep < totalSteps){
// 					chartInstance.animationFrame = requestAnimFrame(animationFrame);
// 				} else{
// 					onComplete.apply(chartInstance);
// 				}
// 			};
// 			requestAnimFrame(animationFrame);
// 		},
// 		//-- DOM methods
// 		getRelativePosition = helpers.getRelativePosition = function(evt){
// 			var mouseX, mouseY;
// 			var e = evt.originalEvent || evt,
// 				canvas = evt.currentTarget || evt.srcElement,
// 				boundingRect = canvas.getBoundingClientRect();
//
// 			if (e.touches){
// 				mouseX = e.touches[0].clientX - boundingRect.left;
// 				mouseY = e.touches[0].clientY - boundingRect.top;
//
// 			}
// 			else{
// 				mouseX = e.clientX - boundingRect.left;
// 				mouseY = e.clientY - boundingRect.top;
// 			}
//
// 			return {
// 				x : mouseX,
// 				y : mouseY
// 			};
//
// 		},
// 		addEvent = helpers.addEvent = function(node,eventType,method){
// 			if (node.addEventListener){
// 				node.addEventListener(eventType,method);
// 			} else if (node.attachEvent){
// 				node.attachEvent("on"+eventType, method);
// 			} else {
// 				node["on"+eventType] = method;
// 			}
// 		},
// 		removeEvent = helpers.removeEvent = function(node, eventType, handler){
// 			if (node.removeEventListener){
// 				node.removeEventListener(eventType, handler, false);
// 			} else if (node.detachEvent){
// 				node.detachEvent("on"+eventType,handler);
// 			} else{
// 				node["on" + eventType] = noop;
// 			}
// 		},
// 		bindEvents = helpers.bindEvents = function(chartInstance, arrayOfEvents, handler){
// 			// Create the events object if it's not already present
// 			if (!chartInstance.events) chartInstance.events = {};
//
// 			each(arrayOfEvents,function(eventName){
// 				chartInstance.events[eventName] = function(){
// 					handler.apply(chartInstance, arguments);
// 				};
// 				addEvent(chartInstance.chart.canvas,eventName,chartInstance.events[eventName]);
// 			});
// 		},
// 		unbindEvents = helpers.unbindEvents = function (chartInstance, arrayOfEvents) {
// 			each(arrayOfEvents, function(handler,eventName){
// 				removeEvent(chartInstance.chart.canvas, eventName, handler);
// 			});
// 		},
// 		getMaximumWidth = helpers.getMaximumWidth = function(domNode){
// 			var container = domNode.parentNode;
// 			// TODO = check cross browser stuff with this.
// 			return container.clientWidth;
// 		},
// 		getMaximumHeight = helpers.getMaximumHeight = function(domNode){
// 			var container = domNode.parentNode;
// 			// TODO = check cross browser stuff with this.
// 			return container.clientHeight;
// 		},
// 		getMaximumSize = helpers.getMaximumSize = helpers.getMaximumWidth, // legacy support
// 		retinaScale = helpers.retinaScale = function(chart){
// 			var ctx = chart.ctx,
// 				width = chart.canvas.width,
// 				height = chart.canvas.height;
//
// 			if (window.devicePixelRatio) {
// 				ctx.canvas.style.width = width + "px";
// 				ctx.canvas.style.height = height + "px";
// 				ctx.canvas.height = height * window.devicePixelRatio;
// 				ctx.canvas.width = width * window.devicePixelRatio;
// 				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
// 			}
// 		},
// 		//-- Canvas methods
// 		clear = helpers.clear = function(chart){
// 			chart.ctx.clearRect(0,0,chart.width,chart.height);
// 		},
// 		fontString = helpers.fontString = function(pixelSize,fontStyle,fontFamily){
// 			return fontStyle + " " + pixelSize+"px " + fontFamily;
// 		},
// 		longestText = helpers.longestText = function(ctx,font,arrayOfStrings){
// 			ctx.font = font;
// 			var longest = 0;
// 			each(arrayOfStrings,function(string){
// 				var textWidth = ctx.measureText(string).width;
// 				longest = (textWidth > longest) ? textWidth : longest;
// 			});
// 			return longest;
// 		},
// 		drawRoundedRectangle = helpers.drawRoundedRectangle = function(ctx,x,y,width,height,radius){
// 			ctx.beginPath();
// 			ctx.moveTo(x + radius, y);
// 			ctx.lineTo(x + width - radius, y);
// 			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// 			ctx.lineTo(x + width, y + height - radius);
// 			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
// 			ctx.lineTo(x + radius, y + height);
// 			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
// 			ctx.lineTo(x, y + radius);
// 			ctx.quadraticCurveTo(x, y, x + radius, y);
// 			ctx.closePath();
// 		};
//
//
// 	//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
// 	//Destroy method on the chart will remove the instance of the chart from this reference.
// 	Chart.instances = {};
//
// 	Chart.Type = function(data,options,chart){
// 		this.options = options;
// 		this.chart = chart;
// 		this.id = uid();
// 		//Add the chart instance to the global namespace
// 		Chart.instances[this.id] = this;
//
// 		// Initialize is always called when a chart type is created
// 		// By default it is a no op, but it should be extended
// 		if (options.responsive){
// 			this.resize();
// 		}
// 		this.initialize.call(this,data);
// 	};
//
// 	//Core methods that'll be a part of every chart type
// 	extend(Chart.Type.prototype,{
// 		initialize : function(){return this;},
// 		clear : function(){
// 			clear(this.chart);
// 			return this;
// 		},
// 		stop : function(){
// 			// Stops any current animation loop occuring
// 			cancelAnimFrame(this.animationFrame);
// 			return this;
// 		},
// 		resize : function(callback){
// 			this.stop();
// 			var canvas = this.chart.canvas,
// 				newWidth = getMaximumWidth(this.chart.canvas),
// 				newHeight = this.options.maintainAspectRatio ? newWidth / this.chart.aspectRatio : getMaximumHeight(this.chart.canvas);
//
// 			canvas.width = this.chart.width = newWidth;
// 			canvas.height = this.chart.height = newHeight;
//
// 			retinaScale(this.chart);
//
// 			if (typeof callback === "function"){
// 				callback.apply(this, Array.prototype.slice.call(arguments, 1));
// 			}
// 			return this;
// 		},
// 		reflow : noop,
// 		render : function(reflow){
// 			if (reflow){
// 				this.reflow();
// 			}
// 			if (this.options.animation && !reflow){
// 				helpers.animationLoop(
// 					this.draw,
// 					this.options.animationSteps,
// 					this.options.animationEasing,
// 					this.options.onAnimationProgress,
// 					this.options.onAnimationComplete,
// 					this
// 				);
// 			}
// 			else{
// 				this.draw();
// 				this.options.onAnimationComplete.call(this);
// 			}
// 			return this;
// 		},
// 		generateLegend : function(){
// 			return template(this.options.legendTemplate,this);
// 		},
// 		destroy : function(){
// 			this.clear();
// 			unbindEvents(this, this.events);
// 			var canvas = this.chart.canvas;
//
// 			// Reset canvas height/width attributes starts a fresh with the canvas context
// 			canvas.width = this.chart.width;
// 			canvas.height = this.chart.height;
//
// 			// < IE9 doesn't support removeProperty
// 			if (canvas.style.removeProperty) {
// 				canvas.style.removeProperty('width');
// 				canvas.style.removeProperty('height');
// 			} else {
// 				canvas.style.removeAttribute('width');
// 				canvas.style.removeAttribute('height');
// 			}
//
// 			delete Chart.instances[this.id];
// 		},
// 		showTooltip : function(ChartElements, forceRedraw){
// 			// Only redraw the chart if we've actually changed what we're hovering on.
// 			if (typeof this.activeElements === 'undefined') this.activeElements = [];
//
// 			var isChanged = (function(Elements){
// 				var changed = false;
//
// 				if (Elements.length !== this.activeElements.length){
// 					changed = true;
// 					return changed;
// 				}
//
// 				each(Elements, function(element, index){
// 					if (element !== this.activeElements[index]){
// 						changed = true;
// 					}
// 				}, this);
// 				return changed;
// 			}).call(this, ChartElements);
//
// 			if (!isChanged && !forceRedraw){
// 				return;
// 			}
// 			else{
// 				this.activeElements = ChartElements;
// 			}
// 			this.draw();
// 			if(this.options.customTooltips){
// 				this.options.customTooltips(false);
// 			}
// 			if (ChartElements.length > 0){
// 				// If we have multiple datasets, show a MultiTooltip for all of the data points at that index
// 				if (this.datasets && this.datasets.length > 1) {
// 					var dataArray,
// 						dataIndex;
//
// 					for (var i = this.datasets.length - 1; i >= 0; i--) {
// 						dataArray = this.datasets[i].points || this.datasets[i].bars || this.datasets[i].segments;
// 						dataIndex = indexOf(dataArray, ChartElements[0]);
// 						if (dataIndex !== -1){
// 							break;
// 						}
// 					}
// 					var tooltipLabels = [],
// 						tooltipColors = [],
// 						medianPosition = (function(index) {
//
// 							// Get all the points at that particular index
// 							var Elements = [],
// 								dataCollection,
// 								xPositions = [],
// 								yPositions = [],
// 								xMax,
// 								yMax,
// 								xMin,
// 								yMin;
// 							helpers.each(this.datasets, function(dataset){
// 								dataCollection = dataset.points || dataset.bars || dataset.segments;
// 								if (dataCollection[dataIndex] && dataCollection[dataIndex].hasValue()){
// 									Elements.push(dataCollection[dataIndex]);
// 								}
// 							});
//
// 							helpers.each(Elements, function(element) {
// 								xPositions.push(element.x);
// 								yPositions.push(element.y);
//
//
// 								//Include any colour information about the element
// 								tooltipLabels.push(helpers.template(this.options.multiTooltipTemplate, element));
// 								tooltipColors.push({
// 									fill: element._saved.fillColor || element.fillColor,
// 									stroke: element._saved.strokeColor || element.strokeColor
// 								});
//
// 							}, this);
//
// 							yMin = min(yPositions);
// 							yMax = max(yPositions);
//
// 							xMin = min(xPositions);
// 							xMax = max(xPositions);
//
// 							return {
// 								x: (xMin > this.chart.width/2) ? xMin : xMax,
// 								y: (yMin + yMax)/2
// 							};
// 						}).call(this, dataIndex);
//
// 					new Chart.MultiTooltip({
// 						x: medianPosition.x,
// 						y: medianPosition.y,
// 						xPadding: this.options.tooltipXPadding,
// 						yPadding: this.options.tooltipYPadding,
// 						xOffset: this.options.tooltipXOffset,
// 						fillColor: this.options.tooltipFillColor,
// 						textColor: this.options.tooltipFontColor,
// 						fontFamily: this.options.tooltipFontFamily,
// 						fontStyle: this.options.tooltipFontStyle,
// 						fontSize: this.options.tooltipFontSize,
// 						titleTextColor: this.options.tooltipTitleFontColor,
// 						titleFontFamily: this.options.tooltipTitleFontFamily,
// 						titleFontStyle: this.options.tooltipTitleFontStyle,
// 						titleFontSize: this.options.tooltipTitleFontSize,
// 						cornerRadius: this.options.tooltipCornerRadius,
// 						labels: tooltipLabels,
// 						legendColors: tooltipColors,
// 						legendColorBackground : this.options.multiTooltipKeyBackground,
// 						title: ChartElements[0].label,
// 						chart: this.chart,
// 						ctx: this.chart.ctx,
// 						custom: this.options.customTooltips
// 					}).draw();
//
// 				} else {
// 					each(ChartElements, function(Element) {
// 						var tooltipPosition = Element.tooltipPosition();
// 						new Chart.Tooltip({
// 							x: Math.round(tooltipPosition.x),
// 							y: Math.round(tooltipPosition.y),
// 							xPadding: this.options.tooltipXPadding,
// 							yPadding: this.options.tooltipYPadding,
// 							fillColor: this.options.tooltipFillColor,
// 							textColor: this.options.tooltipFontColor,
// 							fontFamily: this.options.tooltipFontFamily,
// 							fontStyle: this.options.tooltipFontStyle,
// 							fontSize: this.options.tooltipFontSize,
// 							caretHeight: this.options.tooltipCaretSize,
// 							cornerRadius: this.options.tooltipCornerRadius,
// 							text: template(this.options.tooltipTemplate, Element),
// 							chart: this.chart,
// 							custom: this.options.customTooltips
// 						}).draw();
// 					}, this);
// 				}
// 			}
// 			return this;
// 		},
// 		toBase64Image : function(){
// 			return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
// 		}
// 	});
//
// 	Chart.Type.extend = function(extensions){
//
// 		var parent = this;
//
// 		var ChartType = function(){
// 			return parent.apply(this,arguments);
// 		};
//
// 		//Copy the prototype object of the this class
// 		ChartType.prototype = clone(parent.prototype);
// 		//Now overwrite some of the properties in the base class with the new extensions
// 		extend(ChartType.prototype, extensions);
//
// 		ChartType.extend = Chart.Type.extend;
//
// 		if (extensions.name || parent.prototype.name){
//
// 			var chartName = extensions.name || parent.prototype.name;
// 			//Assign any potential default values of the new chart type
//
// 			//If none are defined, we'll use a clone of the chart type this is being extended from.
// 			//I.e. if we extend a line chart, we'll use the defaults from the line chart if our new chart
// 			//doesn't define some defaults of their own.
//
// 			var baseDefaults = (Chart.defaults[parent.prototype.name]) ? clone(Chart.defaults[parent.prototype.name]) : {};
//
// 			Chart.defaults[chartName] = extend(baseDefaults,extensions.defaults);
//
// 			Chart.types[chartName] = ChartType;
//
// 			//Register this new chart type in the Chart prototype
// 			Chart.prototype[chartName] = function(data,options){
// 				var config = merge(Chart.defaults.global, Chart.defaults[chartName], options || {});
// 				return new ChartType(data,config,this);
// 			};
// 		} else{
// 			warn("Name not provided for this chart, so it hasn't been registered");
// 		}
// 		return parent;
// 	};
//
// 	Chart.Element = function(configuration){
// 		extend(this,configuration);
// 		this.initialize.apply(this,arguments);
// 		this.save();
// 	};
// 	extend(Chart.Element.prototype,{
// 		initialize : function(){},
// 		restore : function(props){
// 			if (!props){
// 				extend(this,this._saved);
// 			} else {
// 				each(props,function(key){
// 					this[key] = this._saved[key];
// 				},this);
// 			}
// 			return this;
// 		},
// 		save : function(){
// 			this._saved = clone(this);
// 			delete this._saved._saved;
// 			return this;
// 		},
// 		update : function(newProps){
// 			each(newProps,function(value,key){
// 				this._saved[key] = this[key];
// 				this[key] = value;
// 			},this);
// 			return this;
// 		},
// 		transition : function(props,ease){
// 			each(props,function(value,key){
// 				this[key] = ((value - this._saved[key]) * ease) + this._saved[key];
// 			},this);
// 			return this;
// 		},
// 		tooltipPosition : function(){
// 			return {
// 				x : this.x,
// 				y : this.y
// 			};
// 		},
// 		hasValue: function(){
// 			return isNumber(this.value);
// 		}
// 	});
//
// 	Chart.Element.extend = inherits;
//
//
// 	Chart.Point = Chart.Element.extend({
// 		display: true,
// 		inRange: function(chartX,chartY){
// 			var hitDetectionRange = this.hitDetectionRadius + this.radius;
// 			return ((Math.pow(chartX-this.x, 2)+Math.pow(chartY-this.y, 2)) < Math.pow(hitDetectionRange,2));
// 		},
// 		draw : function(){
// 			if (this.display){
// 				var ctx = this.ctx;
// 				ctx.beginPath();
//
// 				ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
// 				ctx.closePath();
//
// 				ctx.strokeStyle = this.strokeColor;
// 				ctx.lineWidth = this.strokeWidth;
//
// 				ctx.fillStyle = this.fillColor;
//
// 				ctx.fill();
// 				ctx.stroke();
// 			}
//
//
// 			//Quick debug for bezier curve splining
// 			//Highlights control points and the line between them.
// 			//Handy for dev - stripped in the min version.
//
// 			// ctx.save();
// 			// ctx.fillStyle = "black";
// 			// ctx.strokeStyle = "black"
// 			// ctx.beginPath();
// 			// ctx.arc(this.controlPoints.inner.x,this.controlPoints.inner.y, 2, 0, Math.PI*2);
// 			// ctx.fill();
//
// 			// ctx.beginPath();
// 			// ctx.arc(this.controlPoints.outer.x,this.controlPoints.outer.y, 2, 0, Math.PI*2);
// 			// ctx.fill();
//
// 			// ctx.moveTo(this.controlPoints.inner.x,this.controlPoints.inner.y);
// 			// ctx.lineTo(this.x, this.y);
// 			// ctx.lineTo(this.controlPoints.outer.x,this.controlPoints.outer.y);
// 			// ctx.stroke();
//
// 			// ctx.restore();
//
//
//
// 		}
// 	});
//
// 	Chart.Arc = Chart.Element.extend({
// 		inRange : function(chartX,chartY){
//
// 			var pointRelativePosition = helpers.getAngleFromPoint(this, {
// 				x: chartX,
// 				y: chartY
// 			});
//
// 			//Check if within the range of the open/close angle
// 			var betweenAngles = (pointRelativePosition.angle >= this.startAngle && pointRelativePosition.angle <= this.endAngle),
// 				withinRadius = (pointRelativePosition.distance >= this.innerRadius && pointRelativePosition.distance <= this.outerRadius);
//
// 			return (betweenAngles && withinRadius);
// 			//Ensure within the outside of the arc centre, but inside arc outer
// 		},
// 		tooltipPosition : function(){
// 			var centreAngle = this.startAngle + ((this.endAngle - this.startAngle) / 2),
// 				rangeFromCentre = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
// 			return {
// 				x : this.x + (Math.cos(centreAngle) * rangeFromCentre),
// 				y : this.y + (Math.sin(centreAngle) * rangeFromCentre)
// 			};
// 		},
// 		draw : function(animationPercent){
//
// 			var easingDecimal = animationPercent || 1;
//
// 			var ctx = this.ctx;
//
// 			ctx.beginPath();
//
// 			ctx.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle);
//
// 			ctx.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, true);
//
// 			ctx.closePath();
// 			ctx.strokeStyle = this.strokeColor;
// 			ctx.lineWidth = this.strokeWidth;
//
// 			ctx.fillStyle = this.fillColor;
//
// 			ctx.fill();
// 			ctx.lineJoin = 'bevel';
//
// 			if (this.showStroke){
// 				ctx.stroke();
// 			}
// 		}
// 	});
//
// 	Chart.Rectangle = Chart.Element.extend({
// 		draw : function(){
// 			var ctx = this.ctx,
// 				halfWidth = this.width/2,
// 				leftX = this.x - halfWidth,
// 				rightX = this.x + halfWidth,
// 				top = this.base - (this.base - this.y),
// 				halfStroke = this.strokeWidth / 2;
//
// 			// Canvas doesn't allow us to stroke inside the width so we can
// 			// adjust the sizes to fit if we're setting a stroke on the line
// 			if (this.showStroke){
// 				leftX += halfStroke;
// 				rightX -= halfStroke;
// 				top += halfStroke;
// 			}
//
// 			ctx.beginPath();
//
// 			ctx.fillStyle = this.fillColor;
// 			ctx.strokeStyle = this.strokeColor;
// 			ctx.lineWidth = this.strokeWidth;
//
// 			// It'd be nice to keep this class totally generic to any rectangle
// 			// and simply specify which border to miss out.
// 			ctx.moveTo(leftX, this.base);
// 			ctx.lineTo(leftX, top);
// 			ctx.lineTo(rightX, top);
// 			ctx.lineTo(rightX, this.base);
// 			ctx.fill();
// 			if (this.showStroke){
// 				ctx.stroke();
// 			}
// 		},
// 		height : function(){
// 			return this.base - this.y;
// 		},
// 		inRange : function(chartX,chartY){
// 			return (chartX >= this.x - this.width/2 && chartX <= this.x + this.width/2) && (chartY >= this.y && chartY <= this.base);
// 		}
// 	});
//
// 	Chart.Tooltip = Chart.Element.extend({
// 		draw : function(){
//
// 			var ctx = this.chart.ctx;
//
// 			ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
//
// 			this.xAlign = "center";
// 			this.yAlign = "above";
//
// 			//Distance between the actual element.y position and the start of the tooltip caret
// 			var caretPadding = this.caretPadding = 2;
//
// 			var tooltipWidth = ctx.measureText(this.text).width + 2*this.xPadding,
// 				tooltipRectHeight = this.fontSize + 2*this.yPadding,
// 				tooltipHeight = tooltipRectHeight + this.caretHeight + caretPadding;
//
// 			if (this.x + tooltipWidth/2 >this.chart.width){
// 				this.xAlign = "left";
// 			} else if (this.x - tooltipWidth/2 < 0){
// 				this.xAlign = "right";
// 			}
//
// 			if (this.y - tooltipHeight < 0){
// 				this.yAlign = "below";
// 			}
//
//
// 			var tooltipX = this.x - tooltipWidth/2,
// 				tooltipY = this.y - tooltipHeight;
//
// 			ctx.fillStyle = this.fillColor;
//
// 			// Custom Tooltips
// 			if(this.custom){
// 				this.custom(this);
// 			}
// 			else{
// 				switch(this.yAlign)
// 				{
// 				case "above":
// 					//Draw a caret above the x/y
// 					ctx.beginPath();
// 					ctx.moveTo(this.x,this.y - caretPadding);
// 					ctx.lineTo(this.x + this.caretHeight, this.y - (caretPadding + this.caretHeight));
// 					ctx.lineTo(this.x - this.caretHeight, this.y - (caretPadding + this.caretHeight));
// 					ctx.closePath();
// 					ctx.fill();
// 					break;
// 				case "below":
// 					tooltipY = this.y + caretPadding + this.caretHeight;
// 					//Draw a caret below the x/y
// 					ctx.beginPath();
// 					ctx.moveTo(this.x, this.y + caretPadding);
// 					ctx.lineTo(this.x + this.caretHeight, this.y + caretPadding + this.caretHeight);
// 					ctx.lineTo(this.x - this.caretHeight, this.y + caretPadding + this.caretHeight);
// 					ctx.closePath();
// 					ctx.fill();
// 					break;
// 				}
//
// 				switch(this.xAlign)
// 				{
// 				case "left":
// 					tooltipX = this.x - tooltipWidth + (this.cornerRadius + this.caretHeight);
// 					break;
// 				case "right":
// 					tooltipX = this.x - (this.cornerRadius + this.caretHeight);
// 					break;
// 				}
//
// 				drawRoundedRectangle(ctx,tooltipX,tooltipY,tooltipWidth,tooltipRectHeight,this.cornerRadius);
//
// 				ctx.fill();
//
// 				ctx.fillStyle = this.textColor;
// 				ctx.textAlign = "center";
// 				ctx.textBaseline = "middle";
// 				ctx.fillText(this.text, tooltipX + tooltipWidth/2, tooltipY + tooltipRectHeight/2);
// 			}
// 		}
// 	});
//
// 	Chart.MultiTooltip = Chart.Element.extend({
// 		initialize : function(){
// 			this.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
//
// 			this.titleFont = fontString(this.titleFontSize,this.titleFontStyle,this.titleFontFamily);
//
// 			this.height = (this.labels.length * this.fontSize) + ((this.labels.length-1) * (this.fontSize/2)) + (this.yPadding*2) + this.titleFontSize *1.5;
//
// 			this.ctx.font = this.titleFont;
//
// 			var titleWidth = this.ctx.measureText(this.title).width,
// 				//Label has a legend square as well so account for this.
// 				labelWidth = longestText(this.ctx,this.font,this.labels) + this.fontSize + 3,
// 				longestTextWidth = max([labelWidth,titleWidth]);
//
// 			this.width = longestTextWidth + (this.xPadding*2);
//
//
// 			var halfHeight = this.height/2;
//
// 			//Check to ensure the height will fit on the canvas
// 			if (this.y - halfHeight < 0 ){
// 				this.y = halfHeight;
// 			} else if (this.y + halfHeight > this.chart.height){
// 				this.y = this.chart.height - halfHeight;
// 			}
//
// 			//Decide whether to align left or right based on position on canvas
// 			if (this.x > this.chart.width/2){
// 				this.x -= this.xOffset + this.width;
// 			} else {
// 				this.x += this.xOffset;
// 			}
//
//
// 		},
// 		getLineHeight : function(index){
// 			var baseLineHeight = this.y - (this.height/2) + this.yPadding,
// 				afterTitleIndex = index-1;
//
// 			//If the index is zero, we're getting the title
// 			if (index === 0){
// 				return baseLineHeight + this.titleFontSize/2;
// 			} else{
// 				return baseLineHeight + ((this.fontSize*1.5*afterTitleIndex) + this.fontSize/2) + this.titleFontSize * 1.5;
// 			}
//
// 		},
// 		draw : function(){
// 			// Custom Tooltips
// 			if(this.custom){
// 				this.custom(this);
// 			}
// 			else{
// 				drawRoundedRectangle(this.ctx,this.x,this.y - this.height/2,this.width,this.height,this.cornerRadius);
// 				var ctx = this.ctx;
// 				ctx.fillStyle = this.fillColor;
// 				ctx.fill();
// 				ctx.closePath();
//
// 				ctx.textAlign = "left";
// 				ctx.textBaseline = "middle";
// 				ctx.fillStyle = this.titleTextColor;
// 				ctx.font = this.titleFont;
//
// 				ctx.fillText(this.title,this.x + this.xPadding, this.getLineHeight(0));
//
// 				ctx.font = this.font;
// 				helpers.each(this.labels,function(label,index){
// 					ctx.fillStyle = this.textColor;
// 					ctx.fillText(label,this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(index + 1));
//
// 					//A bit gnarly, but clearing this rectangle breaks when using explorercanvas (clears whole canvas)
// 					//ctx.clearRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
// 					//Instead we'll make a white filled block to put the legendColour palette over.
//
// 					ctx.fillStyle = this.legendColorBackground;
// 					ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
//
// 					ctx.fillStyle = this.legendColors[index].fill;
// 					ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
//
//
// 				},this);
// 			}
// 		}
// 	});
//
// 	Chart.Scale = Chart.Element.extend({
// 		initialize : function(){
// 			this.fit();
// 		},
// 		buildYLabels : function(){
// 			this.yLabels = [];
//
// 			var stepDecimalPlaces = getDecimalPlaces(this.stepValue);
//
// 			for (var i=0; i<=this.steps; i++){
// 				this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
// 			}
// 			this.yLabelWidth = (this.display && this.showLabels) ? longestText(this.ctx,this.font,this.yLabels) : 0;
// 		},
// 		addXLabel : function(label){
// 			this.xLabels.push(label);
// 			this.valuesCount++;
// 			this.fit();
// 		},
// 		removeXLabel : function(){
// 			this.xLabels.shift();
// 			this.valuesCount--;
// 			this.fit();
// 		},
// 		// Fitting loop to rotate x Labels and figure out what fits there, and also calculate how many Y steps to use
// 		fit: function(){
// 			// First we need the width of the yLabels, assuming the xLabels aren't rotated
//
// 			// To do that we need the base line at the top and base of the chart, assuming there is no x label rotation
// 			this.startPoint = (this.display) ? this.fontSize : 0;
// 			this.endPoint = (this.display) ? this.height - (this.fontSize * 1.5) - 5 : this.height; // -5 to pad labels
//
// 			// Apply padding settings to the start and end point.
// 			this.startPoint += this.padding;
// 			this.endPoint -= this.padding;
//
// 			// Cache the starting height, so can determine if we need to recalculate the scale yAxis
// 			var cachedHeight = this.endPoint - this.startPoint,
// 				cachedYLabelWidth;
//
// 			// Build the current yLabels so we have an idea of what size they'll be to start
// 			/*
// 			 *	This sets what is returned from calculateScaleRange as static properties of this class:
// 			 *
// 				this.steps;
// 				this.stepValue;
// 				this.min;
// 				this.max;
// 			 *
// 			 */
// 			this.calculateYRange(cachedHeight);
//
// 			// With these properties set we can now build the array of yLabels
// 			// and also the width of the largest yLabel
// 			this.buildYLabels();
//
// 			this.calculateXLabelRotation();
//
// 			while((cachedHeight > this.endPoint - this.startPoint)){
// 				cachedHeight = this.endPoint - this.startPoint;
// 				cachedYLabelWidth = this.yLabelWidth;
//
// 				this.calculateYRange(cachedHeight);
// 				this.buildYLabels();
//
// 				// Only go through the xLabel loop again if the yLabel width has changed
// 				if (cachedYLabelWidth < this.yLabelWidth){
// 					this.calculateXLabelRotation();
// 				}
// 			}
//
// 		},
// 		calculateXLabelRotation : function(){
// 			//Get the width of each grid by calculating the difference
// 			//between x offsets between 0 and 1.
//
// 			this.ctx.font = this.font;
//
// 			var firstWidth = this.ctx.measureText(this.xLabels[0]).width,
// 				lastWidth = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width,
// 				firstRotated,
// 				lastRotated;
//
//
// 			this.xScalePaddingRight = lastWidth/2 + 3;
// 			this.xScalePaddingLeft = (firstWidth/2 > this.yLabelWidth + 10) ? firstWidth/2 : this.yLabelWidth + 10;
//
// 			this.xLabelRotation = 0;
// 			if (this.display){
// 				var originalLabelWidth = longestText(this.ctx,this.font,this.xLabels),
// 					cosRotation,
// 					firstRotatedWidth;
// 				this.xLabelWidth = originalLabelWidth;
// 				//Allow 3 pixels x2 padding either side for label readability
// 				var xGridWidth = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;
//
// 				//Max label rotate should be 90 - also act as a loop counter
// 				while ((this.xLabelWidth > xGridWidth && this.xLabelRotation === 0) || (this.xLabelWidth > xGridWidth && this.xLabelRotation <= 90 && this.xLabelRotation > 0)){
// 					cosRotation = Math.cos(toRadians(this.xLabelRotation));
//
// 					firstRotated = cosRotation * firstWidth;
// 					lastRotated = cosRotation * lastWidth;
//
// 					// We're right aligning the text now.
// 					if (firstRotated + this.fontSize / 2 > this.yLabelWidth + 8){
// 						this.xScalePaddingLeft = firstRotated + this.fontSize / 2;
// 					}
// 					this.xScalePaddingRight = this.fontSize/2;
//
//
// 					this.xLabelRotation++;
// 					this.xLabelWidth = cosRotation * originalLabelWidth;
//
// 				}
// 				if (this.xLabelRotation > 0){
// 					this.endPoint -= Math.sin(toRadians(this.xLabelRotation))*originalLabelWidth + 3;
// 				}
// 			}
// 			else{
// 				this.xLabelWidth = 0;
// 				this.xScalePaddingRight = this.padding;
// 				this.xScalePaddingLeft = this.padding;
// 			}
//
// 		},
// 		// Needs to be overidden in each Chart type
// 		// Otherwise we need to pass all the data into the scale class
// 		calculateYRange: noop,
// 		drawingArea: function(){
// 			return this.startPoint - this.endPoint;
// 		},
// 		calculateY : function(value){
// 			var scalingFactor = this.drawingArea() / (this.min - this.max);
// 			return this.endPoint - (scalingFactor * (value - this.min));
// 		},
// 		calculateX : function(index){
// 			var isRotated = (this.xLabelRotation > 0),
// 				// innerWidth = (this.offsetGridLines) ? this.width - offsetLeft - this.padding : this.width - (offsetLeft + halfLabelWidth * 2) - this.padding,
// 				innerWidth = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight),
// 				valueWidth = innerWidth/Math.max((this.valuesCount - ((this.offsetGridLines) ? 0 : 1)), 1),
// 				valueOffset = (valueWidth * index) + this.xScalePaddingLeft;
//
// 			if (this.offsetGridLines){
// 				valueOffset += (valueWidth/2);
// 			}
//
// 			return Math.round(valueOffset);
// 		},
// 		update : function(newProps){
// 			helpers.extend(this, newProps);
// 			this.fit();
// 		},
// 		draw : function(){
// 			var ctx = this.ctx,
// 				yLabelGap = (this.endPoint - this.startPoint) / this.steps,
// 				xStart = Math.round(this.xScalePaddingLeft);
// 			if (this.display){
// 				ctx.fillStyle = this.textColor;
// 				ctx.font = this.font;
// 				each(this.yLabels,function(labelString,index){
// 					var yLabelCenter = this.endPoint - (yLabelGap * index),
// 						linePositionY = Math.round(yLabelCenter),
// 						drawHorizontalLine = this.showHorizontalLines;
//
// 					ctx.textAlign = "right";
// 					ctx.textBaseline = "middle";
// 					if (this.showLabels){
// 						ctx.fillText(labelString,xStart - 10,yLabelCenter);
// 					}
//
// 					// This is X axis, so draw it
// 					if (index === 0 && !drawHorizontalLine){
// 						drawHorizontalLine = true;
// 					}
//
// 					if (drawHorizontalLine){
// 						ctx.beginPath();
// 					}
//
// 					if (index > 0){
// 						// This is a grid line in the centre, so drop that
// 						ctx.lineWidth = this.gridLineWidth;
// 						ctx.strokeStyle = this.gridLineColor;
// 					} else {
// 						// This is the first line on the scale
// 						ctx.lineWidth = this.lineWidth;
// 						ctx.strokeStyle = this.lineColor;
// 					}
//
// 					linePositionY += helpers.aliasPixel(ctx.lineWidth);
//
// 					if(drawHorizontalLine){
// 						ctx.moveTo(xStart, linePositionY);
// 						ctx.lineTo(this.width, linePositionY);
// 						ctx.stroke();
// 						ctx.closePath();
// 					}
//
// 					ctx.lineWidth = this.lineWidth;
// 					ctx.strokeStyle = this.lineColor;
// 					ctx.beginPath();
// 					ctx.moveTo(xStart - 5, linePositionY);
// 					ctx.lineTo(xStart, linePositionY);
// 					ctx.stroke();
// 					ctx.closePath();
//
// 				},this);
//
// 				each(this.xLabels,function(label,index){
// 					var xPos = this.calculateX(index) + aliasPixel(this.lineWidth),
// 						// Check to see if line/bar here and decide where to place the line
// 						linePos = this.calculateX(index - (this.offsetGridLines ? 0.5 : 0)) + aliasPixel(this.lineWidth),
// 						isRotated = (this.xLabelRotation > 0),
// 						drawVerticalLine = this.showVerticalLines;
//
// 					// This is Y axis, so draw it
// 					if (index === 0 && !drawVerticalLine){
// 						drawVerticalLine = true;
// 					}
//
// 					if (drawVerticalLine){
// 						ctx.beginPath();
// 					}
//
// 					if (index > 0){
// 						// This is a grid line in the centre, so drop that
// 						ctx.lineWidth = this.gridLineWidth;
// 						ctx.strokeStyle = this.gridLineColor;
// 					} else {
// 						// This is the first line on the scale
// 						ctx.lineWidth = this.lineWidth;
// 						ctx.strokeStyle = this.lineColor;
// 					}
//
// 					if (drawVerticalLine){
// 						ctx.moveTo(linePos,this.endPoint);
// 						ctx.lineTo(linePos,this.startPoint - 3);
// 						ctx.stroke();
// 						ctx.closePath();
// 					}
//
//
// 					ctx.lineWidth = this.lineWidth;
// 					ctx.strokeStyle = this.lineColor;
//
//
// 					// Small lines at the bottom of the base grid line
// 					ctx.beginPath();
// 					ctx.moveTo(linePos,this.endPoint);
// 					ctx.lineTo(linePos,this.endPoint + 5);
// 					ctx.stroke();
// 					ctx.closePath();
//
// 					ctx.save();
// 					ctx.translate(xPos,(isRotated) ? this.endPoint + 12 : this.endPoint + 8);
// 					ctx.rotate(toRadians(this.xLabelRotation)*-1);
// 					ctx.font = this.font;
// 					ctx.textAlign = (isRotated) ? "right" : "center";
// 					ctx.textBaseline = (isRotated) ? "middle" : "top";
// 					ctx.fillText(label, 0, 0);
// 					ctx.restore();
// 				},this);
//
// 			}
// 		}
//
// 	});
//
// 	Chart.RadialScale = Chart.Element.extend({
// 		initialize: function(){
// 			this.size = min([this.height, this.width]);
// 			this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
// 		},
// 		calculateCenterOffset: function(value){
// 			// Take into account half font size + the yPadding of the top value
// 			var scalingFactor = this.drawingArea / (this.max - this.min);
//
// 			return (value - this.min) * scalingFactor;
// 		},
// 		update : function(){
// 			if (!this.lineArc){
// 				this.setScaleSize();
// 			} else {
// 				this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
// 			}
// 			this.buildYLabels();
// 		},
// 		buildYLabels: function(){
// 			this.yLabels = [];
//
// 			var stepDecimalPlaces = getDecimalPlaces(this.stepValue);
//
// 			for (var i=0; i<=this.steps; i++){
// 				this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
// 			}
// 		},
// 		getCircumference : function(){
// 			return ((Math.PI*2) / this.valuesCount);
// 		},
// 		setScaleSize: function(){
// 			/*
// 			 * Right, this is really confusing and there is a lot of maths going on here
// 			 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
// 			 *
// 			 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
// 			 *
// 			 * Solution:
// 			 *
// 			 * We assume the radius of the polygon is half the size of the canvas at first
// 			 * at each index we check if the text overlaps.
// 			 *
// 			 * Where it does, we store that angle and that index.
// 			 *
// 			 * After finding the largest index and angle we calculate how much we need to remove
// 			 * from the shape radius to move the point inwards by that x.
// 			 *
// 			 * We average the left and right distances to get the maximum shape radius that can fit in the box
// 			 * along with labels.
// 			 *
// 			 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
// 			 * on each side, removing that from the size, halving it and adding the left x protrusion width.
// 			 *
// 			 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
// 			 * and position it in the most space efficient manner
// 			 *
// 			 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
// 			 */
//
//
// 			// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
// 			// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
// 			var largestPossibleRadius = min([(this.height/2 - this.pointLabelFontSize - 5), this.width/2]),
// 				pointPosition,
// 				i,
// 				textWidth,
// 				halfTextWidth,
// 				furthestRight = this.width,
// 				furthestRightIndex,
// 				furthestRightAngle,
// 				furthestLeft = 0,
// 				furthestLeftIndex,
// 				furthestLeftAngle,
// 				xProtrusionLeft,
// 				xProtrusionRight,
// 				radiusReductionRight,
// 				radiusReductionLeft,
// 				maxWidthRadius;
// 			this.ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
// 			for (i=0;i<this.valuesCount;i++){
// 				// 5px to space the text slightly out - similar to what we do in the draw function.
// 				pointPosition = this.getPointPosition(i, largestPossibleRadius);
// 				textWidth = this.ctx.measureText(template(this.templateString, { value: this.labels[i] })).width + 5;
// 				if (i === 0 || i === this.valuesCount/2){
// 					// If we're at index zero, or exactly the middle, we're at exactly the top/bottom
// 					// of the radar chart, so text will be aligned centrally, so we'll half it and compare
// 					// w/left and right text sizes
// 					halfTextWidth = textWidth/2;
// 					if (pointPosition.x + halfTextWidth > furthestRight) {
// 						furthestRight = pointPosition.x + halfTextWidth;
// 						furthestRightIndex = i;
// 					}
// 					if (pointPosition.x - halfTextWidth < furthestLeft) {
// 						furthestLeft = pointPosition.x - halfTextWidth;
// 						furthestLeftIndex = i;
// 					}
// 				}
// 				else if (i < this.valuesCount/2) {
// 					// Less than half the values means we'll left align the text
// 					if (pointPosition.x + textWidth > furthestRight) {
// 						furthestRight = pointPosition.x + textWidth;
// 						furthestRightIndex = i;
// 					}
// 				}
// 				else if (i > this.valuesCount/2){
// 					// More than half the values means we'll right align the text
// 					if (pointPosition.x - textWidth < furthestLeft) {
// 						furthestLeft = pointPosition.x - textWidth;
// 						furthestLeftIndex = i;
// 					}
// 				}
// 			}
//
// 			xProtrusionLeft = furthestLeft;
//
// 			xProtrusionRight = Math.ceil(furthestRight - this.width);
//
// 			furthestRightAngle = this.getIndexAngle(furthestRightIndex);
//
// 			furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);
//
// 			radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI/2);
//
// 			radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI/2);
//
// 			// Ensure we actually need to reduce the size of the chart
// 			radiusReductionRight = (isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
// 			radiusReductionLeft = (isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;
//
// 			this.drawingArea = largestPossibleRadius - (radiusReductionLeft + radiusReductionRight)/2;
//
// 			//this.drawingArea = min([maxWidthRadius, (this.height - (2 * (this.pointLabelFontSize + 5)))/2])
// 			this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
//
// 		},
// 		setCenterPoint: function(leftMovement, rightMovement){
//
// 			var maxRight = this.width - rightMovement - this.drawingArea,
// 				maxLeft = leftMovement + this.drawingArea;
//
// 			this.xCenter = (maxLeft + maxRight)/2;
// 			// Always vertically in the centre as the text height doesn't change
// 			this.yCenter = (this.height/2);
// 		},
//
// 		getIndexAngle : function(index){
// 			var angleMultiplier = (Math.PI * 2) / this.valuesCount;
// 			// Start from the top instead of right, so remove a quarter of the circle
//
// 			return index * angleMultiplier - (Math.PI/2);
// 		},
// 		getPointPosition : function(index, distanceFromCenter){
// 			var thisAngle = this.getIndexAngle(index);
// 			return {
// 				x : (Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
// 				y : (Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
// 			};
// 		},
// 		draw: function(){
// 			if (this.display){
// 				var ctx = this.ctx;
// 				each(this.yLabels, function(label, index){
// 					// Don't draw a centre value
// 					if (index > 0){
// 						var yCenterOffset = index * (this.drawingArea/this.steps),
// 							yHeight = this.yCenter - yCenterOffset,
// 							pointPosition;
//
// 						// Draw circular lines around the scale
// 						if (this.lineWidth > 0){
// 							ctx.strokeStyle = this.lineColor;
// 							ctx.lineWidth = this.lineWidth;
//
// 							if(this.lineArc){
// 								ctx.beginPath();
// 								ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI*2);
// 								ctx.closePath();
// 								ctx.stroke();
// 							} else{
// 								ctx.beginPath();
// 								for (var i=0;i<this.valuesCount;i++)
// 								{
// 									pointPosition = this.getPointPosition(i, this.calculateCenterOffset(this.min + (index * this.stepValue)));
// 									if (i === 0){
// 										ctx.moveTo(pointPosition.x, pointPosition.y);
// 									} else {
// 										ctx.lineTo(pointPosition.x, pointPosition.y);
// 									}
// 								}
// 								ctx.closePath();
// 								ctx.stroke();
// 							}
// 						}
// 						if(this.showLabels){
// 							ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
// 							if (this.showLabelBackdrop){
// 								var labelWidth = ctx.measureText(label).width;
// 								ctx.fillStyle = this.backdropColor;
// 								ctx.fillRect(
// 									this.xCenter - labelWidth/2 - this.backdropPaddingX,
// 									yHeight - this.fontSize/2 - this.backdropPaddingY,
// 									labelWidth + this.backdropPaddingX*2,
// 									this.fontSize + this.backdropPaddingY*2
// 								);
// 							}
// 							ctx.textAlign = 'center';
// 							ctx.textBaseline = "middle";
// 							ctx.fillStyle = this.fontColor;
// 							ctx.fillText(label, this.xCenter, yHeight);
// 						}
// 					}
// 				}, this);
//
// 				if (!this.lineArc){
// 					ctx.lineWidth = this.angleLineWidth;
// 					ctx.strokeStyle = this.angleLineColor;
// 					for (var i = this.valuesCount - 1; i >= 0; i--) {
// 						if (this.angleLineWidth > 0){
// 							var outerPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max));
// 							ctx.beginPath();
// 							ctx.moveTo(this.xCenter, this.yCenter);
// 							ctx.lineTo(outerPosition.x, outerPosition.y);
// 							ctx.stroke();
// 							ctx.closePath();
// 						}
// 						// Extra 3px out for some label spacing
// 						var pointLabelPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max) + 5);
// 						ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
// 						ctx.fillStyle = this.pointLabelFontColor;
//
// 						var labelsCount = this.labels.length,
// 							halfLabelsCount = this.labels.length/2,
// 							quarterLabelsCount = halfLabelsCount/2,
// 							upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
// 							exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
// 						if (i === 0){
// 							ctx.textAlign = 'center';
// 						} else if(i === halfLabelsCount){
// 							ctx.textAlign = 'center';
// 						} else if (i < halfLabelsCount){
// 							ctx.textAlign = 'left';
// 						} else {
// 							ctx.textAlign = 'right';
// 						}
//
// 						// Set the correct text baseline based on outer positioning
// 						if (exactQuarter){
// 							ctx.textBaseline = 'middle';
// 						} else if (upperHalf){
// 							ctx.textBaseline = 'bottom';
// 						} else {
// 							ctx.textBaseline = 'top';
// 						}
//
// 						ctx.fillText(this.labels[i], pointLabelPosition.x, pointLabelPosition.y);
// 					}
// 				}
// 			}
// 		}
// 	});
//
// 	// Attach global event to resize each chart instance when the browser resizes
// 	helpers.addEvent(window, "resize", (function(){
// 		// Basic debounce of resize function so it doesn't hurt performance when resizing browser.
// 		var timeout;
// 		return function(){
// 			clearTimeout(timeout);
// 			timeout = setTimeout(function(){
// 				each(Chart.instances,function(instance){
// 					// If the responsive flag is set in the chart instance config
// 					// Cascade the resize event down to the chart.
// 					if (instance.options.responsive){
// 						instance.resize(instance.render, true);
// 					}
// 				});
// 			}, 50);
// 		};
// 	})());
//
//
// 	if (amd) {
// 		define(function(){
// 			return Chart;
// 		});
// 	} else if (typeof module === 'object' && module.exports) {
// 		module.exports = Chart;
// 	}
//
// 	root.Chart = Chart;
//
// 	Chart.noConflict = function(){
// 		root.Chart = previous;
// 		return Chart;
// 	};
//
// }).call(this);
//
// (function(){
// 	"use strict";
//
// 	var root = this,
// 		Chart = root.Chart,
// 		helpers = Chart.helpers;
//
//
// 	var defaultConfig = {
// 		//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
// 		scaleBeginAtZero : true,
//
// 		//Boolean - Whether grid lines are shown across the chart
// 		scaleShowGridLines : true,
//
// 		//String - Colour of the grid lines
// 		scaleGridLineColor : "rgba(0,0,0,.05)",
//
// 		//Number - Width of the grid lines
// 		scaleGridLineWidth : 1,
//
// 		//Boolean - Whether to show horizontal lines (except X axis)
// 		scaleShowHorizontalLines: true,
//
// 		//Boolean - Whether to show vertical lines (except Y axis)
// 		scaleShowVerticalLines: true,
//
// 		//Boolean - If there is a stroke on each bar
// 		barShowStroke : true,
//
// 		//Number - Pixel width of the bar stroke
// 		barStrokeWidth : 2,
//
// 		//Number - Spacing between each of the X value sets
// 		barValueSpacing : 5,
//
// 		//Number - Spacing between data sets within X values
// 		barDatasetSpacing : 1,
//
// 		//String - A legend template
// 		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//
// 	};
//
//
// 	Chart.Type.extend({
// 		name: "Bar",
// 		defaults : defaultConfig,
// 		initialize:  function(data){
//
// 			//Expose options as a scope variable here so we can access it in the ScaleClass
// 			var options = this.options;
//
// 			this.ScaleClass = Chart.Scale.extend({
// 				offsetGridLines : true,
// 				calculateBarX : function(datasetCount, datasetIndex, barIndex){
// 					//Reusable method for calculating the xPosition of a given bar based on datasetIndex & width of the bar
// 					var xWidth = this.calculateBaseWidth(),
// 						xAbsolute = this.calculateX(barIndex) - (xWidth/2),
// 						barWidth = this.calculateBarWidth(datasetCount);
//
// 					return xAbsolute + (barWidth * datasetIndex) + (datasetIndex * options.barDatasetSpacing) + barWidth/2;
// 				},
// 				calculateBaseWidth : function(){
// 					return (this.calculateX(1) - this.calculateX(0)) - (2*options.barValueSpacing);
// 				},
// 				calculateBarWidth : function(datasetCount){
// 					//The padding between datasets is to the right of each bar, providing that there are more than 1 dataset
// 					var baseWidth = this.calculateBaseWidth() - ((datasetCount - 1) * options.barDatasetSpacing);
//
// 					return (baseWidth / datasetCount);
// 				}
// 			});
//
// 			this.datasets = [];
//
// 			//Set up tooltip events on the chart
// 			if (this.options.showTooltips){
// 				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
// 					var activeBars = (evt.type !== 'mouseout') ? this.getBarsAtEvent(evt) : [];
//
// 					this.eachBars(function(bar){
// 						bar.restore(['fillColor', 'strokeColor']);
// 					});
// 					helpers.each(activeBars, function(activeBar){
// 						activeBar.fillColor = activeBar.highlightFill;
// 						activeBar.strokeColor = activeBar.highlightStroke;
// 					});
// 					this.showTooltip(activeBars);
// 				});
// 			}
//
// 			//Declare the extension of the default point, to cater for the options passed in to the constructor
// 			this.BarClass = Chart.Rectangle.extend({
// 				strokeWidth : this.options.barStrokeWidth,
// 				showStroke : this.options.barShowStroke,
// 				ctx : this.chart.ctx
// 			});
//
// 			//Iterate through each of the datasets, and build this into a property of the chart
// 			helpers.each(data.datasets,function(dataset,datasetIndex){
//
// 				var datasetObject = {
// 					label : dataset.label || null,
// 					fillColor : dataset.fillColor,
// 					strokeColor : dataset.strokeColor,
// 					bars : []
// 				};
//
// 				this.datasets.push(datasetObject);
//
// 				helpers.each(dataset.data,function(dataPoint,index){
// 					//Add a new point for each piece of data, passing any required data to draw.
// 					datasetObject.bars.push(new this.BarClass({
// 						value : dataPoint,
// 						label : data.labels[index],
// 						datasetLabel: dataset.label,
// 						strokeColor : dataset.strokeColor,
// 						fillColor : dataset.fillColor,
// 						highlightFill : dataset.highlightFill || dataset.fillColor,
// 						highlightStroke : dataset.highlightStroke || dataset.strokeColor
// 					}));
// 				},this);
//
// 			},this);
//
// 			this.buildScale(data.labels);
//
// 			this.BarClass.prototype.base = this.scale.endPoint;
//
// 			this.eachBars(function(bar, index, datasetIndex){
// 				helpers.extend(bar, {
// 					width : this.scale.calculateBarWidth(this.datasets.length),
// 					x: this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
// 					y: this.scale.endPoint
// 				});
// 				bar.save();
// 			}, this);
//
// 			this.render();
// 		},
// 		update : function(){
// 			this.scale.update();
// 			// Reset any highlight colours before updating.
// 			helpers.each(this.activeElements, function(activeElement){
// 				activeElement.restore(['fillColor', 'strokeColor']);
// 			});
//
// 			this.eachBars(function(bar){
// 				bar.save();
// 			});
// 			this.render();
// 		},
// 		eachBars : function(callback){
// 			helpers.each(this.datasets,function(dataset, datasetIndex){
// 				helpers.each(dataset.bars, callback, this, datasetIndex);
// 			},this);
// 		},
// 		getBarsAtEvent : function(e){
// 			var barsArray = [],
// 				eventPosition = helpers.getRelativePosition(e),
// 				datasetIterator = function(dataset){
// 					barsArray.push(dataset.bars[barIndex]);
// 				},
// 				barIndex;
//
// 			for (var datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++) {
// 				for (barIndex = 0; barIndex < this.datasets[datasetIndex].bars.length; barIndex++) {
// 					if (this.datasets[datasetIndex].bars[barIndex].inRange(eventPosition.x,eventPosition.y)){
// 						helpers.each(this.datasets, datasetIterator);
// 						return barsArray;
// 					}
// 				}
// 			}
//
// 			return barsArray;
// 		},
// 		buildScale : function(labels){
// 			var self = this;
//
// 			var dataTotal = function(){
// 				var values = [];
// 				self.eachBars(function(bar){
// 					values.push(bar.value);
// 				});
// 				return values;
// 			};
//
// 			var scaleOptions = {
// 				templateString : this.options.scaleLabel,
// 				height : this.chart.height,
// 				width : this.chart.width,
// 				ctx : this.chart.ctx,
// 				textColor : this.options.scaleFontColor,
// 				fontSize : this.options.scaleFontSize,
// 				fontStyle : this.options.scaleFontStyle,
// 				fontFamily : this.options.scaleFontFamily,
// 				valuesCount : labels.length,
// 				beginAtZero : this.options.scaleBeginAtZero,
// 				integersOnly : this.options.scaleIntegersOnly,
// 				calculateYRange: function(currentHeight){
// 					var updatedRanges = helpers.calculateScaleRange(
// 						dataTotal(),
// 						currentHeight,
// 						this.fontSize,
// 						this.beginAtZero,
// 						this.integersOnly
// 					);
// 					helpers.extend(this, updatedRanges);
// 				},
// 				xLabels : labels,
// 				font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
// 				lineWidth : this.options.scaleLineWidth,
// 				lineColor : this.options.scaleLineColor,
// 				showHorizontalLines : this.options.scaleShowHorizontalLines,
// 				showVerticalLines : this.options.scaleShowVerticalLines,
// 				gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
// 				gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
// 				padding : (this.options.showScale) ? 0 : (this.options.barShowStroke) ? this.options.barStrokeWidth : 0,
// 				showLabels : this.options.scaleShowLabels,
// 				display : this.options.showScale
// 			};
//
// 			if (this.options.scaleOverride){
// 				helpers.extend(scaleOptions, {
// 					calculateYRange: helpers.noop,
// 					steps: this.options.scaleSteps,
// 					stepValue: this.options.scaleStepWidth,
// 					min: this.options.scaleStartValue,
// 					max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
// 				});
// 			}
//
// 			this.scale = new this.ScaleClass(scaleOptions);
// 		},
// 		addData : function(valuesArray,label){
// 			//Map the values array for each of the datasets
// 			helpers.each(valuesArray,function(value,datasetIndex){
// 				//Add a new point for each piece of data, passing any required data to draw.
// 				this.datasets[datasetIndex].bars.push(new this.BarClass({
// 					value : value,
// 					label : label,
// 					x: this.scale.calculateBarX(this.datasets.length, datasetIndex, this.scale.valuesCount+1),
// 					y: this.scale.endPoint,
// 					width : this.scale.calculateBarWidth(this.datasets.length),
// 					base : this.scale.endPoint,
// 					strokeColor : this.datasets[datasetIndex].strokeColor,
// 					fillColor : this.datasets[datasetIndex].fillColor
// 				}));
// 			},this);
//
// 			this.scale.addXLabel(label);
// 			//Then re-render the chart.
// 			this.update();
// 		},
// 		removeData : function(){
// 			this.scale.removeXLabel();
// 			//Then re-render the chart.
// 			helpers.each(this.datasets,function(dataset){
// 				dataset.bars.shift();
// 			},this);
// 			this.update();
// 		},
// 		reflow : function(){
// 			helpers.extend(this.BarClass.prototype,{
// 				y: this.scale.endPoint,
// 				base : this.scale.endPoint
// 			});
// 			var newScaleProps = helpers.extend({
// 				height : this.chart.height,
// 				width : this.chart.width
// 			});
// 			this.scale.update(newScaleProps);
// 		},
// 		draw : function(ease){
// 			var easingDecimal = ease || 1;
// 			this.clear();
//
// 			var ctx = this.chart.ctx;
//
// 			this.scale.draw(easingDecimal);
//
// 			//Draw all the bars for each dataset
// 			helpers.each(this.datasets,function(dataset,datasetIndex){
// 				helpers.each(dataset.bars,function(bar,index){
// 					if (bar.hasValue()){
// 						bar.base = this.scale.endPoint;
// 						//Transition then draw
// 						bar.transition({
// 							x : this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
// 							y : this.scale.calculateY(bar.value),
// 							width : this.scale.calculateBarWidth(this.datasets.length)
// 						}, easingDecimal).draw();
// 					}
// 				},this);
//
// 			},this);
// 		}
// 	});
//
//
// }).call(this);
//
// (function(){
// 	"use strict";
//
// 	var root = this,
// 		Chart = root.Chart,
// 		//Cache a local reference to Chart.helpers
// 		helpers = Chart.helpers;
//
// 	var defaultConfig = {
// 		//Boolean - Whether we should show a stroke on each segment
// 		segmentShowStroke : true,
//
// 		//String - The colour of each segment stroke
// 		segmentStrokeColor : "#fff",
//
// 		//Number - The width of each segment stroke
// 		segmentStrokeWidth : 2,
//
// 		//The percentage of the chart that we cut out of the middle.
// 		percentageInnerCutout : 50,
//
// 		//Number - Amount of animation steps
// 		animationSteps : 100,
//
// 		//String - Animation easing effect
// 		animationEasing : "easeOutBounce",
//
// 		//Boolean - Whether we animate the rotation of the Doughnut
// 		animateRotate : true,
//
// 		//Boolean - Whether we animate scaling the Doughnut from the centre
// 		animateScale : false,
//
// 		//String - A legend template
// 		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
//
// 	};
//
//
// 	Chart.Type.extend({
// 		//Passing in a name registers this chart in the Chart namespace
// 		name: "Doughnut",
// 		//Providing a defaults will also register the deafults in the chart namespace
// 		defaults : defaultConfig,
// 		//Initialize is fired when the chart is initialized - Data is passed in as a parameter
// 		//Config is automatically merged by the core of Chart.js, and is available at this.options
// 		initialize:  function(data){
//
// 			//Declare segments as a static property to prevent inheriting across the Chart type prototype
// 			this.segments = [];
// 			this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) -	this.options.segmentStrokeWidth/2)/2;
//
// 			this.SegmentArc = Chart.Arc.extend({
// 				ctx : this.chart.ctx,
// 				x : this.chart.width/2,
// 				y : this.chart.height/2
// 			});
//
// 			//Set up tooltip events on the chart
// 			if (this.options.showTooltips){
// 				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
// 					var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];
//
// 					helpers.each(this.segments,function(segment){
// 						segment.restore(["fillColor"]);
// 					});
// 					helpers.each(activeSegments,function(activeSegment){
// 						activeSegment.fillColor = activeSegment.highlightColor;
// 					});
// 					this.showTooltip(activeSegments);
// 				});
// 			}
// 			this.calculateTotal(data);
//
// 			helpers.each(data,function(datapoint, index){
// 				this.addData(datapoint, index, true);
// 			},this);
//
// 			this.render();
// 		},
// 		getSegmentsAtEvent : function(e){
// 			var segmentsArray = [];
//
// 			var location = helpers.getRelativePosition(e);
//
// 			helpers.each(this.segments,function(segment){
// 				if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
// 			},this);
// 			return segmentsArray;
// 		},
// 		addData : function(segment, atIndex, silent){
// 			var index = atIndex || this.segments.length;
// 			this.segments.splice(index, 0, new this.SegmentArc({
// 				value : segment.value,
// 				outerRadius : (this.options.animateScale) ? 0 : this.outerRadius,
// 				innerRadius : (this.options.animateScale) ? 0 : (this.outerRadius/100) * this.options.percentageInnerCutout,
// 				fillColor : segment.color,
// 				highlightColor : segment.highlight || segment.color,
// 				showStroke : this.options.segmentShowStroke,
// 				strokeWidth : this.options.segmentStrokeWidth,
// 				strokeColor : this.options.segmentStrokeColor,
// 				startAngle : Math.PI * 1.5,
// 				circumference : (this.options.animateRotate) ? 0 : this.calculateCircumference(segment.value),
// 				label : segment.label
// 			}));
// 			if (!silent){
// 				this.reflow();
// 				this.update();
// 			}
// 		},
// 		calculateCircumference : function(value){
// 			return (Math.PI*2)*(Math.abs(value) / this.total);
// 		},
// 		calculateTotal : function(data){
// 			this.total = 0;
// 			helpers.each(data,function(segment){
// 				this.total += Math.abs(segment.value);
// 			},this);
// 		},
// 		update : function(){
// 			this.calculateTotal(this.segments);
//
// 			// Reset any highlight colours before updating.
// 			helpers.each(this.activeElements, function(activeElement){
// 				activeElement.restore(['fillColor']);
// 			});
//
// 			helpers.each(this.segments,function(segment){
// 				segment.save();
// 			});
// 			this.render();
// 		},
//
// 		removeData: function(atIndex){
// 			var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
// 			this.segments.splice(indexToDelete, 1);
// 			this.reflow();
// 			this.update();
// 		},
//
// 		reflow : function(){
// 			helpers.extend(this.SegmentArc.prototype,{
// 				x : this.chart.width/2,
// 				y : this.chart.height/2
// 			});
// 			this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) -	this.options.segmentStrokeWidth/2)/2;
// 			helpers.each(this.segments, function(segment){
// 				segment.update({
// 					outerRadius : this.outerRadius,
// 					innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
// 				});
// 			}, this);
// 		},
// 		draw : function(easeDecimal){
// 			var animDecimal = (easeDecimal) ? easeDecimal : 1;
// 			this.clear();
// 			helpers.each(this.segments,function(segment,index){
// 				segment.transition({
// 					circumference : this.calculateCircumference(segment.value),
// 					outerRadius : this.outerRadius,
// 					innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
// 				},animDecimal);
//
// 				segment.endAngle = segment.startAngle + segment.circumference;
//
// 				segment.draw();
// 				if (index === 0){
// 					segment.startAngle = Math.PI * 1.5;
// 				}
// 				//Check to see if it's the last segment, if not get the next and update the start angle
// 				if (index < this.segments.length-1){
// 					this.segments[index+1].startAngle = segment.endAngle;
// 				}
// 			},this);
//
// 		}
// 	});
//
// 	Chart.types.Doughnut.extend({
// 		name : "Pie",
// 		defaults : helpers.merge(defaultConfig,{percentageInnerCutout : 0})
// 	});
//
// }).call(this);
// (function(){
// 	"use strict";
//
// 	var root = this,
// 		Chart = root.Chart,
// 		helpers = Chart.helpers;
//
// 	var defaultConfig = {
//
// 		///Boolean - Whether grid lines are shown across the chart
// 		scaleShowGridLines : true,
//
// 		//String - Colour of the grid lines
// 		scaleGridLineColor : "rgba(0,0,0,.05)",
//
// 		//Number - Width of the grid lines
// 		scaleGridLineWidth : 1,
//
// 		//Boolean - Whether to show horizontal lines (except X axis)
// 		scaleShowHorizontalLines: true,
//
// 		//Boolean - Whether to show vertical lines (except Y axis)
// 		scaleShowVerticalLines: true,
//
// 		//Boolean - Whether the line is curved between points
// 		bezierCurve : true,
//
// 		//Number - Tension of the bezier curve between points
// 		bezierCurveTension : 0.4,
//
// 		//Boolean - Whether to show a dot for each point
// 		pointDot : true,
//
// 		//Number - Radius of each point dot in pixels
// 		pointDotRadius : 4,
//
// 		//Number - Pixel width of point dot stroke
// 		pointDotStrokeWidth : 1,
//
// 		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
// 		pointHitDetectionRadius : 20,
//
// 		//Boolean - Whether to show a stroke for datasets
// 		datasetStroke : true,
//
// 		//Number - Pixel width of dataset stroke
// 		datasetStrokeWidth : 2,
//
// 		//Boolean - Whether to fill the dataset with a colour
// 		datasetFill : true,
//
// 		//String - A legend template
// 		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//
// 	};
//
//
// 	Chart.Type.extend({
// 		name: "Line",
// 		defaults : defaultConfig,
// 		initialize:  function(data){
// 			//Declare the extension of the default point, to cater for the options passed in to the constructor
// 			this.PointClass = Chart.Point.extend({
// 				strokeWidth : this.options.pointDotStrokeWidth,
// 				radius : this.options.pointDotRadius,
// 				display: this.options.pointDot,
// 				hitDetectionRadius : this.options.pointHitDetectionRadius,
// 				ctx : this.chart.ctx,
// 				inRange : function(mouseX){
// 					return (Math.pow(mouseX-this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius,2));
// 				}
// 			});
//
// 			this.datasets = [];
//
// 			//Set up tooltip events on the chart
// 			if (this.options.showTooltips){
// 				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
// 					var activePoints = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
// 					this.eachPoints(function(point){
// 						point.restore(['fillColor', 'strokeColor']);
// 					});
// 					helpers.each(activePoints, function(activePoint){
// 						activePoint.fillColor = activePoint.highlightFill;
// 						activePoint.strokeColor = activePoint.highlightStroke;
// 					});
// 					this.showTooltip(activePoints);
// 				});
// 			}
//
// 			//Iterate through each of the datasets, and build this into a property of the chart
// 			helpers.each(data.datasets,function(dataset){
//
// 				var datasetObject = {
// 					label : dataset.label || null,
// 					fillColor : dataset.fillColor,
// 					strokeColor : dataset.strokeColor,
// 					pointColor : dataset.pointColor,
// 					pointStrokeColor : dataset.pointStrokeColor,
// 					points : []
// 				};
//
// 				this.datasets.push(datasetObject);
//
//
// 				helpers.each(dataset.data,function(dataPoint,index){
// 					//Add a new point for each piece of data, passing any required data to draw.
// 					datasetObject.points.push(new this.PointClass({
// 						value : dataPoint,
// 						label : data.labels[index],
// 						datasetLabel: dataset.label,
// 						strokeColor : dataset.pointStrokeColor,
// 						fillColor : dataset.pointColor,
// 						highlightFill : dataset.pointHighlightFill || dataset.pointColor,
// 						highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
// 					}));
// 				},this);
//
// 				this.buildScale(data.labels);
//
//
// 				this.eachPoints(function(point, index){
// 					helpers.extend(point, {
// 						x: this.scale.calculateX(index),
// 						y: this.scale.endPoint
// 					});
// 					point.save();
// 				}, this);
//
// 			},this);
//
//
// 			this.render();
// 		},
// 		update : function(){
// 			this.scale.update();
// 			// Reset any highlight colours before updating.
// 			helpers.each(this.activeElements, function(activeElement){
// 				activeElement.restore(['fillColor', 'strokeColor']);
// 			});
// 			this.eachPoints(function(point){
// 				point.save();
// 			});
// 			this.render();
// 		},
// 		eachPoints : function(callback){
// 			helpers.each(this.datasets,function(dataset){
// 				helpers.each(dataset.points,callback,this);
// 			},this);
// 		},
// 		getPointsAtEvent : function(e){
// 			var pointsArray = [],
// 				eventPosition = helpers.getRelativePosition(e);
// 			helpers.each(this.datasets,function(dataset){
// 				helpers.each(dataset.points,function(point){
// 					if (point.inRange(eventPosition.x,eventPosition.y)) pointsArray.push(point);
// 				});
// 			},this);
// 			return pointsArray;
// 		},
// 		buildScale : function(labels){
// 			var self = this;
//
// 			var dataTotal = function(){
// 				var values = [];
// 				self.eachPoints(function(point){
// 					values.push(point.value);
// 				});
//
// 				return values;
// 			};
//
// 			var scaleOptions = {
// 				templateString : this.options.scaleLabel,
// 				height : this.chart.height,
// 				width : this.chart.width,
// 				ctx : this.chart.ctx,
// 				textColor : this.options.scaleFontColor,
// 				fontSize : this.options.scaleFontSize,
// 				fontStyle : this.options.scaleFontStyle,
// 				fontFamily : this.options.scaleFontFamily,
// 				valuesCount : labels.length,
// 				beginAtZero : this.options.scaleBeginAtZero,
// 				integersOnly : this.options.scaleIntegersOnly,
// 				calculateYRange : function(currentHeight){
// 					var updatedRanges = helpers.calculateScaleRange(
// 						dataTotal(),
// 						currentHeight,
// 						this.fontSize,
// 						this.beginAtZero,
// 						this.integersOnly
// 					);
// 					helpers.extend(this, updatedRanges);
// 				},
// 				xLabels : labels,
// 				font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
// 				lineWidth : this.options.scaleLineWidth,
// 				lineColor : this.options.scaleLineColor,
// 				showHorizontalLines : this.options.scaleShowHorizontalLines,
// 				showVerticalLines : this.options.scaleShowVerticalLines,
// 				gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
// 				gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
// 				padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
// 				showLabels : this.options.scaleShowLabels,
// 				display : this.options.showScale
// 			};
//
// 			if (this.options.scaleOverride){
// 				helpers.extend(scaleOptions, {
// 					calculateYRange: helpers.noop,
// 					steps: this.options.scaleSteps,
// 					stepValue: this.options.scaleStepWidth,
// 					min: this.options.scaleStartValue,
// 					max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
// 				});
// 			}
//
//
// 			this.scale = new Chart.Scale(scaleOptions);
// 		},
// 		addData : function(valuesArray,label){
// 			//Map the values array for each of the datasets
//
// 			helpers.each(valuesArray,function(value,datasetIndex){
// 				//Add a new point for each piece of data, passing any required data to draw.
// 				this.datasets[datasetIndex].points.push(new this.PointClass({
// 					value : value,
// 					label : label,
// 					x: this.scale.calculateX(this.scale.valuesCount+1),
// 					y: this.scale.endPoint,
// 					strokeColor : this.datasets[datasetIndex].pointStrokeColor,
// 					fillColor : this.datasets[datasetIndex].pointColor
// 				}));
// 			},this);
//
// 			this.scale.addXLabel(label);
// 			//Then re-render the chart.
// 			this.update();
// 		},
// 		removeData : function(){
// 			this.scale.removeXLabel();
// 			//Then re-render the chart.
// 			helpers.each(this.datasets,function(dataset){
// 				dataset.points.shift();
// 			},this);
// 			this.update();
// 		},
// 		reflow : function(){
// 			var newScaleProps = helpers.extend({
// 				height : this.chart.height,
// 				width : this.chart.width
// 			});
// 			this.scale.update(newScaleProps);
// 		},
// 		draw : function(ease){
// 			var easingDecimal = ease || 1;
// 			this.clear();
//
// 			var ctx = this.chart.ctx;
//
// 			// Some helper methods for getting the next/prev points
// 			var hasValue = function(item){
// 				return item.value !== null;
// 			},
// 			nextPoint = function(point, collection, index){
// 				return helpers.findNextWhere(collection, hasValue, index) || point;
// 			},
// 			previousPoint = function(point, collection, index){
// 				return helpers.findPreviousWhere(collection, hasValue, index) || point;
// 			};
//
// 			this.scale.draw(easingDecimal);
//
//
// 			helpers.each(this.datasets,function(dataset){
// 				var pointsWithValues = helpers.where(dataset.points, hasValue);
//
// 				//Transition each point first so that the line and point drawing isn't out of sync
// 				//We can use this extra loop to calculate the control points of this dataset also in this loop
//
// 				helpers.each(dataset.points, function(point, index){
// 					if (point.hasValue()){
// 						point.transition({
// 							y : this.scale.calculateY(point.value),
// 							x : this.scale.calculateX(index)
// 						}, easingDecimal);
// 					}
// 				},this);
//
//
// 				// Control points need to be calculated in a seperate loop, because we need to know the current x/y of the point
// 				// This would cause issues when there is no animation, because the y of the next point would be 0, so beziers would be skewed
// 				if (this.options.bezierCurve){
// 					helpers.each(pointsWithValues, function(point, index){
// 						var tension = (index > 0 && index < pointsWithValues.length - 1) ? this.options.bezierCurveTension : 0;
// 						point.controlPoints = helpers.splineCurve(
// 							previousPoint(point, pointsWithValues, index),
// 							point,
// 							nextPoint(point, pointsWithValues, index),
// 							tension
// 						);
//
// 						// Prevent the bezier going outside of the bounds of the graph
//
// 						// Cap puter bezier handles to the upper/lower scale bounds
// 						if (point.controlPoints.outer.y > this.scale.endPoint){
// 							point.controlPoints.outer.y = this.scale.endPoint;
// 						}
// 						else if (point.controlPoints.outer.y < this.scale.startPoint){
// 							point.controlPoints.outer.y = this.scale.startPoint;
// 						}
//
// 						// Cap inner bezier handles to the upper/lower scale bounds
// 						if (point.controlPoints.inner.y > this.scale.endPoint){
// 							point.controlPoints.inner.y = this.scale.endPoint;
// 						}
// 						else if (point.controlPoints.inner.y < this.scale.startPoint){
// 							point.controlPoints.inner.y = this.scale.startPoint;
// 						}
// 					},this);
// 				}
//
//
// 				//Draw the line between all the points
// 				ctx.lineWidth = this.options.datasetStrokeWidth;
// 				ctx.strokeStyle = dataset.strokeColor;
// 				ctx.beginPath();
//
// 				helpers.each(pointsWithValues, function(point, index){
// 					if (index === 0){
// 						ctx.moveTo(point.x, point.y);
// 					}
// 					else{
// 						if(this.options.bezierCurve){
// 							var previous = previousPoint(point, pointsWithValues, index);
//
// 							ctx.bezierCurveTo(
// 								previous.controlPoints.outer.x,
// 								previous.controlPoints.outer.y,
// 								point.controlPoints.inner.x,
// 								point.controlPoints.inner.y,
// 								point.x,
// 								point.y
// 							);
// 						}
// 						else{
// 							ctx.lineTo(point.x,point.y);
// 						}
// 					}
// 				}, this);
//
// 				ctx.stroke();
//
// 				if (this.options.datasetFill && pointsWithValues.length > 0){
// 					//Round off the line by going to the base of the chart, back to the start, then fill.
// 					ctx.lineTo(pointsWithValues[pointsWithValues.length - 1].x, this.scale.endPoint);
// 					ctx.lineTo(pointsWithValues[0].x, this.scale.endPoint);
// 					ctx.fillStyle = dataset.fillColor;
// 					ctx.closePath();
// 					ctx.fill();
// 				}
//
// 				//Now draw the points over the line
// 				//A little inefficient double looping, but better than the line
// 				//lagging behind the point positions
// 				helpers.each(pointsWithValues,function(point){
// 					point.draw();
// 				});
// 			},this);
// 		}
// 	});
//
//
// }).call(this);
//
// (function(){
// 	"use strict";
//
// 	var root = this,
// 		Chart = root.Chart,
// 		//Cache a local reference to Chart.helpers
// 		helpers = Chart.helpers;
//
// 	var defaultConfig = {
// 		//Boolean - Show a backdrop to the scale label
// 		scaleShowLabelBackdrop : true,
//
// 		//String - The colour of the label backdrop
// 		scaleBackdropColor : "rgba(255,255,255,0.75)",
//
// 		// Boolean - Whether the scale should begin at zero
// 		scaleBeginAtZero : true,
//
// 		//Number - The backdrop padding above & below the label in pixels
// 		scaleBackdropPaddingY : 2,
//
// 		//Number - The backdrop padding to the side of the label in pixels
// 		scaleBackdropPaddingX : 2,
//
// 		//Boolean - Show line for each value in the scale
// 		scaleShowLine : true,
//
// 		//Boolean - Stroke a line around each segment in the chart
// 		segmentShowStroke : true,
//
// 		//String - The colour of the stroke on each segement.
// 		segmentStrokeColor : "#fff",
//
// 		//Number - The width of the stroke value in pixels
// 		segmentStrokeWidth : 2,
//
// 		//Number - Amount of animation steps
// 		animationSteps : 100,
//
// 		//String - Animation easing effect.
// 		animationEasing : "easeOutBounce",
//
// 		//Boolean - Whether to animate the rotation of the chart
// 		animateRotate : true,
//
// 		//Boolean - Whether to animate scaling the chart from the centre
// 		animateScale : false,
//
// 		//String - A legend template
// 		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
// 	};
//
//
// 	Chart.Type.extend({
// 		//Passing in a name registers this chart in the Chart namespace
// 		name: "PolarArea",
// 		//Providing a defaults will also register the deafults in the chart namespace
// 		defaults : defaultConfig,
// 		//Initialize is fired when the chart is initialized - Data is passed in as a parameter
// 		//Config is automatically merged by the core of Chart.js, and is available at this.options
// 		initialize:  function(data){
// 			this.segments = [];
// 			//Declare segment class as a chart instance specific class, so it can share props for this instance
// 			this.SegmentArc = Chart.Arc.extend({
// 				showStroke : this.options.segmentShowStroke,
// 				strokeWidth : this.options.segmentStrokeWidth,
// 				strokeColor : this.options.segmentStrokeColor,
// 				ctx : this.chart.ctx,
// 				innerRadius : 0,
// 				x : this.chart.width/2,
// 				y : this.chart.height/2
// 			});
// 			this.scale = new Chart.RadialScale({
// 				display: this.options.showScale,
// 				fontStyle: this.options.scaleFontStyle,
// 				fontSize: this.options.scaleFontSize,
// 				fontFamily: this.options.scaleFontFamily,
// 				fontColor: this.options.scaleFontColor,
// 				showLabels: this.options.scaleShowLabels,
// 				showLabelBackdrop: this.options.scaleShowLabelBackdrop,
// 				backdropColor: this.options.scaleBackdropColor,
// 				backdropPaddingY : this.options.scaleBackdropPaddingY,
// 				backdropPaddingX: this.options.scaleBackdropPaddingX,
// 				lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
// 				lineColor: this.options.scaleLineColor,
// 				lineArc: true,
// 				width: this.chart.width,
// 				height: this.chart.height,
// 				xCenter: this.chart.width/2,
// 				yCenter: this.chart.height/2,
// 				ctx : this.chart.ctx,
// 				templateString: this.options.scaleLabel,
// 				valuesCount: data.length
// 			});
//
// 			this.updateScaleRange(data);
//
// 			this.scale.update();
//
// 			helpers.each(data,function(segment,index){
// 				this.addData(segment,index,true);
// 			},this);
//
// 			//Set up tooltip events on the chart
// 			if (this.options.showTooltips){
// 				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
// 					var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];
// 					helpers.each(this.segments,function(segment){
// 						segment.restore(["fillColor"]);
// 					});
// 					helpers.each(activeSegments,function(activeSegment){
// 						activeSegment.fillColor = activeSegment.highlightColor;
// 					});
// 					this.showTooltip(activeSegments);
// 				});
// 			}
//
// 			this.render();
// 		},
// 		getSegmentsAtEvent : function(e){
// 			var segmentsArray = [];
//
// 			var location = helpers.getRelativePosition(e);
//
// 			helpers.each(this.segments,function(segment){
// 				if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
// 			},this);
// 			return segmentsArray;
// 		},
// 		addData : function(segment, atIndex, silent){
// 			var index = atIndex || this.segments.length;
//
// 			this.segments.splice(index, 0, new this.SegmentArc({
// 				fillColor: segment.color,
// 				highlightColor: segment.highlight || segment.color,
// 				label: segment.label,
// 				value: segment.value,
// 				outerRadius: (this.options.animateScale) ? 0 : this.scale.calculateCenterOffset(segment.value),
// 				circumference: (this.options.animateRotate) ? 0 : this.scale.getCircumference(),
// 				startAngle: Math.PI * 1.5
// 			}));
// 			if (!silent){
// 				this.reflow();
// 				this.update();
// 			}
// 		},
// 		removeData: function(atIndex){
// 			var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
// 			this.segments.splice(indexToDelete, 1);
// 			this.reflow();
// 			this.update();
// 		},
// 		calculateTotal: function(data){
// 			this.total = 0;
// 			helpers.each(data,function(segment){
// 				this.total += segment.value;
// 			},this);
// 			this.scale.valuesCount = this.segments.length;
// 		},
// 		updateScaleRange: function(datapoints){
// 			var valuesArray = [];
// 			helpers.each(datapoints,function(segment){
// 				valuesArray.push(segment.value);
// 			});
//
// 			var scaleSizes = (this.options.scaleOverride) ?
// 				{
// 					steps: this.options.scaleSteps,
// 					stepValue: this.options.scaleStepWidth,
// 					min: this.options.scaleStartValue,
// 					max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
// 				} :
// 				helpers.calculateScaleRange(
// 					valuesArray,
// 					helpers.min([this.chart.width, this.chart.height])/2,
// 					this.options.scaleFontSize,
// 					this.options.scaleBeginAtZero,
// 					this.options.scaleIntegersOnly
// 				);
//
// 			helpers.extend(
// 				this.scale,
// 				scaleSizes,
// 				{
// 					size: helpers.min([this.chart.width, this.chart.height]),
// 					xCenter: this.chart.width/2,
// 					yCenter: this.chart.height/2
// 				}
// 			);
//
// 		},
// 		update : function(){
// 			this.calculateTotal(this.segments);
//
// 			helpers.each(this.segments,function(segment){
// 				segment.save();
// 			});
//
// 			this.reflow();
// 			this.render();
// 		},
// 		reflow : function(){
// 			helpers.extend(this.SegmentArc.prototype,{
// 				x : this.chart.width/2,
// 				y : this.chart.height/2
// 			});
// 			this.updateScaleRange(this.segments);
// 			this.scale.update();
//
// 			helpers.extend(this.scale,{
// 				xCenter: this.chart.width/2,
// 				yCenter: this.chart.height/2
// 			});
//
// 			helpers.each(this.segments, function(segment){
// 				segment.update({
// 					outerRadius : this.scale.calculateCenterOffset(segment.value)
// 				});
// 			}, this);
//
// 		},
// 		draw : function(ease){
// 			var easingDecimal = ease || 1;
// 			//Clear & draw the canvas
// 			this.clear();
// 			helpers.each(this.segments,function(segment, index){
// 				segment.transition({
// 					circumference : this.scale.getCircumference(),
// 					outerRadius : this.scale.calculateCenterOffset(segment.value)
// 				},easingDecimal);
//
// 				segment.endAngle = segment.startAngle + segment.circumference;
//
// 				// If we've removed the first segment we need to set the first one to
// 				// start at the top.
// 				if (index === 0){
// 					segment.startAngle = Math.PI * 1.5;
// 				}
//
// 				//Check to see if it's the last segment, if not get the next and update the start angle
// 				if (index < this.segments.length - 1){
// 					this.segments[index+1].startAngle = segment.endAngle;
// 				}
// 				segment.draw();
// 			}, this);
// 			this.scale.draw();
// 		}
// 	});
//
// }).call(this);
// (function(){
// 	"use strict";
//
// 	var root = this,
// 		Chart = root.Chart,
// 		helpers = Chart.helpers;
//
//
//
// 	Chart.Type.extend({
// 		name: "Radar",
// 		defaults:{
// 			//Boolean - Whether to show lines for each scale point
// 			scaleShowLine : true,
//
// 			//Boolean - Whether we show the angle lines out of the radar
// 			angleShowLineOut : true,
//
// 			//Boolean - Whether to show labels on the scale
// 			scaleShowLabels : false,
//
// 			// Boolean - Whether the scale should begin at zero
// 			scaleBeginAtZero : true,
//
// 			//String - Colour of the angle line
// 			angleLineColor : "rgba(0,0,0,.1)",
//
// 			//Number - Pixel width of the angle line
// 			angleLineWidth : 1,
//
// 			//String - Point label font declaration
// 			pointLabelFontFamily : "'Arial'",
//
// 			//String - Point label font weight
// 			pointLabelFontStyle : "normal",
//
// 			//Number - Point label font size in pixels
// 			pointLabelFontSize : 10,
//
// 			//String - Point label font colour
// 			pointLabelFontColor : "#666",
//
// 			//Boolean - Whether to show a dot for each point
// 			pointDot : true,
//
// 			//Number - Radius of each point dot in pixels
// 			pointDotRadius : 3,
//
// 			//Number - Pixel width of point dot stroke
// 			pointDotStrokeWidth : 1,
//
// 			//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
// 			pointHitDetectionRadius : 20,
//
// 			//Boolean - Whether to show a stroke for datasets
// 			datasetStroke : true,
//
// 			//Number - Pixel width of dataset stroke
// 			datasetStrokeWidth : 2,
//
// 			//Boolean - Whether to fill the dataset with a colour
// 			datasetFill : true,
//
// 			//String - A legend template
// 			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//
// 		},
//
// 		initialize: function(data){
// 			this.PointClass = Chart.Point.extend({
// 				strokeWidth : this.options.pointDotStrokeWidth,
// 				radius : this.options.pointDotRadius,
// 				display: this.options.pointDot,
// 				hitDetectionRadius : this.options.pointHitDetectionRadius,
// 				ctx : this.chart.ctx
// 			});
//
// 			this.datasets = [];
//
// 			this.buildScale(data);
//
// 			//Set up tooltip events on the chart
// 			if (this.options.showTooltips){
// 				helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
// 					var activePointsCollection = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
//
// 					this.eachPoints(function(point){
// 						point.restore(['fillColor', 'strokeColor']);
// 					});
// 					helpers.each(activePointsCollection, function(activePoint){
// 						activePoint.fillColor = activePoint.highlightFill;
// 						activePoint.strokeColor = activePoint.highlightStroke;
// 					});
//
// 					this.showTooltip(activePointsCollection);
// 				});
// 			}
//
// 			//Iterate through each of the datasets, and build this into a property of the chart
// 			helpers.each(data.datasets,function(dataset){
//
// 				var datasetObject = {
// 					label: dataset.label || null,
// 					fillColor : dataset.fillColor,
// 					strokeColor : dataset.strokeColor,
// 					pointColor : dataset.pointColor,
// 					pointStrokeColor : dataset.pointStrokeColor,
// 					points : []
// 				};
//
// 				this.datasets.push(datasetObject);
//
// 				helpers.each(dataset.data,function(dataPoint,index){
// 					//Add a new point for each piece of data, passing any required data to draw.
// 					var pointPosition;
// 					if (!this.scale.animation){
// 						pointPosition = this.scale.getPointPosition(index, this.scale.calculateCenterOffset(dataPoint));
// 					}
// 					datasetObject.points.push(new this.PointClass({
// 						value : dataPoint,
// 						label : data.labels[index],
// 						datasetLabel: dataset.label,
// 						x: (this.options.animation) ? this.scale.xCenter : pointPosition.x,
// 						y: (this.options.animation) ? this.scale.yCenter : pointPosition.y,
// 						strokeColor : dataset.pointStrokeColor,
// 						fillColor : dataset.pointColor,
// 						highlightFill : dataset.pointHighlightFill || dataset.pointColor,
// 						highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
// 					}));
// 				},this);
//
// 			},this);
//
// 			this.render();
// 		},
// 		eachPoints : function(callback){
// 			helpers.each(this.datasets,function(dataset){
// 				helpers.each(dataset.points,callback,this);
// 			},this);
// 		},
//
// 		getPointsAtEvent : function(evt){
// 			var mousePosition = helpers.getRelativePosition(evt),
// 				fromCenter = helpers.getAngleFromPoint({
// 					x: this.scale.xCenter,
// 					y: this.scale.yCenter
// 				}, mousePosition);
//
// 			var anglePerIndex = (Math.PI * 2) /this.scale.valuesCount,
// 				pointIndex = Math.round((fromCenter.angle - Math.PI * 1.5) / anglePerIndex),
// 				activePointsCollection = [];
//
// 			// If we're at the top, make the pointIndex 0 to get the first of the array.
// 			if (pointIndex >= this.scale.valuesCount || pointIndex < 0){
// 				pointIndex = 0;
// 			}
//
// 			if (fromCenter.distance <= this.scale.drawingArea){
// 				helpers.each(this.datasets, function(dataset){
// 					activePointsCollection.push(dataset.points[pointIndex]);
// 				});
// 			}
//
// 			return activePointsCollection;
// 		},
//
// 		buildScale : function(data){
// 			this.scale = new Chart.RadialScale({
// 				display: this.options.showScale,
// 				fontStyle: this.options.scaleFontStyle,
// 				fontSize: this.options.scaleFontSize,
// 				fontFamily: this.options.scaleFontFamily,
// 				fontColor: this.options.scaleFontColor,
// 				showLabels: this.options.scaleShowLabels,
// 				showLabelBackdrop: this.options.scaleShowLabelBackdrop,
// 				backdropColor: this.options.scaleBackdropColor,
// 				backdropPaddingY : this.options.scaleBackdropPaddingY,
// 				backdropPaddingX: this.options.scaleBackdropPaddingX,
// 				lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
// 				lineColor: this.options.scaleLineColor,
// 				angleLineColor : this.options.angleLineColor,
// 				angleLineWidth : (this.options.angleShowLineOut) ? this.options.angleLineWidth : 0,
// 				// Point labels at the edge of each line
// 				pointLabelFontColor : this.options.pointLabelFontColor,
// 				pointLabelFontSize : this.options.pointLabelFontSize,
// 				pointLabelFontFamily : this.options.pointLabelFontFamily,
// 				pointLabelFontStyle : this.options.pointLabelFontStyle,
// 				height : this.chart.height,
// 				width: this.chart.width,
// 				xCenter: this.chart.width/2,
// 				yCenter: this.chart.height/2,
// 				ctx : this.chart.ctx,
// 				templateString: this.options.scaleLabel,
// 				labels: data.labels,
// 				valuesCount: data.datasets[0].data.length
// 			});
//
// 			this.scale.setScaleSize();
// 			this.updateScaleRange(data.datasets);
// 			this.scale.buildYLabels();
// 		},
// 		updateScaleRange: function(datasets){
// 			var valuesArray = (function(){
// 				var totalDataArray = [];
// 				helpers.each(datasets,function(dataset){
// 					if (dataset.data){
// 						totalDataArray = totalDataArray.concat(dataset.data);
// 					}
// 					else {
// 						helpers.each(dataset.points, function(point){
// 							totalDataArray.push(point.value);
// 						});
// 					}
// 				});
// 				return totalDataArray;
// 			})();
//
//
// 			var scaleSizes = (this.options.scaleOverride) ?
// 				{
// 					steps: this.options.scaleSteps,
// 					stepValue: this.options.scaleStepWidth,
// 					min: this.options.scaleStartValue,
// 					max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
// 				} :
// 				helpers.calculateScaleRange(
// 					valuesArray,
// 					helpers.min([this.chart.width, this.chart.height])/2,
// 					this.options.scaleFontSize,
// 					this.options.scaleBeginAtZero,
// 					this.options.scaleIntegersOnly
// 				);
//
// 			helpers.extend(
// 				this.scale,
// 				scaleSizes
// 			);
//
// 		},
// 		addData : function(valuesArray,label){
// 			//Map the values array for each of the datasets
// 			this.scale.valuesCount++;
// 			helpers.each(valuesArray,function(value,datasetIndex){
// 				var pointPosition = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(value));
// 				this.datasets[datasetIndex].points.push(new this.PointClass({
// 					value : value,
// 					label : label,
// 					x: pointPosition.x,
// 					y: pointPosition.y,
// 					strokeColor : this.datasets[datasetIndex].pointStrokeColor,
// 					fillColor : this.datasets[datasetIndex].pointColor
// 				}));
// 			},this);
//
// 			this.scale.labels.push(label);
//
// 			this.reflow();
//
// 			this.update();
// 		},
// 		removeData : function(){
// 			this.scale.valuesCount--;
// 			this.scale.labels.shift();
// 			helpers.each(this.datasets,function(dataset){
// 				dataset.points.shift();
// 			},this);
// 			this.reflow();
// 			this.update();
// 		},
// 		update : function(){
// 			this.eachPoints(function(point){
// 				point.save();
// 			});
// 			this.reflow();
// 			this.render();
// 		},
// 		reflow: function(){
// 			helpers.extend(this.scale, {
// 				width : this.chart.width,
// 				height: this.chart.height,
// 				size : helpers.min([this.chart.width, this.chart.height]),
// 				xCenter: this.chart.width/2,
// 				yCenter: this.chart.height/2
// 			});
// 			this.updateScaleRange(this.datasets);
// 			this.scale.setScaleSize();
// 			this.scale.buildYLabels();
// 		},
// 		draw : function(ease){
// 			var easeDecimal = ease || 1,
// 				ctx = this.chart.ctx;
// 			this.clear();
// 			this.scale.draw();
//
// 			helpers.each(this.datasets,function(dataset){
//
// 				//Transition each point first so that the line and point drawing isn't out of sync
// 				helpers.each(dataset.points,function(point,index){
// 					if (point.hasValue()){
// 						point.transition(this.scale.getPointPosition(index, this.scale.calculateCenterOffset(point.value)), easeDecimal);
// 					}
// 				},this);
//
//
//
// 				//Draw the line between all the points
// 				ctx.lineWidth = this.options.datasetStrokeWidth;
// 				ctx.strokeStyle = dataset.strokeColor;
// 				ctx.beginPath();
// 				helpers.each(dataset.points,function(point,index){
// 					if (index === 0){
// 						ctx.moveTo(point.x,point.y);
// 					}
// 					else{
// 						ctx.lineTo(point.x,point.y);
// 					}
// 				},this);
// 				ctx.closePath();
// 				ctx.stroke();
//
// 				ctx.fillStyle = dataset.fillColor;
// 				ctx.fill();
//
// 				//Now draw the points over the line
// 				//A little inefficient double looping, but better than the line
// 				//lagging behind the point positions
// 				helpers.each(dataset.points,function(point){
// 					if (point.hasValue()){
// 						point.draw();
// 					}
// 				});
//
// 			},this);
//
// 		}
//
// 	});
//
//
//
//
//
// }).call(this);

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.2
 *
 * Copyright 2016 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function t(e,i,a){function o(n,r){if(!i[n]){if(!e[n]){var h="function"==typeof require&&require;if(!r&&h)return h(n,!0);if(s)return s(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[n]={exports:{}};e[n][0].call(c.exports,function(t){var i=e[n][1][t];return o(i?i:t)},c,c.exports,t,e,i,a)}return i[n].exports}for(var s="function"==typeof require&&require,n=0;n<a.length;n++)o(a[n]);return o}({1:[function(t,e,i){},{}],2:[function(t,e,i){function a(t){var e,i,a,o=t[0]/255,s=t[1]/255,n=t[2]/255,r=Math.min(o,s,n),h=Math.max(o,s,n),l=h-r;return h==r?e=0:o==h?e=(s-n)/l:s==h?e=2+(n-o)/l:n==h&&(e=4+(o-s)/l),e=Math.min(60*e,360),0>e&&(e+=360),a=(r+h)/2,i=h==r?0:.5>=a?l/(h+r):l/(2-h-r),[e,100*i,100*a]}function o(t){var e,i,a,o=t[0],s=t[1],n=t[2],r=Math.min(o,s,n),h=Math.max(o,s,n),l=h-r;return i=0==h?0:l/h*1e3/10,h==r?e=0:o==h?e=(s-n)/l:s==h?e=2+(n-o)/l:n==h&&(e=4+(o-s)/l),e=Math.min(60*e,360),0>e&&(e+=360),a=h/255*1e3/10,[e,i,a]}function s(t){var e=t[0],i=t[1],o=t[2],s=a(t)[0],n=1/255*Math.min(e,Math.min(i,o)),o=1-1/255*Math.max(e,Math.max(i,o));return[s,100*n,100*o]}function n(t){var e,i,a,o,s=t[0]/255,n=t[1]/255,r=t[2]/255;return o=Math.min(1-s,1-n,1-r),e=(1-s-o)/(1-o)||0,i=(1-n-o)/(1-o)||0,a=(1-r-o)/(1-o)||0,[100*e,100*i,100*a,100*o]}function h(t){return G[JSON.stringify(t)]}function l(t){var e=t[0]/255,i=t[1]/255,a=t[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92,a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92;var o=.4124*e+.3576*i+.1805*a,s=.2126*e+.7152*i+.0722*a,n=.0193*e+.1192*i+.9505*a;return[100*o,100*s,100*n]}function c(t){var e,i,a,o=l(t),s=o[0],n=o[1],r=o[2];return s/=95.047,n/=100,r/=108.883,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=116*n-16,i=500*(s-n),a=200*(n-r),[e,i,a]}function d(t){return z(c(t))}function u(t){var e,i,a,o,s,n=t[0]/360,r=t[1]/100,h=t[2]/100;if(0==r)return s=255*h,[s,s,s];i=.5>h?h*(1+r):h+r-h*r,e=2*h-i,o=[0,0,0];for(var l=0;3>l;l++)a=n+1/3*-(l-1),0>a&&a++,a>1&&a--,s=1>6*a?e+6*(i-e)*a:1>2*a?i:2>3*a?e+(i-e)*(2/3-a)*6:e,o[l]=255*s;return o}function f(t){var e,i,a=t[0],o=t[1]/100,s=t[2]/100;return 0===s?[0,0,0]:(s*=2,o*=1>=s?s:2-s,i=(s+o)/2,e=2*o/(s+o),[a,100*e,100*i])}function p(t){return s(u(t))}function m(t){return n(u(t))}function x(t){return h(u(t))}function v(t){var e=t[0]/60,i=t[1]/100,a=t[2]/100,o=Math.floor(e)%6,s=e-Math.floor(e),n=255*a*(1-i),r=255*a*(1-i*s),h=255*a*(1-i*(1-s)),a=255*a;switch(o){case 0:return[a,h,n];case 1:return[r,a,n];case 2:return[n,a,h];case 3:return[n,r,a];case 4:return[h,n,a];case 5:return[a,n,r]}}function y(t){var e,i,a=t[0],o=t[1]/100,s=t[2]/100;return i=(2-o)*s,e=o*s,e/=1>=i?i:2-i,e=e||0,i/=2,[a,100*e,100*i]}function k(t){return s(v(t))}function S(t){return n(v(t))}function C(t){return h(v(t))}function w(t){var e,i,a,o,s=t[0]/360,n=t[1]/100,h=t[2]/100,l=n+h;switch(l>1&&(n/=l,h/=l),e=Math.floor(6*s),i=1-h,a=6*s-e,0!=(1&e)&&(a=1-a),o=n+a*(i-n),e){default:case 6:case 0:r=i,g=o,b=n;break;case 1:r=o,g=i,b=n;break;case 2:r=n,g=i,b=o;break;case 3:r=n,g=o,b=i;break;case 4:r=o,g=n,b=i;break;case 5:r=i,g=n,b=o}return[255*r,255*g,255*b]}function D(t){return a(w(t))}function M(t){return o(w(t))}function A(t){return n(w(t))}function _(t){return h(w(t))}function I(t){var e,i,a,o=t[0]/100,s=t[1]/100,n=t[2]/100,r=t[3]/100;return e=1-Math.min(1,o*(1-r)+r),i=1-Math.min(1,s*(1-r)+r),a=1-Math.min(1,n*(1-r)+r),[255*e,255*i,255*a]}function F(t){return a(I(t))}function P(t){return o(I(t))}function T(t){return s(I(t))}function V(t){return h(I(t))}function R(t){var e,i,a,o=t[0]/100,s=t[1]/100,n=t[2]/100;return e=3.2406*o+-1.5372*s+n*-.4986,i=o*-.9689+1.8758*s+.0415*n,a=.0557*o+s*-.204+1.057*n,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e=12.92*e,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i=12.92*i,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a=12.92*a,e=Math.min(Math.max(0,e),1),i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),[255*e,255*i,255*a]}function O(t){var e,i,a,o=t[0],s=t[1],n=t[2];return o/=95.047,s/=100,n/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,e=116*s-16,i=500*(o-s),a=200*(s-n),[e,i,a]}function L(t){return z(O(t))}function W(t){var e,i,a,o,s=t[0],n=t[1],r=t[2];return 8>=s?(i=100*s/903.3,o=7.787*(i/100)+16/116):(i=100*Math.pow((s+16)/116,3),o=Math.pow(i/100,1/3)),e=.008856>=e/95.047?e=95.047*(n/500+o-16/116)/7.787:95.047*Math.pow(n/500+o,3),a=.008859>=a/108.883?a=108.883*(o-r/200-16/116)/7.787:108.883*Math.pow(o-r/200,3),[e,i,a]}function z(t){var e,i,a,o=t[0],s=t[1],n=t[2];return e=Math.atan2(n,s),i=360*e/2/Math.PI,0>i&&(i+=360),a=Math.sqrt(s*s+n*n),[o,a,i]}function B(t){return R(W(t))}function H(t){var e,i,a,o=t[0],s=t[1],n=t[2];return a=n/360*2*Math.PI,e=s*Math.cos(a),i=s*Math.sin(a),[o,e,i]}function N(t){return W(H(t))}function E(t){return B(H(t))}function U(t){return Z[t]}function j(t){return a(U(t))}function q(t){return o(U(t))}function Y(t){return s(U(t))}function Q(t){return n(U(t))}function J(t){return c(U(t))}function X(t){return l(U(t))}e.exports={rgb2hsl:a,rgb2hsv:o,rgb2hwb:s,rgb2cmyk:n,rgb2keyword:h,rgb2xyz:l,rgb2lab:c,rgb2lch:d,hsl2rgb:u,hsl2hsv:f,hsl2hwb:p,hsl2cmyk:m,hsl2keyword:x,hsv2rgb:v,hsv2hsl:y,hsv2hwb:k,hsv2cmyk:S,hsv2keyword:C,hwb2rgb:w,hwb2hsl:D,hwb2hsv:M,hwb2cmyk:A,hwb2keyword:_,cmyk2rgb:I,cmyk2hsl:F,cmyk2hsv:P,cmyk2hwb:T,cmyk2keyword:V,keyword2rgb:U,keyword2hsl:j,keyword2hsv:q,keyword2hwb:Y,keyword2cmyk:Q,keyword2lab:J,keyword2xyz:X,xyz2rgb:R,xyz2lab:O,xyz2lch:L,lab2xyz:W,lab2rgb:B,lab2lch:z,lch2lab:H,lch2xyz:N,lch2rgb:E};var Z={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},G={};for(var $ in Z)G[JSON.stringify(Z[$])]=$},{}],3:[function(t,e,i){var a=t("./conversions"),o=function(){return new l};for(var s in a){o[s+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),a[t](e)}}(s);var n=/(\w+)2(\w+)/.exec(s),r=n[1],h=n[2];o[r]=o[r]||{},o[r][h]=o[s]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var i=a[t](e);if("string"==typeof i||void 0===i)return i;for(var o=0;o<i.length;o++)i[o]=Math.round(i[o]);return i}}(s)}var l=function(){this.convs={}};l.prototype.routeSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i))},l.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},l.prototype.getValues=function(t){var e=this.convs[t];if(!e){var i=this.space,a=this.convs[i];e=o[i][t](a),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){l.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=o},{"./conversions":2}],4:[function(t,e,i){function a(t){if(t){var e=/^#([a-fA-F0-9]{3})$/,i=/^#([a-fA-F0-9]{6})$/,a=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,o=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,s=/(\w+)/,n=[0,0,0],r=1,h=t.match(e);if(h){h=h[1];for(var l=0;l<n.length;l++)n[l]=parseInt(h[l]+h[l],16)}else if(h=t.match(i)){h=h[1];for(var l=0;l<n.length;l++)n[l]=parseInt(h.slice(2*l,2*l+2),16)}else if(h=t.match(a)){for(var l=0;l<n.length;l++)n[l]=parseInt(h[l+1]);r=parseFloat(h[4])}else if(h=t.match(o)){for(var l=0;l<n.length;l++)n[l]=Math.round(2.55*parseFloat(h[l+1]));r=parseFloat(h[4])}else if(h=t.match(s)){if("transparent"==h[1])return[0,0,0,0];if(n=y[h[1]],!n)return}for(var l=0;l<n.length;l++)n[l]=x(n[l],0,255);return r=r||0==r?x(r,0,1):1,n[3]=r,n}}function o(t){if(t){var e=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),o=x(parseInt(i[1]),0,360),s=x(parseFloat(i[2]),0,100),n=x(parseFloat(i[3]),0,100),r=x(isNaN(a)?1:a,0,1);return[o,s,n,r]}}}function s(t){if(t){var e=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),o=x(parseInt(i[1]),0,360),s=x(parseFloat(i[2]),0,100),n=x(parseFloat(i[3]),0,100),r=x(isNaN(a)?1:a,0,1);return[o,s,n,r]}}}function n(t){var e=a(t);return e&&e.slice(0,3)}function r(t){var e=o(t);return e&&e.slice(0,3)}function h(t){var e=a(t);return e?e[3]:(e=o(t))?e[3]:(e=s(t))?e[3]:void 0}function l(t){return"#"+v(t[0])+v(t[1])+v(t[2])}function c(t,e){return 1>e||t[3]&&t[3]<1?d(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function d(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function u(t,e){if(1>e||t[3]&&t[3]<1)return g(t,e);var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),o=Math.round(t[2]/255*100);return"rgb("+i+"%, "+a+"%, "+o+"%)"}function g(t,e){var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),o=Math.round(t[2]/255*100);return"rgba("+i+"%, "+a+"%, "+o+"%, "+(e||t[3]||1)+")"}function f(t,e){return 1>e||t[3]&&t[3]<1?p(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function m(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function b(t){return k[t.slice(0,3)]}function x(t,e,i){return Math.min(Math.max(e,t),i)}function v(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var y=t("color-name");e.exports={getRgba:a,getHsla:o,getRgb:n,getHsl:r,getHwb:s,getAlpha:h,hexString:l,rgbString:c,rgbaString:d,percentString:u,percentaString:g,hslString:f,hslaString:p,hwbString:m,keyword:b};var k={};for(var S in y)k[y[S]]=S},{"color-name":5}],5:[function(t,e,i){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],6:[function(t,e,i){var a=t("color-convert"),o=t("color-string"),s=function(t){if(t instanceof s)return t;if(!(this instanceof s))return new s(t);if(this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1},"string"==typeof t){var e=o.getRgba(t);if(e)this.setValues("rgb",e);else if(e=o.getHsla(t))this.setValues("hsl",e);else{if(!(e=o.getHwb(t)))throw new Error('Unable to parse color from string "'+t+'"');this.setValues("hwb",e)}}else if("object"==typeof t){var e=t;if(void 0!==e.r||void 0!==e.red)this.setValues("rgb",e);else if(void 0!==e.l||void 0!==e.lightness)this.setValues("hsl",e);else if(void 0!==e.v||void 0!==e.value)this.setValues("hsv",e);else if(void 0!==e.w||void 0!==e.whiteness)this.setValues("hwb",e);else{if(void 0===e.c&&void 0===e.cyan)throw new Error("Unable to parse color from object "+JSON.stringify(t));this.setValues("cmyk",e)}}};s.prototype={rgb:function(t){return this.setSpace("rgb",arguments)},hsl:function(t){return this.setSpace("hsl",arguments)},hsv:function(t){return this.setSpace("hsv",arguments)},hwb:function(t){return this.setSpace("hwb",arguments)},cmyk:function(t){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){return 1!==this.values.alpha?this.values.hwb.concat([this.values.alpha]):this.values.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values.rgb;return t.concat([this.values.alpha])},hslaArray:function(){var t=this.values.hsl;return t.concat([this.values.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return o.hexString(this.values.rgb)},rgbString:function(){return o.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return o.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return o.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return o.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return o.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return o.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return o.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){return this.values.rgb[0]<<16|this.values.rgb[1]<<8|this.values.rgb[2]},luminosity:function(){for(var t=this.values.rgb,e=[],i=0;i<t.length;i++){var a=t[i]/255;e[i]=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),i=t.luminosity();return e>i?(e+.05)/(i+.05):(i+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb,e=(299*t[0]+587*t[1]+114*t[2])/1e3;return 128>e},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;3>e;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){return this.values.hsl[2]+=this.values.hsl[2]*t,this.setValues("hsl",this.values.hsl),this},darken:function(t){return this.values.hsl[2]-=this.values.hsl[2]*t,this.setValues("hsl",this.values.hsl),this},saturate:function(t){return this.values.hsl[1]+=this.values.hsl[1]*t,this.setValues("hsl",this.values.hsl),this},desaturate:function(t){return this.values.hsl[1]-=this.values.hsl[1]*t,this.setValues("hsl",this.values.hsl),this},whiten:function(t){return this.values.hwb[1]+=this.values.hwb[1]*t,this.setValues("hwb",this.values.hwb),this},blacken:function(t){return this.values.hwb[2]+=this.values.hwb[2]*t,this.setValues("hwb",this.values.hwb),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){return this.setValues("alpha",this.values.alpha-this.values.alpha*t),this},opaquer:function(t){return this.setValues("alpha",this.values.alpha+this.values.alpha*t),this},rotate:function(t){var e=this.values.hsl[0];return e=(e+t)%360,e=0>e?360+e:e,this.values.hsl[0]=e,this.setValues("hsl",this.values.hsl),this},mix:function(t,e){e=1-(null==e?.5:e);for(var i=2*e-1,a=this.alpha()-t.alpha(),o=((i*a==-1?i:(i+a)/(1+i*a))+1)/2,s=1-o,n=this.rgbArray(),r=t.rgbArray(),h=0;h<n.length;h++)n[h]=n[h]*o+r[h]*s;this.setValues("rgb",n);var l=this.alpha()*e+t.alpha()*(1-e);return this.setValues("alpha",l),this},toJSON:function(){return this.rgb()},clone:function(){return new s(this.rgb())}},s.prototype.getValues=function(t){for(var e={},i=0;i<t.length;i++)e[t.charAt(i)]=this.values[t][i];return 1!=this.values.alpha&&(e.a=this.values.alpha),e},s.prototype.setValues=function(t,e){var i={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},o={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},s=1;if("alpha"==t)s=e;else if(e.length)this.values[t]=e.slice(0,t.length),s=e[t.length];else if(void 0!==e[t.charAt(0)]){for(var n=0;n<t.length;n++)this.values[t][n]=e[t.charAt(n)];s=e.a}else if(void 0!==e[i[t][0]]){for(var r=i[t],n=0;n<t.length;n++)this.values[t][n]=e[r[n]];s=e.alpha}if(this.values.alpha=Math.max(0,Math.min(1,void 0!==s?s:this.values.alpha)),"alpha"!=t){for(var n=0;n<t.length;n++){var h=Math.max(0,Math.min(o[t][n],this.values[t][n]));this.values[t][n]=Math.round(h)}for(var l in i){l!=t&&(this.values[l]=a[t][l](this.values[t]));for(var n=0;n<l.length;n++){var h=Math.max(0,Math.min(o[l][n],this.values[l][n]));this.values[l][n]=Math.round(h)}}return!0}},s.prototype.setSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i),this)},s.prototype.setChannel=function(t,e,i){return void 0===i?this.values[t][e]:(this.values[t][e]=i,this.setValues(t,this.values[t]),this)},window.Color=e.exports=s},{"color-convert":3,"color-string":4}],7:[function(t,e,i){var a=t("./core/core.js")();t("./core/core.helpers")(a),t("./core/core.element")(a),t("./core/core.animation")(a),t("./core/core.controller")(a),t("./core/core.datasetController")(a),t("./core/core.layoutService")(a),t("./core/core.legend")(a),t("./core/core.plugin.js")(a),t("./core/core.scale")(a),t("./core/core.scaleService")(a),t("./core/core.title")(a),t("./core/core.tooltip")(a),t("./controllers/controller.bar")(a),t("./controllers/controller.bubble")(a),t("./controllers/controller.doughnut")(a),t("./controllers/controller.line")(a),t("./controllers/controller.polarArea")(a),t("./controllers/controller.radar")(a),t("./scales/scale.category")(a),t("./scales/scale.linear")(a),t("./scales/scale.logarithmic")(a),t("./scales/scale.radialLinear")(a),t("./scales/scale.time")(a),t("./elements/element.arc")(a),t("./elements/element.line")(a),t("./elements/element.point")(a),t("./elements/element.rectangle")(a),t("./charts/Chart.Bar")(a),t("./charts/Chart.Bubble")(a),t("./charts/Chart.Doughnut")(a),t("./charts/Chart.Line")(a),t("./charts/Chart.PolarArea")(a),t("./charts/Chart.Radar")(a),t("./charts/Chart.Scatter")(a),window.Chart=e.exports=a},{"./charts/Chart.Bar":8,"./charts/Chart.Bubble":9,"./charts/Chart.Doughnut":10,"./charts/Chart.Line":11,"./charts/Chart.PolarArea":12,"./charts/Chart.Radar":13,"./charts/Chart.Scatter":14,"./controllers/controller.bar":15,"./controllers/controller.bubble":16,"./controllers/controller.doughnut":17,"./controllers/controller.line":18,"./controllers/controller.polarArea":19,"./controllers/controller.radar":20,"./core/core.animation":21,"./core/core.controller":22,"./core/core.datasetController":23,"./core/core.element":24,"./core/core.helpers":25,"./core/core.js":26,"./core/core.layoutService":27,"./core/core.legend":28,"./core/core.plugin.js":29,"./core/core.scale":30,"./core/core.scaleService":31,"./core/core.title":32,"./core/core.tooltip":33,"./elements/element.arc":34,"./elements/element.line":35,"./elements/element.point":36,"./elements/element.rectangle":37,"./scales/scale.category":38,"./scales/scale.linear":39,"./scales/scale.logarithmic":40,"./scales/scale.radialLinear":41,"./scales/scale.time":42}],8:[function(t,e,i){"use strict";e.exports=function(t){t.Bar=function(e,i){return i.type="bar",new t(e,i)}}},{}],9:[function(t,e,i){"use strict";e.exports=function(t){t.Bubble=function(e,i){return i.type="bubble",new t(e,i)}}},{}],10:[function(t,e,i){"use strict";e.exports=function(t){t.Doughnut=function(e,i){return i.type="doughnut",new t(e,i)}}},{}],11:[function(t,e,i){"use strict";e.exports=function(t){t.Line=function(e,i){return i.type="line",new t(e,i)}}},{}],12:[function(t,e,i){"use strict";e.exports=function(t){t.PolarArea=function(e,i){return i.type="polarArea",new t(e,i)}}},{}],13:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={aspectRatio:1};t.Radar=function(a,o){return o.options=e.configMerge(i,o.options),o.type="radar",new t(a,o)}}},{}],14:[function(t,e,i){"use strict";e.exports=function(t){var e={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){return"("+t.xLabel+", "+t.yLabel+")"}}}};t.defaults.scatter=e,t.controllers.scatter=t.controllers.line,t.Scatter=function(e,i){return i.type="scatter",new t(e,i)}}},{}],15:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},t.controllers.bar=t.DatasetController.extend({initialize:function(e,i){t.DatasetController.prototype.initialize.call(this,e,i),this.getMeta().bar=!0},getBarCount:function(){var t=0;return e.each(this.chart.data.datasets,function(e,i){var a=this.chart.getDatasetMeta(i);a.bar&&this.chart.isDatasetVisible(i)&&++t},this),t},addElements:function(){var i=this.getMeta();e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Rectangle({_chart:this.chart.chart,_datasetIndex:this.index,_index:a})},this)},addElementAndReset:function(e){var i=new t.elements.Rectangle({_chart:this.chart.chart,_datasetIndex:this.index,_index:e}),a=this.getBarCount();this.getMeta().data.splice(e,0,i),this.updateElement(i,e,!0,a)},update:function(t){var i=this.getBarCount();e.each(this.getMeta().data,function(e,a){this.updateElement(e,a,t,i)},this)},updateElement:function(t,i,a,o){var s,n=this.getMeta(),r=this.getScaleForId(n.xAxisID),h=this.getScaleForId(n.yAxisID);s=h.min<0&&h.max<0?h.getPixelForValue(h.max):h.min>0&&h.max>0?h.getPixelForValue(h.min):h.getPixelForValue(0),e.extend(t,{_chart:this.chart.chart,_xScale:r,_yScale:h,_datasetIndex:this.index,_index:i,_model:{x:this.calculateBarX(i,this.index),y:a?s:this.calculateBarY(i,this.index),label:this.chart.data.labels[i],datasetLabel:this.getDataset().label,base:a?s:this.calculateBarBase(this.index,i),width:this.calculateBarWidth(o),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.rectangle.backgroundColor),borderSkipped:t.custom&&t.custom.borderSkipped?t.custom.borderSkipped:this.chart.options.elements.rectangle.borderSkipped,borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.rectangle.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.rectangle.borderWidth)}}),t.pivot()},calculateBarBase:function(t,e){var i=this.getMeta(),a=(this.getScaleForId(i.xAxisID),this.getScaleForId(i.yAxisID)),o=0;if(a.options.stacked){var s=this.chart.data.datasets[t].data[e];if(0>s)for(var n=0;t>n;n++){var r=this.chart.data.datasets[n],h=this.chart.getDatasetMeta(n);h.bar&&h.yAxisID===a.id&&this.chart.isDatasetVisible(n)&&(o+=r.data[e]<0?r.data[e]:0)}else for(var l=0;t>l;l++){var c=this.chart.data.datasets[l],d=this.chart.getDatasetMeta(l);d.bar&&d.yAxisID===a.id&&this.chart.isDatasetVisible(l)&&(o+=c.data[e]>0?c.data[e]:0)}return a.getPixelForValue(o)}return o=a.getPixelForValue(a.min),a.beginAtZero||a.min<=0&&a.max>=0||a.min>=0&&a.max<=0?o=a.getPixelForValue(0,0):a.min<0&&a.max<0&&(o=a.getPixelForValue(a.max)),o},getRuler:function(){var t=this.getMeta(),e=this.getScaleForId(t.xAxisID),i=(this.getScaleForId(t.yAxisID),this.getBarCount()),a=function(){for(var t=e.getPixelForTick(1)-e.getPixelForTick(0),i=2;i<this.getDataset().data.length;i++)t=Math.min(e.getPixelForTick(i)-e.getPixelForTick(i-1),t);return t}.call(this),o=a*e.options.categoryPercentage,s=(a-a*e.options.categoryPercentage)/2,n=o/i;if(e.ticks.length!==this.chart.data.labels.length){var r=e.ticks.length/this.chart.data.labels.length;n*=r}var h=n*e.options.barPercentage,l=n-n*e.options.barPercentage;return{datasetCount:i,tickWidth:a,categoryWidth:o,categorySpacing:s,fullBarWidth:n,barWidth:h,barSpacing:l}},calculateBarWidth:function(){var t=this.getScaleForId(this.getMeta().xAxisID),e=this.getRuler();return t.options.stacked?e.categoryWidth:e.barWidth},getBarIndex:function(t){var e,i,a=0;for(i=0;t>i;++i)e=this.chart.getDatasetMeta(i),e.bar&&this.chart.isDatasetVisible(i)&&++a;return a},calculateBarX:function(t,e){var i=this.getMeta(),a=(this.getScaleForId(i.yAxisID),this.getScaleForId(i.xAxisID)),o=this.getBarIndex(e),s=this.getRuler(),n=a.getPixelForValue(null,t,e,this.chart.isCombo);return n-=this.chart.isCombo?s.tickWidth/2:0,a.options.stacked?n+s.categoryWidth/2+s.categorySpacing:n+s.barWidth/2+s.categorySpacing+s.barWidth*o+s.barSpacing/2+s.barSpacing*o},calculateBarY:function(t,e){var i=this.getMeta(),a=(this.getScaleForId(i.xAxisID),this.getScaleForId(i.yAxisID)),o=this.getDataset().data[t];if(a.options.stacked){for(var s=0,n=0,r=0;e>r;r++){var h=this.chart.data.datasets[r],l=this.chart.getDatasetMeta(r);l.bar&&l.yAxisID===a.id&&this.chart.isDatasetVisible(r)&&(h.data[t]<0?n+=h.data[t]||0:s+=h.data[t]||0)}return 0>o?a.getPixelForValue(n+o):a.getPixelForValue(s+o)}return a.getPixelForValue(o)},draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){var a=this.getDataset().data[e];null===a||void 0===a||isNaN(a)||t.transition(i).draw()},this)},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),
t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.rectangle.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.rectangle.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.rectangle.borderWidth)}}),t.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]}},t.controllers.horizontalBar=t.controllers.bar.extend({updateElement:function(t,i,a,o){var s,n=this.getMeta(),r=this.getScaleForId(n.xAxisID),h=this.getScaleForId(n.yAxisID);s=r.min<0&&r.max<0?r.getPixelForValue(r.max):r.min>0&&r.max>0?r.getPixelForValue(r.min):r.getPixelForValue(0),e.extend(t,{_chart:this.chart.chart,_xScale:r,_yScale:h,_datasetIndex:this.index,_index:i,_model:{x:a?s:this.calculateBarX(i,this.index),y:this.calculateBarY(i,this.index),label:this.chart.data.labels[i],datasetLabel:this.getDataset().label,base:a?s:this.calculateBarBase(this.index,i),height:this.calculateBarHeight(o),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.rectangle.backgroundColor),borderSkipped:t.custom&&t.custom.borderSkipped?t.custom.borderSkipped:this.chart.options.elements.rectangle.borderSkipped,borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.rectangle.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.rectangle.borderWidth)},draw:function(){function t(t){return h[(c+t)%4]}var e=this._chart.ctx,i=this._view,a=i.height/2,o=i.y-a,s=i.y+a,n=i.base-(i.base-i.x),r=i.borderWidth/2;i.borderWidth&&(o+=r,s-=r,n+=r),e.beginPath(),e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth;var h=[[i.base,s],[i.base,o],[n,o],[n,s]],l=["bottom","left","top","right"],c=l.indexOf(i.borderSkipped,0);-1===c&&(c=0),e.moveTo.apply(e,t(0));for(var d=1;4>d;d++)e.lineTo.apply(e,t(d));e.fill(),i.borderWidth&&e.stroke()},inRange:function(t,e){var i=this._view,a=!1;return i&&(a=i.x<i.base?e>=i.y-i.height/2&&e<=i.y+i.height/2&&t>=i.x&&t<=i.base:e>=i.y-i.height/2&&e<=i.y+i.height/2&&t>=i.base&&t<=i.x),a}}),t.pivot()},calculateBarBase:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=(this.getScaleForId(i.yAxisID),0);if(a.options.stacked){var s=this.chart.data.datasets[t].data[e];if(0>s)for(var n=0;t>n;n++){var r=this.chart.data.datasets[n],h=this.chart.getDatasetMeta(n);h.bar&&h.xAxisID===a.id&&this.chart.isDatasetVisible(n)&&(o+=r.data[e]<0?r.data[e]:0)}else for(var l=0;t>l;l++){var c=this.chart.data.datasets[l],d=this.chart.getDatasetMeta(l);d.bar&&d.xAxisID===a.id&&this.chart.isDatasetVisible(l)&&(o+=c.data[e]>0?c.data[e]:0)}return a.getPixelForValue(o)}return o=a.getPixelForValue(a.min),a.beginAtZero||a.min<=0&&a.max>=0||a.min>=0&&a.max<=0?o=a.getPixelForValue(0,0):a.min<0&&a.max<0&&(o=a.getPixelForValue(a.max)),o},getRuler:function(){var t=this.getMeta(),e=(this.getScaleForId(t.xAxisID),this.getScaleForId(t.yAxisID)),i=this.getBarCount(),a=function(){for(var t=e.getPixelForTick(1)-e.getPixelForTick(0),i=2;i<this.getDataset().data.length;i++)t=Math.min(e.getPixelForTick(i)-e.getPixelForTick(i-1),t);return t}.call(this),o=a*e.options.categoryPercentage,s=(a-a*e.options.categoryPercentage)/2,n=o/i;if(e.ticks.length!==this.chart.data.labels.length){var r=e.ticks.length/this.chart.data.labels.length;n*=r}var h=n*e.options.barPercentage,l=n-n*e.options.barPercentage;return{datasetCount:i,tickHeight:a,categoryHeight:o,categorySpacing:s,fullBarHeight:n,barHeight:h,barSpacing:l}},calculateBarHeight:function(){var t=this.getScaleForId(this.getMeta().yAxisID),e=this.getRuler();return t.options.stacked?e.categoryHeight:e.barHeight},calculateBarX:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=(this.getScaleForId(i.yAxisID),this.getDataset().data[t]);if(a.options.stacked){for(var s=0,n=0,r=0;e>r;r++){var h=this.chart.data.datasets[r],l=this.chart.getDatasetMeta(r);l.bar&&l.xAxisID===a.id&&this.chart.isDatasetVisible(r)&&(h.data[t]<0?n+=h.data[t]||0:s+=h.data[t]||0)}return 0>o?a.getPixelForValue(n+o):a.getPixelForValue(s+o)}return a.getPixelForValue(o)},calculateBarY:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.yAxisID),o=(this.getScaleForId(i.xAxisID),this.getBarIndex(e)),s=this.getRuler(),n=a.getPixelForValue(null,t,e,this.chart.isCombo);return n-=this.chart.isCombo?s.tickHeight/2:0,a.options.stacked?n+s.categoryHeight/2+s.categorySpacing:n+s.barHeight/2+s.categorySpacing+s.barHeight*o+s.barSpacing/2+s.barSpacing*o}})}},{}],16:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){var i=e.datasets[t.datasetIndex].label||"",a=e.datasets[t.datasetIndex].data[t.index];return i+": ("+a.x+", "+a.y+", "+a.r+")"}}}},t.controllers.bubble=t.DatasetController.extend({addElements:function(){var i=this.getMeta();e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:a})},this)},addElementAndReset:function(e){var i=new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:e});this.getMeta().data.splice(e,0,i),this.updateElement(i,e,!0)},update:function(t){var i,a=this.getMeta(),o=a.data,s=this.getScaleForId(a.yAxisID);this.getScaleForId(a.xAxisID);i=s.min<0&&s.max<0?s.getPixelForValue(s.max):s.min>0&&s.max>0?s.getPixelForValue(s.min):s.getPixelForValue(0),e.each(o,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,i,a){var o,s=this.getMeta(),n=this.getScaleForId(s.yAxisID),r=this.getScaleForId(s.xAxisID);o=n.min<0&&n.max<0?n.getPixelForValue(n.max):n.min>0&&n.max>0?n.getPixelForValue(n.min):n.getPixelForValue(0),e.extend(t,{_chart:this.chart.chart,_xScale:r,_yScale:n,_datasetIndex:this.index,_index:i,_model:{x:a?r.getPixelForDecimal(.5):r.getPixelForValue(this.getDataset().data[i],i,this.index,this.chart.isCombo),y:a?o:n.getPixelForValue(this.getDataset().data[i],i,this.index),radius:a?0:t.custom&&t.custom.radius?t.custom.radius:this.getRadius(this.getDataset().data[i]),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.point.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.point.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.point.borderWidth),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:e.getValueAtIndexOrDefault(this.getDataset().hitRadius,i,this.chart.options.elements.point.hitRadius)}}),t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y),t.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){t.transition(i),t.draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.hoverRadius?t.custom.hoverRadius:e.getValueAtIndexOrDefault(i.hoverRadius,a,this.chart.options.elements.point.hoverRadius)+this.getRadius(this.getDataset().data[t._index]),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.radius=t.custom&&t.custom.radius?t.custom.radius:this.getRadius(this.getDataset().data[t._index]),t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.point.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.point.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.point.borderWidth)}})}},{}],17:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(t){var e=[];if(e.push('<ul class="'+t.id+'-legend">'),t.data.datasets.length)for(var i=0;i<t.data.datasets[0].data.length;++i)e.push('<li><span style="background-color:'+t.data.datasets[0].backgroundColor[i]+'"></span>'),t.data.labels[i]&&e.push(t.data.labels[i]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var i=t.data;return i.labels.length&&i.datasets.length?i.labels.map(function(a,o){var s=t.getDatasetMeta(0),n=i.datasets[0],r=s.data[o],h=r.custom&&r.custom.backgroundColor?r.custom.backgroundColor:e.getValueAtIndexOrDefault(n.backgroundColor,o,this.chart.options.elements.arc.backgroundColor),l=r.custom&&r.custom.borderColor?r.custom.borderColor:e.getValueAtIndexOrDefault(n.borderColor,o,this.chart.options.elements.arc.borderColor),c=r.custom&&r.custom.borderWidth?r.custom.borderWidth:e.getValueAtIndexOrDefault(n.borderWidth,o,this.chart.options.elements.arc.borderWidth);return{text:a,fillStyle:h,strokeStyle:l,lineWidth:c,hidden:isNaN(n.data[o])||s.data[o].hidden,index:o}},this):[]}},onClick:function(t,e){var i,a,o,s=e.index,n=this.chart;for(i=0,a=(n.data.datasets||[]).length;a>i;++i)o=n.getDatasetMeta(i),o.data[s].hidden=!o.data[s].hidden;n.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+e.datasets[t.datasetIndex].data[t.index]}}}},t.defaults.pie=e.clone(t.defaults.doughnut),e.extend(t.defaults.pie,{cutoutPercentage:0}),t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({linkScales:function(){},addElements:function(){var i=this.getMeta();e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:a})},this)},addElementAndReset:function(i,a){var o=new t.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:i});a&&e.isArray(this.getDataset().backgroundColor)&&this.getDataset().backgroundColor.splice(i,0,a),this.getMeta().data.splice(i,0,o),this.updateElement(o,i,!0)},getRingIndex:function(t){for(var e=0,i=0;t>i;++i)this.chart.isDatasetVisible(i)&&++e;return e},update:function(t){var i=this.chart.chartArea.right-this.chart.chartArea.left-this.chart.options.elements.arc.borderWidth,a=this.chart.chartArea.bottom-this.chart.chartArea.top-this.chart.options.elements.arc.borderWidth,o=Math.min(i,a),s={x:0,y:0};if(this.chart.options.circumference<2*Math.PI){var n=this.chart.options.rotation%(2*Math.PI);n+=2*Math.PI*(n>=Math.PI?-1:n<-Math.PI?1:0);var r=n+this.chart.options.circumference,h={x:Math.cos(n),y:Math.sin(n)},l={x:Math.cos(r),y:Math.sin(r)},c=0>=n&&r>=0||n<=2*Math.PI&&2*Math.PI<=r,d=n<=.5*Math.PI&&.5*Math.PI<=r||n<=2.5*Math.PI&&2.5*Math.PI<=r,u=n<=-Math.PI&&-Math.PI<=r||n<=Math.PI&&Math.PI<=r,g=n<=.5*-Math.PI&&.5*-Math.PI<=r||n<=1.5*Math.PI&&1.5*Math.PI<=r,f=this.chart.options.cutoutPercentage/100,p={x:u?-1:Math.min(h.x*(h.x<0?1:f),l.x*(l.x<0?1:f)),y:g?-1:Math.min(h.y*(h.y<0?1:f),l.y*(l.y<0?1:f))},m={x:c?1:Math.max(h.x*(h.x>0?1:f),l.x*(l.x>0?1:f)),y:d?1:Math.max(h.y*(h.y>0?1:f),l.y*(l.y>0?1:f))},b={width:.5*(m.x-p.x),height:.5*(m.y-p.y)};o=Math.min(i/b.width,a/b.height),s={x:(m.x+p.x)*-.5,y:(m.y+p.y)*-.5}}this.chart.outerRadius=Math.max(o/2,0),this.chart.innerRadius=Math.max(this.chart.options.cutoutPercentage?this.chart.outerRadius/100*this.chart.options.cutoutPercentage:1,0),this.chart.radiusLength=(this.chart.outerRadius-this.chart.innerRadius)/this.chart.getVisibleDatasetCount(),this.chart.offsetX=s.x*this.chart.outerRadius,this.chart.offsetY=s.y*this.chart.outerRadius,this.getMeta().total=this.calculateTotal(),this.outerRadius=this.chart.outerRadius-this.chart.radiusLength*this.getRingIndex(this.index),this.innerRadius=this.outerRadius-this.chart.radiusLength,e.each(this.getMeta().data,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,i,a){var o=(this.chart.chartArea.left+this.chart.chartArea.right)/2,s=(this.chart.chartArea.top+this.chart.chartArea.bottom)/2,n=this.chart.options.rotation,r=this.chart.options.rotation,h=a&&this.chart.options.animation.animateRotate?0:t.hidden?0:this.calculateCircumference(this.getDataset().data[i])*(this.chart.options.circumference/(2*Math.PI)),l=a&&this.chart.options.animation.animateScale?0:this.innerRadius,c=a&&this.chart.options.animation.animateScale?0:this.outerRadius;e.extend(t,{_chart:this.chart.chart,_datasetIndex:this.index,_index:i,_model:{x:o+this.chart.offsetX,y:s+this.chart.offsetY,startAngle:n,endAngle:r,circumference:h,outerRadius:c,innerRadius:l,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.arc.backgroundColor),hoverBackgroundColor:t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor,i,this.chart.options.elements.arc.hoverBackgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.arc.borderColor),label:e.getValueAtIndexOrDefault(this.getDataset().label,i,this.chart.data.labels[i])}}),a&&this.chart.options.animation.animateRotate||(0===i?t._model.startAngle=this.chart.options.rotation:t._model.startAngle=this.getMeta().data[i-1]._model.endAngle,t._model.endAngle=t._model.startAngle+t._model.circumference),t.pivot()},draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){t.transition(i).draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.arc.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.arc.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.arc.borderWidth)},calculateTotal:function(){var t,i=this.getDataset(),a=this.getMeta(),o=0;return e.each(a.data,function(e,a){t=i.data[a],isNaN(t)||e.hidden||(o+=Math.abs(t))}),o},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(t/e):0}})}},{}],18:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.line={showLines:!0,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},t.controllers.line=t.DatasetController.extend({addElements:function(){var i=this.getMeta();i.dataset=i.dataset||new t.elements.Line({_chart:this.chart.chart,_datasetIndex:this.index,_points:i.data}),e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:a})},this)},addElementAndReset:function(e){var i=new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:e});this.getMeta().data.splice(e,0,i),this.updateElement(i,e,!0),this.chart.options.showLines&&0!==this.chart.options.elements.line.tension&&this.updateBezierControlPoints()},update:function(t){var i,a=this.getMeta(),o=a.dataset,s=a.data,n=this.getScaleForId(a.yAxisID);this.getScaleForId(a.xAxisID);i=n.min<0&&n.max<0?n.getPixelForValue(n.max):n.min>0&&n.max>0?n.getPixelForValue(n.min):n.getPixelForValue(0),this.chart.options.showLines&&(o._scale=n,o._datasetIndex=this.index,o._children=s,void 0!==this.getDataset().tension&&void 0===this.getDataset().lineTension&&(this.getDataset().lineTension=this.getDataset().tension),o._model={tension:o.custom&&o.custom.tension?o.custom.tension:e.getValueOrDefault(this.getDataset().lineTension,this.chart.options.elements.line.tension),backgroundColor:o.custom&&o.custom.backgroundColor?o.custom.backgroundColor:this.getDataset().backgroundColor||this.chart.options.elements.line.backgroundColor,borderWidth:o.custom&&o.custom.borderWidth?o.custom.borderWidth:this.getDataset().borderWidth||this.chart.options.elements.line.borderWidth,borderColor:o.custom&&o.custom.borderColor?o.custom.borderColor:this.getDataset().borderColor||this.chart.options.elements.line.borderColor,borderCapStyle:o.custom&&o.custom.borderCapStyle?o.custom.borderCapStyle:this.getDataset().borderCapStyle||this.chart.options.elements.line.borderCapStyle,borderDash:o.custom&&o.custom.borderDash?o.custom.borderDash:this.getDataset().borderDash||this.chart.options.elements.line.borderDash,borderDashOffset:o.custom&&o.custom.borderDashOffset?o.custom.borderDashOffset:this.getDataset().borderDashOffset||this.chart.options.elements.line.borderDashOffset,borderJoinStyle:o.custom&&o.custom.borderJoinStyle?o.custom.borderJoinStyle:this.getDataset().borderJoinStyle||this.chart.options.elements.line.borderJoinStyle,fill:o.custom&&o.custom.fill?o.custom.fill:void 0!==this.getDataset().fill?this.getDataset().fill:this.chart.options.elements.line.fill,scaleTop:n.top,scaleBottom:n.bottom,scaleZero:i},o.pivot()),e.each(s,function(e,i){this.updateElement(e,i,t)},this),this.chart.options.showLines&&0!==this.chart.options.elements.line.tension&&this.updateBezierControlPoints()},getPointBackgroundColor:function(t,i){var a=this.chart.options.elements.point.backgroundColor,o=this.getDataset();return t.custom&&t.custom.backgroundColor?a=t.custom.backgroundColor:o.pointBackgroundColor?a=e.getValueAtIndexOrDefault(o.pointBackgroundColor,i,a):o.backgroundColor&&(a=o.backgroundColor),a},getPointBorderColor:function(t,i){var a=this.chart.options.elements.point.borderColor,o=this.getDataset();return t.custom&&t.custom.borderColor?a=t.custom.borderColor:o.pointBorderColor?a=e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,i,a):o.borderColor&&(a=o.borderColor),a},getPointBorderWidth:function(t,i){var a=this.chart.options.elements.point.borderWidth,o=this.getDataset();return t.custom&&void 0!==t.custom.borderWidth?a=t.custom.borderWidth:void 0!==o.pointBorderWidth?a=e.getValueAtIndexOrDefault(o.pointBorderWidth,i,a):void 0!==o.borderWidth&&(a=o.borderWidth),a},updateElement:function(t,i,a){var o,s=this.getMeta(),n=this.getScaleForId(s.yAxisID),r=this.getScaleForId(s.xAxisID);o=n.min<0&&n.max<0?n.getPixelForValue(n.max):n.min>0&&n.max>0?n.getPixelForValue(n.min):n.getPixelForValue(0),t._chart=this.chart.chart,t._xScale=r,t._yScale=n,t._datasetIndex=this.index,t._index=i,void 0!==this.getDataset().radius&&void 0===this.getDataset().pointRadius&&(this.getDataset().pointRadius=this.getDataset().radius),void 0!==this.getDataset().hitRadius&&void 0===this.getDataset().pointHitRadius&&(this.getDataset().pointHitRadius=this.getDataset().hitRadius),t._model={x:r.getPixelForValue(this.getDataset().data[i],i,this.index,this.chart.isCombo),y:a?o:this.calculatePointY(this.getDataset().data[i],i,this.index,this.chart.isCombo),radius:t.custom&&t.custom.radius?t.custom.radius:e.getValueAtIndexOrDefault(this.getDataset().pointRadius,i,this.chart.options.elements.point.radius),pointStyle:t.custom&&t.custom.pointStyle?t.custom.pointStyle:e.getValueAtIndexOrDefault(this.getDataset().pointStyle,i,this.chart.options.elements.point.pointStyle),backgroundColor:this.getPointBackgroundColor(t,i),borderColor:this.getPointBorderColor(t,i),borderWidth:this.getPointBorderWidth(t,i),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:e.getValueAtIndexOrDefault(this.getDataset().pointHitRadius,i,this.chart.options.elements.point.hitRadius)},t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y)},calculatePointY:function(t,e,i,a){var o=this.getMeta(),s=(this.getScaleForId(o.xAxisID),this.getScaleForId(o.yAxisID));if(s.options.stacked){for(var n=0,r=0,h=0;i>h;h++){var l=this.chart.data.datasets[h],c=this.chart.getDatasetMeta(h);"line"===c.type&&this.chart.isDatasetVisible(h)&&(l.data[e]<0?r+=l.data[e]||0:n+=l.data[e]||0)}return 0>t?s.getPixelForValue(r+t):s.getPixelForValue(n+t)}return s.getPixelForValue(t)},updateBezierControlPoints:function(){var t=this.getMeta();e.each(t.data,function(i,a){var o=e.splineCurve(e.previousItem(t.data,a)._model,i._model,e.nextItem(t.data,a)._model,t.dataset._model.tension);i._model.controlPointPreviousX=Math.max(Math.min(o.previous.x,this.chart.chartArea.right),this.chart.chartArea.left),i._model.controlPointPreviousY=Math.max(Math.min(o.previous.y,this.chart.chartArea.bottom),this.chart.chartArea.top),i._model.controlPointNextX=Math.max(Math.min(o.next.x,this.chart.chartArea.right),this.chart.chartArea.left),i._model.controlPointNextY=Math.max(Math.min(o.next.y,this.chart.chartArea.bottom),this.chart.chartArea.top),i.pivot()},this)},draw:function(t){var i=this.getMeta(),a=t||1;e.each(i.data,function(t){t.transition(a)}),this.chart.options.showLines&&i.dataset.transition(a).draw(),e.each(i.data,function(t){t.draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.hoverRadius?t.custom.hoverRadius:e.getValueAtIndexOrDefault(i.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.pointHoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.pointHoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);void 0!==this.getDataset().radius&&void 0===this.getDataset().pointRadius&&(this.getDataset().pointRadius=this.getDataset().radius),t._model.radius=t.custom&&t.custom.radius?t.custom.radius:e.getValueAtIndexOrDefault(this.getDataset().pointRadius,i,this.chart.options.elements.point.radius),t._model.backgroundColor=this.getPointBackgroundColor(t,i),t._model.borderColor=this.getPointBorderColor(t,i),t._model.borderWidth=this.getPointBorderWidth(t,i)}})}},{}],19:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.polarArea={scale:{type:"radialLinear",lineArc:!0},animation:{animateRotate:!0,animateScale:!0},aspectRatio:1,legendCallback:function(t){var e=[];if(e.push('<ul class="'+t.id+'-legend">'),t.data.datasets.length)for(var i=0;i<t.data.datasets[0].data.length;++i)e.push('<li><span style="background-color:'+t.data.datasets[0].backgroundColor[i]+'">'),t.data.labels[i]&&e.push(t.data.labels[i]),e.push("</span></li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var i=t.data;return i.labels.length&&i.datasets.length?i.labels.map(function(a,o){var s=t.getDatasetMeta(0),n=i.datasets[0],r=s.data[o],h=r.custom&&r.custom.backgroundColor?r.custom.backgroundColor:e.getValueAtIndexOrDefault(n.backgroundColor,o,this.chart.options.elements.arc.backgroundColor),l=r.custom&&r.custom.borderColor?r.custom.borderColor:e.getValueAtIndexOrDefault(n.borderColor,o,this.chart.options.elements.arc.borderColor),c=r.custom&&r.custom.borderWidth?r.custom.borderWidth:e.getValueAtIndexOrDefault(n.borderWidth,o,this.chart.options.elements.arc.borderWidth);return{text:a,fillStyle:h,strokeStyle:l,lineWidth:c,hidden:isNaN(n.data[o])||s.data[o].hidden,index:o}},this):[]}},onClick:function(t,e){var i,a,o,s=e.index,n=this.chart;for(i=0,a=(n.data.datasets||[]).length;a>i;++i)o=n.getDatasetMeta(i),o.data[s].hidden=!o.data[s].hidden;n.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},t.controllers.polarArea=t.DatasetController.extend({linkScales:function(){},addElements:function(){var i=this.getMeta();e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:a})},this)},addElementAndReset:function(e){var i=new t.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:e});this.getMeta().data.splice(e,0,i),this.updateElement(i,e,!0)},update:function(t){var i=this.getMeta(),a=Math.min(this.chart.chartArea.right-this.chart.chartArea.left,this.chart.chartArea.bottom-this.chart.chartArea.top);this.chart.outerRadius=Math.max((a-this.chart.options.elements.arc.borderWidth/2)/2,0),this.chart.innerRadius=Math.max(this.chart.options.cutoutPercentage?this.chart.outerRadius/100*this.chart.options.cutoutPercentage:1,0),this.chart.radiusLength=(this.chart.outerRadius-this.chart.innerRadius)/this.chart.getVisibleDatasetCount(),this.outerRadius=this.chart.outerRadius-this.chart.radiusLength*this.index,this.innerRadius=this.outerRadius-this.chart.radiusLength,i.count=this.countVisibleElements(),e.each(i.data,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,i,a){for(var o=this.calculateCircumference(this.getDataset().data[i]),s=(this.chart.chartArea.left+this.chart.chartArea.right)/2,n=(this.chart.chartArea.top+this.chart.chartArea.bottom)/2,r=0,h=this.getMeta(),l=0;i>l;++l)isNaN(this.getDataset().data[l])||h.data[l].hidden||++r;var c=t.hidden?0:this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),d=-.5*Math.PI+o*r,u=d+(t.hidden?0:o),g={x:s,y:n,innerRadius:0,outerRadius:this.chart.options.animation.animateScale?0:this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),startAngle:this.chart.options.animation.animateRotate?Math.PI*-.5:d,endAngle:this.chart.options.animation.animateRotate?Math.PI*-.5:u,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.arc.backgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.arc.borderColor),label:e.getValueAtIndexOrDefault(this.chart.data.labels,i,this.chart.data.labels[i])};e.extend(t,{_chart:this.chart.chart,_datasetIndex:this.index,_index:i,_scale:this.chart.scale,_model:a?g:{x:s,y:n,innerRadius:0,outerRadius:c,startAngle:d,endAngle:u,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.arc.backgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.arc.borderColor),label:e.getValueAtIndexOrDefault(this.chart.data.labels,i,this.chart.data.labels[i])}}),t.pivot()},draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){t.transition(i).draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().backgroundColor,i,this.chart.options.elements.arc.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().borderColor,i,this.chart.options.elements.arc.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().borderWidth,i,this.chart.options.elements.arc.borderWidth)},countVisibleElements:function(){var t=this.getDataset(),i=this.getMeta(),a=0;return e.each(i.data,function(e,i){isNaN(t.data[i])||e.hidden||a++}),a},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{}],20:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.radar={scale:{type:"radialLinear"},elements:{line:{tension:0}}},t.controllers.radar=t.DatasetController.extend({
linkScales:function(){},addElements:function(){var i=this.getMeta();i.dataset=i.dataset||new t.elements.Line({_chart:this.chart.chart,_datasetIndex:this.index,_points:i.data,_loop:!0}),e.each(this.getDataset().data,function(e,a){i.data[a]=i.data[a]||new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:a,_model:{x:0,y:0}})},this)},addElementAndReset:function(e){var i=new t.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:e});this.getMeta().data.splice(e,0,i),this.updateElement(i,e,!0),this.updateBezierControlPoints()},update:function(t){var i,a=this.getMeta(),o=a.dataset,s=a.data,n=this.chart.scale;i=n.min<0&&n.max<0?n.getPointPositionForValue(0,n.max):n.min>0&&n.max>0?n.getPointPositionForValue(0,n.min):n.getPointPositionForValue(0,0),void 0!==this.getDataset().tension&&void 0===this.getDataset().lineTension&&(this.getDataset().lineTension=this.getDataset().tension),e.extend(a.dataset,{_datasetIndex:this.index,_children:s,_model:{tension:o.custom&&o.custom.tension?o.custom.tension:e.getValueOrDefault(this.getDataset().lineTension,this.chart.options.elements.line.tension),backgroundColor:o.custom&&o.custom.backgroundColor?o.custom.backgroundColor:this.getDataset().backgroundColor||this.chart.options.elements.line.backgroundColor,borderWidth:o.custom&&o.custom.borderWidth?o.custom.borderWidth:this.getDataset().borderWidth||this.chart.options.elements.line.borderWidth,borderColor:o.custom&&o.custom.borderColor?o.custom.borderColor:this.getDataset().borderColor||this.chart.options.elements.line.borderColor,fill:o.custom&&o.custom.fill?o.custom.fill:void 0!==this.getDataset().fill?this.getDataset().fill:this.chart.options.elements.line.fill,borderCapStyle:o.custom&&o.custom.borderCapStyle?o.custom.borderCapStyle:this.getDataset().borderCapStyle||this.chart.options.elements.line.borderCapStyle,borderDash:o.custom&&o.custom.borderDash?o.custom.borderDash:this.getDataset().borderDash||this.chart.options.elements.line.borderDash,borderDashOffset:o.custom&&o.custom.borderDashOffset?o.custom.borderDashOffset:this.getDataset().borderDashOffset||this.chart.options.elements.line.borderDashOffset,borderJoinStyle:o.custom&&o.custom.borderJoinStyle?o.custom.borderJoinStyle:this.getDataset().borderJoinStyle||this.chart.options.elements.line.borderJoinStyle,scaleTop:n.top,scaleBottom:n.bottom,scaleZero:i}}),a.dataset.pivot(),e.each(s,function(e,i){this.updateElement(e,i,t)},this),this.updateBezierControlPoints()},updateElement:function(t,i,a){var o=this.chart.scale.getPointPositionForValue(i,this.getDataset().data[i]);e.extend(t,{_datasetIndex:this.index,_index:i,_scale:this.chart.scale,_model:{x:a?this.chart.scale.xCenter:o.x,y:a?this.chart.scale.yCenter:o.y,tension:t.custom&&t.custom.tension?t.custom.tension:e.getValueOrDefault(this.getDataset().tension,this.chart.options.elements.line.tension),radius:t.custom&&t.custom.radius?t.custom.radius:e.getValueAtIndexOrDefault(this.getDataset().pointRadius,i,this.chart.options.elements.point.radius),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,i,this.chart.options.elements.point.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,i,this.chart.options.elements.point.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,i,this.chart.options.elements.point.borderWidth),pointStyle:t.custom&&t.custom.pointStyle?t.custom.pointStyle:e.getValueAtIndexOrDefault(this.getDataset().pointStyle,i,this.chart.options.elements.point.pointStyle),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:e.getValueAtIndexOrDefault(this.getDataset().hitRadius,i,this.chart.options.elements.point.hitRadius)}}),t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.getMeta();e.each(t.data,function(i,a){var o=e.splineCurve(e.previousItem(t.data,a,!0)._model,i._model,e.nextItem(t.data,a,!0)._model,i._model.tension);i._model.controlPointPreviousX=Math.max(Math.min(o.previous.x,this.chart.chartArea.right),this.chart.chartArea.left),i._model.controlPointPreviousY=Math.max(Math.min(o.previous.y,this.chart.chartArea.bottom),this.chart.chartArea.top),i._model.controlPointNextX=Math.max(Math.min(o.next.x,this.chart.chartArea.right),this.chart.chartArea.left),i._model.controlPointNextY=Math.max(Math.min(o.next.y,this.chart.chartArea.bottom),this.chart.chartArea.top),i.pivot()},this)},draw:function(t){var i=this.getMeta(),a=t||1;e.each(i.data,function(t,e){t.transition(a)}),i.dataset.transition(a).draw(),e.each(i.data,function(t){t.draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.hoverRadius?t.custom.hoverRadius:e.getValueAtIndexOrDefault(i.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor,a,e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:e.getValueAtIndexOrDefault(i.pointHoverBorderColor,a,e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:e.getValueAtIndexOrDefault(i.pointHoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var i=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.radius=t.custom&&t.custom.radius?t.custom.radius:e.getValueAtIndexOrDefault(this.getDataset().radius,i,this.chart.options.elements.point.radius),t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,i,this.chart.options.elements.point.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,i,this.chart.options.elements.point.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,i,this.chart.options.elements.point.borderWidth)}})}},{}],21:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:e.noop,onComplete:e.noop},t.Animation=t.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,i,a){a||(t.animating=!0);for(var o=0;o<this.animations.length;++o)if(this.animations[o].chartInstance===t)return void(this.animations[o].animationObject=e);this.animations.push({chartInstance:t,animationObject:e}),1===this.animations.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var i=e.findIndex(this.animations,function(e){return e.chartInstance===t});-1!==i&&(this.animations.splice(i,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=e.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=Date.now(),e=0;this.dropFrames>1&&(e=Math.floor(this.dropFrames),this.dropFrames=this.dropFrames%1);for(var i=0;i<this.animations.length;)null===this.animations[i].animationObject.currentStep&&(this.animations[i].animationObject.currentStep=0),this.animations[i].animationObject.currentStep+=1+e,this.animations[i].animationObject.currentStep>this.animations[i].animationObject.numSteps&&(this.animations[i].animationObject.currentStep=this.animations[i].animationObject.numSteps),this.animations[i].animationObject.render(this.animations[i].chartInstance,this.animations[i].animationObject),this.animations[i].animationObject.onAnimationProgress&&this.animations[i].animationObject.onAnimationProgress.call&&this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance,this.animations[i]),this.animations[i].animationObject.currentStep===this.animations[i].animationObject.numSteps?(this.animations[i].animationObject.onAnimationComplete&&this.animations[i].animationObject.onAnimationComplete.call&&this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance,this.animations[i]),this.animations[i].chartInstance.animating=!1,this.animations.splice(i,1)):++i;var a=Date.now(),o=(a-t)/this.frameDuration;this.dropFrames+=o,this.animations.length>0&&this.requestAnimationFrame()}}}},{}],22:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.types={},t.instances={},t.controllers={},t.Controller=function(i){return this.chart=i,this.config=i.config,this.options=this.config.options=e.configMerge(t.defaults.global,t.defaults[this.config.type],this.config.options||{}),this.id=e.uid(),Object.defineProperty(this,"data",{get:function(){return this.config.data}}),t.instances[this.id]=this,this.options.responsive&&this.resize(!0),this.initialize(),this},e.extend(t.Controller.prototype,{initialize:function(){return t.pluginService.notifyPlugins("beforeInit",[this]),this.bindEvents(),this.ensureScalesHaveIDs(),this.buildOrUpdateControllers(),this.buildScales(),this.buildSurroundingItems(),this.updateLayout(),this.resetElements(),this.initToolTip(),this.update(),t.pluginService.notifyPlugins("afterInit",[this]),this},clear:function(){return e.clear(this.chart),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(t){var i=this.chart.canvas,a=e.getMaximumWidth(this.chart.canvas),o=this.options.maintainAspectRatio&&isNaN(this.chart.aspectRatio)===!1&&isFinite(this.chart.aspectRatio)&&0!==this.chart.aspectRatio?a/this.chart.aspectRatio:e.getMaximumHeight(this.chart.canvas),s=this.chart.width!==a||this.chart.height!==o;return s?(i.width=this.chart.width=a,i.height=this.chart.height=o,e.retinaScale(this.chart),t||(this.stop(),this.update(this.options.responsiveAnimationDuration)),this):this},ensureScalesHaveIDs:function(){var t="x-axis-",i="y-axis-";this.options.scales&&(this.options.scales.xAxes&&this.options.scales.xAxes.length&&e.each(this.options.scales.xAxes,function(e,i){e.id=e.id||t+i}),this.options.scales.yAxes&&this.options.scales.yAxes.length&&e.each(this.options.scales.yAxes,function(t,e){t.id=t.id||i+e}))},buildScales:function(){if(this.scales={},this.options.scales&&(this.options.scales.xAxes&&this.options.scales.xAxes.length&&e.each(this.options.scales.xAxes,function(i,a){var o=e.getValueOrDefault(i.type,"category"),s=t.scaleService.getScaleConstructor(o);if(s){var n=new s({ctx:this.chart.ctx,options:i,chart:this,id:i.id});this.scales[n.id]=n}},this),this.options.scales.yAxes&&this.options.scales.yAxes.length&&e.each(this.options.scales.yAxes,function(i,a){var o=e.getValueOrDefault(i.type,"linear"),s=t.scaleService.getScaleConstructor(o);if(s){var n=new s({ctx:this.chart.ctx,options:i,chart:this,id:i.id});this.scales[n.id]=n}},this)),this.options.scale){var i=t.scaleService.getScaleConstructor(this.options.scale.type);if(i){var a=new i({ctx:this.chart.ctx,options:this.options.scale,chart:this});this.scale=a,this.scales.radialScale=a}}t.scaleService.addScalesToLayout(this)},buildSurroundingItems:function(){this.options.title&&(this.titleBlock=new t.Title({ctx:this.chart.ctx,options:this.options.title,chart:this}),t.layoutService.addBox(this,this.titleBlock)),this.options.legend&&(this.legend=new t.Legend({ctx:this.chart.ctx,options:this.options.legend,chart:this}),t.layoutService.addBox(this,this.legend))},updateLayout:function(){t.layoutService.update(this,this.chart.width,this.chart.height)},buildOrUpdateControllers:function(){var i=[],a=[];if(e.each(this.data.datasets,function(e,o){var s=this.getDatasetMeta(o);s.type||(s.type=e.type||this.config.type),i.push(s.type),s.controller?s.controller.updateIndex(o):(s.controller=new t.controllers[s.type](this,o),a.push(s.controller))},this),i.length>1)for(var o=1;o<i.length;o++)if(i[o]!==i[o-1]){this.isCombo=!0;break}return a},resetElements:function(){e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.reset()},this)},update:function(i,a){t.pluginService.notifyPlugins("beforeUpdate",[this]),this.tooltip._data=this.data;var o=this.buildOrUpdateControllers();e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.buildOrUpdateElements()},this),t.layoutService.update(this,this.chart.width,this.chart.height),e.each(o,function(t){t.reset()}),e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.update()},this),this.render(i,a),t.pluginService.notifyPlugins("afterUpdate",[this])},render:function(i,a){if(t.pluginService.notifyPlugins("beforeRender",[this]),this.options.animation&&("undefined"!=typeof i&&0!==i||"undefined"==typeof i&&0!==this.options.animation.duration)){var o=new t.Animation;o.numSteps=(i||this.options.animation.duration)/16.66,o.easing=this.options.animation.easing,o.render=function(t,i){var a=e.easingEffects[i.easing],o=i.currentStep/i.numSteps,s=a(o);t.draw(s,o,i.currentStep)},o.onAnimationProgress=this.options.animation.onProgress,o.onAnimationComplete=this.options.animation.onComplete,t.animationService.addAnimation(this,o,i,a)}else this.draw(),this.options.animation&&this.options.animation.onComplete&&this.options.animation.onComplete.call&&this.options.animation.onComplete.call(this);return this},draw:function(i){var a=i||1;this.clear(),t.pluginService.notifyPlugins("beforeDraw",[this,a]),e.each(this.boxes,function(t){t.draw(this.chartArea)},this),this.scale&&this.scale.draw(),this.chart.ctx.save(),this.chart.ctx.beginPath(),this.chart.ctx.rect(this.chartArea.left,this.chartArea.top,this.chartArea.right-this.chartArea.left,this.chartArea.bottom-this.chartArea.top),this.chart.ctx.clip(),e.each(this.data.datasets,function(t,e){this.isDatasetVisible(e)&&this.getDatasetMeta(e).controller.draw(i)},this,!0),this.chart.ctx.restore(),this.tooltip.transition(a).draw(),t.pluginService.notifyPlugins("afterDraw",[this,a])},getElementAtEvent:function(t){var i=e.getRelativePosition(t,this.chart),a=[];return e.each(this.data.datasets,function(t,o){if(this.isDatasetVisible(o)){var s=this.getDatasetMeta(o);e.each(s.data,function(t,e){return t.inRange(i.x,i.y)?(a.push(t),a):void 0})}},this),a},getElementsAtEvent:function(t){var i=e.getRelativePosition(t,this.chart),a=[],o=function(){if(this.data.datasets)for(var t=0;t<this.data.datasets.length;t++){var e=this.getDatasetMeta(t);if(this.isDatasetVisible(t))for(var a=0;a<e.data.length;a++)if(e.data[a].inRange(i.x,i.y))return e.data[a]}}.call(this);return o?(e.each(this.data.datasets,function(t,e){if(this.isDatasetVisible(e)){var i=this.getDatasetMeta(e);a.push(i.data[o._index])}},this),a):a},getDatasetAtEvent:function(t){var e=this.getElementAtEvent(t);return e.length>0&&(e=this.getDatasetMeta(e[0]._datasetIndex).data),e},getDatasetMeta:function(t){var e=this.data.datasets[t];e._meta||(e._meta={});var i=e._meta[this.id];return i||(i=e._meta[this.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,i=this.data.datasets.length;i>e;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){this.clear(),e.unbindEvents(this,this.events),e.removeResizeListener(this.chart.canvas.parentNode);var i=this.chart.canvas;i.width=this.chart.width,i.height=this.chart.height,void 0!==this.chart.originalDevicePixelRatio&&this.chart.ctx.scale(1/this.chart.originalDevicePixelRatio,1/this.chart.originalDevicePixelRatio),i.style.width=this.chart.originalCanvasStyleWidth,i.style.height=this.chart.originalCanvasStyleHeight,t.pluginService.notifyPlugins("destroy",[this]),delete t.instances[this.id]},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)},initToolTip:function(){this.tooltip=new t.Tooltip({_chart:this.chart,_chartInstance:this,_data:this.data,_options:this.options},this)},bindEvents:function(){e.bindEvents(this,this.options.events,function(t){this.eventHandler(t)})},eventHandler:function(t){if(this.lastActive=this.lastActive||[],this.lastTooltipActive=this.lastTooltipActive||[],"mouseout"===t.type)this.active=[],this.tooltipActive=[];else{var i=this,a=function(e){switch(e){case"single":return i.getElementAtEvent(t);case"label":return i.getElementsAtEvent(t);case"dataset":return i.getDatasetAtEvent(t);default:return t}};this.active=a(this.options.hover.mode),this.tooltipActive=a(this.options.tooltips.mode)}if(this.options.hover.onHover&&this.options.hover.onHover.call(this,this.active),("mouseup"===t.type||"click"===t.type)&&(this.options.onClick&&this.options.onClick.call(this,t,this.active),this.legend&&this.legend.handleEvent&&this.legend.handleEvent(t)),this.lastActive.length)switch(this.options.hover.mode){case"single":this.getDatasetMeta(this.lastActive[0]._datasetIndex).controller.removeHoverStyle(this.lastActive[0],this.lastActive[0]._datasetIndex,this.lastActive[0]._index);break;case"label":case"dataset":for(var o=0;o<this.lastActive.length;o++)this.lastActive[o]&&this.getDatasetMeta(this.lastActive[o]._datasetIndex).controller.removeHoverStyle(this.lastActive[o],this.lastActive[o]._datasetIndex,this.lastActive[o]._index)}if(this.active.length&&this.options.hover.mode)switch(this.options.hover.mode){case"single":this.getDatasetMeta(this.active[0]._datasetIndex).controller.setHoverStyle(this.active[0]);break;case"label":case"dataset":for(var s=0;s<this.active.length;s++)this.active[s]&&this.getDatasetMeta(this.active[s]._datasetIndex).controller.setHoverStyle(this.active[s])}if((this.options.tooltips.enabled||this.options.tooltips.custom)&&(this.tooltip.initialize(),this.tooltip._active=this.tooltipActive,this.tooltip.update()),this.tooltip.pivot(),!this.animating){var n;e.each(this.active,function(t,e){t!==this.lastActive[e]&&(n=!0)},this),e.each(this.tooltipActive,function(t,e){t!==this.lastTooltipActive[e]&&(n=!0)},this),(this.lastActive.length!==this.active.length||this.lastTooltipActive.length!==this.tooltipActive.length||n)&&(this.stop(),(this.options.tooltips.enabled||this.options.tooltips.custom)&&this.tooltip.update(!0),this.render(this.options.hover.animationDuration,!0))}return this.lastActive=this.active,this.lastTooltipActive=this.tooltipActive,this}})}},{}],23:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.DatasetController=function(t,e){this.initialize.call(this,t,e)},e.extend(t.DatasetController.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this.getMeta(),e=this.getDataset();null===t.xAxisID&&(t.xAxisID=e.xAxisID||this.chart.options.scales.xAxes[0].id),null===t.yAxisID&&(t.yAxisID=e.yAxisID||this.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getMeta(),e=this.getDataset().data.length,i=t.data.length;if(i>e)t.data.splice(e,i-e);else if(e>i)for(var a=i;e>a;++a)this.addElementAndReset(a)},addElements:e.noop,addElementAndReset:e.noop,draw:e.noop,removeHoverStyle:e.noop,setHoverStyle:e.noop,update:e.noop}),t.DatasetController.extend=e.inherits}},{}],24:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.elements={},t.Element=function(t){e.extend(this,t),this.initialize.apply(this,arguments)},e.extend(t.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){return this._view||(this._view=e.clone(this._model)),this._start=e.clone(this._view),this},transition:function(t){return this._view||(this._view=e.clone(this._model)),1===t?(this._view=this._model,this._start=null,this):(this._start||this.pivot(),e.each(this._model,function(i,a){if("_"!==a[0]&&this._model.hasOwnProperty(a))if(this._view.hasOwnProperty(a))if(i===this._view[a]);else if("string"==typeof i)try{var o=e.color(this._start[a]).mix(e.color(this._model[a]),t);this._view[a]=o.rgbString()}catch(s){this._view[a]=i}else if("number"==typeof i){var n=void 0!==this._start[a]&&isNaN(this._start[a])===!1?this._start[a]:0;this._view[a]=(this._model[a]-n)*t+n}else this._view[a]=i;else"number"!=typeof i||isNaN(this._view[a])?this._view[a]=i:this._view[a]=i*t;else;},this),this)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return e.isNumber(this._model.x)&&e.isNumber(this._model.y)}}),t.Element.extend=e.inherits}},{}],25:[function(t,e,i){"use strict";var a=t("chartjs-color");e.exports=function(t){function e(t,e,i){var a;return"string"==typeof t?(a=parseInt(t,10),-1!=t.indexOf("%")&&(a=a/100*e.parentNode[i])):a=t,a}function i(t,i,a){var o,s=document.defaultView.getComputedStyle(t)[i],n=document.defaultView.getComputedStyle(t.parentNode)[i],r=null!==s&&"none"!==s,h=null!==n&&"none"!==n;return(r||h)&&(o=Math.min(r?e(s,t,a):Number.POSITIVE_INFINITY,h?e(n,t.parentNode,a):Number.POSITIVE_INFINITY)),o}var o=t.helpers={};o.each=function(t,e,i,a){var s,n;if(o.isArray(t))if(n=t.length,a)for(s=n-1;s>=0;s--)e.call(i,t[s],s);else for(s=0;n>s;s++)e.call(i,t[s],s);else if("object"==typeof t){var r=Object.keys(t);for(n=r.length,s=0;n>s;s++)e.call(i,t[r[s]],r[s])}},o.clone=function(t){var e={};return o.each(t,function(i,a){t.hasOwnProperty(a)&&(o.isArray(i)?e[a]=i.slice(0):"object"==typeof i&&null!==i?e[a]=o.clone(i):e[a]=i)}),e},o.extend=function(t){for(var e=arguments.length,i=[],a=1;e>a;a++)i.push(arguments[a]);return o.each(i,function(e){o.each(e,function(i,a){e.hasOwnProperty(a)&&(t[a]=i)})}),t},o.configMerge=function(e){var i=o.clone(e);return o.each(Array.prototype.slice.call(arguments,1),function(e){o.each(e,function(a,s){if(e.hasOwnProperty(s))if("scales"===s)i[s]=o.scaleMerge(i.hasOwnProperty(s)?i[s]:{},a);else if("scale"===s)i[s]=o.configMerge(i.hasOwnProperty(s)?i[s]:{},t.scaleService.getScaleDefaults(a.type),a);else if(i.hasOwnProperty(s)&&o.isArray(i[s])&&o.isArray(a)){var n=i[s];o.each(a,function(t,e){e<n.length?"object"==typeof n[e]&&null!==n[e]&&"object"==typeof t&&null!==t?n[e]=o.configMerge(n[e],t):n[e]=t:n.push(t)})}else i.hasOwnProperty(s)&&"object"==typeof i[s]&&null!==i[s]&&"object"==typeof a?i[s]=o.configMerge(i[s],a):i[s]=a})}),i},o.extendDeep=function(t){function e(t){return o.each(arguments,function(i){i!==t&&o.each(i,function(i,a){t[a]&&t[a].constructor&&t[a].constructor===Object?e(t[a],i):t[a]=i})}),t}return e.apply(this,arguments)},o.scaleMerge=function(e,i){var a=o.clone(e);return o.each(i,function(e,s){i.hasOwnProperty(s)&&("xAxes"===s||"yAxes"===s?a.hasOwnProperty(s)?o.each(e,function(e,i){var n=o.getValueOrDefault(e.type,"xAxes"===s?"category":"linear"),r=t.scaleService.getScaleDefaults(n);i>=a[s].length||!a[s][i].type?a[s].push(o.configMerge(r,e)):e.type&&e.type!==a[s][i].type?a[s][i]=o.configMerge(a[s][i],r,e):a[s][i]=o.configMerge(a[s][i],e)}):(a[s]=[],o.each(e,function(e){var i=o.getValueOrDefault(e.type,"xAxes"===s?"category":"linear");a[s].push(o.configMerge(t.scaleService.getScaleDefaults(i),e))})):a.hasOwnProperty(s)&&"object"==typeof a[s]&&null!==a[s]&&"object"==typeof e?a[s]=o.configMerge(a[s],e):a[s]=e)}),a},o.getValueAtIndexOrDefault=function(t,e,i){return void 0===t||null===t?i:o.isArray(t)?e<t.length?t[e]:i:t},o.getValueOrDefault=function(t,e){return void 0===t?e:t},o.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},o.where=function(t,e){var i=[];return o.each(t,function(t){e(t)&&i.push(t)}),i},o.findIndex=function(t,e,i){var a=-1;if(Array.prototype.findIndex)a=t.findIndex(e,i);else for(var o=0;o<t.length;++o)if(i=void 0!==i?i:t,e.call(i,t[o],o,t)){a=o;break}return a},o.findNextWhere=function(t,e,i){(void 0===i||null===i)&&(i=-1);for(var a=i+1;a<t.length;a++){var o=t[a];if(e(o))return o}},o.findPreviousWhere=function(t,e,i){(void 0===i||null===i)&&(i=t.length);for(var a=i-1;a>=0;a--){var o=t[a];if(e(o))return o}},o.inherits=function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},a=function(){this.constructor=i};return a.prototype=e.prototype,i.prototype=new a,i.extend=o.inherits,t&&o.extend(i.prototype,t),i.__super__=e.prototype,i},o.noop=function(){},o.uid=function(){var t=0;return function(){return t++}}(),o.warn=function(t){console&&"function"==typeof console.warn&&console.warn(t)},o.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},o.almostEquals=function(t,e,i){return Math.abs(t-e)<i},o.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},o.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},o.sign=function(t){return Math.sign?Math.sign(t):(t=+t,0===t||isNaN(t)?t:t>0?1:-1)},o.log10=function(t){return Math.log10?Math.log10(t):Math.log(t)/Math.LN10},o.toRadians=function(t){return t*(Math.PI/180)},o.toDegrees=function(t){return t*(180/Math.PI)},o.getAngleFromPoint=function(t,e){var i=e.x-t.x,a=e.y-t.y,o=Math.sqrt(i*i+a*a),s=Math.atan2(a,i);return s<-.5*Math.PI&&(s+=2*Math.PI),{angle:s,distance:o}},o.aliasPixel=function(t){return t%2===0?0:.5},o.splineCurve=function(t,e,i,a){var o=t.skip?e:t,s=e,n=i.skip?e:i,r=Math.sqrt(Math.pow(s.x-o.x,2)+Math.pow(s.y-o.y,2)),h=Math.sqrt(Math.pow(n.x-s.x,2)+Math.pow(n.y-s.y,2)),l=r/(r+h),c=h/(r+h);l=isNaN(l)?0:l,c=isNaN(c)?0:c;var d=a*l,u=a*c;return{previous:{x:s.x-d*(n.x-o.x),y:s.y-d*(n.y-o.y)},next:{x:s.x+u*(n.x-o.x),y:s.y+u*(n.y-o.y)}}},o.nextItem=function(t,e,i){return i?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},o.previousItem=function(t,e,i){return i?0>=e?t[t.length-1]:t[e-1]:0>=e?t[0]:t[e-1]},o.niceNum=function(t,e){var i,a=Math.floor(o.log10(t)),s=t/Math.pow(10,a);return i=e?1.5>s?1:3>s?2:7>s?5:10:1>=s?1:2>=s?2:5>=s?5:10,i*Math.pow(10,a)};var s=o.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1===(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),-(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)))},easeOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1===(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),a*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:2===(t/=.5)?1:(i||(i=1*(.3*1.5)),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),1>t?-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)):a*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-s.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*s.easeInBounce(2*t):.5*s.easeOutBounce(2*t-1)+.5}};o.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),o.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),o.getRelativePosition=function(t,e){var i,a,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,r=n.getBoundingClientRect();s.touches&&s.touches.length>0?(i=s.touches[0].clientX,a=s.touches[0].clientY):(i=s.clientX,a=s.clientY);var h=parseFloat(o.getStyle(n,"padding-left")),l=parseFloat(o.getStyle(n,"padding-top")),c=parseFloat(o.getStyle(n,"padding-right")),d=parseFloat(o.getStyle(n,"padding-bottom")),u=r.right-r.left-h-c,g=r.bottom-r.top-l-d;return i=Math.round((i-r.left-h)/u*n.width/e.currentDevicePixelRatio),a=Math.round((a-r.top-l)/g*n.height/e.currentDevicePixelRatio),{x:i,y:a}},o.addEvent=function(t,e,i){t.addEventListener?t.addEventListener(e,i):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},o.removeEvent=function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=o.noop},o.bindEvents=function(t,e,i){t.events||(t.events={}),o.each(e,function(e){t.events[e]=function(){i.apply(t,arguments)},o.addEvent(t.chart.canvas,e,t.events[e])})},o.unbindEvents=function(t,e){o.each(e,function(e,i){o.removeEvent(t.chart.canvas,i,e)})},o.getConstraintWidth=function(t){return i(t,"max-width","clientWidth")},o.getConstraintHeight=function(t){return i(t,"max-height","clientHeight")},o.getMaximumWidth=function(t){var e=t.parentNode,i=parseInt(o.getStyle(e,"padding-left"))+parseInt(o.getStyle(e,"padding-right")),a=e.clientWidth-i,s=o.getConstraintWidth(t);return void 0!==s&&(a=Math.min(a,s)),a},o.getMaximumHeight=function(t){var e=t.parentNode,i=parseInt(o.getStyle(e,"padding-top"))+parseInt(o.getStyle(e,"padding-bottom")),a=e.clientHeight-i,s=o.getConstraintHeight(t);return void 0!==s&&(a=Math.min(a,s)),a},o.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},o.retinaScale=function(t){var e=t.ctx,i=t.canvas.width,a=t.canvas.height,o=t.currentDevicePixelRatio=window.devicePixelRatio||1;1!==o&&(e.canvas.height=a*o,e.canvas.width=i*o,e.scale(o,o),t.originalDevicePixelRatio=t.originalDevicePixelRatio||o),e.canvas.style.width=i+"px",e.canvas.style.height=a+"px"},o.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},o.fontString=function(t,e,i){return e+" "+t+"px "+i},o.longestText=function(t,e,i,a){a=a||{},a.data=a.data||{},a.garbageCollect=a.garbageCollect||[],
a.font!==e&&(a.data={},a.garbageCollect=[],a.font=e),t.font=e;var s=0;o.each(i,function(e){if(void 0!==e&&null!==e){var i=a.data[e];i||(i=a.data[e]=t.measureText(e).width,a.garbageCollect.push(e)),i>s&&(s=i)}});var n=a.garbageCollect.length/2;if(n>i.length){for(var r=0;n>r;r++)delete a.data[a.garbageCollect[r]];a.garbageCollect.splice(0,n)}return s},o.drawRoundedRectangle=function(t,e,i,a,o,s){t.beginPath(),t.moveTo(e+s,i),t.lineTo(e+a-s,i),t.quadraticCurveTo(e+a,i,e+a,i+s),t.lineTo(e+a,i+o-s),t.quadraticCurveTo(e+a,i+o,e+a-s,i+o),t.lineTo(e+s,i+o),t.quadraticCurveTo(e,i+o,e,i+o-s),t.lineTo(e,i+s),t.quadraticCurveTo(e,i,e+s,i),t.closePath()},o.color=function(e){return a?a(e instanceof CanvasGradient?t.defaults.global.defaultColor:e):(console.log("Color.js not found!"),e)},o.addResizeListener=function(t,e){var i=document.createElement("iframe"),a="chartjs-hidden-iframe";i.classlist?i.classlist.add(a):i.setAttribute("class",a),i.style.width="100%",i.style.display="block",i.style.border=0,i.style.height=0,i.style.margin=0,i.style.position="absolute",i.style.left=0,i.style.right=0,i.style.top=0,i.style.bottom=0,t.insertBefore(i,t.firstChild),(i.contentWindow||i).onresize=function(){e&&e()}},o.removeResizeListener=function(t){var e=t.querySelector(".chartjs-hidden-iframe");e&&e.parentNode.removeChild(e)},o.isArray=function(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)},o.pushAllIfDefined=function(t,e){"undefined"!=typeof t&&(o.isArray(t)?e.push.apply(e,t):e.push(t))},o.callCallback=function(t,e,i){t&&"function"==typeof t.call&&t.apply(i,e)}}},{"chartjs-color":6}],26:[function(t,e,i){"use strict";e.exports=function(){var t=function(e,i){this.config=i,e.length&&e[0].getContext&&(e=e[0]),e.getContext&&(e=e.getContext("2d")),this.ctx=e,this.canvas=e.canvas,this.width=e.canvas.width||parseInt(t.helpers.getStyle(e.canvas,"width"))||t.helpers.getMaximumWidth(e.canvas),this.height=e.canvas.height||parseInt(t.helpers.getStyle(e.canvas,"height"))||t.helpers.getMaximumHeight(e.canvas),this.aspectRatio=this.width/this.height,(isNaN(this.aspectRatio)||isFinite(this.aspectRatio)===!1)&&(this.aspectRatio=void 0!==i.aspectRatio?i.aspectRatio:2),this.originalCanvasStyleWidth=e.canvas.style.width,this.originalCanvasStyleHeight=e.canvas.style.height,t.helpers.retinaScale(this),i&&(this.controller=new t.Controller(this));var a=this;return t.helpers.addResizeListener(e.canvas.parentNode,function(){a.controller&&a.controller.config.options.responsive&&a.controller.resize()}),this.controller?this.controller:this};return t.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"single",animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var i=0;i<t.data.datasets.length;i++)e.push('<li><span style="background-color:'+t.data.datasets[i].backgroundColor+'"></span>'),t.data.datasets[i].label&&e.push(t.data.datasets[i].label),e.push("</li>");return e.push("</ul>"),e.join("")}}},t}},{}],27:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.layoutService={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),t.boxes.push(e)},removeBox:function(t,e){t.boxes&&t.boxes.splice(t.boxes.indexOf(e),1)},update:function(t,i,a){function o(t){var e,i=t.isHorizontal();i?(e=t.update(t.options.fullWidth?p:k,y),S-=e.height):(e=t.update(v,x),k-=e.width),C.push({horizontal:i,minSize:e,box:t})}function s(t){var i=e.findNextWhere(C,function(e){return e.box===t});if(i)if(t.isHorizontal()){var a={left:w,right:D,top:0,bottom:0};t.update(t.options.fullWidth?p:k,m/2,a)}else t.update(i.minSize.width,S)}function n(t){var i=e.findNextWhere(C,function(e){return e.box===t}),a={left:0,right:0,top:M,bottom:A};i&&t.update(i.minSize.width,S,a)}function r(t){t.isHorizontal()?(t.left=t.options.fullWidth?h:w,t.right=t.options.fullWidth?i-h:w+k,t.top=P,t.bottom=P+t.height,P=t.bottom):(t.left=F,t.right=F+t.width,t.top=M,t.bottom=M+S,F=t.right)}if(t){var h=0,l=0,c=e.where(t.boxes,function(t){return"left"===t.options.position}),d=e.where(t.boxes,function(t){return"right"===t.options.position}),u=e.where(t.boxes,function(t){return"top"===t.options.position}),g=e.where(t.boxes,function(t){return"bottom"===t.options.position}),f=e.where(t.boxes,function(t){return"chartArea"===t.options.position});u.sort(function(t,e){return(e.options.fullWidth?1:0)-(t.options.fullWidth?1:0)}),g.sort(function(t,e){return(t.options.fullWidth?1:0)-(e.options.fullWidth?1:0)});var p=i-2*h,m=a-2*l,b=p/2,x=m/2,v=(i-b)/(c.length+d.length),y=(a-x)/(u.length+g.length),k=p,S=m,C=[];e.each(c.concat(d,u,g),o);var w=h,D=h,M=l,A=l;e.each(c.concat(d),s),e.each(c,function(t){w+=t.width}),e.each(d,function(t){D+=t.width}),e.each(u.concat(g),s),e.each(u,function(t){M+=t.height}),e.each(g,function(t){A+=t.height}),e.each(c.concat(d),n),w=h,D=h,M=l,A=l,e.each(c,function(t){w+=t.width}),e.each(d,function(t){D+=t.width}),e.each(u,function(t){M+=t.height}),e.each(g,function(t){A+=t.height});var _=a-M-A,I=i-w-D;(I!==k||_!==S)&&(e.each(c,function(t){t.height=_}),e.each(d,function(t){t.height=_}),e.each(u,function(t){t.options.fullWidth||(t.width=I)}),e.each(g,function(t){t.options.fullWidth||(t.width=I)}),S=_,k=I);var F=h,P=l;e.each(c.concat(u),r),F+=k,P+=S,e.each(d,r),e.each(g,r),t.chartArea={left:w,top:M,right:w+k,bottom:M+S},e.each(f,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(k,S)})}}}}},{}],28:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,onClick:function(t,e){var i=e.datasetIndex,a=this.chart.getDatasetMeta(i);a.hidden=null===a.hidden?!this.chart.data.datasets[i].hidden:null,this.chart.update()},labels:{boxWidth:40,padding:10,generateLabels:function(t){var i=t.data;return e.isArray(i.datasets)?i.datasets.map(function(e,i){return{text:e.label,fillStyle:e.backgroundColor,hidden:!t.isDatasetVisible(i),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,datasetIndex:i}},this):[]}}},t.Legend=t.Element.extend({initialize:function(t){e.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:e.noop,update:function(t,e,i){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this.margins=i,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeBuildLabels(),this.buildLabels(),this.afterBuildLabels(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:e.noop,beforeSetDimensions:e.noop,setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0,this.minSize={width:0,height:0}},afterSetDimensions:e.noop,beforeBuildLabels:e.noop,buildLabels:function(){this.legendItems=this.options.labels.generateLabels.call(this,this.chart),this.options.reverse&&this.legendItems.reverse()},afterBuildLabels:e.noop,beforeFit:e.noop,fit:function(){var i=this.ctx,a=e.getValueOrDefault(this.options.labels.fontSize,t.defaults.global.defaultFontSize),o=e.getValueOrDefault(this.options.labels.fontStyle,t.defaults.global.defaultFontStyle),s=e.getValueOrDefault(this.options.labels.fontFamily,t.defaults.global.defaultFontFamily),n=e.fontString(a,o,s);if(this.legendHitBoxes=[],this.isHorizontal()?this.minSize.width=this.maxWidth:this.minSize.width=this.options.display?10:0,this.isHorizontal()?this.minSize.height=this.options.display?10:0:this.minSize.height=this.maxHeight,this.options.display&&this.isHorizontal()){this.lineWidths=[0];var r=this.legendItems.length?a+this.options.labels.padding:0;i.textAlign="left",i.textBaseline="top",i.font=n,e.each(this.legendItems,function(t,e){var o=this.options.labels.boxWidth+a/2+i.measureText(t.text).width;this.lineWidths[this.lineWidths.length-1]+o+this.options.labels.padding>=this.width&&(r+=a+this.options.labels.padding,this.lineWidths[this.lineWidths.length]=this.left),this.legendHitBoxes[e]={left:0,top:0,width:o,height:a},this.lineWidths[this.lineWidths.length-1]+=o+this.options.labels.padding},this),this.minSize.height+=r}this.width=this.minSize.width,this.height=this.minSize.height},afterFit:e.noop,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){if(this.options.display){var i=this.ctx,a={x:this.left+(this.width-this.lineWidths[0])/2,y:this.top+this.options.labels.padding,line:0},o=e.getValueOrDefault(this.options.labels.fontColor,t.defaults.global.defaultFontColor),s=e.getValueOrDefault(this.options.labels.fontSize,t.defaults.global.defaultFontSize),n=e.getValueOrDefault(this.options.labels.fontStyle,t.defaults.global.defaultFontStyle),r=e.getValueOrDefault(this.options.labels.fontFamily,t.defaults.global.defaultFontFamily),h=e.fontString(s,n,r);this.isHorizontal()&&(i.textAlign="left",i.textBaseline="top",i.lineWidth=.5,i.strokeStyle=o,i.fillStyle=o,i.font=h,e.each(this.legendItems,function(e,o){var n=i.measureText(e.text).width,r=this.options.labels.boxWidth+s/2+n;a.x+r>=this.width&&(a.y+=s+this.options.labels.padding,a.line++,a.x=this.left+(this.width-this.lineWidths[a.line])/2),i.save();var h=function(t,e){return void 0!==t?t:e};i.fillStyle=h(e.fillStyle,t.defaults.global.defaultColor),i.lineCap=h(e.lineCap,t.defaults.global.elements.line.borderCapStyle),i.lineDashOffset=h(e.lineDashOffset,t.defaults.global.elements.line.borderDashOffset),i.lineJoin=h(e.lineJoin,t.defaults.global.elements.line.borderJoinStyle),i.lineWidth=h(e.lineWidth,t.defaults.global.elements.line.borderWidth),i.strokeStyle=h(e.strokeStyle,t.defaults.global.defaultColor),i.setLineDash&&i.setLineDash(h(e.lineDash,t.defaults.global.elements.line.borderDash)),i.strokeRect(a.x,a.y,this.options.labels.boxWidth,s),i.fillRect(a.x,a.y,this.options.labels.boxWidth,s),i.restore(),this.legendHitBoxes[o].left=a.x,this.legendHitBoxes[o].top=a.y,i.fillText(e.text,this.options.labels.boxWidth+s/2+a.x,a.y),e.hidden&&(i.beginPath(),i.lineWidth=2,i.moveTo(this.options.labels.boxWidth+s/2+a.x,a.y+s/2),i.lineTo(this.options.labels.boxWidth+s/2+a.x+n,a.y+s/2),i.stroke()),a.x+=r+this.options.labels.padding},this))}},handleEvent:function(t){var i=e.getRelativePosition(t,this.chart.chart);if(i.x>=this.left&&i.x<=this.right&&i.y>=this.top&&i.y<=this.bottom)for(var a=0;a<this.legendHitBoxes.length;++a){var o=this.legendHitBoxes[a];if(i.x>=o.left&&i.x<=o.left+o.width&&i.y>=o.top&&i.y<=o.top+o.height){this.options.onClick&&this.options.onClick.call(this,t,this.legendItems[a]);break}}}})}},{}],29:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.plugins=[],t.pluginService={register:function(e){-1===t.plugins.indexOf(e)&&t.plugins.push(e)},remove:function(e){var i=t.plugins.indexOf(e);-1!==i&&t.plugins.splice(i,1)},notifyPlugins:function(i,a,o){e.each(t.plugins,function(t){t[i]&&"function"==typeof t[i]&&t[i].apply(o,a)},o)}},t.PluginBase=t.Element.extend({beforeInit:e.noop,afterInit:e.noop,beforeUpdate:e.noop,afterUpdate:e.noop,beforeDraw:e.noop,afterDraw:e.noop,destroy:e.noop})}},{}],30:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",offsetGridLines:!1},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,maxRotation:50,mirror:!1,padding:10,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,callback:function(t){return""+t}}},t.Scale=t.Element.extend({beforeUpdate:function(){e.callCallback(this.options.beforeUpdate,[this])},update:function(t,i,a){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=i,this.margins=e.extend({left:0,right:0,top:0,bottom:0},a),this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this.beforeBuildTicks(),this.buildTicks(),this.afterBuildTicks(),this.beforeTickToLabelConversion(),this.convertTicksToLabels(),this.afterTickToLabelConversion(),this.beforeCalculateTickRotation(),this.calculateTickRotation(),this.afterCalculateTickRotation(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:function(){e.callCallback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){e.callCallback(this.options.beforeSetDimensions,[this])},setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0},afterSetDimensions:function(){e.callCallback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){e.callCallback(this.options.beforeDataLimits,[this])},determineDataLimits:e.noop,afterDataLimits:function(){e.callCallback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){e.callCallback(this.options.beforeBuildTicks,[this])},buildTicks:e.noop,afterBuildTicks:function(){e.callCallback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){e.callCallback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){this.ticks=this.ticks.map(function(t,e,i){return this.options.ticks.userCallback?this.options.ticks.userCallback(t,e,i):this.options.ticks.callback(t,e,i)},this)},afterTickToLabelConversion:function(){e.callCallback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){e.callCallback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var i=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),a=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),o=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),s=e.fontString(i,a,o);this.ctx.font=s;var n,r=this.ctx.measureText(this.ticks[0]).width,h=this.ctx.measureText(this.ticks[this.ticks.length-1]).width;if(this.labelRotation=0,this.paddingRight=0,this.paddingLeft=0,this.options.display&&this.isHorizontal()){this.paddingRight=h/2+3,this.paddingLeft=r/2+3,this.longestTextCache||(this.longestTextCache={});for(var l,c,d=e.longestText(this.ctx,s,this.ticks,this.longestTextCache),u=d,g=this.getPixelForTick(1)-this.getPixelForTick(0)-6;u>g&&this.labelRotation<this.options.ticks.maxRotation;){if(l=Math.cos(e.toRadians(this.labelRotation)),c=Math.sin(e.toRadians(this.labelRotation)),n=l*r,n+i/2>this.yLabelWidth&&(this.paddingLeft=n+i/2),this.paddingRight=i/2,c*d>this.maxHeight){this.labelRotation--;break}this.labelRotation++,u=l*d}}this.margins&&(this.paddingLeft=Math.max(this.paddingLeft-this.margins.left,0),this.paddingRight=Math.max(this.paddingRight-this.margins.right,0))},afterCalculateTickRotation:function(){e.callCallback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){e.callCallback(this.options.beforeFit,[this])},fit:function(){this.minSize={width:0,height:0};var i=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),a=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),o=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),s=e.fontString(i,a,o),n=e.getValueOrDefault(this.options.scaleLabel.fontSize,t.defaults.global.defaultFontSize),r=e.getValueOrDefault(this.options.scaleLabel.fontStyle,t.defaults.global.defaultFontStyle),h=e.getValueOrDefault(this.options.scaleLabel.fontFamily,t.defaults.global.defaultFontFamily);e.fontString(n,r,h);if(this.isHorizontal()?this.minSize.width=this.isFullWidth()?this.maxWidth-this.margins.left-this.margins.right:this.maxWidth:this.minSize.width=this.options.gridLines.tickMarkLength,this.isHorizontal()?this.minSize.height=this.options.gridLines.tickMarkLength:this.minSize.height=this.maxHeight,this.options.scaleLabel.display&&(this.isHorizontal()?this.minSize.height+=1.5*n:this.minSize.width+=1.5*n),this.options.ticks.display&&this.options.display){this.longestTextCache||(this.longestTextCache={});var l=e.longestText(this.ctx,s,this.ticks,this.longestTextCache);if(this.isHorizontal()){this.longestLabelWidth=l;var c=Math.sin(e.toRadians(this.labelRotation))*this.longestLabelWidth+1.5*i;this.minSize.height=Math.min(this.maxHeight,this.minSize.height+c),this.ctx.font=s;var d=this.ctx.measureText(this.ticks[0]).width,u=this.ctx.measureText(this.ticks[this.ticks.length-1]).width,g=Math.cos(e.toRadians(this.labelRotation)),f=Math.sin(e.toRadians(this.labelRotation));this.paddingLeft=0!==this.labelRotation?g*d+3:d/2+3,this.paddingRight=0!==this.labelRotation?f*(i/2)+3:u/2+3}else{var p=this.maxWidth-this.minSize.width;this.options.ticks.mirror||(l+=this.options.ticks.padding),p>l?this.minSize.width+=l:this.minSize.width=this.maxWidth,this.paddingTop=i/2,this.paddingBottom=i/2}}this.margins&&(this.paddingLeft=Math.max(this.paddingLeft-this.margins.left,0),this.paddingTop=Math.max(this.paddingTop-this.margins.top,0),this.paddingRight=Math.max(this.paddingRight-this.margins.right,0),this.paddingBottom=Math.max(this.paddingBottom-this.margins.bottom,0)),this.width=this.minSize.width,this.height=this.minSize.height},afterFit:function(){e.callCallback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function i(t){return null===t||"undefined"==typeof t?NaN:"number"==typeof t&&isNaN(t)?NaN:"object"==typeof t?t instanceof Date?t:i(this.isHorizontal()?t.x:t.y):t},getLabelForIndex:e.noop,getPixelForValue:e.noop,getValueForPixel:e.noop,getPixelForTick:function(t,e){if(this.isHorizontal()){var i=this.width-(this.paddingLeft+this.paddingRight),a=i/Math.max(this.ticks.length-(this.options.gridLines.offsetGridLines?0:1),1),o=a*t+this.paddingLeft;e&&(o+=a/2);var s=this.left+Math.round(o);return s+=this.isFullWidth()?this.margins.left:0}var n=this.height-(this.paddingTop+this.paddingBottom);return this.top+t*(n/(this.ticks.length-1))},getPixelForDecimal:function(t){if(this.isHorizontal()){var e=this.width-(this.paddingLeft+this.paddingRight),i=e*t+this.paddingLeft,a=this.left+Math.round(i);return a+=this.isFullWidth()?this.margins.left:0}return this.top+t*this.height},draw:function(i){if(this.options.display){var a,o,s,n,r,h=0!==this.labelRotation,l=this.options.ticks.autoSkip;this.options.ticks.maxTicksLimit&&(r=this.options.ticks.maxTicksLimit);var c=e.getValueOrDefault(this.options.ticks.fontColor,t.defaults.global.defaultFontColor),d=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),u=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),g=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),f=e.fontString(d,u,g),p=this.options.gridLines.tickMarkLength,m=e.getValueOrDefault(this.options.scaleLabel.fontColor,t.defaults.global.defaultFontColor),b=e.getValueOrDefault(this.options.scaleLabel.fontSize,t.defaults.global.defaultFontSize),x=e.getValueOrDefault(this.options.scaleLabel.fontStyle,t.defaults.global.defaultFontStyle),v=e.getValueOrDefault(this.options.scaleLabel.fontFamily,t.defaults.global.defaultFontFamily),y=e.fontString(b,x,v),k=Math.cos(e.toRadians(this.labelRotation)),S=(Math.sin(e.toRadians(this.labelRotation)),this.longestLabelWidth*k);if(this.ctx.fillStyle=c,this.isHorizontal()){a=!0;var C="bottom"===this.options.position?this.top:this.bottom-p,w="bottom"===this.options.position?this.top+p:this.bottom;if(o=!1,(S/2+this.options.ticks.autoSkipPadding)*this.ticks.length>this.width-(this.paddingLeft+this.paddingRight)&&(o=1+Math.floor((S/2+this.options.ticks.autoSkipPadding)*this.ticks.length/(this.width-(this.paddingLeft+this.paddingRight)))),r&&this.ticks.length>r)for(;!o||this.ticks.length/(o||1)>r;)o||(o=1),o+=1;l||(o=!1),e.each(this.ticks,function(t,s){var n=this.ticks.length===s+1,r=o>1&&s%o>0||s%o===0&&s+o>this.ticks.length;if((!r||n)&&void 0!==t&&null!==t){var l=this.getPixelForTick(s),c=this.getPixelForTick(s,this.options.gridLines.offsetGridLines);this.options.gridLines.display&&(s===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(this.ctx.lineWidth=this.options.gridLines.zeroLineWidth,this.ctx.strokeStyle=this.options.gridLines.zeroLineColor,a=!0):a&&(this.ctx.lineWidth=this.options.gridLines.lineWidth,this.ctx.strokeStyle=this.options.gridLines.color,a=!1),l+=e.aliasPixel(this.ctx.lineWidth),this.ctx.beginPath(),this.options.gridLines.drawTicks&&(this.ctx.moveTo(l,C),this.ctx.lineTo(l,w)),this.options.gridLines.drawOnChartArea&&(this.ctx.moveTo(l,i.top),this.ctx.lineTo(l,i.bottom)),this.ctx.stroke()),this.options.ticks.display&&(this.ctx.save(),this.ctx.translate(c,h?this.top+12:"top"===this.options.position?this.bottom-p:this.top+p),this.ctx.rotate(-1*e.toRadians(this.labelRotation)),this.ctx.font=f,this.ctx.textAlign=h?"right":"center",this.ctx.textBaseline=h?"middle":"top"===this.options.position?"bottom":"top",this.ctx.fillText(t,0,0),this.ctx.restore())}},this),this.options.scaleLabel.display&&(this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle=m,this.ctx.font=y,s=this.left+(this.right-this.left)/2,n="bottom"===this.options.position?this.bottom-b/2:this.top+b/2,this.ctx.fillText(this.options.scaleLabel.labelString,s,n))}else{a=!0;var D="right"===this.options.position?this.left:this.right-5,M="right"===this.options.position?this.left+5:this.right;if(e.each(this.ticks,function(t,o){if(void 0!==t&&null!==t){var s=this.getPixelForTick(o);if(this.options.gridLines.display&&(o===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(this.ctx.lineWidth=this.options.gridLines.zeroLineWidth,this.ctx.strokeStyle=this.options.gridLines.zeroLineColor,a=!0):a&&(this.ctx.lineWidth=this.options.gridLines.lineWidth,this.ctx.strokeStyle=this.options.gridLines.color,a=!1),s+=e.aliasPixel(this.ctx.lineWidth),this.ctx.beginPath(),this.options.gridLines.drawTicks&&(this.ctx.moveTo(D,s),this.ctx.lineTo(M,s)),this.options.gridLines.drawOnChartArea&&(this.ctx.moveTo(i.left,s),this.ctx.lineTo(i.right,s)),this.ctx.stroke()),this.options.ticks.display){var n,r=this.getPixelForTick(o,this.options.gridLines.offsetGridLines);this.ctx.save(),"left"===this.options.position?this.options.ticks.mirror?(n=this.right+this.options.ticks.padding,this.ctx.textAlign="left"):(n=this.right-this.options.ticks.padding,this.ctx.textAlign="right"):this.options.ticks.mirror?(n=this.left-this.options.ticks.padding,this.ctx.textAlign="right"):(n=this.left+this.options.ticks.padding,this.ctx.textAlign="left"),this.ctx.translate(n,r),this.ctx.rotate(-1*e.toRadians(this.labelRotation)),this.ctx.font=f,this.ctx.textBaseline="middle",this.ctx.fillText(t,0,0),this.ctx.restore()}}},this),this.options.scaleLabel.display){s="left"===this.options.position?this.left+b/2:this.right-b/2,n=this.top+(this.bottom-this.top)/2;var A="left"===this.options.position?-.5*Math.PI:.5*Math.PI;this.ctx.save(),this.ctx.translate(s,n),this.ctx.rotate(A),this.ctx.textAlign="center",this.ctx.fillStyle=m,this.ctx.font=y,this.ctx.textBaseline="middle",this.ctx.fillText(this.options.scaleLabel.labelString,0,0),this.ctx.restore()}}this.ctx.lineWidth=this.options.gridLines.lineWidth,this.ctx.strokeStyle=this.options.gridLines.color;var _=this.left,I=this.right,F=this.top,P=this.bottom;this.isHorizontal()?(F=P="top"===this.options.position?this.bottom:this.top,F+=e.aliasPixel(this.ctx.lineWidth),P+=e.aliasPixel(this.ctx.lineWidth)):(_=I="left"===this.options.position?this.right:this.left,_+=e.aliasPixel(this.ctx.lineWidth),I+=e.aliasPixel(this.ctx.lineWidth)),this.ctx.beginPath(),this.ctx.moveTo(_,F),this.ctx.lineTo(I,P),this.ctx.stroke()}}})}},{}],31:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,i,a){this.constructors[t]=i,this.defaults[t]=e.clone(a)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(i){return this.defaults.hasOwnProperty(i)?e.scaleMerge(t.defaults.scale,this.defaults[i]):{}},addScalesToLayout:function(i){e.each(i.scales,function(e){t.layoutService.addBox(i,e)})}}}},{}],32:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.title={display:!1,position:"top",fullWidth:!0,fontStyle:"bold",padding:10,text:""},t.Title=t.Element.extend({initialize:function(i){e.extend(this,i),this.options=e.configMerge(t.defaults.global.title,i.options),this.legendHitBoxes=[]},beforeUpdate:e.noop,update:function(t,e,i){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this.margins=i,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeBuildLabels(),this.buildLabels(),this.afterBuildLabels(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:e.noop,beforeSetDimensions:e.noop,setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0,this.minSize={width:0,height:0}},afterSetDimensions:e.noop,beforeBuildLabels:e.noop,buildLabels:e.noop,afterBuildLabels:e.noop,beforeFit:e.noop,fit:function(){var i=(this.ctx,e.getValueOrDefault(this.options.fontSize,t.defaults.global.defaultFontSize)),a=e.getValueOrDefault(this.options.fontStyle,t.defaults.global.defaultFontStyle),o=e.getValueOrDefault(this.options.fontFamily,t.defaults.global.defaultFontFamily);e.fontString(i,a,o);this.isHorizontal()?this.minSize.width=this.maxWidth:this.minSize.width=0,this.isHorizontal()?this.minSize.height=0:this.minSize.height=this.maxHeight,this.isHorizontal()?this.options.display&&(this.minSize.height+=i+2*this.options.padding):this.options.display&&(this.minSize.width+=i+2*this.options.padding),this.width=this.minSize.width,this.height=this.minSize.height},afterFit:e.noop,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){if(this.options.display){var i,a,o=this.ctx,s=e.getValueOrDefault(this.options.fontColor,t.defaults.global.defaultFontColor),n=e.getValueOrDefault(this.options.fontSize,t.defaults.global.defaultFontSize),r=e.getValueOrDefault(this.options.fontStyle,t.defaults.global.defaultFontStyle),h=e.getValueOrDefault(this.options.fontFamily,t.defaults.global.defaultFontFamily),l=e.fontString(n,r,h);if(o.fillStyle=s,o.font=l,this.isHorizontal())o.textAlign="center",o.textBaseline="middle",i=this.left+(this.right-this.left)/2,a=this.top+(this.bottom-this.top)/2,o.fillText(this.options.text,i,a);else{i="left"===this.options.position?this.left+n/2:this.right-n/2,a=this.top+(this.bottom-this.top)/2;var c="left"===this.options.position?-.5*Math.PI:.5*Math.PI;o.save(),o.translate(i,a),o.rotate(c),o.textAlign="center",o.textBaseline="middle",o.fillText(this.options.text,0,0),o.restore()}}}})}},{}],33:[function(t,e,i){"use strict";e.exports=function(t){function e(t,e){return e&&(i.isArray(e)?t=t.concat(e):t.push(e)),t}var i=t.helpers;t.defaults.global.tooltips={enabled:!0,custom:null,mode:"single",backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleColor:"#fff",titleAlign:"left",bodySpacing:2,bodyColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,yAlign:"center",xAlign:"center",caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",callbacks:{beforeTitle:i.noop,title:function(t,e){var i="";return t.length>0&&(t[0].xLabel?i=t[0].xLabel:e.labels.length>0&&t[0].index<e.labels.length&&(i=e.labels[t[0].index])),i},afterTitle:i.noop,beforeBody:i.noop,beforeLabel:i.noop,label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i+": "+t.yLabel},afterLabel:i.noop,afterBody:i.noop,beforeFooter:i.noop,footer:i.noop,afterFooter:i.noop}},t.Tooltip=t.Element.extend({initialize:function(){var e=this._options;i.extend(this,{_model:{xPadding:e.tooltips.xPadding,yPadding:e.tooltips.yPadding,xAlign:e.tooltips.yAlign,yAlign:e.tooltips.xAlign,bodyColor:e.tooltips.bodyColor,_bodyFontFamily:i.getValueOrDefault(e.tooltips.bodyFontFamily,t.defaults.global.defaultFontFamily),_bodyFontStyle:i.getValueOrDefault(e.tooltips.bodyFontStyle,t.defaults.global.defaultFontStyle),_bodyAlign:e.tooltips.bodyAlign,bodyFontSize:i.getValueOrDefault(e.tooltips.bodyFontSize,t.defaults.global.defaultFontSize),bodySpacing:e.tooltips.bodySpacing,titleColor:e.tooltips.titleColor,_titleFontFamily:i.getValueOrDefault(e.tooltips.titleFontFamily,t.defaults.global.defaultFontFamily),_titleFontStyle:i.getValueOrDefault(e.tooltips.titleFontStyle,t.defaults.global.defaultFontStyle),titleFontSize:i.getValueOrDefault(e.tooltips.titleFontSize,t.defaults.global.defaultFontSize),_titleAlign:e.tooltips.titleAlign,titleSpacing:e.tooltips.titleSpacing,titleMarginBottom:e.tooltips.titleMarginBottom,footerColor:e.tooltips.footerColor,_footerFontFamily:i.getValueOrDefault(e.tooltips.footerFontFamily,t.defaults.global.defaultFontFamily),_footerFontStyle:i.getValueOrDefault(e.tooltips.footerFontStyle,t.defaults.global.defaultFontStyle),footerFontSize:i.getValueOrDefault(e.tooltips.footerFontSize,t.defaults.global.defaultFontSize),_footerAlign:e.tooltips.footerAlign,footerSpacing:e.tooltips.footerSpacing,footerMarginTop:e.tooltips.footerMarginTop,caretSize:e.tooltips.caretSize,cornerRadius:e.tooltips.cornerRadius,backgroundColor:e.tooltips.backgroundColor,opacity:0,legendColorBackground:e.tooltips.multiKeyBackground}})},getTitle:function(){var t=this._options.tooltips.callbacks.beforeTitle.apply(this,arguments),i=this._options.tooltips.callbacks.title.apply(this,arguments),a=this._options.tooltips.callbacks.afterTitle.apply(this,arguments),o=[];return o=e(o,t),o=e(o,i),o=e(o,a)},getBeforeBody:function(){var t=this._options.tooltips.callbacks.beforeBody.apply(this,arguments);return i.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,e){var a=[];return i.each(t,function(t){i.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this,t,e),a),i.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this,t,e),a),i.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this,t,e),a)},this),a},getAfterBody:function(){var t=this._options.tooltips.callbacks.afterBody.apply(this,arguments);return i.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this._options.tooltips.callbacks.beforeFooter.apply(this,arguments),i=this._options.tooltips.callbacks.footer.apply(this,arguments),a=this._options.tooltips.callbacks.afterFooter.apply(this,arguments),o=[];return o=e(o,t),o=e(o,i),o=e(o,a)},getAveragePosition:function(t){if(!t.length)return!1;var e=[],a=[];i.each(t,function(t){if(t){var i=t.tooltipPosition();e.push(i.x),a.push(i.y)}});for(var o=0,s=0,n=0;n<e.length;n++)o+=e[n],s+=a[n];return{x:Math.round(o/e.length),y:Math.round(s/e.length)}},update:function(t){if(this._active.length){this._model.opacity=1;var e,a=this._active[0],o=[],s=[];if("single"===this._options.tooltips.mode){var n=a._yScale||a._scale;s.push({xLabel:a._xScale?a._xScale.getLabelForIndex(a._index,a._datasetIndex):"",
yLabel:n?n.getLabelForIndex(a._index,a._datasetIndex):"",index:a._index,datasetIndex:a._datasetIndex}),e=this.getAveragePosition(this._active)}else i.each(this._data.datasets,function(t,e){if(this._chartInstance.isDatasetVisible(e)){var i=this._chartInstance.getDatasetMeta(e),o=i.data[a._index];if(o){var n=a._yScale||a._scale;s.push({xLabel:o._xScale?o._xScale.getLabelForIndex(o._index,o._datasetIndex):"",yLabel:n?n.getLabelForIndex(o._index,o._datasetIndex):"",index:a._index,datasetIndex:e})}}},this),i.each(this._active,function(t){t&&o.push({borderColor:t._view.borderColor,backgroundColor:t._view.backgroundColor})},null),e=this.getAveragePosition(this._active);i.extend(this._model,{title:this.getTitle(s,this._data),beforeBody:this.getBeforeBody(s,this._data),body:this.getBody(s,this._data),afterBody:this.getAfterBody(s,this._data),footer:this.getFooter(s,this._data)}),i.extend(this._model,{x:Math.round(e.x),y:Math.round(e.y),caretPadding:i.getValueOrDefault(e.padding,2),labelColors:o});var r=this.getTooltipSize(this._model);this.determineAlignment(r),i.extend(this._model,this.getBackgroundPoint(this._model,r))}else this._model.opacity=0;return t&&this._options.tooltips.custom&&this._options.tooltips.custom.call(this,this._model),this},getTooltipSize:function(t){var e=this._chart.ctx,a={height:2*t.yPadding,width:0},o=t.body.length+t.beforeBody.length+t.afterBody.length;return a.height+=t.title.length*t.titleFontSize,a.height+=(t.title.length-1)*t.titleSpacing,a.height+=t.title.length?t.titleMarginBottom:0,a.height+=o*t.bodyFontSize,a.height+=o?(o-1)*t.bodySpacing:0,a.height+=t.footer.length?t.footerMarginTop:0,a.height+=t.footer.length*t.footerFontSize,a.height+=t.footer.length?(t.footer.length-1)*t.footerSpacing:0,e.font=i.fontString(t.titleFontSize,t._titleFontStyle,t._titleFontFamily),i.each(t.title,function(t){a.width=Math.max(a.width,e.measureText(t).width)}),e.font=i.fontString(t.bodyFontSize,t._bodyFontStyle,t._bodyFontFamily),i.each(t.beforeBody.concat(t.afterBody),function(t){a.width=Math.max(a.width,e.measureText(t).width)}),i.each(t.body,function(i){a.width=Math.max(a.width,e.measureText(i).width+("single"!==this._options.tooltips.mode?t.bodyFontSize+2:0))},this),e.font=i.fontString(t.footerFontSize,t._footerFontStyle,t._footerFontFamily),i.each(t.footer,function(t){a.width=Math.max(a.width,e.measureText(t).width)}),a.width+=2*t.xPadding,a},determineAlignment:function(t){this._model.y<t.height?this._model.yAlign="top":this._model.y>this._chart.height-t.height&&(this._model.yAlign="bottom");var e,i,a,o,s,n=this,r=(this._chartInstance.chartArea.left+this._chartInstance.chartArea.right)/2,h=(this._chartInstance.chartArea.top+this._chartInstance.chartArea.bottom)/2;"center"===this._model.yAlign?(e=function(t){return r>=t},i=function(t){return t>r}):(e=function(e){return e<=t.width/2},i=function(e){return e>=n._chart.width-t.width/2}),a=function(e){return e+t.width>n._chart.width},o=function(e){return e-t.width<0},s=function(t){return h>=t?"top":"bottom"},e(this._model.x)?(this._model.xAlign="left",a(this._model.x)&&(this._model.xAlign="center",this._model.yAlign=s(this._model.y))):i(this._model.x)&&(this._model.xAlign="right",o(this._model.x)&&(this._model.xAlign="center",this._model.yAlign=s(this._model.y)))},getBackgroundPoint:function(t,e){var i={x:t.x,y:t.y};return"right"===t.xAlign?i.x-=e.width:"center"===t.xAlign&&(i.x-=e.width/2),"top"===t.yAlign?i.y+=t.caretPadding+t.caretSize:"bottom"===t.yAlign?i.y-=e.height+t.caretPadding+t.caretSize:i.y-=e.height/2,"center"===t.yAlign?"left"===t.xAlign?i.x+=t.caretPadding+t.caretSize:"right"===t.xAlign&&(i.x-=t.caretPadding+t.caretSize):"left"===t.xAlign?i.x-=t.cornerRadius+t.caretPadding:"right"===t.xAlign&&(i.x+=t.cornerRadius+t.caretPadding),i},drawCaret:function(t,e,a,o){var s,n,r,h,l,c,d=this._view,u=this._chart.ctx;"center"===d.yAlign?("left"===d.xAlign?(s=t.x,n=s-d.caretSize,r=s):(s=t.x+e.width,n=s+d.caretSize,r=s),l=t.y+e.height/2,h=l-d.caretSize,c=l+d.caretSize):("left"===d.xAlign?(s=t.x+d.cornerRadius,n=s+d.caretSize,r=n+d.caretSize):"right"===d.xAlign?(s=t.x+e.width-d.cornerRadius,n=s-d.caretSize,r=n-d.caretSize):(n=t.x+e.width/2,s=n-d.caretSize,r=n+d.caretSize),"top"===d.yAlign?(h=t.y,l=h-d.caretSize,c=h):(h=t.y+e.height,l=h+d.caretSize,c=h));var g=i.color(d.backgroundColor);u.fillStyle=g.alpha(a*g.alpha()).rgbString(),u.beginPath(),u.moveTo(s,h),u.lineTo(n,l),u.lineTo(r,c),u.closePath(),u.fill()},drawTitle:function(t,e,a,o){if(e.title.length){a.textAlign=e._titleAlign,a.textBaseline="top";var s=i.color(e.titleColor);a.fillStyle=s.alpha(o*s.alpha()).rgbString(),a.font=i.fontString(e.titleFontSize,e._titleFontStyle,e._titleFontFamily),i.each(e.title,function(i,o){a.fillText(i,t.x,t.y),t.y+=e.titleFontSize+e.titleSpacing,o+1===e.title.length&&(t.y+=e.titleMarginBottom-e.titleSpacing)})}},drawBody:function(t,e,a,o){a.textAlign=e._bodyAlign,a.textBaseline="top";var s=i.color(e.bodyColor);a.fillStyle=s.alpha(o*s.alpha()).rgbString(),a.font=i.fontString(e.bodyFontSize,e._bodyFontStyle,e._bodyFontFamily),i.each(e.beforeBody,function(i){a.fillText(i,t.x,t.y),t.y+=e.bodyFontSize+e.bodySpacing}),i.each(e.body,function(s,n){"single"!==this._options.tooltips.mode&&(a.fillStyle=i.color(e.legendColorBackground).alpha(o).rgbaString(),a.fillRect(t.x,t.y,e.bodyFontSize,e.bodyFontSize),a.strokeStyle=i.color(e.labelColors[n].borderColor).alpha(o).rgbaString(),a.strokeRect(t.x,t.y,e.bodyFontSize,e.bodyFontSize),a.fillStyle=i.color(e.labelColors[n].backgroundColor).alpha(o).rgbaString(),a.fillRect(t.x+1,t.y+1,e.bodyFontSize-2,e.bodyFontSize-2),a.fillStyle=i.color(e.bodyColor).alpha(o).rgbaString()),a.fillText(s,t.x+("single"!==this._options.tooltips.mode?e.bodyFontSize+2:0),t.y),t.y+=e.bodyFontSize+e.bodySpacing},this),i.each(e.afterBody,function(i){a.fillText(i,t.x,t.y),t.y+=e.bodyFontSize}),t.y-=e.bodySpacing},drawFooter:function(t,e,a,o){if(e.footer.length){t.y+=e.footerMarginTop,a.textAlign=e._footerAlign,a.textBaseline="top";var s=i.color(e.footerColor);a.fillStyle=s.alpha(o*s.alpha()).rgbString(),a.font=i.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),i.each(e.footer,function(i){a.fillText(i,t.x,t.y),t.y+=e.footerFontSize+e.footerSpacing})}},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var a=e.caretPadding,o=this.getTooltipSize(e),s={x:e.x,y:e.y},n=Math.abs(e.opacity<.001)?0:e.opacity;if(this._options.tooltips.enabled){var r=i.color(e.backgroundColor);t.fillStyle=r.alpha(n*r.alpha()).rgbString(),i.drawRoundedRectangle(t,s.x,s.y,o.width,o.height,e.cornerRadius),t.fill(),this.drawCaret(s,o,n,a),s.x+=e.xPadding,s.y+=e.yPadding,this.drawTitle(s,e,t,n),this.drawBody(s,e,t,n),this.drawFooter(s,e,t,n)}}}})}},{}],34:[function(t,e,i){"use strict";e.exports=function(t,e){var i=t.helpers;t.defaults.global.elements.arc={backgroundColor:t.defaults.global.defaultColor,borderColor:"#fff",borderWidth:2},t.elements.Arc=t.Element.extend({inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2):!1},inRange:function(t,e){var a=this._view;if(a){for(var o=i.getAngleFromPoint(a,{x:t,y:e}),s=a.startAngle,n=a.endAngle;s>n;)n+=2*Math.PI;for(;o.angle>n;)o.angle-=2*Math.PI;for(;o.angle<s;)o.angle+=2*Math.PI;var r=o.angle>=s&&o.angle<=n,h=o.distance>=a.innerRadius&&o.distance<=a.outerRadius;return r&&h}return!1},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,i=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},draw:function(){var t=this._chart.ctx,e=this._view;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,e.startAngle,e.endAngle),t.arc(e.x,e.y,e.innerRadius,e.endAngle,e.startAngle,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}},{}],35:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.elements.line={tension:.4,backgroundColor:t.defaults.global.defaultColor,borderWidth:3,borderColor:t.defaults.global.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",fill:!0},t.elements.Line=t.Element.extend({lineToNextPoint:function(t,e,i,a,o){var s=this._chart.ctx;e._view.skip?a.call(this,t,e,i):t._view.skip?o.call(this,t,e,i):0===e._view.tension?s.lineTo(e._view.x,e._view.y):s.bezierCurveTo(t._view.controlPointNextX,t._view.controlPointNextY,e._view.controlPointPreviousX,e._view.controlPointPreviousY,e._view.x,e._view.y)},draw:function(){function i(t){n._view.skip||r._view.skip?t&&s.lineTo(a._view.scaleZero.x,a._view.scaleZero.y):s.bezierCurveTo(r._view.controlPointNextX,r._view.controlPointNextY,n._view.controlPointPreviousX,n._view.controlPointPreviousY,n._view.x,n._view.y)}var a=this,o=this._view,s=this._chart.ctx,n=this._children[0],r=this._children[this._children.length-1];s.save(),this._children.length>0&&o.fill&&(s.beginPath(),e.each(this._children,function(t,i){var a=e.previousItem(this._children,i),n=e.nextItem(this._children,i);0===i?(this._loop?s.moveTo(o.scaleZero.x,o.scaleZero.y):s.moveTo(t._view.x,o.scaleZero),t._view.skip?this._loop||s.moveTo(n._view.x,this._view.scaleZero):s.lineTo(t._view.x,t._view.y)):this.lineToNextPoint(a,t,n,function(t,e,i){this._loop?s.lineTo(this._view.scaleZero.x,this._view.scaleZero.y):(s.lineTo(t._view.x,this._view.scaleZero),s.moveTo(i._view.x,this._view.scaleZero))},function(t,e){s.lineTo(e._view.x,e._view.y)})},this),this._loop?i(!0):(s.lineTo(this._children[this._children.length-1]._view.x,o.scaleZero),s.lineTo(this._children[0]._view.x,o.scaleZero)),s.fillStyle=o.backgroundColor||t.defaults.global.defaultColor,s.closePath(),s.fill()),s.lineCap=o.borderCapStyle||t.defaults.global.elements.line.borderCapStyle,s.setLineDash&&s.setLineDash(o.borderDash||t.defaults.global.elements.line.borderDash),s.lineDashOffset=o.borderDashOffset||t.defaults.global.elements.line.borderDashOffset,s.lineJoin=o.borderJoinStyle||t.defaults.global.elements.line.borderJoinStyle,s.lineWidth=o.borderWidth||t.defaults.global.elements.line.borderWidth,s.strokeStyle=o.borderColor||t.defaults.global.defaultColor,s.beginPath(),e.each(this._children,function(t,i){var a=e.previousItem(this._children,i),o=e.nextItem(this._children,i);0===i?s.moveTo(t._view.x,t._view.y):this.lineToNextPoint(a,t,o,function(t,e,i){s.moveTo(i._view.x,i._view.y)},function(t,e){s.moveTo(e._view.x,e._view.y)})},this),this._loop&&this._children.length>0&&i(),s.stroke(),s.restore()}})}},{}],36:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.elements.point={radius:3,pointStyle:"circle",backgroundColor:t.defaults.global.defaultColor,borderWidth:1,borderColor:t.defaults.global.defaultColor,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},t.elements.Point=t.Element.extend({inRange:function(t,e){var i=this._view;if(i){var a=i.hitRadius+i.radius;return Math.pow(t-i.x,2)+Math.pow(e-i.y,2)<Math.pow(a,2)}return!1},inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2):!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(){var i=this._view,a=this._chart.ctx;if(!i.skip){if("object"==typeof i.pointStyle&&("[object HTMLImageElement]"===i.pointStyle.toString()||"[object HTMLCanvasElement]"===i.pointStyle.toString()))return void a.drawImage(i.pointStyle,i.x-i.pointStyle.width/2,i.y-i.pointStyle.height/2);if(!isNaN(i.radius)&&i.radius>0){a.strokeStyle=i.borderColor||t.defaults.global.defaultColor,a.lineWidth=e.getValueOrDefault(i.borderWidth,t.defaults.global.elements.point.borderWidth),a.fillStyle=i.backgroundColor||t.defaults.global.defaultColor;var o,s,n=i.radius;switch(i.pointStyle){default:a.beginPath(),a.arc(i.x,i.y,n,0,2*Math.PI),a.closePath(),a.fill();break;case"triangle":a.beginPath();var r=3*n/Math.sqrt(3),h=r*Math.sqrt(3)/2;a.moveTo(i.x-r/2,i.y+h/3),a.lineTo(i.x+r/2,i.y+h/3),a.lineTo(i.x,i.y-2*h/3),a.closePath(),a.fill();break;case"rect":a.fillRect(i.x-1/Math.SQRT2*n,i.y-1/Math.SQRT2*n,2/Math.SQRT2*n,2/Math.SQRT2*n),a.strokeRect(i.x-1/Math.SQRT2*n,i.y-1/Math.SQRT2*n,2/Math.SQRT2*n,2/Math.SQRT2*n);break;case"rectRot":a.translate(i.x,i.y),a.rotate(Math.PI/4),a.fillRect(-1/Math.SQRT2*n,-1/Math.SQRT2*n,2/Math.SQRT2*n,2/Math.SQRT2*n),a.strokeRect(-1/Math.SQRT2*n,-1/Math.SQRT2*n,2/Math.SQRT2*n,2/Math.SQRT2*n),a.setTransform(1,0,0,1,0,0);break;case"cross":a.beginPath(),a.moveTo(i.x,i.y+n),a.lineTo(i.x,i.y-n),a.moveTo(i.x-n,i.y),a.lineTo(i.x+n,i.y),a.closePath();break;case"crossRot":a.beginPath(),o=Math.cos(Math.PI/4)*n,s=Math.sin(Math.PI/4)*n,a.moveTo(i.x-o,i.y-s),a.lineTo(i.x+o,i.y+s),a.moveTo(i.x-o,i.y+s),a.lineTo(i.x+o,i.y-s),a.closePath();break;case"star":a.beginPath(),a.moveTo(i.x,i.y+n),a.lineTo(i.x,i.y-n),a.moveTo(i.x-n,i.y),a.lineTo(i.x+n,i.y),o=Math.cos(Math.PI/4)*n,s=Math.sin(Math.PI/4)*n,a.moveTo(i.x-o,i.y-s),a.lineTo(i.x+o,i.y+s),a.moveTo(i.x-o,i.y+s),a.lineTo(i.x+o,i.y-s),a.closePath();break;case"line":a.beginPath(),a.moveTo(i.x-n,i.y),a.lineTo(i.x+n,i.y),a.closePath();break;case"dash":a.beginPath(),a.moveTo(i.x,i.y),a.lineTo(i.x+n,i.y),a.closePath()}a.stroke()}}}})}},{}],37:[function(t,e,i){"use strict";e.exports=function(t){t.helpers;t.defaults.global.elements.rectangle={backgroundColor:t.defaults.global.defaultColor,borderWidth:0,borderColor:t.defaults.global.defaultColor,borderSkipped:"bottom"},t.elements.Rectangle=t.Element.extend({draw:function(){function t(t){return h[(c+t)%4]}var e=this._chart.ctx,i=this._view,a=i.width/2,o=i.x-a,s=i.x+a,n=i.base-(i.base-i.y),r=i.borderWidth/2;i.borderWidth&&(o+=r,s-=r,n+=r),e.beginPath(),e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth;var h=[[o,i.base],[o,n],[s,n],[s,i.base]],l=["bottom","left","top","right"],c=l.indexOf(i.borderSkipped,0);-1===c&&(c=0),e.moveTo.apply(e,t(0));for(var d=1;4>d;d++)e.lineTo.apply(e,t(d));e.fill(),i.borderWidth&&e.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=this._view,a=!1;return i&&(a=i.y<i.base?t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.y&&e<=i.base:t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.base&&e<=i.y),a},inLabelRange:function(t){var e=this._view;return e?t>=e.x-e.width/2&&t<=e.x+e.width/2:!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})}},{}],38:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"bottom"},a=t.Scale.extend({determineDataLimits:function(){this.minIndex=0,this.maxIndex=this.chart.data.labels.length-1;var t;void 0!==this.options.ticks.min&&(t=e.indexOf(this.chart.data.labels,this.options.ticks.min),this.minIndex=-1!==t?t:this.minIndex),void 0!==this.options.ticks.max&&(t=e.indexOf(this.chart.data.labels,this.options.ticks.max),this.maxIndex=-1!==t?t:this.maxIndex),this.min=this.chart.data.labels[this.minIndex],this.max=this.chart.data.labels[this.maxIndex]},buildTicks:function(t){this.ticks=0===this.minIndex&&this.maxIndex===this.chart.data.labels.length-1?this.chart.data.labels:this.chart.data.labels.slice(this.minIndex,this.maxIndex+1)},getLabelForIndex:function(t,e){return this.ticks[t]},getPixelForValue:function(t,e,i,a){var o=Math.max(this.maxIndex+1-this.minIndex-(this.options.gridLines.offsetGridLines?0:1),1);if(this.isHorizontal()){var s=this.width-(this.paddingLeft+this.paddingRight),n=s/o,r=n*(e-this.minIndex)+this.paddingLeft;return this.options.gridLines.offsetGridLines&&a&&(r+=n/2),this.left+Math.round(r)}var h=this.height-(this.paddingTop+this.paddingBottom),l=h/o,c=l*(e-this.minIndex)+this.paddingTop;return this.options.gridLines.offsetGridLines&&a&&(c+=l/2),this.top+Math.round(c)},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null,e)},getValueForPixel:function(t){var e,i=Math.max(this.ticks.length-(this.options.gridLines.offsetGridLines?0:1),1),a=this.isHorizontal(),o=a?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),s=o/i;return this.options.gridLines.offsetGridLines&&(t-=s/2),t-=a?this.paddingLeft:this.paddingTop,e=0>=t?0:Math.round(t/s)}});t.scaleService.registerScaleType("category",a,i)}},{}],39:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"left",ticks:{callback:function(t,i,a){var o=a.length>3?a[2]-a[1]:a[1]-a[0];Math.abs(o)>1&&t!==Math.floor(t)&&(o=t-Math.floor(t));var s=e.log10(Math.abs(o)),n="";if(0!==t){var r=-1*Math.floor(s);r=Math.max(Math.min(r,20),0),n=t.toFixed(r)}else n="0";return n}}},a=t.Scale.extend({determineDataLimits:function(){if(this.min=null,this.max=null,this.options.stacked){var t={},i=!1,a=!1;e.each(this.chart.data.datasets,function(o,s){var n=this.chart.getDatasetMeta(s);void 0===t[n.type]&&(t[n.type]={positiveValues:[],negativeValues:[]});var r=t[n.type].positiveValues,h=t[n.type].negativeValues;this.chart.isDatasetVisible(s)&&(this.isHorizontal()?n.xAxisID===this.id:n.yAxisID===this.id)&&e.each(o.data,function(t,e){var o=+this.getRightValue(t);isNaN(o)||n.data[e].hidden||(r[e]=r[e]||0,h[e]=h[e]||0,this.options.relativePoints?r[e]=100:0>o?(a=!0,h[e]+=o):(i=!0,r[e]+=o))},this)},this),e.each(t,function(t){var i=t.positiveValues.concat(t.negativeValues),a=e.min(i),o=e.max(i);this.min=null===this.min?a:Math.min(this.min,a),this.max=null===this.max?o:Math.max(this.max,o)},this)}else e.each(this.chart.data.datasets,function(t,i){var a=this.chart.getDatasetMeta(i);this.chart.isDatasetVisible(i)&&(this.isHorizontal()?a.xAxisID===this.id:a.yAxisID===this.id)&&e.each(t.data,function(t,e){var i=+this.getRightValue(t);isNaN(i)||a.data[e].hidden||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)},this);if(this.options.ticks.beginAtZero){var o=e.sign(this.min),s=e.sign(this.max);0>o&&0>s?this.max=0:o>0&&s>0&&(this.min=0)}void 0!==this.options.ticks.min?this.min=this.options.ticks.min:void 0!==this.options.ticks.suggestedMin&&(this.min=Math.min(this.min,this.options.ticks.suggestedMin)),void 0!==this.options.ticks.max?this.max=this.options.ticks.max:void 0!==this.options.ticks.suggestedMax&&(this.max=Math.max(this.max,this.options.ticks.suggestedMax)),this.min===this.max&&(this.min--,this.max++)},buildTicks:function(){this.ticks=[];var i;if(this.isHorizontal())i=Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.width/50));else{var a=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize);i=Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.height/(2*a)))}i=Math.max(2,i);var o,s=this.options.ticks.fixedStepSize&&this.options.ticks.fixedStepSize>0||this.options.ticks.stepSize&&this.options.ticks.stepSize>0;if(s)o=e.getValueOrDefault(this.options.ticks.fixedStepSize,this.options.ticks.stepSize);else{var n=e.niceNum(this.max-this.min,!1);o=e.niceNum(n/(i-1),!0)}var r=Math.floor(this.min/o)*o,h=Math.ceil(this.max/o)*o,l=(h-r)/o;l=e.almostEquals(l,Math.round(l),o/1e3)?Math.round(l):Math.ceil(l),this.ticks.push(void 0!==this.options.ticks.min?this.options.ticks.min:r);for(var c=1;l>c;++c)this.ticks.push(r+c*o);this.ticks.push(void 0!==this.options.ticks.max?this.options.ticks.max:h),("left"===this.options.position||"right"===this.options.position)&&this.ticks.reverse(),this.max=e.max(this.ticks),this.min=e.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},convertTicksToLabels:function(){this.ticksAsNumbers=this.ticks.slice(),this.zeroLineIndex=this.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(this)},getPixelForValue:function(t,e,i,a){var o,s=+this.getRightValue(t),n=this.end-this.start;if(this.isHorizontal()){var r=this.width-(this.paddingLeft+this.paddingRight);return o=this.left+r/n*(s-this.start),Math.round(o+this.paddingLeft)}var h=this.height-(this.paddingTop+this.paddingBottom);return o=this.bottom-this.paddingBottom-h/n*(s-this.start),Math.round(o)},getValueForPixel:function(t){var e;if(this.isHorizontal()){var i=this.width-(this.paddingLeft+this.paddingRight);e=(t-this.left-this.paddingLeft)/i}else{var a=this.height-(this.paddingTop+this.paddingBottom);e=(this.bottom-this.paddingBottom-t)/a}return this.start+(this.end-this.start)*e},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticksAsNumbers[t],null,null,e)}});t.scaleService.registerScaleType("linear",a,i)}},{}],40:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"left",ticks:{callback:function(e,i,a){var o=e/Math.pow(10,Math.floor(t.helpers.log10(e)));return 1===o||2===o||5===o||0===i||i===a.length-1?e.toExponential():""}}},a=t.Scale.extend({determineDataLimits:function(){if(this.min=null,this.max=null,this.options.stacked){var t={};e.each(this.chart.data.datasets,function(i,a){var o=this.chart.getDatasetMeta(a);this.chart.isDatasetVisible(a)&&(this.isHorizontal()?o.xAxisID===this.id:o.yAxisID===this.id)&&(void 0===t[o.type]&&(t[o.type]=[]),e.each(i.data,function(e,i){var a=t[o.type],s=+this.getRightValue(e);isNaN(s)||o.data[i].hidden||(a[i]=a[i]||0,this.options.relativePoints?a[i]=100:a[i]+=s)},this))},this),e.each(t,function(t){var i=e.min(t),a=e.max(t);this.min=null===this.min?i:Math.min(this.min,i),this.max=null===this.max?a:Math.max(this.max,a)},this)}else e.each(this.chart.data.datasets,function(t,i){var a=this.chart.getDatasetMeta(i);this.chart.isDatasetVisible(i)&&(this.isHorizontal()?a.xAxisID===this.id:a.yAxisID===this.id)&&e.each(t.data,function(t,e){var i=+this.getRightValue(t);isNaN(i)||a.data[e].hidden||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)},this);this.min=void 0!==this.options.ticks.min?this.options.ticks.min:this.min,this.max=void 0!==this.options.ticks.max?this.options.ticks.max:this.max,this.min===this.max&&(0!==this.min&&null!==this.min?(this.min=Math.pow(10,Math.floor(e.log10(this.min))-1),this.max=Math.pow(10,Math.floor(e.log10(this.max))+1)):(this.min=1,this.max=10))},buildTicks:function(){this.ticks=[];for(var t=void 0!==this.options.ticks.min?this.options.ticks.min:Math.pow(10,Math.floor(e.log10(this.min)));t<this.max;){this.ticks.push(t);var i=Math.floor(e.log10(t)),a=Math.floor(t/Math.pow(10,i))+1;10===a&&(a=1,++i),t=a*Math.pow(10,i)}var o=void 0!==this.options.ticks.max?this.options.ticks.max:t;this.ticks.push(o),("left"===this.options.position||"right"===this.options.position)&&this.ticks.reverse(),this.max=e.max(this.ticks),this.min=e.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickValues[t],null,null,e)},getPixelForValue:function(t,i,a,o){var s,n=+this.getRightValue(t),r=e.log10(this.end)-e.log10(this.start);if(this.isHorizontal())if(0===n)s=this.left+this.paddingLeft;else{var h=this.width-(this.paddingLeft+this.paddingRight);s=this.left+h/r*(e.log10(n)-e.log10(this.start)),s+=this.paddingLeft}else if(0===n)s=this.top+this.paddingTop;else{var l=this.height-(this.paddingTop+this.paddingBottom);s=this.bottom-this.paddingBottom-l/r*(e.log10(n)-e.log10(this.start))}return s},getValueForPixel:function(t){var i,a=e.log10(this.end)-e.log10(this.start);if(this.isHorizontal()){var o=this.width-(this.paddingLeft+this.paddingRight);i=this.start*Math.pow(10,(t-this.left-this.paddingLeft)*a/o)}else{var s=this.height-(this.paddingTop+this.paddingBottom);i=Math.pow(10,(this.bottom-this.paddingBottom-t)*a/s)/this.start}return i}});t.scaleService.registerScaleType("logarithmic",a,i)}},{}],41:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={display:!0,animate:!0,lineArc:!1,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2},pointLabels:{fontSize:10,callback:function(t){return t}}},a=t.Scale.extend({getValueCount:function(){return this.chart.data.labels.length},setDimensions:function(){this.width=this.maxWidth,this.height=this.maxHeight,this.xCenter=Math.round(this.width/2),this.yCenter=Math.round(this.height/2);var i=e.min([this.height,this.width]),a=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize);this.drawingArea=this.options.display?i/2-(a/2+this.options.ticks.backdropPaddingY):i/2},determineDataLimits:function(){if(this.min=null,this.max=null,e.each(this.chart.data.datasets,function(t,i){if(this.chart.isDatasetVisible(i)){var a=this.chart.getDatasetMeta(i);e.each(t.data,function(t,e){var i=+this.getRightValue(t);isNaN(i)||a.data[e].hidden||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)}},this),this.options.ticks.beginAtZero){var t=e.sign(this.min),i=e.sign(this.max);0>t&&0>i?this.max=0:t>0&&i>0&&(this.min=0)}void 0!==this.options.ticks.min?this.min=this.options.ticks.min:void 0!==this.options.ticks.suggestedMin&&(this.min=Math.min(this.min,this.options.ticks.suggestedMin)),void 0!==this.options.ticks.max?this.max=this.options.ticks.max:void 0!==this.options.ticks.suggestedMax&&(this.max=Math.max(this.max,this.options.ticks.suggestedMax)),this.min===this.max&&(this.min--,this.max++)},buildTicks:function(){this.ticks=[];var i=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),a=Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*i)));a=Math.max(2,a);var o=e.niceNum(this.max-this.min,!1),s=e.niceNum(o/(a-1),!0),n=Math.floor(this.min/s)*s,r=Math.ceil(this.max/s)*s,h=Math.ceil((r-n)/s);this.ticks.push(void 0!==this.options.ticks.min?this.options.ticks.min:n);for(var l=1;h>l;++l)this.ticks.push(n+l*s);this.ticks.push(void 0!==this.options.ticks.max?this.options.ticks.max:r),this.max=e.max(this.ticks),this.min=e.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),this.zeroLineIndex=this.ticks.indexOf(0)},convertTicksToLabels:function(){t.Scale.prototype.convertTicksToLabels.call(this),this.pointLabels=this.chart.data.labels.map(this.options.pointLabels.callback,this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var i,a,o,s,n,r,h,l,c,d,u,g,f=e.getValueOrDefault(this.options.pointLabels.fontSize,t.defaults.global.defaultFontSize),p=e.getValueOrDefault(this.options.pointLabels.fontStyle,t.defaults.global.defaultFontStyle),m=e.getValueOrDefault(this.options.pointLabels.fontFamily,t.defaults.global.defaultFontFamily),b=e.fontString(f,p,m),x=e.min([this.height/2-f-5,this.width/2]),v=this.width,y=0;for(this.ctx.font=b,a=0;a<this.getValueCount();a++)i=this.getPointPosition(a,x),o=this.ctx.measureText(this.pointLabels[a]?this.pointLabels[a]:"").width+5,0===a||a===this.getValueCount()/2?(s=o/2,i.x+s>v&&(v=i.x+s,n=a),i.x-s<y&&(y=i.x-s,h=a)):a<this.getValueCount()/2?i.x+o>v&&(v=i.x+o,n=a):a>this.getValueCount()/2&&i.x-o<y&&(y=i.x-o,h=a);c=y,d=Math.ceil(v-this.width),r=this.getIndexAngle(n),l=this.getIndexAngle(h),u=d/Math.sin(r+Math.PI/2),g=c/Math.sin(l+Math.PI/2),u=e.isNumber(u)?u:0,g=e.isNumber(g)?g:0,this.drawingArea=Math.round(x-(g+u)/2),this.setCenterPoint(g,u)},setCenterPoint:function(t,e){var i=this.width-e-this.drawingArea,a=t+this.drawingArea;this.xCenter=Math.round((a+i)/2+this.left),this.yCenter=Math.round(this.height/2+this.top)},getIndexAngle:function(t){var e=2*Math.PI/this.getValueCount();return t*e-Math.PI/2},getDistanceFromCenterForValue:function(t){if(null===t)return 0;var e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e},getPointPosition:function(t,e){var i=this.getIndexAngle(t);return{x:Math.round(Math.cos(i)*e)+this.xCenter,y:Math.round(Math.sin(i)*e)+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},draw:function(){if(this.options.display){var i=this.ctx;if(e.each(this.ticks,function(a,o){if(o>0||this.options.reverse){var s=this.getDistanceFromCenterForValue(this.ticks[o]),n=this.yCenter-s;if(this.options.gridLines.display)if(i.strokeStyle=this.options.gridLines.color,i.lineWidth=this.options.gridLines.lineWidth,this.options.lineArc)i.beginPath(),i.arc(this.xCenter,this.yCenter,s,0,2*Math.PI),i.closePath(),i.stroke();else{i.beginPath();for(var r=0;r<this.getValueCount();r++){var h=this.getPointPosition(r,this.getDistanceFromCenterForValue(this.ticks[o]));0===r?i.moveTo(h.x,h.y):i.lineTo(h.x,h.y)}i.closePath(),i.stroke()}if(this.options.ticks.display){var l=e.getValueOrDefault(this.options.ticks.fontColor,t.defaults.global.defaultFontColor),c=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),d=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),u=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),g=e.fontString(c,d,u);if(i.font=g,this.options.ticks.showLabelBackdrop){var f=i.measureText(a).width;i.fillStyle=this.options.ticks.backdropColor,i.fillRect(this.xCenter-f/2-this.options.ticks.backdropPaddingX,n-c/2-this.options.ticks.backdropPaddingY,f+2*this.options.ticks.backdropPaddingX,c+2*this.options.ticks.backdropPaddingY)}i.textAlign="center",i.textBaseline="middle",i.fillStyle=l,i.fillText(a,this.xCenter,n)}}},this),!this.options.lineArc){i.lineWidth=this.options.angleLines.lineWidth,i.strokeStyle=this.options.angleLines.color;for(var a=this.getValueCount()-1;a>=0;a--){if(this.options.angleLines.display){var o=this.getPointPosition(a,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max));i.beginPath(),i.moveTo(this.xCenter,this.yCenter),i.lineTo(o.x,o.y),i.stroke(),i.closePath()}var s=this.getPointPosition(a,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max)+5),n=e.getValueOrDefault(this.options.pointLabels.fontColor,t.defaults.global.defaultFontColor),r=e.getValueOrDefault(this.options.pointLabels.fontSize,t.defaults.global.defaultFontSize),h=e.getValueOrDefault(this.options.pointLabels.fontStyle,t.defaults.global.defaultFontStyle),l=e.getValueOrDefault(this.options.pointLabels.fontFamily,t.defaults.global.defaultFontFamily),c=e.fontString(r,h,l);i.font=c,i.fillStyle=n;var d=this.pointLabels.length,u=this.pointLabels.length/2,g=u/2,f=g>a||a>d-g,p=a===g||a===d-g;0===a?i.textAlign="center":a===u?i.textAlign="center":u>a?i.textAlign="left":i.textAlign="right",p?i.textBaseline="middle":f?i.textBaseline="bottom":i.textBaseline="top",i.fillText(this.pointLabels[a]?this.pointLabels[a]:"",s.x,s.y)}}}}});t.scaleService.registerScaleType("radialLinear",a,i)}},{}],42:[function(t,e,i){"use strict";var a=t("moment");a="function"==typeof a?a:window.moment,e.exports=function(t){var e=t.helpers,i={units:[{name:"millisecond",steps:[1,2,5,10,20,50,100,250,500]},{name:"second",steps:[1,2,5,10,30]},{name:"minute",steps:[1,2,5,10,30]},{name:"hour",steps:[1,2,3,6,12]},{name:"day",steps:[1,2,5]},{name:"week",maxStep:4},{name:"month",maxStep:3},{name:"quarter",maxStep:4},{name:"year",maxStep:!1}]},o={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}},s=t.Scale.extend({initialize:function(){if(!a)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
t.Scale.prototype.initialize.call(this)},getLabelMoment:function(t,e){return this.labelMoments[t][e]},determineDataLimits:function(){this.labelMoments=[];var t=[];this.chart.data.labels&&this.chart.data.labels.length>0?(e.each(this.chart.data.labels,function(e,i){var a=this.parseTime(e);a.isValid()&&(this.options.time.round&&a.startOf(this.options.time.round),t.push(a))},this),this.firstTick=a.min.call(this,t),this.lastTick=a.max.call(this,t)):(this.firstTick=null,this.lastTick=null),e.each(this.chart.data.datasets,function(i,o){var s=[],n=this.chart.isDatasetVisible(o);"object"==typeof i.data[0]?e.each(i.data,function(t,e){var i=this.parseTime(this.getRightValue(t));i.isValid()&&(this.options.time.round&&i.startOf(this.options.time.round),s.push(i),n&&(this.firstTick=null!==this.firstTick?a.min(this.firstTick,i):i,this.lastTick=null!==this.lastTick?a.max(this.lastTick,i):i))},this):s=t,this.labelMoments.push(s)},this),this.options.time.min&&(this.firstTick=this.parseTime(this.options.time.min)),this.options.time.max&&(this.lastTick=this.parseTime(this.options.time.max)),this.firstTick=(this.firstTick||a()).clone(),this.lastTick=(this.lastTick||a()).clone()},buildTicks:function(a){this.ctx.save();var o=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),s=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),n=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),r=e.fontString(o,s,n);if(this.ctx.font=r,this.ticks=[],this.unitScale=1,this.scaleSizeInUnits=0,this.options.time.unit)this.tickUnit=this.options.time.unit||"day",this.displayFormat=this.options.time.displayFormats[this.tickUnit],this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0),this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,1);else{var h=this.isHorizontal()?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),l=this.tickFormatFunction(this.firstTick,0,[]),c=this.ctx.measureText(l).width,d=Math.cos(e.toRadians(this.options.ticks.maxRotation)),u=Math.sin(e.toRadians(this.options.ticks.maxRotation));c=c*d+o*u;var g=h/c;this.tickUnit="millisecond",this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0),this.displayFormat=this.options.time.displayFormats[this.tickUnit];for(var f=0,p=i.units[f];f<i.units.length;){if(this.unitScale=1,e.isArray(p.steps)&&Math.ceil(this.scaleSizeInUnits/g)<e.max(p.steps)){for(var m=0;m<p.steps.length;++m)if(p.steps[m]>=Math.ceil(this.scaleSizeInUnits/g)){this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,p.steps[m]);break}break}if(p.maxStep===!1||Math.ceil(this.scaleSizeInUnits/g)<p.maxStep){this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,Math.ceil(this.scaleSizeInUnits/g));break}++f,p=i.units[f],this.tickUnit=p.name;var b=this.firstTick.diff(this.firstTick.clone().startOf(this.tickUnit),this.tickUnit,!0),x=this.lastTick.clone().add(1,this.tickUnit).startOf(this.tickUnit).diff(this.lastTick,this.tickUnit,!0);this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0)+b+x,this.displayFormat=this.options.time.displayFormats[p.name]}}var v;if(this.options.time.min?v=this.firstTick.clone().startOf(this.tickUnit):(this.firstTick.startOf(this.tickUnit),v=this.firstTick),!this.options.time.max){var y=this.lastTick.clone().startOf(this.tickUnit);0!==y.diff(this.lastTick,this.tickUnit,!0)&&this.lastTick.add(1,this.tickUnit).startOf(this.tickUnit)}this.smallestLabelSeparation=this.width,e.each(this.chart.data.datasets,function(t,e){for(var i=1;i<this.labelMoments[e].length;i++)this.smallestLabelSeparation=Math.min(this.smallestLabelSeparation,this.labelMoments[e][i].diff(this.labelMoments[e][i-1],this.tickUnit,!0))},this),this.options.time.displayFormat&&(this.displayFormat=this.options.time.displayFormat),this.ticks.push(this.firstTick.clone());for(var k=1;k<=this.scaleSizeInUnits;++k){var S=v.clone().add(k,this.tickUnit);if(this.options.time.max&&S.diff(this.lastTick,this.tickUnit,!0)>=0)break;k%this.unitScale===0&&this.ticks.push(S)}var C=this.ticks[this.ticks.length-1].diff(this.lastTick,this.tickUnit);(0!==C||0===this.scaleSizeInUnits)&&(this.options.time.max?(this.ticks.push(this.lastTick.clone()),this.scaleSizeInUnits=this.lastTick.diff(this.ticks[0],this.tickUnit,!0)):(this.ticks.push(this.lastTick.clone()),this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0))),this.ctx.restore()},getLabelForIndex:function(t,e){var i=this.chart.data.labels&&t<this.chart.data.labels.length?this.chart.data.labels[t]:"";return"object"==typeof this.chart.data.datasets[e].data[0]&&(i=this.getRightValue(this.chart.data.datasets[e].data[t])),this.options.time.tooltipFormat&&(i=this.parseTime(i).format(this.options.time.tooltipFormat)),i},tickFormatFunction:function(t,e,i){var a=t.format(this.displayFormat);return this.options.ticks.userCallback?this.options.ticks.userCallback(a,e,i):a},convertTicksToLabels:function(){this.ticks=this.ticks.map(this.tickFormatFunction,this)},getPixelForValue:function(t,e,i,a){var o=t&&t.isValid&&t.isValid()?t:this.getLabelMoment(i,e);if(o){var s=o.diff(this.firstTick,this.tickUnit,!0),n=s/this.scaleSizeInUnits;if(this.isHorizontal()){var r=this.width-(this.paddingLeft+this.paddingRight),h=(r/Math.max(this.ticks.length-1,1),r*n+this.paddingLeft);return this.left+Math.round(h)}var l=this.height-(this.paddingTop+this.paddingBottom),c=(l/Math.max(this.ticks.length-1,1),l*n+this.paddingTop);return this.top+Math.round(c)}},getValueForPixel:function(t){var e=this.isHorizontal()?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),i=(t-(this.isHorizontal()?this.left+this.paddingLeft:this.top+this.paddingTop))/e;return i*=this.scaleSizeInUnits,this.firstTick.clone().add(a.duration(i,this.tickUnit).asSeconds(),"seconds")},parseTime:function(t){return"string"==typeof this.options.time.parser?a(t,this.options.time.parser):"function"==typeof this.options.time.parser?this.options.time.parser(t):"function"==typeof t.getMonth||"number"==typeof t?a(t):t.isValid&&t.isValid()?t:"string"!=typeof this.options.time.format&&this.options.time.format.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"),this.options.time.format(t)):a(t,this.options.time.format)}});t.scaleService.registerScaleType("time",s,o)}},{moment:1}]},{},[7]);
