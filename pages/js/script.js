	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})
			
			

			// route for the about page
			.when('/final', {
				templateUrl : 'pages/final.html',
				controller  : 'finalController'
			})

			.when('/confirmfinal', {
				templateUrl : 'pages/confirmfinal.html',
				controller  : 'confirmfinalController'
			})
			
			// route for the contact page
			.when('/check', {
				templateUrl : 'pages/check.html',
				controller  : 'checkController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('finalController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('confirmfinalController', function($scope) {
		$scope.message = 'Look! I am an about page.fdsdsfsdffdssdffd';
	});
	
	scotchApp.controller('checkController', function($scope) {
		$scope.message = '----- Address Input & Select from Addresses Section -----';
	});
	
	