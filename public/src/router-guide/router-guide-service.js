/**
 * Created by Bli on 14-2-18.
 */
angular.module('router-guide')
	.factory('routerGuideService', ['$http', function ($http) {
		var observers = [];
		var routerGuideModel = [];
/*
		var routerList = {
			home: {
				id: "home",
				content: "主页",
				icon: "icon-home",
				link: "#"
			},
			basics: {
				id: "basics",
				content: "基础信息管理",
				icon: "icon-clipboard",
				link: "#/basics"
			},
			productView: {
				id: "productView",
				content: "我的产品",
				icon: "icon-cube",
				link: "#/basics/productView"
			},
			customerView: {
				id: "productView",
				content: "我的客户",
				icon: "icon-",
				link: "#/basics/productView"
			}
		};
*/
		var Service = {
			bindObserver: function (callback) {
				observers.push(callback);
			},
			/*

			resetModel: function (OpList) {
				routerGuideModel = [];

				for (var i = 0; i < OpList.length; i++) {
					var id = OpList[i];
					if (id && routerList[id]) {
						routerGuideModel.push(routerList[id]);
					}
				}

				for (var i = 0; i < observers.length; i++) {
					var observer = observers[i];
					observer(routerGuideModel);
				}
			},
*/
			resetModelByLocation: function(path){
				var p = [];
				var locationArr = path.split('#');

				routerGuideModel = [];
				if(locationArr.length < 2){
					$http.get('/getLocationArray', {params: {locationId: 'home'}})
						.success(function (data) {
							routerGuideModel = data;

							for (var i = 0; i < observers.length; i++) {
								var observer = observers[i];
								observer(routerGuideModel);
							}
						});
				}
				else{
					var tmp = locationArr[1].split('/');
					var locationId = tmp[tmp.length -1];

					$http.get('/getLocationArray', {params: {locationId: locationId}})
						.success(function (data) {
							routerGuideModel = data;

							for (var i = 0; i < observers.length; i++) {
								var observer = observers[i];
								observer(routerGuideModel);
							}
						});
					/*
					for(var i = 0; i< tmp.length; i++){
						if(routerList[tmp[i]]){
							routerGuideModel.push(routerList[tmp[i]]);
						}
					}
					*/
				}
			}
		}

		return Service;
	}]);