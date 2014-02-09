function sanitizeText(queryParam, callback) {
	var queryArray = queryParam.split(" ");
	if (!queryParam) {
		callback(null);
	} else if (queryParam.indexOf("@") != -1) {
		callback({"Email": queryArray[0]});
	} else if (queryArray.length == 1) {
		callback({"First_Name": queryArray[0]});
	} else {
		callback({"First_Name": queryArray[0], "Last_Name": queryArray[1]});
	}
}

module.exports.sanitizeText = sanitizeText;
