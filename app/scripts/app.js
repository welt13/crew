/*jshint unused:false */
'use strict';

/**
 * @ngdoc overview
 * @name crewApp
 * @description
 * # crewApp
 *
 * Config module of the application.
 */

var app;
(function (angular) {

	var moduleDependencies = [];
	moduleDependencies = [
		'ui.router',
		'ui.bootstrap'
	];

	app = angular.module('crewApp', moduleDependencies);

	app.config([
		'$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('interceptorSrv');
			var spinnerFunction = function(data){
				angular.element('#spinner').show();
				return data;
			};
			$httpProvider.defaults.transformRequest.push(spinnerFunction);
		}
	]);
}(angular));