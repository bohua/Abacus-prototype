/**
 * Created by bli on 14-2-28.
 */

var extend = require('extend');

module.exports = function(field, options){
	this.field = field;

	extend(true, this, options);
}