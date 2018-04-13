$(document).ready(function(){
	console.log("main1");
	function changDevice(me){
		$(".cp-device").find("a span").removeClass("active");
		$(me).addClass("active");
	}
	$(".icon-monitor").click(function(event) {
		event.preventDefault();
		$('#iframe-wrap').removeClass().addClass('full-width');
		changDevice(this);
		return false;
	});
	$(".icon-tablet").click(function(event) {
		event.preventDefault();
		$('#iframe-wrap').removeClass().addClass('tablet-width');
		changDevice(this);
		return false;
	});
	$(".icon-mobile-1").click(function(event) {
		event.preventDefault();
		$('#iframe-wrap').removeClass().addClass('mobile-width');
		changDevice(this);
		return false;
	});
	$(".icon-mobile-2").click(function(event) {
		event.preventDefault();
		$('#iframe-wrap').removeClass().addClass('mobile-width-2');
		changDevice(this);
		return false;
	});
	$(".icon-mobile-3").click(function(event) {
		event.preventDefault();
		$('#iframe-wrap').removeClass().addClass('mobile-width-3');
		changDevice(this);
		return false;
	});
});