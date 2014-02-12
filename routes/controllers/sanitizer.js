function sanitizeText(queryParam, callback) {
	var queryArray = queryParam.split(" ");
	if (!queryParam) {
		callback(null);
	} else if (queryParam.indexOf(" ") == -1) {
		var regEx = new RegExp(queryArray[0] + ".*");
		callback({"First_Name":  regEx});
	} else if (queryParam.indexOf(" ") != -1) {
		var regEx = new RegExp(queryArray[1] + ".*");
		callback({"First_Name": queryArray[0], "Last_Name": regEx});
	} else {
		callback(null);
	}
}

module.exports.sanitizeText = sanitizeText;
