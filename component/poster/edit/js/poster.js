(function(global) {
    var CPEditPoster = {
        init: function() {
            var _t = this;
            _t.posterEditTemp = CPUtil.getTempByUrl("/custom-page/component/poster/edit/vm/poster.html", "#poster-edit-template");
        },
        render: function(callback) {
            var _t = this;
            if (typeof callback === "function") {
                callback(_t.posterEditTemp({}));
            }
        },
        getData: function() {
            return {};

        }
    };
    CPEditPoster.init();
    global.CPEditPoster = CPEditPoster;
})(window);