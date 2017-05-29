'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accordion = function () {
    function Accordion() {
        _classCallCheck(this, Accordion);

        var self = this;
        self.__init();
    }

    _createClass(Accordion, [{
        key: '__init',
        value: function __init() {
            $(document).on('click', '.accordion-expand', function (event) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).children('a').text('Expand All');
                    $('.accordion > .accordion-header').removeClass('active');
                } else {
                    $(this).addClass('active');
                    $(this).children('a').text('Collapse All');
                    $('.accordion > .accordion-header').addClass('active');
                }
                event.preventDefault();
            });

            $(document).on('click', '.accordion > .accordion-header > a', function (event) {
                $(this).parent('.accordion-header').toggleClass('active');
                event.preventDefault();
            });
        }
    }]);

    return Accordion;
}();

module.exports = Accordion;