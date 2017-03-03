/*global app*/
'use strict';
(function(app) {
    app.controller('CrewCtrl', ['$scope', '$anchorScroll', 'CrewSrv',
        function($scope, $anchorScroll, CrewSrv) {
            $anchorScroll();
            $scope.crew = [];

            CrewSrv.obtainNames();

            $scope.generateCrew = function(){
                $scope.crew = [];
                for(var i = 0; i <= 430; i++){
                    $scope.crew.push(CrewSrv.generateCrew());
                }
            };

            $scope.sortM = function(){
                CrewSrv.sortMultiplier($scope.crew);
            };
            $scope.sortA = function(){
                CrewSrv.sortArea($scope.crew);
            };
            $scope.sortN = function(){
                CrewSrv.sortName($scope.crew);
            };
        }
    ]);
}(app));