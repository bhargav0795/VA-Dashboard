var app = angular.module('MainApp', ['ngMaterial', 'ui.router', 'ngMessages'])
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html'
    })
    .state('report', {
      url: '/report',
      templateUrl: 'main.html'
    });

});

app.controller('ctrl', function($scope, $http) {
  $scope.option = "Auto";
  $http({
  method: 'GET',
  url: './data/productreport.json'
  }).then(function successCallback(response) {
    $scope.response = response.data;
  }, function errorCallback(response) {
    console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
  method: 'GET',
  url: './data/datePlot.json'
  }).then(function successCallback(response) {
    //console.log(response.data)
    $scope.datesResponse = response.data;
    //$scope.datePlot()
  }, function errorCallback(response) {
    //console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
  method: 'GET',
  url: './data/devicetypeJson.json'
  }).then(function successCallback(response) {
    console.log(response.data)
    $scope.deviceType = response.data;
    //$scope.datePlot()
  }, function errorCallback(response) {
    //console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
  method: 'GET',
  url: './data/cSourceJson.json'
  }).then(function successCallback(response) {
    //console.log(response.data)
    $scope.cSourceResponse = response.data;
    //$scope.datePlot()
  }, function errorCallback(response) {
    //console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $scope.products = ['Auto', 'AutoRefinance', 'Business Loans', 'CreditAnalyzer',
        'Debt Relief', 'Home Equity', 'Personal',
       'Prequalification', 'Purchase', 'Refinance', 'Reverse Mortgage']

  angular.element(document).ready(function () {
  //  console.log("dfdjvdfj");
    //$scope.datePlot()
    $scope.drawChart('Auto')



  });
  $scope.navigate = function(opt) {
    $state.go(opt)
  }

  $scope.topDevices = function(dataVal){

    console.log(dataVal);
    var keys = Object.keys($scope.deviceType)
    $scope.deviceSource = []
    $scope.deviceSourceSize = []

    for(i=0; i< keys.length ;i++){
      console.log($scope.deviceType[i]['Product Reporting'] === dataVal);
      if($scope.deviceType[i]['Product Reporting'] === dataVal){
      //  console.log($scope.datesResponse[0]['Date']);
        $scope.deviceSource.push( $scope.deviceType[i]['Mobile Device Type']);
        $scope.deviceSourceSize.push( $scope.deviceType[i]['size']);
    }}
    console.log($scope.deviceSource)
    console.log($scope.deviceSourceSize)

    $scope.multyDevices = [];
    for (i=0; i < $scope.deviceSource.length; i++ ){

        $scope.multyDevices.push([$scope.deviceSource[i],$scope.deviceSourceSize[i]]);
      }

    $scope.sortedDevices = $scope.multyDevices.sort(function(obj1,obj2){
      return obj2[1] - obj1[1];
    })
    // $scope.sortedArrayDevices = []
    if(!$scope.$$phase) {
  $scope.$apply(function () {

    $scope.sortedArrayDevices = $scope.sortedDevices
  });
}else{
  $scope.sortedArrayDevices = $scope.sortedDevices
}
    console.log($scope.sortedArrayDevices );
    // console.log($scope.sortedArray);
    // console.log($scope.multySources);
    //$scope.state1 = 'North Carolina'
    //$scope.state2 = 'South Carolina'
    //$scope.state3 = 'Texas'
  }

  $scope.topSources = function(dataVal){
    //$scope.source1 = 'Google'
    //$scope.source2 = 'Facebook'
    //$scope.source3 = 'Youtube'

    var keys = Object.keys($scope.cSourceResponse)
    $scope.productSource = []
    $scope.productSourceSize = []

    for(i=0; i< keys.length ;i++){
      if($scope.cSourceResponse[i]['Product Reporting'] == dataVal){
      //  console.log($scope.datesResponse[0]['Date']);
        $scope.productSource.push( $scope.cSourceResponse[i]['csource (eVar20) (evar20)']);
        $scope.productSourceSize.push( $scope.cSourceResponse[i]['size']);
    }}
    console.log($scope.productSource)
    console.log($scope.productSourceSize)

    $scope.multySources = [];
    for (i=0; i < $scope.productSource.length; i++ ){

        $scope.multySources.push([$scope.productSource[i],$scope.productSourceSize[i]]);
      }

    $scope.sorted = $scope.multySources.sort(function(obj1,obj2){
      return obj2[1] - obj1[1];
    })
    // $scope.sortedArray = []
    if(!$scope.$$phase) {
  $scope.$apply(function () {

    $scope.sortedArray = $scope.sorted
  });
}else{
  $scope.sortedArray = $scope.sorted
}
    console.log($scope.sortedArray);
    console.log($scope.multySources);
    //$scope.state1 = 'North Carolina'
    //$scope.state2 = 'South Carolina'
    //$scope.state3 = 'Texas'
  }

  $scope.drawChart = function(opt){
    document.getElementById('chart1').innerHTML = ""
    document.getElementById('chart2').innerHTML = ""


    $scope.formPlot(opt)
    $scope.datePlot(opt)
    $scope.topSources(opt)
    $scope.topDevices(opt)
  }

  $scope.datePlot = function(dataVal) {

    var keys = Object.keys($scope.datesResponse)
    $scope.productReportSize = [];
    $scope.productDate = [];

    for(i=0; i< keys.length ;i++){
      if($scope.datesResponse[i]['Product Reporting'] == dataVal){
        //console.log($scope.datesResponse[0]['Date']);
        $scope.productReportSize.push( $scope.datesResponse[i]['size']);
        $scope.productDate.push( $scope.datesResponse[i]['Date']);
    }}
    //console.log($scope.productReportSize);
    $scope.multy = [];
    for (i=0; i < $scope.productReportSize.length; i++ ){

        $scope.multy.push([$scope.productDate[i],$scope.productReportSize[i]]);
      }

    //console.log($scope.multy);

    var dataset = $scope.multy;

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      width = 700,
      height = 200;

    var xScale = d3.scaleBand()
      .rangeRound([0, 700])
      .padding(0.1)
      .domain(dataset.map(function(d) {
        return d[0];
      }));
    yScale = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(dataset, (function(d) {
        return d[1];
      }))]);
    var svg = d3.select("#chart1").append("svg")
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
      .attr("x", function(d) {
        return xScale(d[0]);
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return height - yScale(d[1]);
      })
      .attr("class", function(d) {
        var s = "bar ";
        if (d[1] < 100) {
          return s + "bar1";
        } else if (d[1] < 200) {
          return s + "bar2";
        } else if(d[1] < 300){
          return s + "bar3";
        }else if(d[1] < 500){
          return s + "bar4"
        }else if(d[1] < 1000){
          return s + "bar5"
        }else if (d[1] < 1500){
          return s + "bar6"
        }else if (d[1] < 3000){
          return s + "bar7"
        }else if (d[1] < 5000){
          return s + "bar8"
        }else if (d[1] < 12000){
          return s + "bar9"
        }else {
          return s + "bar10"
        }
      });

    //labels on the bar chart
    bar.append("text")
      .attr("dy", "1.3em")
      .attr("x", function(d) {
        return xScale(d[0]) + xScale.bandwidth() / 2;
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "black")
      .text(function(d) {
        return d[1];
      });

    // line chart
    var line = d3.line()
      .x(function(d, i) {
        return xScale(d[0]) + xScale.bandwidth() / 2;
      })
      .y(function(d) {
        return yScale(d[1]);
      })
      .curve(d3.curveMonotoneX);

    bar.append("path")
      .attr("class", "line") // Assign a class for styling
      .attr("d", line(dataset)); // 11. Calls the line generator

    bar.append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) {
        return xScale(d[0]) + xScale.bandwidth() / 2;
      })
      .attr("cy", function(d) {
        return yScale(d[1]);
      })
      .attr("r", 5);

  }


  $scope.formPlot = function(dataVal) {
    var data = [{
      "salesperson": "Form Conversion",
      "sales": $scope.response[dataVal]['Form Conversion (ev59) (event59)']
    }, {
      "salesperson": "Form Engagement II",
      "sales": $scope.response[dataVal]['Form Engagement 2 (ev12) (event12)']
    }, {
      "salesperson": "Form Engagement I",
      "sales": $scope.response[dataVal]['Form Engagement 1 (ev11) (event11)']
    }, {
      "salesperson": "Form Start",
      "sales":$scope.response[dataVal]['FormStart (ev57) (event57)']
    }];

    // set the dimensions and margins of the graph
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 100
      },
      width = 700 ,
      height = 300 - margin.top - margin.bottom;

    // set the ranges
    var y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    var x = d3.scaleLinear()
      .range([0, width]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
      //.attr("fill", function(d){ return "#666666"});
    //console.log(document.getElementById("#chart1"));
    // format the data
    data.forEach(function(d) {
      d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d) {
      return d.sales;
    })])
    y.domain(data.map(function(d) {
      return d.salesperson;
    }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {
        return x(d.sales);
      })
      .attr("y", function(d) {
        return y(d.salesperson);
      })
      .attr("fill","purple")
      .attr("height", y.bandwidth());


    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  }

})
