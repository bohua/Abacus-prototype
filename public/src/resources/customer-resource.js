/**
 * Created by Bli on 14-2-19.
 */
resource.factory('Customer', ['$resource'], function($resource){
	var Customer = $resource(
		'/customer/:customer_id',
		{customer_id: '@id'}
	);

	return Customer;
});
