package model.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import model.PaymentType;


public class Payment {
	
	private int id;
	private float amount;
	private PaymentType type;
	private LocalDateTime createdAt;
	private Basket basket;

	public Payment() {
		
	}


	public Payment(float amount, PaymentType type, LocalDateTime createdAt, Basket basket) {
		
		this.amount = amount;
		this.type = type;
		this.createdAt = createdAt;
		this.basket = basket;
	}


	public Payment(int id, float amount, PaymentType type, LocalDateTime createdAt, Basket basket) {
		
		this.id = id;
		this.amount = amount;
		this.type = type;
		this.createdAt = createdAt;
		this.basket = basket;
	}
	
	public float getAmount() {
		return amount;
	}


	public void setAmount(float amount) {
		this.amount = amount;
	}


	public PaymentType getType() {
		return type;
	}


	public void setType(PaymentType type) {
		this.type = type;
	}


	public LocalDateTime getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


	public Basket getBasket() {
		return basket;
	}


	public void setBasket(Basket basket) {
		this.basket = basket;
	}


	public int getId() {
		return id;
	}

	
	
}
