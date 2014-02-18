/**
 * Created by Bohua on 14-2-18.
 */

module.exports = function (req, res) {
	var file = req.params.file;

	res.render('.' + file);
}
