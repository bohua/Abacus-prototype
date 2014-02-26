/**
 * Created by Bli on 14-2-26.
 */
var db = require(__dirname + '/../../models');

module.exports = function (req, res) {
	var user_name = req.body.user_name;
	var user_pass = req.body.user_pass;

	db.User.find({
		where: {
			user_name: user_name
		}
	}).complete(function(err, user){
			if(!!err){

			}else if(!user){

			}else if(user.user_pass !== user_pass){
				res.contentType('json');
				res.json({
					login_success: false,
					reason_number: 1
				});
			}else{
				res.contentType('json');
				res.json({
					login_success: true
				})
			}
		});
}