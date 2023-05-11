package model.dto;

import model.PaymentType;
import model.entities.Basket;


public class PaymentDto {
	
	private float amount;
	private PaymentType paymentType;
	private Basket basket;
	
	public PaymentDto(float amount, PaymentType paymentType, Basket basket) {
		
		this.amount = amount;
		this.paymentType = paymentType;
		this.basket = basket;
	}
	
	public PaymentDto() {
		
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public Basket getBasket() {
		return basket;
	}

	public void setBasket(Basket basket) {
		this.basket = basket;
	}
		
	
	

}
