package uca.secureapirest;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import uca.secureapirest.Article;

@Path("/hello")
public class SecureApiRest {

	private static Map<String, Article> myMap = new HashMap<>();
	static {
		Article myArticle = new Article();

		myArticle.setOid("0000-0000-0001");
		myArticle.setAutor("Jesus Rosa Bilbao");
		myArticle.setDescription("Articulo 1");
		myMap.put("art1", myArticle);

		myArticle.setOid("0000-0000-0002");
		myArticle.setAutor("Alberto Gil Diaz");
		myArticle.setDescription("Articulo 2");
		myMap.put("art2", myArticle);

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
		myMap.remove(key);
		return "Article " + key + " deleted!";
	}

	@GET
	@Path("/getArticle/{article}")
	@Produces({ "application/json" })
	public String getImportantDate(@PathParam("article") String key) {
		Article myArticle = myMap.get(key);
		return key + " is:\n" + "Oid: " + myArticle.getOid() + "\n" + "Autor: " + 
				myArticle.getAutor() + "\n"+ "Description: " + myArticle.getDescription();
	}

}
