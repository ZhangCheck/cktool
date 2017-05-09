ck.extendRequires("ngApp", ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);
ck.module().controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.gridOptions = {
            enableSorting: true,
            columnDefs: [
                { field: 'name', minWidth: 200, width: '30%' },
                { field: 'gender', width: '30%', maxWidth: 500, minWidth: 70 },
                { field: 'company', width: '40%', enableColumnResizing: false, enableColumnMenu: false, enableSorting: false, headerTooltip: true }
            ]
        };
        $http.get('model/100.json')
            .success(function (data) {
            $scope.gridOptions.data = data;
        });
    }]);
//# sourceMappingURL=GridDemo.js.map