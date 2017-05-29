'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tabs = function () {
    function Tabs() {
        _classCallCheck(this, Tabs);

        var self = this;
        self.__init();
    }

    _createClass(Tabs, [{
        key: '__init',
        value: function __init() {
            $('.subtabs, .insettabs').hide();
            $('.subtabs.active, .insettabs.active').show();

            // Change text of Trigger Tab to active tab
            var activeTab = $('.tabs li.active').text();
            $('.tabs-popover-trigger a span').text(activeTab);

            $('.tabs li a').click(function (e) {
                var currentAttrValue = $(this).attr('href');

                // Show/Hide Tabs
                $(currentAttrValue + '.subtabs').show().siblings('.subtabs').hide();
                $(currentAttrValue + '.insettabs').show().siblings('.insettabs').hide();

                // Change/remove current tab to active
                $(this).parent('li').addClass('active').siblings().removeClass('active');

                // Change text of Trigger Tab to active tab
                var activeTab = $('.tabs li.active').text();
                $('.tabs-popover-trigger a span').text(activeTab);

                e.preventDefault();
            });
        }
    }]);

    return Tabs;
}();

module.exports = Tabs;