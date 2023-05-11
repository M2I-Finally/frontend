package model.dto;

import model.entities.Product;

public class BasketDetailDto {
	private Product product;
	private float quantity;
	private float discount;
	
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	public float getQuantity() {
		return quantity;
	}
	
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public float getDiscount() {
		return discount;
	}
	
	public void setDiscount(float discount) {
		this.discount = discount;
	}	
}
