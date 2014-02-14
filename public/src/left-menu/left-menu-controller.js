/**
 * Created by Bohua on 14-2-10.
 */

bleach.controller('leftMenuController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	$http.get('/getLeftMenu')
		.success(function (data) {
			$scope.menus = data;
		});

	$scope.toggleStatus = 'expand';

	$scope.toggleLeftMenu = function () {
		var delay = 200;
		var leftOffset = 150;

		if ($scope.toggleStatus === 'expand') {
			$('#left-stage').addClass('narrow-menu').animate({
				width: "-=" + leftOffset
			}, delay, function () {
				//$('#left-stage').hide();
				$scope.toggleStatus = 'collapse';
			});
			$('#right-stage').animate({
				'padding-left': "-=" + leftOffset
			}, delay);
		} else {
			//$('#left-stage').show();
			$('#left-stage').animate({
				width: "+=" + leftOffset
			}, delay, function () {
				$('#left-stage').removeClass('narrow-menu');
				$scope.toggleStatus = 'expand';
			});
			$('#right-stage').animate({
				'padding-left': "+=" + leftOffset
			}, delay);
		}
	};

	$scope.hasSubMenu = function (menu) {
		return menu.submenus !== undefined;
	};

	$scope.showSubMenu = function ($event) {
		var submenu = $($event.currentTarget).next('ul');

		if (submenu.length > 0) {
			if (submenu.is(':visible')) {
				submenu.hide();
			} else {
				$timeout(function () {
					submenu.css('display', 'block');
				}, 10);
			}
		}
	};

}]);