package model.dto;

import java.util.ArrayList;
import java.util.List;

import model.entities.BasketDetail;

public class BasketDto {
	private List<BasketDetail> basketDetails = new ArrayList<BasketDetail>();
	private float discount;
	
	public List<BasketDetail> getBasketDetails() {
		return basketDetails;
	}
	
	public void setBasketDetails(List<BasketDetail> basketDetails) {
		this.basketDetails = basketDetails;
	}
	
	public float getDiscount() {
		return discount;
	}
	
	public void setDiscount(float discount) {
		this.discount = discount;
	}
}
