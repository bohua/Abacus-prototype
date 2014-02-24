/**
 * Created by Bli on 14-2-18.
 */
angular.module('router-guide')
	.factory('routerGuideService', ['$http', function ($http) {
		var observers = [];
		var routerGuideModel = [];

		function callObservers(){
			for (var i = 0; i < observers.length; i++) {
				var observer = observers[i];
				observer(routerGuideModel);
			}
		}

		function getLocation(){

		}

		var Service = {
			bindObserver: function (callback) {
				observers.push(callback);
			},

			appendModel: function (OpList) {
				for (var i = 0; i < OpList.length; i++) {
					routerGuideModel.push(OpList[i]);
				}

				callObservers();
			},

			resetModelByLocation: function(path){
				var p = [];
				var locationArr = path.split('#');

				routerGuideModel = [];
				if(locationArr.length < 2){
					$http.get('/getLocationArray', {params: {locationId: 'home'}})
						.success(function (data) {
							routerGuideModel = data;

							callObservers();
						});
				}
				else{
					var tmp = locationArr[1].split('/');
					var locationId = tmp[tmp.length -1];

					$http.get('/getLocationArray', {params: {locationId: locationId}})
						.success(function (data) {
							routerGuideModel = data;

							callObservers();
						});
				}
			}
		}

		return Service;
	}]);