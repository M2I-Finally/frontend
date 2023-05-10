package model.entities;

import java.time.LocalDate;

public class Basket {
	private int id;
	private float discount;
	private LocalDate created_at;
	private Staff staff;
	
	public Basket() {
		
	}
	
	public Basket(float discount, LocalDate created_at, Staff staff) {
		this.discount = discount;
		this.created_at = created_at;
		this.staff = staff;
	}
	
	public Basket(int id, float discount, LocalDate created_at, Staff staff) {
		this.id = id;
		this.discount = discount;
		this.created_at = created_at;
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
	
	public LocalDate getCreated_at() {
		return created_at;
	}
	
	public void setCreated_at(LocalDate created_at) {
		this.created_at = created_at;
	}
	
	public Staff getStaff() {
		return staff;
	}
	
	public void setStaff(Staff staff) {
		this.staff = staff;
	}
}
