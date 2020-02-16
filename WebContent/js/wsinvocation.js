function getHello() {
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/SecureApiRest/hello",
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
		url : "http://localhost:8080/SecureApiRest/hello",
	});
	req.done(function(data) {
		$("#resGetHello").html(data);
	});
	req.fail(function(res) {
		alert("ERROR" + res.statusText);
	});

}

function getArticleId(myId) {
	var myUrl = "http://localhost:8080/SecureApiRest/getArticle/" + myId;
	$.ajax({
		type : "GET",
		url : myUrl,
		dataType : "text",
		data : myId,
		success : function(data) {
			$("#resGetHello").html(data);
		},
		error : function(res) {
			$("#resGetHello").html(res);
			// alert("ERROR " + res.statusText);
		}

	});
}

// JWT
var mytoken = "";
function getJWT() {
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/SecureApiRest/authenticateJWT",
		headers : {
			"username" : "restUser",
			"password" : "restUser"
		},
		dataType : "json",
		success : function(dat) {
			mytoken = dat;
			$("#resGetHello").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}

function testJWT() {
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/testJWT",
		// contentType: "text/plain",
		headers : {
			"token" : mytoken
		},
		contentType : "text/plain",
		dataType : "text",
		data : "Lupe",
		success : function(dat) {
			$("#resGetHello").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}
