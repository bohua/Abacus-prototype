/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('appController', ['$scope', function($scope){
	$scope.toggleLeftMenu = function(){
		var body = $(document.body);

		if(body.hasClass('left-collapse')){
			body.removeClass('left-collapse');
			$('#left-stage').animate({
				left: "+=300"
			}, 200,function(){

			});
		}else{
			$('#left-stage').animate({
				left: "-=300"
			}, 200,function(){
				body.addClass('left-collapse');
			});
		}
	}
}]);