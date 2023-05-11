package model.dto;

import java.time.LocalDate;

public class ProductDto {
	
	private String name;
	private String description;
	private Double price;
	private Double tax;
	private String picture;
	private Boolean status;

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public Double getTax() {
		return tax;
	}
	
	public void setTax(Double tax) {
		this.tax = tax;
	}
	
	public String getPicture() {
		return picture;
	}
	
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	public Boolean getStatus() {
		return status;
	}
	
	public void setStatus(Boolean status) {
		this.status = status;
	}
	
}
