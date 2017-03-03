/* global app */
'use strict';
(function (app) {
    app.config(['$stateProvider','$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/crew');

            $stateProvider
                .state('crew', {
                    url: '/crew',
                    templateUrl: 'sections/crew/crew.html',
                    controller:'CrewCtrl'
                });
        }
    ]);
}(app));
