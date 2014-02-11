/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('appController', ['$scope', function($scope){
	$scope.toggleLeftMenu = function(){
		var body = $(document.body);
		var delay = 200;
		var leftOffset = 300;

		if($('#left-stage').is(':visible')){
			$('#left-stage').animate({
				left: "-="+leftOffset
			}, delay, function(){
				$('#left-stage').hide();
			});
			$('#right-stage').animate({
				'margin-left': "0px"
			}, delay);
		}else{
			$('#left-stage').show();
			$('#left-stage').animate({
				left: "+="+leftOffset
			}, delay);
			$('#right-stage').animate({
				'margin-left': leftOffset+"px"
			}, delay);
		}
	}
}]);