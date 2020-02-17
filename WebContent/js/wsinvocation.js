function getHello() {
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/SecureApiRest/SSD/hello",
		success : function(data) {
			$("#resGetHello").html(data);
		},
		error : function(res) {
			alert("ERROR: " + res.statusText);
		}
	});
}

function getHello2() {
	var req = $.ajax({
		type : "GET",
		url : "http://localhost:8080/SecureApiRest/SSD/hello",
	});
	req.done(function(data) {
		$("#resGetHello").html(data);
	});
	req.fail(function(res) {
		alert("ERROR" + res.statusText);
	});

}

function getArticleId(myId) {
	var myUrl = "http://localhost:8080/SecureApiRest/SSD/getArticle/" + myId;
	console.log(myUrl);
	$.ajax({
		type : "GET",
		url : myUrl,
		dataType : "text",
		data : myId,
		success : function(data) {
			$("#resArticle").html(data);
		},
		error : function(res) {
			$("#resArticle").html(res);
			// alert("ERROR " + res.statusText);
		}

	});
}

function deleteArticle(myId) {
	var myUrl = "http://localhost:8080/SecureApiRest/SSD/deleteArticle/" + myId;
	console.log(myUrl);
	$.ajax({
		type : "DELETE",
		url : myUrl,
		dataType : "text",
		data : myId,
		success : function(data) {
			$("#resArticle").html(data);
		},
		error : function(res) {
			$("#resArticle").html(res);
			// alert("ERROR " + res.statusText);
		}

	});
}

function createArticle(myId, autor, description, oid) {
	var myUrl = "http://localhost:8080/SecureApiRest/SSD/myArticleFormJs/" + myId;
	console.log(myUrl);
	$.ajax({
		type : "POST",
		url : myUrl,
		headers : {
			"autor" : autor,
			"description" : description,
			"oid" : oid
		},
		dataType : "text",
		data : myId,
		success : function(data) {
			$("#resArticle").html(data);
		},
		error : function(res) {
			$("#resArticle").html(res);
			// alert("ERROR " + res.statusText);
		}

	});
}

function modifyArticle(myId, autor, description, oid) {
	var myUrl = "http://localhost:8080/SecureApiRest/SSD/modifyArticleJs/" + myId;
	console.log(myUrl);
	$.ajax({
		type : "PUT",
		url : myUrl,
		headers : {
			"autor" : autor,
			"description" : description,
			"oid" : oid
		},
		dataType : "text",
		data : myId,
		success : function(data) {
			$("#resArticle").html(data);
		},
		error : function(res) {
			$("#resArticle").html(res);
			// alert("ERROR " + res.statusText);
		}

	});
}

// JWT
var mytoken = "";
function getJWT(username, password) {
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/SecureApiRest/SSD/authenticateJWT",
		headers : {
			"username" : username,
			"password" : password
		},
		dataType : "text",
		success : function(dat) {
			mytoken = dat;
			$("#resJWT").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}

function testJWT(mytoken) {
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/SSD/testJWT",
		// contentType: "text/plain",
		headers : {
			"token" : mytoken
		},
		contentType : "text/plain",
		dataType : "text",
		success : function(dat) {
			$("#resJWT").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}

//apiKey
var myapikey = "";
function getApiKey(username, password) {
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/SSD/apikeyJs",
		headers : {
			"username" : username,
			"password" : password
		},
		dataType : "text",
		success : function(dat) {
			myapikey = dat;
			$("#resApiKey").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}

function testApiKey(username, password, apikey) {
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/SSD/testApikey",
		headers : {
			"username" : username,
			"password" : password,
			"apikey" : apikey
		},
		dataType : "text",
		success : function(dat) {
			$("#resApiKey").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}
