angular.module('ngApp', [
    'ngRoute',
    'phonecatControllers'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/phones', {
            templateUrl: 'view/phone-list.html',
            controller: 'PhoneListCtrl'
        }).
            when('/phones/:phoneId', {
            templateUrl: 'view/phone-detail.html',
            controller: 'PhoneDetailCtrl'
        }).
            otherwise({
            redirectTo: '/phones'
        });
    }]);
var phonecatControllers = angular.module('phonecatControllers', []);
phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('model/phones.json').success(function (data) {
            $scope.phones = data;
        });
        $scope.orderProp = 'age';
    }]);
phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.phoneId = $routeParams.phoneId;
    }]);
//# sourceMappingURL=RoutingDemo.js.map