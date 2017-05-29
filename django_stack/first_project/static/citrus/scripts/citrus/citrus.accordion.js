class Accordion {
    constructor(){
        let self = this
        self.__init();
    }

    __init(){
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
}

module.exports = Accordion;