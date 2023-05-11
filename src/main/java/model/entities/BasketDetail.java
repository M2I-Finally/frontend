package model.entities;

public class BasketDetail {
	private int id;
	private Product product;
	private float quantity;
	private float discount;
	
	public BasketDetail() {
		
	}
	
	public BasketDetail(int id, Product product, float quantity, float discount) {
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.discount = discount;
	}
	
	public BasketDetail(Product product, float quantity, float discount) {
		this.product = product;
		this.quantity = quantity;
		this.discount = discount;
	}
	
	public int getId() {
		return id;
	}

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
