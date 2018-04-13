(function(global) {
    var poster = {
        init: function() {
            var _t = this;
            _t.posterTemp = CPUtil.getTempByUrl("/custom-page/component/poster/main/vm/poster.html", "#poster-template");
        },
        render: function(data) {
            var _t = this;
            return "121323123";
        },
        renderDefault: function(callback) {
            var _t = this;
            $.getJSON("/custom-page/component/poster/data/demo-data.json", function(data) {
                console.log(data);
                var html =  _t.posterTemp(data);
                if(callback && typeof callback === "function"){
                    callback(html);
                }
            });
        },
        events: function() {
            var _t = this;
        }
    }

    poster.init();
    window.CPPoster = poster;
})(window);