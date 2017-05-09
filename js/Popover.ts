ck.extendRequires("ui.bootstrap",["ui.bootstrap.popover","ui.bootstrap.tooltip","ui.bootstrap.position","ui.bootstrap.bindHtml"]);
ck.extendRequires("ui.bootstrap.tpls",["template/popover/popover-template.html","template/popover/popover.html","template/tooltip/tooltip-html-popup.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html"]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )

    .directive( 'popoverTemplatePopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
                originScope: '&' },
            templateUrl: 'template/popover/popover-template.html'
        };
    })

    .directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'popoverTemplate', 'popover', 'click', {
            useContentExp: true
        } );
    }])

    .directive( 'popoverPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/popover/popover.html'
        };
    })

    .directive( 'popover', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'popover', 'popover', 'click' );
    }]);

angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover-template.html",
        "<div class=\"popover\"\n" +
        "  tooltip-animation-class=\"fade\"\n" +
        "  tooltip-classes\n" +
        "  ng-class=\"{ in: isOpen() }\">\n" +
        "  <div class=\"arrow\"></div>\n" +
        "\n" +
        "  <div class=\"popover-inner\">\n" +
        "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
        "      <div class=\"popover-content\"\n" +
        "        tooltip-template-transclude=\"contentExp()\"\n" +
        "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/popover/popover-window.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover-window.html",
        "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen, fade: animation }\">\n" +
        "  <div class=\"arrow\"></div>\n" +
        "\n" +
        "  <div class=\"popover-inner\">\n" +
        "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
        "      <div class=\"popover-content\" tooltip-template-transclude></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover.html",
        "<div class=\"popover\"\n" +
        "  tooltip-animation-class=\"fade\"\n" +
        "  tooltip-classes\n" +
        "  ng-class=\"{ in: isOpen() }\">\n" +
        "  <div class=\"arrow\"></div>\n" +
        "\n" +
        "  <div class=\"popover-inner\">\n" +
        "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
        "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);
