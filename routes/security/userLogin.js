/**
 * Created by Bli on 14-2-26.
 */
var db = require(__dirname + '/../../models');

module.exports = function (req, res) {
	var user_name = req.body.username;
	var user_pass = req.body.password;

	db.User.find({
		where: {
			user_name: user_name
		}
	}).complete(function(err, user){
			if(!!err){
				res.json({
					success: false,
					reason_number: 2
				});
			}else if(!user){
				res.json({
					success: false,
					reason_number: 2
				});
			}else if(user.user_pass !== user_pass){
				res.contentType('json');
				res.json({
					success: false,
					reason_number: 1
				});
			}else{
				res.contentType('json');
				res.json({
					success: true,
					login_pass : user
				})
			}
		});
}