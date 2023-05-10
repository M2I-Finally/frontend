package model.entities;

import java.time.LocalDate;

import model.PaiementType;

public class Payment {
	
	private int id;
	private float amount;
	private PaiementType type;
	private LocalDate createdAt;
	private Basket basket;

	public Payment() {
		
	}


	public Payment(float amount, PaiementType type, LocalDate createdAt, Basket basket) {
		super();
		this.amount = amount;
		this.type = type;
		this.createdAt = createdAt;
		this.basket = basket;
	}


	public Payment(int id, float amount, PaiementType type, LocalDate createdAt, Basket basket) {
		super();
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


	public PaiementType getType() {
		return type;
	}


	public void setType(PaiementType type) {
		this.type = type;
	}


	public LocalDate getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(LocalDate createdAt) {
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
