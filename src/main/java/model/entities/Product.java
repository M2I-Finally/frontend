package model.entities;

import java.time.LocalDate;

public class Product {

	// Primary key
	private Integer id;
	
	private String name;
	private String description;
	private Double price;
	private Double tax;
	private String picture;
	private Boolean status;
	private Double stock;
	private String createdBy;
	private String updatedBy;
	private LocalDate createdAt;
	private LocalDate updatedAt;
	
	// Foreign key for categories
	private Integer categoryId;
	
	public Product() {
		
	}
	
	public Product(Integer id, String name, String description, Double price, Double tax, String picture,
			Boolean status, Double stock, String createdBy, String updatedBy, LocalDate createdAt, LocalDate updatedAt,
			Integer categoryId) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.tax = tax;
		this.picture = picture;
		this.status = status;
		this.stock = stock;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.categoryId = categoryId;
	}
	
	public Product(String name, String description, Double price, Double tax, String picture,
			Boolean status, Double stock, String createdBy, String updatedBy, LocalDate createdAt, LocalDate updatedAt,
			Integer categoryId) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.tax = tax;
		this.picture = picture;
		this.status = status;
		this.stock = stock;
		this.createdBy = createdBy;
		this.updatedBy = updatedBy;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.categoryId = categoryId;
	}

	/**
	 * 
	 * GETTERS AND SETTERS
	 * 
	 */
	
	public Integer getId() {
		return id;
	}

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

	public Double getStock() {
		return stock;
	}

	public void setStock(Double stock) {
		this.stock = stock;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	
	
}
