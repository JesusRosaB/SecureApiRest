var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
var regexUsername = /^(?=.{4,20}$)[a-z0-9]{0,1}([a-z0-9._-][a-z0-9]+)*[a-z0-9.-_]{0,1}$/i;
var regexApiKey = /^[a-z0-9]{8}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{4}[-][a-z0-9]{12}$/i;
var regexToken = /^[a-zA-Z0-9-_.]{550,570}$/i;
var regexAutor = /^[a-zA-Z0-9]{5,50}$/i;
var regexDescription = /^[a-zA-Z0-9]{10,500}$/i;
var regexOID = /^[\s\S]{5,50}$/i;
var regexArticleId = /^[a-zA-Z0-9]{2,20}$/i;

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
	if(regexArticleId.test(myId)){
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
	} else
		alert("El id del articulo no tiene un formato correcto, por favor, introduzca un id de articulo valido");
}

function deleteArticle(myId) {
	if(regexArticleId.test(myId)){
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
	} else
		alert("El id del articulo no tiene un formato correcto, por favor, introduzca un id de articulo valido");
}

function createArticle(myId, autor, description, oid) {
	if(regexArticleId.test(myId)){
	} else
		alert("El id del articulo no tiene un formato correcto, por favor, introduzca un id de articulo valido");
	if(regexAutor.test(autor)){
	} else
		alert("El autor no tiene un formato correcto, por favor, introduzca un autor valido");
	if(regexDescription.test(description)){
	} else
		alert("La descripcion no tiene un formato correcto, por favor, introduzca una descripcion valida");
	if(regexOID.test(oid)){
	} else
		alert("El OID del articulo no tiene un formato correcto, por favor, introduzca un OID de articulo valido");
	
	if (regexArticleId.test(myId) && regexAutor.test(autor)
			&& regexDescription.test(description) && regexOID.test(oid)) {
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
	} else {
		alert("No se puede crear el articulo, existe algun error, por favor revise todos los campos");
	}
}

function modifyArticle(myId, autor, description, oid) {
	if(regexArticleId.test(myId)){
	} else
		alert("El id del articulo no tiene un formato correcto, por favor, introduzca un id de articulo valido");
	if(regexAutor.test(autor)){
	} else
		alert("El autor no tiene un formato correcto, por favor, introduzca un autor valido");
	if(regexDescription.test(description)){
	} else
		alert("La descripcion no tiene un formato correcto, por favor, introduzca una descripcion valida");
	if(regexOID.test(oid)){
	} else
		alert("El OID del articulo no tiene un formato correcto, por favor, introduzca un OID de articulo valido");
	
	if (regexArticleId.test(myId) && regexAutor.test(autor)
			&& regexDescription.test(description) && regexOID.test(oid)) {
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
	} else {
		alert("No se puede modificar el articulo, existe algun error, por favor revise todos los campos");
	}
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
	
	if (regexUsername.test(username) && regexPassword.test(password)) {
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
	} else {
		alert("No se puede obtener el token, existe algun error, por favor revise todos los campos");
	}
}

function testJWT(mytoken) {
	if(regexToken.test(mytoken)){
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
	} else
		alert("El Token de usuario es incorrecto, por favor, introduzca un token de usuario valido");
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
	
	if (regexUsername.test(username) && regexPassword.test(password)) {
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
	} else {
		alert("No se puede obtener la ApiKey, existe algun error, por favor revise todos los campos");
	}
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
	
	if (regexUsername.test(username) && regexPassword.test(password) && regexApiKey.test(apikey)) {
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
	} else {
		alert("No se puede comprobar el usuario, existe algun error, por favor revise todos los campos");
	}
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
	
	if (regexUsername.test(username) && regexPassword.test(password)) {
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
	} else {
		alert("No se puede obtener el token, existe algun error, por favor revise todos los campos");
	}
}

function testJWE(mytoken) {
	if(regexToken.test(mytoken)){
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
	} else
		alert("El Token de usuario es incorrecto, por favor, introduzca un token de usuario valido");
}
