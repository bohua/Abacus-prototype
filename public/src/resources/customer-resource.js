/**
 * Created by Bli on 14-2-19.
 */
angular.module('customer-resource', ['ngResource'])
	.factory('Customer', ['$resource', function ($resource) {
		var Customer = $resource(
			'/customer/:customer_id',
			{customer_id: '@id'}
		);

		return Customer;
	}]);
