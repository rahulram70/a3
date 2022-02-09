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

    svg.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('class', 'country')
        .attr('d', pathGenerator)

    });

var rects = svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 500)
                .attr("width", 500)
                .style("stroke", "black")
                .style("fill", "#404040")
                .style("stroke-width", 2);