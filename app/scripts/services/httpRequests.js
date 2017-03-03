/*global angular, app */

'use strict';

(function (angular, app) {


    app.factory('httpRequestsSrv', ['$http', function ($http) {

            var get = function (configuration) {

                var requestConfig = {
                    url: null
                };

                angular.extend(requestConfig, configuration);

                return $http({
                    method: 'GET',
                    url: requestConfig.url
                });
            };

            return {
                get: get
            };
        }
    ]);

}(angular, app));