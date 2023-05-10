package model.entities;

import java.time.LocalDate;

public class Basket {
	private int id;
	private float discount;
	private LocalDate createdAt;
	private Staff staff;
	
	public Basket() {
		
	}
	
	public Basket(float discount, LocalDate createdAt, Staff staff) {
		this.discount = discount;
		this.createdAt = createdAt;
		this.staff = staff;
	}
	
	public Basket(int id, float discount, LocalDate createdAt, Staff staff) {
		this.id = id;
		this.discount = discount;
		this.createdAt = createdAt;
		this.staff = staff;
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
}
