const width = 960;
const height = 600;

const svg = d3.select('svg');

const projection = d3.geoMercator()
  .center([ 25, 45 ])
  .scale(625)
  .translate([ width / 2, height / 2]);

const pathGenerator = d3.geoPath().projection(projection);

d3.json('https://raw.githubusercontent.com/rahulram70/a3/main/europe-topo-subset.json')
  .then(dta => {
    console.log(dta);

    const countries = topojson.feature(dta, dta.objects.europe);

    svg.append("g")
    .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator)
      .on('click', function(event, d) {
        console.log(d, this);
      })

    });

/*var myGeoJSONPath = 'https://raw.githubusercontent.com/blackmad/neighborhoods/master/paris.geojson';
var myCustomSytle = {
  stroke: false,
  fill: true,
  fillColor: '#fff',
  fillOpacity: 1
}

$.getJSON(myGeoJSONPath,function(data) {
  var map = L.map('map').setView([39.74739, -105], 4);
  L.geoJson(data, {
    clickable: false,
    style: myCustomStyle
  }).addTo(map);
})*/
  /*const projection_paris = d3.function(x, y) {

  }
  geoMercator()
    .center([ 600, 500 ])
    .scale(10000)
    .translate([ width / 2, height / 2]);*/

 /* var  test = function scaleUp() {
    return [x*1000, y*1000];
  }*/

  //const projection_paris = d3.scaleUp();
  
  /*const pathGenerator_paris = d3.geoPath().projection(null);
  
  d3.json('https://raw.githubusercontent.com/rahulram70/a3/main/paris-topo.json')
    .then(dta => {
      console.log(dta);
  
      const neighborhoods = topojson.feature(dta, dta.objects.conseils);
      console.log(neighborhoods);
      svg.append("g")
      .selectAll('path')
        .data(neighborhoods.features)
        .enter()
        .append('path')
        .attr('class', 'neighborbood')
        .attr('d', pathGenerator_paris)
        .attr("height", 500)
        .attr("width", 500)
      });*/   
var rects = svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 500)
                .attr("width", 500)
                .style("stroke", "black")
                .style("fill", "#404040")
                .style("stroke-width", 2);

