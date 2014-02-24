/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', [])
	.controller('topBarController', ['$scope', function ($scope) {
	$('#user-dropdown-menu').dropdown({
		effect: 'fade'
	});
	$scope.showUserMenu = function(){

	};
}]);
