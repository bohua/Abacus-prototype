/**
 * Created by Bli on 14-2-19.
 */
angular.module('product-resource', ['ngResource'])
	.factory('Product', ['$resource', function ($resource) {
		var Product = $resource(
			'/product/:product_id',
			{product_id: '@id'}
		);

		return Product;
	}]);