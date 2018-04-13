$(document).ready(function() {
    var cp = {
        init: function() {
            var _t = this;
            _t.sortableItem = null;
            _t.sortableItem1 = null;
            _t.dataConfig = null;
            _t.editWindow = document.getElementById('edit-iframe').contentWindow;
            _t.editTemp = CPUtil.getTempBySelector("#edit-template");
            _t.$items1 = $("#items1");
            _t.niceScroll();
            _t.sortableHander();
            _t.renderItem1();
            _t.events();

        },
        renderDefault: function(config, callback) {
            var _t = this;
            var scriptCount = 0;
            var tryCount = 10;;
            $.each(config.depend.main.css, function(index, item) {
                _t.editWindow.CPUtil.getCss(item);
            });
            $.each(config.depend.main.js, function(index, item) {
                _t.editWindow.CPUtil.getScript(item, function() {
                    ++scriptCount;
                });
            });

            function check() {
                if (scriptCount === config.depend.main.js.length && _t.editWindow[config.export]) {
                    _t.editWindow[config.export].renderDefault(function(html) {
                        if (callback && typeof callback === "function") {
                            callback(html);
                        }
                    });
                    return;
                }
                console.log(tryCount);
                if (tryCount == 0) {
                    return;
                }
                --tryCount;
                setTimeout(check, 500);
            }
            check();

        },
        getEditHtml: function(config, callback) {
            var scriptCount = 0;
            var tryCount = 20;
            $.each(config.depend.edit.css, function(index, item) {
                CPUtil.getCss(item);
            });
            $.each(config.depend.edit.js, function(index, item) {
                CPUtil.getScript(item, function() {
                    ++scriptCount;
                });
            });

            function check() {
                if (scriptCount === config.depend.edit.js.length && window[config.editExport]) {
                    window[config.editExport].render(function(html) {
                        if (callback && typeof callback === "function") {
                            callback(html);
                        }
                    });
                    return;
                }
                console.log(tryCount);
                if (tryCount == 0) {
                    return;
                }
                --tryCount;
                setTimeout(check, 300);
            }
            check();
        },
        renderEdit: function(me) {
            var _t = this;
            var editPanelDom = $(me).closest('.edit-panel');
            var id = editPanelDom.attr('id');
            var type = editPanelDom.attr('edit-type');
            var config = _t.dataConfig[type];
            _t.getEditHtml(config, function(html) {
                $("#component-id").val(id);
                $("#edit-dynamic").empty();
                $("#edit-dynamic").append(html);
                $(".cp-minicolors").minicolors({
                    control: $(this).attr('data-control') || 'hue',
                    defaultValue: $(this).attr('data-defaultValue') || '',
                    format: $(this).attr('data-format') || 'hex',
                    keywords: $(this).attr('data-keywords') || '',
                    inline: $(this).attr('data-inline') === 'true',
                    letterCase: $(this).attr('data-letterCase') || 'lowercase',
                    opacity: $(this).attr('data-opacity'),
                    position: $(this).attr('data-position') || 'bottom left',
                    swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                    change: function(hex, opacity) {
                        var log;
                        try {
                            log = hex ? hex : 'transparent';
                            if (opacity) log += ', ' + opacity;
                            console.log(log);
                        } catch (e) {}
                    },
                    theme: 'default'
                });
                $(".pc-edit-tab a").trigger('click');
            });
        },
        renderItem1: function() {
            var _t = this;
            $.getJSON("config/data-config.json", function(data) {
                _t.dataConfig = data;
                _t.$items1.empty();
                $.each(data, function(key, value) {
                    _t.$items1.append(_t.editTemp(value));
                });
            });
        },
        sortableHander: function() {
            var _t = this;
            $("#edit-iframe").on('load', function() {
                _t.sortable = Sortable.create($("#edit-iframe").contents().find("#items")[0], {
                    group: {
                        name: 'advanced',
                        pull: false,
                        put: true
                    },
                    onAdd: function(event) {
                        var type = $(event.item).attr('edit-type');
                        var config = _t.dataConfig[type];
                        _t.renderDefault(config, function(html) {
                            $(event.item).find('.edit-container').empty();
                            $(event.item).find('.edit-container').append(html);
                            $(event.item).attr('id', CPUtil.uuid());
                        });
                    }
                });
            });

            _t.sortable1 = Sortable.create($("#items1")[0], {
                group: {
                    name: 'advanced',
                    pull: 'clone',
                    put: false
                },
                sort: true,
                animation: 150,
                onEnd: function(event) {
                    //$(event.item).find('.edit-container').append($(event.clone).find('.edit-name').clone());
                },
                onStart: function(event) {
                    // event.editNameDom = $(event.item).find('.edit-name').clone();
                    //$(event.item).find('.edit-name').remove();
                }
            });
        },
        niceScroll: function() {
            $('html').niceScroll({
                cursorcolor: "#ccc", //#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "5px", //像素光标的宽度
                cursorborder: "0", //   游标边框css定义
                cursorborderradius: "5px", //以像素为光标边界半径
                autohidemode: true, //是否隐藏滚动条
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });
            $('#edit-dynamic').niceScroll({
                cursorcolor: "#ccc", //#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "5px", //像素光标的宽度
                cursorborder: "0", //   游标边框css定义
                cursorborderradius: "5px", //以像素为光标边界半径
                autohidemode: true, //是否隐藏滚动条
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });
            $('#components').niceScroll({
                cursorcolor: "#ccc", //#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "5px", //像素光标的宽度
                cursorborder: "0", //   游标边框css定义
                cursorborderradius: "5px", //以像素为光标边界半径
                autohidemode: true, //是否隐藏滚动条
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });
        },
        events: function() {
            var _t = this;
            $("#zoom-value").on('change', function(event) {
                if ($("#edit-iframe").length > 0) {
                    $("#edit-iframe").contents().find("html").css("zoom", $(this).val() + "%");
                }
                $("html").css("zoom", $(this).val() + "%");
                _t.sortable.options.zoom = $(this).val() / 100;
                _t.sortable1.options.zoom = $(this).val() / 100;
            });
            $("#cp-btn-save").on("click", function(event) {
                var componentId = $("#component-id").val();
                if (!componentId) {
                    return;
                }
                var editDom = _t.editWindow.$("#" + componentId);
                if (editDom.length == 0) {
                    return;
                }
                var type = editDom.attr('edit-type');
                var config = _t.dataConfig[type];
                var editExport = eval(config.editExport);
                var component = _t.editWindow[config.export];
                var data = editExport.getData();
                var html = component.render(data);
                console.log(html);
                editDom.find('.edit-container').empty();
                editDom.find('.edit-container').append(html);
            });
            $("#cp-btn-cancel").on("click", function(event) {
                $("#component-id").val("");
                $("#edit-dynamic").empty();
            });
        }
    }
    cp.init();
    window.CP = cp;
});