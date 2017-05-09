/** Accordion **/
///<reference path="../Definition/angularjs/angular.d.ts"/>
ck.extendRequires("ui.bootstrap", ["ui.bootstrap.accordion", "ui.bootstrap.collapse"]);
ck.extendRequires("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html"]);
angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])
    .constant('accordionConfig', {
    closeOthers: true
})
    .controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {
        // This array keeps track of the accordion groups
        this.groups = [];
        // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
        this.closeOthers = function (openGroup) {
            var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
            if (closeOthers) {
                angular.forEach(this.groups, function (group) {
                    if (group !== openGroup) {
                        group['isOpen'] = false;
                    }
                });
            }
        };
        // This is called from the accordion-group directive to add itself to the accordion
        this.addGroup = function (groupScope) {
            var that = this;
            this.groups.push(groupScope);
            groupScope.$on('$destroy', function (event) {
                that.removeGroup(groupScope);
            });
        };
        // This is called from the accordion-group directive when to remove itself
        this.removeGroup = function (group) {
            var index = this.groups.indexOf(group);
            if (index !== -1) {
                this.groups.splice(index, 1);
            }
        };
    }])
    .directive('accordion', function () {
    return {
        restrict: 'EA',
        controller: 'AccordionController',
        transclude: true,
        replace: false,
        templateUrl: 'template/accordion/accordion.html'
    };
})
    .directive('accordionGroup', function () {
    return {
        require: '^accordion',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'template/accordion/accordion-group.html',
        scope: {
            heading: '@',
            isOpen: '=?',
            isDisabled: '=?'
        },
        controller: function () {
            this.setHeading = function (element) {
                this.heading = element;
            };
        },
        link: function (scope, element, attrs, accordionCtrl) {
            accordionCtrl.addGroup(scope);
            scope.$watch('isOpen', function (value) {
                if (value) {
                    accordionCtrl.closeOthers(scope);
                }
            });
            scope.toggleOpen = function () {
                if (!scope.isDisabled) {
                    scope.isOpen = !scope.isOpen;
                }
            };
        }
    };
})
    .directive('accordionHeading', function () {
    return {
        restrict: 'EA',
        transclude: true,
        template: '',
        replace: true,
        require: '^accordionGroup',
        link: function (scope, element, attr, accordionGroupCtrl, transclude) {
            // Pass the heading to the accordion-group controller
            // so that it can be transcluded into the right place in the template
            // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
            accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
        }
    };
})
    .directive('accordionTransclude', function () {
    return {
        require: '^accordionGroup',
        link: function (scope, element, attr, controller) {
            scope.$watch(function () { return controller[attr.accordionTransclude]; }, function (heading) {
                if (heading) {
                    element.html('');
                    element.append(heading);
                }
            });
        }
    };
});
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/accordion/accordion-group.html", "<div class=\"panel panel-default\">\n" +
            "  <div class=\"panel-heading\">\n" +
            "    <h4 class=\"panel-title\">\n" +
            "      <a href=\"javascript:void(0)\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
            "    </h4>\n" +
            "  </div>\n" +
            "  <div class=\"panel-collapse collapse\" collapse=\"!isOpen\">\n" +
            "	  <div class=\"panel-body\" ng-transclude></div>\n" +
            "  </div>\n" +
            "</div>\n" +
            "");
    }]);
angular.module("template/accordion/accordion.html", []).run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/accordion/accordion.html", "<div class=\"panel-group\" ng-transclude></div>");
    }]);
//# sourceMappingURL=Accordion.js.map