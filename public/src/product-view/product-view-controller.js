/**
 * Created by Bli on 14-2-21.
 */
angular.module('product-view', ['ngRoute', 'router-guide', 'product-resource'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/basics/productView', {templateUrl: '/src/product-view/product-view.tpl.html', controller: 'productViewController'});
	}])
	.controller('productViewController', [
		'$scope',
		'routerGuideService',
		'Product',
		function ($scope, routerGuideService, Product) {
			//routerGuideService.resetModel(['basics', 'productView']);
		}]);