class Header {
    constructor() {
        let self = this
        self.__init();
    }

    __init() {
        let self = this;
        self.menuToggle();
        self.applicationMenuToggle();
    }

    menuToggle() {
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

    applicationMenuToggle() {
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
}

module.exports = Header;