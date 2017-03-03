/*global angular, app*/
'use strict';
(function (angular, app) {
	app.controller('AppCtrl', ['$rootScope','$scope', function ($rootScope, $scope) {
		$rootScope.$on('serverError', function (event, data) {
        	console.log('error');
    	});
	}
  ]);
}(angular, app));