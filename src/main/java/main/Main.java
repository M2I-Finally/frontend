package main;

import controller.PaymentController;
import model.PaymentType;
import model.dto.PaymentDto;
import model.entities.Basket;

public class Main {

	public static void main(String[] args) {
		
		Basket basket = new Basket(1, 0, null, null);
		
		PaymentDto dto = new PaymentDto(5f, PaymentType.CASH, basket);
		
		PaymentController controller = new PaymentController();
		
		controller.create(dto);
	}
}
