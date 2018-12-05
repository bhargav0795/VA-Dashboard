//const api = 'https://media.githubusercontent.com/media/bhargav0795/VisualAnalytics/master/Preprocessed_LendingTree_Data.csv';
//const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
// document.addEventListener("DOMContentLoaded", function(event) {
// fetch(api)
//     .then(function(response) { console.log(response);  })
//     .then(function(data) {
//       console.log(data);
//         var parsedData = parseData(data);
//         drawChart(parsedData);
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
// });
/*

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/",
        success: function(data) { var parsedData = parseData(data);
            drawChart(parsedData);}
     });
});
/*
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of BPI
 */
/*function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //date
            value: +data.bpi[i] //convert string to number
        });
    }
    return arr;
}*/


  var dataset = [
    ['a',703, 1902],
    ['b',1473,3341],
    ['c',863,1935],
    ['d',1494,3008],
    ['e',965,1743],
    ['f',568,1271],
    ['g',189, 626],
    ['h',464, 1064],
    ['i',731, 1443],
    ['j',306, 630],
    ['k',899, 2556],
    ['l',231, 880],
    ['m',262, 589],
    ['n',429, 1497],
    ['o',322, 749],
    ['p',315, 720],
    ['q',228, 522],
    ['r',436, 1391],
    ['s',287, 613],
    ['t',419,932],
    ['u',296,612],
    ['v',343,855]
  ];

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960,
      height = 200;

  var xScale = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.1)
                .domain(dataset.map(function(d) {
                  return d[0];
                }));
      yScale = d3.scaleLinear()
                .rangeRound([height, 0])
                .domain([0, d3.max(dataset, (function (d) {
                  return d[2];
                }))]);

  var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

  var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // axis-x
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

  // axis-y
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));

  var bar = g.selectAll("rect")
    .data(dataset)
    .enter().append("g");

  // bar chart
  bar.append("rect")
    .attr("x", function(d) { return xScale(d[0]); })
    .attr("y", function(d) { return yScale(d[2]); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d[2]); })
    .attr("class", function(d) {
      var s = "bar ";
      if (d[1] < 400) {
        return s + "bar1";
      } else if (d[1] < 800) {
        return s + "bar2";
      } else {
        return s + "bar3";
      }
    });

 //labels on the bar chart
  bar.append("text")
    .attr("dy", "1.3em")
    .attr("x", function(d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
    .attr("y", function(d) { return yScale(d[2]); })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "black")
    .text(function(d) {
      return d[2];
    });

  // line chart
  var line = d3.line()
      .x(function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .y(function(d) { return yScale(d[2]); })
      .curve(d3.curveMonotoneX);

  bar.append("path")
    .attr("class", "line") // Assign a class for styling
    .attr("d", line(dataset)); // 11. Calls the line generator

  bar.append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .attr("cy", function(d) { return yScale(d[2]); })
      .attr("r", 5);
