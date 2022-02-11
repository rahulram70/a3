// Prepare, parse, or test data

// d3.json("hotels.json")
//   .then((data) => {
//   my_data = Object.entries(data).map(element => {
//     return {
//       lat: element[0],
//       long: element[1]
//     }
//   })
// });

/*d3.json("hotels.json")
  .then(function(data) {
    // callback code
  for (var key in data) {
  	console.log(data[key].lat);
  }
});*/

const WESTERN_EUROPE_BOUNDS = {
    north: 55.00,
    south: 35.00,
    west: -12.00,
    east: 13.00
}

// Create the map & fit any bounds
var map = new google.maps.Map(d3.select('#map').node(), {
    zoom: 4,
    center: new google.maps.LatLng(47.313668, 10.261293),
    mapTypeId: google.maps.MapTypeId.STREET,
    restriction: {
        latLngBounds: WESTERN_EUROPE_BOUNDS,
        strictBounds: false
    }
  });
  
  /* d3.json("hotels.json", function(error, data) {
      if (error) throw error;*/
  console.log("outside d3 json")
  d3.json("https://raw.githubusercontent.com/rahulram70/a3/main/hotel-data/hotels.json", function(error, data) {
    //console.log(error)
    if (error) throw error;
    //console.log("inside d3 json")
  
  // Declare an overlay, an onAdd function, and append the layer
  var overlay = new google.maps.OverlayView();
  
  overlay.onAdd = function() {
    var layer = d3
      .select(this.getPanes().overlayLayer)
      .append('div')
      .attr('class', 'hotels');
  
  // Within onAdd function, declare the draw function,
    // set the projection, and then draw each marker appending the data
    overlay.draw = function () {
      var projection = this.getProjection(),
        padding = 10;
  
      var marker = layer
        .selectAll('svg')
        .data(d3.entries(data))
        .each(transform) // update existing markers
        .enter()
        .append('svg')
        .each(transform)
        .attr('class', 'marker')
  
  // Draw circles for points (appending to marker)
      marker
        .append('circle')
        .attr('r', 4.5)
        .attr('cx', padding)
        .attr('cy', padding);
      
  // Add labels
      // marker.append("text")
      //   .attr("x", padding + 7)
      //   .attr("y", padding)
      // 	.attr("dy", ".31em")
      // .text(function(d) { return d.key; });
  
  // Transform positions the svg
        function transform(d) {
  // d.value[1] corresponds to the second element of hotels.json: "36.98"
  // {"KMAE":[-120.12,36.98, ...]
          
          for (var key in d) {
              d = new google.maps.LatLng(d["value"].lat, d["value"].lng);
              d = projection.fromLatLngToDivPixel(d);
              return d3.select(this)
              .style("left", (d.x - padding) + "px")
              .style("top", (d.y - padding) + "px");
  
          }
          
        }
      };
    };
  
  
  // Bind our overlay to the map
  overlay.setMap(map);
  
  });