class BannerMessage {
    constructor() {
        let self = this
        self.__init();
    }

    __init() {
        $("body").on('click', '.banner-dismiss', function () {
            $(this).closest(".banner-message").toggle();
            return false;
        });
    }
}

module.exports = BannerMessage;