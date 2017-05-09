var app = angular.extendRequires('ngApp', ['jcs-autoValidate']);

app.controller('demoCtrl', [
    '$http',
    '$scope',
    'bootstrap3ElementModifier',
    function ($http, $scope, bootstrap3ElementModifier) {
        $scope.user = {};
        $scope.bs3Icons = false;

        $scope.toggleBS3Icons = function () {
            $scope.bs3Icons = !$scope.bs3Icons;
            bootstrap3ElementModifier.enableValidationStateIcons($scope.bs3Icons);
        };

        $scope.submit = function (frmCtrl) {
            $http.post('https://api.app.com/users', $scope.user).then(function (response) {
                if (response.data.validationErrors) {
                    angular.forEach(response.data.validationErrors, function (error) {
                        frmCtrl.setExternalValidation(error.key, error.messageKey, error.message);
                    })
                }
            });
        };

        $scope.setExternalError = function (frm) {
            frm.setExternalValidation('firstname', undefined, 'hello joe');
        };

        $scope.toggleBS3Icons();
    }
]);

app.directive('mustcontainword', [
    function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var validateFn = function (viewValue) {
                    if (ctrl.$isEmpty(viewValue) || viewValue.toLowerCase().indexOf(attrs.mustcontainword.toLowerCase()) === -1) {
                        ctrl.$setValidity('mustcontainword', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('mustcontainword', true);
                        return viewValue;
                    }
                };

                ctrl.$parsers.push(validateFn);
                ctrl.$formatters.push(validateFn);
            }
        }
    }]);

app.directive('uniqueIdChecker', [
    '$http',
    function($http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var validateFn = function (viewValue) {
                    $http.get('https://myapp.com/validator-checks/unique-id/' + viewValue).then(function () {
                        ctrl.$setValidity('nonUniqueId', true);
                    }, function () {
                        ctrl.$setValidity('nonUniqueId', false);
                    });

                    return viewValue;
                };

                ctrl.$parsers.push(validateFn);
                ctrl.$formatters.push(validateFn);
            }
        }
    }]);

app.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['nonUniqueId'] = 'This id is already taken plus choose another';
        });
    }
]);

app.factory('myCustomElementModifier', [
    function () {
        var /**
             * @ngdoc function
             * @name myCustomElementModifier#makeValid
             * @methodOf myCustomElementModifier
             *
             * @description
             * Makes an element appear valid by apply custom styles and child elements.
             *
             * @param {Element} el - The input control element that is the target of the validation.
             */
            makeValid = function (el) {
                el.removeClass('bg-red');
                el.addClass('bg-green');
            },

            /**
             * @ngdoc function
             * @name myCustomElementModifier#makeInvalid
             * @methodOf myCustomElementModifier
             *
             * @description
             * Makes an element appear invalid by apply custom styles and child elements.
             *
             * @param {Element} el - The input control element that is the target of the validation.
             * @param {String} errorMsg - The validation error message to display to the user.
             */
            makeInvalid = function (el, errorMsg) {
                el.removeClass('bg-green');
                el.addClass('bg-red');
            };

        return {
            makeValid: makeValid,
            makeInvalid: makeInvalid,
            key: 'myCustomModifierKey'
        };
    }
]);

// now register the custom element modifier with the auto-validate module and set it as the default one for all elements
app.run([
    'validator',
    'myCustomElementModifier',
    'defaultErrorMessageResolver',
    function (validator, myCustomElementModifier, defaultErrorMessageResolver) {
        validator.registerDomModifier(myCustomElementModifier.key, myCustomElementModifier);
        defaultErrorMessageResolver.setI18nFileRootPath('../src/lang/');
        defaultErrorMessageResolver.setCulture('en-gb');

        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['pattern'] = 'Custom Error Message {0}';
            errorMessages['mustcontainword'] = 'Please enter the word "{0}"';
            errorMessages['nameRequired'] = 'Please enter your name';
        });
    }
]);