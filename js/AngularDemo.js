ck.extendRequires('ngApp', [])
    .controller('testCtl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('model/testMdl.txt').success(function (data) {
            $scope.yourName = data;
        }).error(function (data, status, headers, config) {
            $scope.yourName = "LoadFailed";
        });
        $scope.clickTest = function () {
            $('#testA').text("You have clicked!");
        };
    }
]);
//# sourceMappingURL=AngularDemo.js.map