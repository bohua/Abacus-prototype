/**
 * Created by Bohua on 14-2-13.
 */

app.controller('topBarController', ['$scope', function ($scope) {
	$('#user-dropdown-menu').dropdown({
		effect: 'fade'
	});
	$scope.showUserMenu = function(){

	};
}]);
