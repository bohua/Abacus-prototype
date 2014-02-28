/**
 * Created by bli on 14-2-28.
 */
var Measure = require(__dirname + "/../../routes/BI-module/data-models").Measure;

var field = "test_field_name";
var options = {
	operation: "sum",
	filter: {
		"start_time": "2014-01-01 00:00:00",
		"end_time": "2014-01-01 00:00:00"
	}
}

var mea1 = new Measure(field, options);
var mea2 = new Measure(field, options);

mea1.filter.start_time= "XXx";
mea1.operation = "count";

console.log(mea1);
console.log(mea2);