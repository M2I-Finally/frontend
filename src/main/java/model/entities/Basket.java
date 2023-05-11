package model.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

public class Basket {
	private int id;
	private float discount;
	private LocalDate createdAt;
	private Staff staff;
	private List<BasketDetail> basketDetails = new ArrayList<BasketDetail>();

	public Basket() {
		
	}
	
	public Basket(float discount, LocalDate createdAt, Staff staff, List<BasketDetail> basketDetails) {
		this.discount = discount;
		this.createdAt = createdAt;
		this.staff = staff;
		this.basketDetails = basketDetails;
	}
	
	public Basket(int id, float discount, LocalDate createdAt, Staff staff, List<BasketDetail> basketDetails) {
		this.id = id;
		this.discount = discount;
		this.createdAt = createdAt;
		this.staff = staff;
		this.basketDetails = basketDetails;
	}
	
	public int getId() {
		return id;
	}
	
	public float getDiscount() {
		return discount;
	}
	
	public void setDiscount(float discount) {
		this.discount = discount;
	}
	
	public LocalDate getCreatedAt() {
		return createdAt;
	}
	
	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
	
	public Staff getStaff() {
		return staff;
	}
	
	public void setStaff(Staff staff) {
		this.staff = staff;
	}
	
	public List<BasketDetail> getBasketDetails() {
		return basketDetails;
	}

	public void setBasketDetails(List<BasketDetail> basketDetails) {
		this.basketDetails = basketDetails;
	}
}
