var app = angular.module('myApp',[]);

app.controller ('WyliodrinCtrl', function ($scope)
{
    $scope.database = database;
    console.log(this.database);
    var socket = io('/');
    socket.on('value', function (data) {
      $scope[data.variable] = data.value;
      $scope.$apply ();
      if (typeof wyliodrin.onUpdate === "function")
      {
        wyliodrin.onUpdate (data.variable, data.value, $scope);
      }
    });
    localforage.getItem('values', function(err, value){
			if(err)
				console.log(err);
			else
				if(value){
					$scope.database = value;
					database = value;
				}
				database.online = true;
			$scope.$apply();
		});
});

app.directive('carousel', function(){
  return {
			restrict: 'E',
			templateUrl: '/static/app/html/carousel.html',
			controller: function ()
			{
		    this.database = database;
			},
			controllerAs: 'carCtrl'
		};
});

app.controller('TabCtrl', function($scope){
  $scope.tab = 1;
  $scope.setTab = function(value){
    $scope.tab = value;
  };
  $scope.isSet = function(value){
    return $scope.tab === value;
  };
});

app.controller('AccordionCtrl', function($scope){
  $scope.ac = 1;
  $scope.setAc = function(value){
    $scope.ac = value;
  };
  $scope.isS = function(value){
    return $scope.ac === value;
  };
});

app.directive('desen', function(){
  return {
			restrict: 'E',
			templateUrl: '/static/app/html/chart.html',
			scope:{
			    data: "=",
			    text: "@",
			    name: "@"
			},
			controller: function ($scope)
			{
			  this.desen = function ()
			  {
			    console.log ($scope.name);
			    $("#"+$scope.name).highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: $scope.text
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text:"",
                }
            },
            series: [{
                animation:false,
                name:"",
                data: $scope.data
            }]
          });
			  };
			  var ctrl = this;
		    // console.log ($scope.data);
		    $scope.$watchCollection ("data", function ()
		    {
		      // console.log ($scope.data);
		      ctrl.desen ();
		    });
		    setTimeout (function ()
		    {
		      ctrl.desen ();
		    }, 1000);
			},
			controllerAs: 'carCtrl'
		};
});

var wyliodrin = {
  onUpdate: null,
};
