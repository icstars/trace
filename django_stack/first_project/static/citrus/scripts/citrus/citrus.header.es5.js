'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
    function Header() {
        _classCallCheck(this, Header);

        var self = this;
        self.__init();
    }

    _createClass(Header, [{
        key: '__init',
        value: function __init() {
            var self = this;
            self.menuToggle();
            self.applicationMenuToggle();
        }
    }, {
        key: 'menuToggle',
        value: function menuToggle() {
            /**  Menu Toggle jQuery Script  **/
            $('.c-header-search-toggle').click(function () {
                $('.c-header-search-toggle i').toggleClass('icon-delete');
                $('.c-header-search-toggle i').toggleClass('icon-search');
                $('.c-header-searchfield').toggleClass('active');
            });

            $('.cHeaderMenuBtn').click(function () {
                $('.c-application-menu-dropdown').removeClass('active');

                $('.c-header-menu-responsive').toggleClass('active');
            });

            $('.c-header-menu-responsive > li[data-has-sub-nav="true"] > a').click(function (event) {
                if ($(this).parent('li').hasClass('active')) {
                    $(this).parent('li').removeClass('active');
                } else {
                    $('.c-header-menu-responsive > li').removeClass('active');
                    $(this).parent('li').toggleClass('active');
                }
                event.preventDefault();
            });
        }
    }, {
        key: 'applicationMenuToggle',
        value: function applicationMenuToggle() {
            $('.c-application-menu').click(function () {
                $('.c-header-menu-responsive').removeClass('active');

                $('.c-application-menu-dropdown').toggleClass('active');
            });

            $(document).ready(function () {
                var iconClass = $('.c-application-menu-item.active').first().data('iconclass');
                var activeIcon = $('#applicationMenuIcon');

                activeIcon.removeClass();
                activeIcon.addClass(iconClass);
            });
        }
    }]);

    return Header;
}();

module.exports = Header;