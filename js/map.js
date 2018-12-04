/*
  Created: Sep 01 2018
  Author: Kahin Akram Hassan
*/
function map(data, world_map_json){

  this.data = data;
  this.world_map_json = world_map_json;

  var div = '#world-map';
  var parentWidth = $(div).parent().width();
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = parentWidth - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

  /*~~ Task 6  initialize color variable ~~*/
  var color = d3.scaleOrdinal(d3.schemeCategory20);
  //console.log(color);


  //initialize zoom
  var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on('zoom', move);

  //initialize tooltip
  var tooltip = d3.select(div).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


  /*~~ Task 7  initialize projection and path variable ~~*/
  //center it to [60,40] and scale it to (120)

  var projection = d3.geoMercator().scale(120).center([60,40]);
  var path = d3.geoPath().projection(projection);

  var svg = d3.select(div).append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(zoom);

  var g = svg.append("g");


  var countries = topojson.feature(world_map_json,
        world_map_json.objects.countries).features;

  var country = g.selectAll(".country").data(countries);
  //console.log(country);

  /*~~ Task 8  initialize color array ~~*/
  var cc = [];
  data.forEach(function (d) {
      cc[d["Country"]] = color(d["Country"]);
  });

  country.enter().insert("path")
      .attr("class", "country")

        /*~~ Task 7  add path variable as attr d here. ~~*/
      .attr("d", path)
      .attr("id", function(d) { return d.id; })
      //.attr("title", function(d) { return d.properties.name; }) // needed??
      .style("fill", function(d) { return cc[d.properties.name]; })

      //tooltip
      .on("mousemove", function(d) {
        d3.select(this).style('stroke','white');

        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
        tooltip
        .attr("style", "left:"+(mouse[0]+30)+"px;top:"+(mouse[1]+30)+"px")
        .html(d.properties.name);
      })
      .on("mouseout",  function(d) {

          d3.select(this).style('stroke','none');
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);
      })

      //selection
      .on("click",  function(d) {

        /*~~ call the other graphs method for selection here ~~*/
            //console.log(d.properties.name);
            sp.selecDots(d.properties.name)
      });

  function move() {
      g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
      g.attr("transform", d3.event.transform);
  }

    /*~~ Highlight countries when filtering in the other graphs~~*/
  this.selectCountry = function(value){
  //console.log(selectAll('.country'));

  //console.log(value);

    var count = g.selectAll('.country'); // Error: selectAll...
      //count.style('fill', 'red')
    // Brush countries connected to brushed dots (value) in RH graph
    // country.style("stroke", function(cntry){
    //     return value.every( function(dot) {
    //           console.log(value);
    //           return dots.country != cntry.properties.name ? 'red' : null;
    //   }) ? null : 'red';
    // })



  }

}
