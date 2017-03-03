/* global app */

'use strict';

(function(app) {

    app.factory('interceptorSrv', ['$q', '$rootScope',
        function($q, $rootScope) {

            return {
                request: function(request) {
                    angular.element('#spinner').hide();
                    return request;
                },
                requestError: function(rejection) {
                    angular.element('#spinner').hide();
                    return $q.reject(rejection);
                },
                response: function(response) {
                    angular.element('#spinner').hide();
                    return response;
                },
                responseError: function(rejection) {
                    angular.element('#spinner').hide();
                    if( rejection.status === 400 || rejection.status > 401) {
                        $rootScope.$emit('serverError', rejection.data);
                    }

                    return $q.reject(rejection);
                }
            };
        }
    ]);

}(app));
