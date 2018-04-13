$(document).ready(function(){
	// var sortable = Sortable.create($("#items")[0],{
	// 	group:{
	// 		name: 'advanced',
	// 		pull: false,
	// 		put: true
	// 	}, 
	// 	onAdd:function(event){
	// 		$(event.item).append('adsfasdf')
	// 	}
	// });
    if($("#edit-iframe").length > 0){
        $("#edit-iframe").on('load',function(){
            var sortable = Sortable.create($("#edit-iframe").contents().find("#items")[0],{
                 group:{
                     name: 'advanced',
                     pull: false,
                     put: true
                 }, 
                 onAdd:function(event){
                     $(event.item).append('adsfasdf')
                 }
            });
        });
    } else {
        var sortable = Sortable.create($("#items")[0],{
             group:{
                 name: 'advanced',
                 pull: false,
                 put: true
             }, 
             onAdd:function(event){
                 $(event.item).append('adsfasdf')
             }
        });

        $('.i-screen').niceScroll({
            cursorcolor: "#ccc",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "5px", //像素光标的宽度
            cursorborder: "0", //   游标边框css定义
            cursorborderradius: "5px",//以像素为光标边界半径
            autohidemode: true, //是否隐藏滚动条
            autoReinitialise: true
        });
    }
	$("#zoom-value").on('change',function(event){
        if($("#edit-iframe").length > 0){
            $("#edit-iframe").contents().find("html").css("zoom", $(this).val() + "%");
        }
		$("html").css("zoom", $(this).val() + "%");
	});
	var sortable1 = Sortable.create($("#items1")[0],{
		group:{
			name: 'advanced',
			pull: 'clone',
			put: false
		},
		animation: 150,
		onStart:function (event){
			console.log(arguments);
			// $(event.item).append('21312312')
		}
	});
 
    // $("#items").sortable({
    //    connectWith: "#items1",
    //    helper:"clone",
    //    dropOnEmpty: true
    // });
    // $("#items1").sortable({
    //    connectWith: "#items",
    //    helper:"clone",
    //    dropOnEmpty: false,
    //    start:function(event, ui){
    //    	 console.log(arguments);
    //    	 //ui.itemsClone = ui.items;
    //    	 //ui.items = ui.items.clone();
    //    }
    // });
	 // $("#items, #items1").disableSelection();
 

	$("#items").on('click', '.ep-close', function(event) {
		$(this).closest('.edit-panel').remove();
	}).on('click', '.ep-edit', function(event) {
		$(".pc-edit-tab a").trigger('click')
	}).on('mouseover', '.ep-close', function(event) {
		$(this).closest('.edit-panel').addClass('ep-pre-close');
		
	}).on('mouseout', '.ep-close', function(event) {
		$(this).closest('.edit-panel').removeClass('ep-pre-close');
	}).on('mouseover', '.ep-edit', function(event) {
		$(this).closest('.edit-panel').addClass('ep-pre-edit');
		
	}).on('mouseout', '.ep-edit', function(event) {
		$(this).closest('.edit-panel').removeClass('ep-pre-edit');
	});
    $('html').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: true, //是否隐藏滚动条
        autoReinitialise: true,
        autoReinitialiseDelay: 100
    });
    $('.tab-content').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: true, //是否隐藏滚动条
        autoReinitialise: true,
        autoReinitialiseDelay: 100
    });
});