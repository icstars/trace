"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
    function Card() {
        _classCallCheck(this, Card);

        var self = this;
        self.__init();
    }

    _createClass(Card, [{
        key: "__init",
        value: function __init() {
            $(document).ready(function () {
                $(".js-card-toggle").click(function () {
                    $(this).parent().next("section").slideToggle();
                    $(this).find(".card-toggle i").toggleClass("icon-collapse icon-expand");
                    return false;
                });

                $("body").on('click', '.js-card-toggle', function () {
                    $(this).parent().next("section").slideToggle(400, function () {
                        if ($('#column-equal').length && $('#column-equal').masonry !== undefined && $('#column-equal').masonry !== null) {
                            $('#column-equal').masonry();
                        }
                    });

                    $(this).find(".card-toggle i").toggleClass("icon-collapse icon-expand");
                    return false;
                });
            });
        }
    }]);

    return Card;
}();

module.exports = Card;