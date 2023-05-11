package model.dto;

import model.PaymentType;


public class PaymentDto {
	
	private float amount;
	private PaymentType paymentType;
	private int basketId;
	
	public PaymentDto(float amount, PaymentType paymentType, int basketId) {
		
		this.amount = amount;
		this.paymentType = paymentType;
		this.basketId = basketId;
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

	public int getBasketId() {
		return basketId;
	}

	public void setBasketId(int basketId) {
		this.basketId = basketId;
	}
	
	

}
