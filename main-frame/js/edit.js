$(document).ready(function() {

    var CPEdit = {
        init: function() {
            var _t = this;
            _t.niceScroll();
            _t.events();
        },
        niceScroll: function() {
            $('#container').niceScroll({
                cursorcolor: "#ccc", //#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "5px", //像素光标的宽度
                cursorborder: "0", //   游标边框css定义
                cursorborderradius: "5px", //以像素为光标边界半径
                autohidemode: true, //是否隐藏滚动条
                autoReinitialise: true
            });
        },
        events: function() {
            $("#items").on('click', '.ep-close', function(event) {
                $(this).closest('.edit-panel').remove();
            }).on('click', '.ep-edit', function(event) {
                parent.CP.renderEdit(this);
            }).on('mouseover', '.ep-close', function(event) {
                $(this).closest('.edit-panel').addClass('ep-pre-close');
            }).on('mouseout', '.ep-close', function(event) {
                $(this).closest('.edit-panel').removeClass('ep-pre-close');
            }).on('mouseover', '.ep-edit', function(event) {
                $(this).closest('.edit-panel').addClass('ep-pre-edit');
            }).on('mouseout', '.ep-edit', function(event) {
                $(this).closest('.edit-panel').removeClass('ep-pre-edit');
            });
        }
    };

    CPEdit.init();
    window.CPEdit = CPEdit;
});