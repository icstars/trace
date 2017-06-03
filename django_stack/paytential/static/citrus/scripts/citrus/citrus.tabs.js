class Tabs {
    constructor(){
        let self = this
        self.__init();
    }

    __init(){$('.subtabs, .insettabs').hide();
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
}

module.exports = Tabs;