/**
 * Created by Bli on 14-2-10.
 */

exports.leftMenu = function(req, res){
	var menu = [];

	menu.push({
		id: 'home',
		title: '主页',
		icon: 'icon-home',
		link: '/homePage'
	});

	res.contentType('json');
	res.json(menu);
};