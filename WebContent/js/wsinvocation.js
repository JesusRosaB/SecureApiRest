var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
var regexUsername = /^(?=.{4,20}$)[a-z0-9]{0,1}([a-z0-9._-][a-z0-9]+)*[a-z0-9.-_]{0,1}$/i;
var regexApiKey = /^[a-z0-9]{8}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{12}$/i;

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
	if(regexUsername.test(username)){
	} else
		alert("El nombre de usuario es incorrecto, por favor, introduzca un nombre de usuario valido");
	if(regexPassword.test(password)){
	} else 
	    alert("La contrasena debe contener Minimo 8 caracteres, Maximo 15, Al menos una letra mayuscula, " +
	    		"Al menos una letra minuscula, Al menos un digito, No espacios en blanco, Al menos 1 caracter especial"); 
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
	if(regexUsername.test(username)){
	} else
		alert("El nombre de usuario es incorrecto, por favor, introduzca un nombre de usuario valido");
	if(regexPassword.test(password)){
	} else 
	    alert("La contrasena debe contener Minimo 8 caracteres, Maximo 15, Al menos una letra mayuscula, " +
	    		"Al menos una letra minuscula, Al menos un digito, No espacios en blanco, Al menos 1 caracter especial");
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
	if(regexUsername.test(username)){
	} else
		alert("El nombre de usuario es incorrecto, por favor, introduzca un nombre de usuario valido");
	if(regexPassword.test(password)){
	} else 
	    alert("La contrasena debe contener Minimo 8 caracteres, Maximo 15, Al menos una letra mayuscula, " +
	    		"Al menos una letra minuscula, Al menos un digito, No espacios en blanco, Al menos 1 caracter especial");
	if(regexApiKey.test(apikey)){
	} else
		alert("La ApiKey introducida es incorrecta, por favor, introduzca una ApiKey valida");
	
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

//JWE
var mytoken = "";
function getJWE(username, password) {
	if(regexUsername.test(username)){
	} else
		alert("El nombre de usuario es incorrecto, por favor, introduzca un nombre de usuario valido");
	if(regexPassword.test(password)){
	} else 
	    alert("La contrasena debe contener Minimo 8 caracteres, Maximo 15, Al menos una letra mayuscula, " +
	    		"Al menos una letra minuscula, Al menos un digito, No espacios en blanco, Al menos 1 caracter especial");
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/SSD/authenticateJWE",
		headers : {
			"username" : username,
			"password" : password
		},
		dataType : "text",
		success : function(dat) {
			mytoken = dat;
			$("#resJWE").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}

function testJWE(mytoken) {
	$.ajax({
		type : "POST",
		url : "http://localhost:8080/SecureApiRest/SSD/testJWE",
		// contentType: "text/plain",
		headers : {
			"token" : mytoken
		},
		contentType : "text/plain",
		dataType : "text",
		success : function(dat) {
			$("#resJWE").html(dat);
		},
		error : function(res) {
			alert("ERROR " + res.statusText);
		}
	});
}
