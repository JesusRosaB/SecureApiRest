package uca.secureapirest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;
import org.jose4j.jwe.ContentEncryptionAlgorithmIdentifiers;
import org.jose4j.jwe.JsonWebEncryption;
import org.jose4j.jwe.KeyManagementAlgorithmIdentifiers;
import org.jose4j.jwk.JsonWebKey;
import org.jose4j.jwk.JsonWebKey.Factory;
import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.jwt.consumer.JwtConsumer;
import org.jose4j.jwt.consumer.JwtConsumerBuilder;
import org.jose4j.lang.JoseException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;

import uca.secureapirest.User;
import uca.secureapirest.Article;

@Path("/")
public class SecureApiRest {

	static Logger logger = Logger.getLogger(SecureApiRest.class);
	// JWT
	static JsonWebKey myJwk = null;

	private static Map<String, Article> myMap = new HashMap<>();
	static {
		Article myArticle = new Article();

		myArticle.setOid("0000-0000-0001");
		myArticle.setAutor("Jesus Rosa Bilbao");
		myArticle.setDescription("Articulo 1");
		myMap.put("art1", myArticle);

		Article myArticle2 = new Article();

		myArticle2.setOid("0000-0000-0002");
		myArticle2.setAutor("Alberto Gil Diaz");
		myArticle2.setDescription("Articulo 2");
		myMap.put("art2", myArticle2);

		myArticle.setOid("0000-0000-0003");
		myArticle.setAutor("Jesus Rosa");
		myArticle.setDescription("Articulo 3");
		myMap.put("art3", myArticle);

		myArticle.setOid("0000-0000-0004");
		myArticle.setAutor("Alberto Gil");
		myArticle.setDescription("Articulo 4");
		myMap.put("art4", myArticle);

		myArticle.setOid("0000-0000-0005");
		myArticle.setAutor("Jesus");
		myArticle.setDescription("Articulo 5");
		myMap.put("art5", myArticle);

		myArticle.setOid("0000-0000-0006");
		myArticle.setAutor("Alberto");
		myArticle.setDescription("Articulo 6");
		myMap.put("art6", myArticle);
	}

	@Path("/hello")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello this is work";
	}

	@GET
	@Path("/articleJSON")
	@Produces({ "application/json" })
	public Article getArticle_JSON() {
		Article oneArticle = new Article();
		oneArticle.setAutor("Jesus Rosa Bilbao");
		oneArticle.setDescription("article 1");
		oneArticle.setOid("1532-5236-6521");
		return oneArticle;
	}

	@POST
	@Path("/myArticleForm")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Article articleToText(@FormParam("autor") String myAutor, @FormParam("description") String myDescription,
			@FormParam("oid") String myOid) {
		Article myArticle = new Article();
		myArticle.setAutor(myAutor);
		myArticle.setDescription(myDescription);
		myArticle.setOid(myOid);
		return myArticle;
	}

	@POST
	@Path("/myArticleFormJs/{article}")
	@Produces(MediaType.TEXT_PLAIN)
	public String articleToTextJs(@PathParam("article") String key, @HeaderParam("autor") String myAutor,
			@HeaderParam("description") String myDescription, @HeaderParam("oid") String myOid) {

		if (myMap.get(key) == null) {
			Article myArticle = new Article();
			myArticle.setAutor(myAutor);
			myArticle.setDescription(myDescription);
			myArticle.setOid(myOid);
			myMap.put(key, myArticle);
			return "Congratulations the article " + key + " has been successfully registered";
		} else {
			return "An article with the key " + key + " already exist";
		}
	}

	@PUT
	@Path("/modifyArticleJs/{article}")
	@Produces(MediaType.TEXT_PLAIN)
	public String modifyArticleJs(@PathParam("article") String key, @HeaderParam("autor") String myAutor,
			@HeaderParam("description") String myDescription, @HeaderParam("oid") String myOid) {
		if (myMap.get(key) != null) {
			Article myArticle = new Article();
			myArticle.setAutor(myAutor);
			myArticle.setDescription(myDescription);
			myArticle.setOid(myOid);
			myMap.put(key, myArticle);
			return "Congratulations the article " + key + " has been successfully modified";
		} else {
			return "An article with the key " + key + " does not exist";
		}
	}

	@PUT
	@Path("/modifyArticle/{article}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String modifyArticle(@PathParam("article") String key, Article myArticle) {
		myMap.put(key, myArticle);
		return "Article modified";
	}

	@DELETE
	@Path("/deleteArticle/{article}")
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteImportantDate(@PathParam("article") String key) {
		if (myMap.get(key) == null) {
			return "Article " + key + " does not exist!";
		} else {
			myMap.remove(key);
			return "Article " + key + " deleted!";
		}
	}

	@GET
	@Path("/getArticle/{article}")
	@Produces({ "application/json" })
	public Response getArticleStatus(@PathParam("article") String key) {
		if (myMap.get(key) == null) {
			logger.info("error " + Status.NOT_FOUND.getStatusCode());
			return Response.status(Status.NOT_FOUND.getStatusCode())
					.entity((String) "The article " + key + " does not exist").build();
		} else {
			logger.info("ok " + Status.ACCEPTED.getStatusCode());
			return Response.status(Status.ACCEPTED.getStatusCode()).entity((String) getArticle(key)).build();
		}
	}

	@Produces({ "application/json" })
	public String getArticle(@PathParam("article") String key) {
		Article myArticle = myMap.get(key);
		return key + " is:\n" + "Oid: " + myArticle.getOid() + "\n" + "Autor: " + myArticle.getAutor() + "\n"
				+ "Description: " + myArticle.getDescription();
	}

	// JWT -----
	@Path("/authenticateJWT")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public Response authenticateCredentials(@HeaderParam("username") String username,
			@HeaderParam("password") String password)
			throws JsonGenerationException, JsonMappingException, IOException {
		User user = new User();
		user.setUser(username);
		user.setPassword(password);
		RsaJsonWebKey jwk = null;
		try {
			jwk = RsaJwkGenerator.generateJwk(2048);
			jwk.setKeyId("1");
			myJwk = jwk;
		} catch (JoseException e) {
			e.printStackTrace();
		}
		JwtClaims claims = new JwtClaims();
		claims.setIssuer("uca");
		claims.setExpirationTimeMinutesInTheFuture(10);
		claims.setGeneratedJwtId();
		claims.setIssuedAtToNow();
		claims.setNotBeforeMinutesInThePast(2);
		claims.setSubject(user.getUser());
		claims.setStringListClaim("roles", "basicRestUser");
		JsonWebSignature jws = new JsonWebSignature();
		jws.setPayload(claims.toJson());
		jws.setKeyIdHeaderValue(jwk.getKeyId());
		jws.setKey(jwk.getPrivateKey());
		jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.RSA_USING_SHA256);
		String jwt = null;
		try {
			jwt = jws.getCompactSerialization();
		} catch (JoseException e) {
			System.out.println(e);
		}
		user.setApikey(jwt); // SET TOKEN
		return Response.status(Status.ACCEPTED.getStatusCode()).entity(jwt).build();
	}

	@POST
	@Path("/testJWT")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public Response testJWT(@HeaderParam("token") String token)
			throws JsonGenerationException, JsonMappingException, IOException {

		JsonWebKey jwk = myJwk;
		// Validate Token's authenticity and check claims
		JwtConsumer jwtConsumer = new JwtConsumerBuilder().setRequireExpirationTime().setAllowedClockSkewInSeconds(30)
				.setRequireSubject().setExpectedIssuer("uca").setVerificationKey(jwk.getKey()).build();

		try {
			// Validate the JWT and process it to the Claims
			JwtClaims jwtClaims = jwtConsumer.processToClaims(token);
			System.out.println("JWT validation succeeded! " + jwtClaims);
		} catch (InvalidJwtException e) {
			return Response.status(Status.FORBIDDEN.getStatusCode()).entity("Forbidden").build();
		}
		String sayHello = "Your token is correct";
		return Response.status(200).entity(sayHello).build();
	}

	private static Map<String, User> myUsersMap = new HashMap<>();
	static {
		User myUsers = new User();
		myUsers.setUser("user1");
		myUsers.setPassword("user1pass");
		myUsers.setApikey("2264d43c-b152-48a0-96b5-c535aa9ee64a");

		myUsersMap.put("user1", myUsers);

		myUsers.setUser("user2");
		myUsers.setPassword("user2pass");
		myUsers.setApikey("45cc0a9d-dad2-458b-bfb7-94401a72a214");

		myUsersMap.put("user2", myUsers);

		myUsers.setUser("user3");
		myUsers.setPassword("user3pass");
		myUsers.setApikey("14b05119-b255-464a-95c1-2c75bf54eb9d");

		myUsersMap.put("user3", myUsers);

		myUsers.setUser("user4");
		myUsers.setPassword("user4pass");
		myUsers.setApikey("06441cc9-d8bb-4686-b2eb-38fc737eb81d");

		myUsersMap.put("user4", myUsers);
	}

	@POST
	@Path("/apikey")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String getApiKey(User myUser) {
		if ((myUsersMap.get(myUser.getUser()).getUser()) == null) {
			UUID apikey = UUID.randomUUID();
			User newUser = new User();
			newUser.setUser(myUser.getUser());
			newUser.setPassword(myUser.getPassword());
			newUser.setApikey(apikey.toString());
			myUsersMap.put(newUser.getUser(), newUser);
			return apikey.toString();
		} else {
			return null;
		}
	}

	@POST
	@Path("/apikeyJs")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String getApiKeyJs(@HeaderParam("username") String username, @HeaderParam("password") String password) {
		if (username != null) {
			UUID apikey = UUID.randomUUID();
			User newUser = new User();
			newUser.setUser(username);
			newUser.setPassword(password);
			newUser.setApikey(apikey.toString());
			myUsersMap.put(newUser.getUser(), newUser);
			return apikey.toString();
		} else {
			return null;
		}
	}

	@POST
	@Path("/testApikey")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String testing(@HeaderParam("username") String username, @HeaderParam("password") String password,
			@HeaderParam("apikey") String apikey) {
		if (username != null) {
			if (apikey != null) {
				return "GRANTED";
			}
		}
		return "Denied";
	}

	static JsonWebKey jwKey = null;
	static {
		// Setting up Direct Symmetric Encryption and Decryption
		String jwkJson = "{\"kty\":\"oct\",\"k\":\"9d6722d6-b45c-4dcb-bd73-2e057c44eb93-928390\"}";
		try {
			new JsonWebKey.Factory();
			jwKey = Factory.newJwk(jwkJson);
		} catch (JoseException e) {
			e.printStackTrace();
		}
	}

	@Path("/authenticateJWE")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateCredentialsJWE(@HeaderParam("username") String username,
			@HeaderParam("password") String password)
			throws JsonGenerationException, JsonMappingException, IOException {
		User user = new User();
		user.setUser(username);
		user.setPassword(password);
		JwtClaims claims = new JwtClaims();
		claims.setIssuer("uca");
		claims.setExpirationTimeMinutesInTheFuture(10);
		claims.setGeneratedJwtId();
		claims.setIssuedAtToNow();
		claims.setNotBeforeMinutesInThePast(2);
		claims.setSubject(user.getUser());
		claims.setStringListClaim("roles", "admin");
		JsonWebSignature jws = new JsonWebSignature();
		jws.setPayload(claims.toJson());
		jws.setKeyIdHeaderValue(jwKey.getKeyId());
		jws.setKey(jwKey.getKey());
		jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256);
		String jwt = null;
		try {
			jwt = jws.getCompactSerialization();
		} catch (JoseException e) {
			e.printStackTrace();
		}
		JsonWebEncryption jwe = new JsonWebEncryption();
		jwe.setAlgorithmHeaderValue(KeyManagementAlgorithmIdentifiers.DIRECT);
		jwe.setEncryptionMethodHeaderParameter(ContentEncryptionAlgorithmIdentifiers.AES_128_CBC_HMAC_SHA_256);
		jwe.setKey(jwKey.getKey());
		jwe.setKeyIdHeaderValue(jwKey.getKeyId());
		jwe.setContentTypeHeaderValue("JWT");
		jwe.setPayload(jwt);
		String jweSerialization = null;
		try {
			jweSerialization = jwe.getCompactSerialization();
		} catch (JoseException e) {
			e.printStackTrace();
		}
		return Response.status(200).entity(jweSerialization).build();
	}

	@POST
	@Path("/testJWE")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public Response testJWE(@HeaderParam("token") String token)
			throws JsonGenerationException, JsonMappingException, IOException {
		JwtConsumer jwtConsumer = new JwtConsumerBuilder().setRequireExpirationTime().setAllowedClockSkewInSeconds(30)
				.setRequireSubject().setExpectedIssuer("uca").setDecryptionKey(jwKey.getKey())
				.setVerificationKey(jwKey.getKey()).build();
		try {
			// Validate the JWT and process it to the Claims
			JwtClaims jwtClaims = jwtConsumer.processToClaims(token);
			System.out.println("JWE validation succeeded! " + jwtClaims);
		} catch (InvalidJwtException e) {
			System.out.println("JWE is Invalid: " + e);
			return Response.status(Status.FORBIDDEN.getStatusCode()).entity("Forbidden").build();
		}
		String sayHello = "Your token is correct";
		return Response.status(200).entity(sayHello).build();
	}

}
