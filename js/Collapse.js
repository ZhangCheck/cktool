/** Collapse **/
ck.extendRequires("ui.bootstrap", ["ui.bootstrap.collapse"]);
angular.module('ui.bootstrap.collapse', [])
    .directive('collapse', ['$animate', function ($animate) {
        return {
            link: function (scope, element, attrs) {
                function expand() {
                    element.removeClass('collapse').addClass('collapsing');
                    $animate.addClass(element, 'in', {
                        to: { height: element[0].scrollHeight + 'px' }
                    }).then(expandDone);
                }
                function expandDone() {
                    element.removeClass('collapsing');
                    element.css({ height: 'auto' });
                }
                function collapse() {
                    element
                        .css({ height: element[0].scrollHeight + 'px' })
                        .removeClass('collapse')
                        .addClass('collapsing');
                    $animate.removeClass(element, 'in', {
                        to: { height: '0' }
                    }).then(collapseDone);
                }
                function collapseDone() {
                    element.css({ height: '0' }); // Required so that collapse works when animation is disabled
                    element.removeClass('collapsing');
                    element.addClass('collapse');
                }
                scope.$watch(attrs.collapse, function (shouldCollapse) {
                    if (shouldCollapse) {
                        collapse();
                    }
                    else {
                        expand();
                    }
                });
            }
        };
    }]);
//# sourceMappingURL=Collapse.js.map