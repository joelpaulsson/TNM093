/*
  Created: Sep 01 2018
  Author: Kahin Akram Hassan

  http://bl.ocks.org/weiglemc/6185069
*/

function sp(data){

    this.data = data;
    var div = '#scatter-plot';

    var height = 500;
    var parentWidth = $(div).parent().width();
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = parentWidth - margin.right - margin.left,
        height = height - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var tooltip = d3.select(div).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);



    /* Task 2
      Initialize 4 (x,y,country,circle-size)

      variables and assign different data attributes from the data filter
      Then use domain() and extent to scale the axes*/

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

	  var householdInc = [];
	  var studentSkills = [];
  	var country = [];
  	var circleSize = [];

    // Extracting data
    for (let i = 0; i < data.length; i++) {

    	householdInc[i] = data[i].Household_income;
    	studentSkills[i] = data[i].Student_skills;
  		circleSize[i] = data[i].Life_satisfaction;
  		country[i] = data[i].Country;
    	//console.log(householdInc[0]);
    	//console.log(studentSkills[0]);
  		//console.log(lifeSatis[0]);
  	}


	x.domain([d3.min(householdInc), d3.max(householdInc)]);
	y.domain([d3.min(studentSkills), d3.max(studentSkills)]);


	var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        /* ~~ Task 3 Add the x and y Axis and title  ~~ */
 			var xAxis = d3.axisBottom(x);
			var yAxis = d3.axisLeft(y);

		//Create title
		svg.append("text")
			.attr("x", width/2 )
			.style("text-anchor", "middle")
			.text("Title of Graph");

			// Add the x Axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);


 		  // text label for the x axis
		svg.append("text")
			.attr("transform",
					"translate(" + (width/2) + " ," +
								   (height + margin.top + 20) + ")")
			  .style("text-anchor", "middle")
			  .text(" Household income");

		  // Add the y Axis
		  svg.append("g")
			  .call(yAxis);

		  // text label for the y axis
		  svg.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 0 - margin.left)
			  .attr("x",0 - (height/2))
			  .attr("dy", "1em")
			  .style("text-anchor", "middle")
			  .text("Student skills");




  /* ~~ Task 4 Add the scatter dots. ~~ */

	// for (let i = 0; i < data.length; i++){
	// 	svg.selectAll("dot")
	// 		.data(data)
	// 		.enter()
	// 		.append("svg:circle")
	// 		.attr("cx", d => x(householdInc[i]))
	// 		.attr("cy", d => y(studentSkills[i]))
	// 		.attr("r", circleSize[i]/10 )
	// 		.style("fill", "blue")
	// }

  var circles = svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("svg:circle")
    .attr("cx", function(d) {return x(d.Household_income)})
    .attr("cy", function(d) {return y(d.Student_skills)})
    .attr("r", function(d) {return d.Life_satisfaction/10})
    .style("fill", "blue")


        /* ~~ Task 5 create the brush variable and call highlightBrushedCircles() ~~ */

  var brush = d3.brush()
                .on("brush", highlightBrushedCircles)

  svg.append("g")
     .call(brush);

  //highlightBrushedCircles function
  function highlightBrushedCircles() {
       if (d3.event.selection != null) {
           // revert circles to initial style
           circles.attr("class", "non_brushed");
           var brush_coords = d3.brushSelection(this);
           // style brushed circles
            circles.filter(function (){
                var cx = d3.select(this).attr("cx");
                var cy = d3.select(this).attr("cy");
                return isBrushed(brush_coords, cx, cy);
            }).attr("class", "brushed");
            var d_brushed =  d3.selectAll(".brushed").data();

            //console.log(circles);

            /* ~~~ Call map function to filter ~~~ */
            map.selectCountry(circles); // data["Country"]);
       }
    }//highlightBrushedCircles




   function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
       return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
   }//isBrushed


   this.selecDots = function(value){

     // value = selected Country

     var dots = d3.selectAll('.non_brushed');
     // console.log("Value: ", value);
     // console.log("Dots: ", dots);

   //   dots.style('fill', function(c){
   //     console.log(c.Country);
   //     return c.Country = 'black'
   //   }
   // )


   dots.style('fill', function(d){
     console.log("d.Country ", d.Country);
     console.log("Value: ", value);
     return (function(c){
       return c.Country == value? null: 'black';
     }) ? null: 'black';
     }
 )

     // dots.style('stroke',function(dot){
     //    return value.every( function(c){ // Error at:  value.every...
     //      return c.Country != dot.Country ? 'black' : null;
     //    }) ? null : 'black';
     // }).style('stroke-width','3px')
   };
}
