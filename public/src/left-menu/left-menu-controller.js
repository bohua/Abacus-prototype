/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('leftMenuController', ['$scope', '$http', function ($scope, $http) {
	$http.get('/getLeftMenu')
		.success(function(data){
			$scope.menu = data;
		});

	$scope.toggleStatus = 'expand';

	$scope.toggleLeftMenu = function(){
		var body = $(document.body);
		var delay = 200;
		var leftOffset = 250;

		if($scope.toggleStatus === 'expand'){
			$('#left-stage').addClass('narrow-menu').animate({
				width: "-="+leftOffset
			}, delay, function(){
				//$('#left-stage').hide();
				$scope.toggleStatus = 'collapse';
			});
			$('#right-stage').animate({
				'padding-left': "-="+leftOffset
			}, delay);
		}else{
			//$('#left-stage').show();
			$('#left-stage').animate({
				width: "+="+leftOffset
			}, delay, function(){
				$('#left-stage').removeClass('narrow-menu');
				$scope.toggleStatus = 'expand';
			});
			$('#right-stage').animate({
				'padding-left': "+="+leftOffset
			}, delay);
		}
	}
}]);