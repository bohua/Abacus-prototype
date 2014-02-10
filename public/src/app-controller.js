/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('appController', ['$scope', function($scope){
	$scope.toggleLeftMenu = function(){
		var body = $(document.body);

		if(body.hasClass('left-collapse')){
			body.removeClass('left-collapse');
			$('#left-stage').animate({
				left: "+=248",
				opacity: 1
			}, 200);
			$('.left-menu-switcher').animate({
				left: "+=248"
			}, 200);
		}else{
			$('#left-stage').animate({
				left: "-=248",
				opacity: 0
			}, 200,function(){
				body.addClass('left-collapse');
			});
			$('.left-menu-switcher').animate({
				left: "-=248"
			}, 200);
		}
	}
}]);