package uca.secureapirest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Article {

	private String autor;
	private String description;
	private String oid;

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}
	
}
