/**
 * Created by Bohua on 14-2-10.
 */

app.controller('index', ['$rootScope', function($rootScope){
	$rootScope.titleArr = [{
		id: "home",
		content: "主页",
		icon: "icon-home",
		link: "#/"
	}];
}]);