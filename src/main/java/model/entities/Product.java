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
}
