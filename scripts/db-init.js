/**
 * Created by bli on 14-2-26.
 */
var db = require('../models');

db
	.sequelize
	.sync({ force: true })
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			db.User.create({
				user_name: 'admin',
				user_pass: 'admin'
			}).success(function (sdepold) {
					console.log(sdepold.values)
				});
		}
	});
