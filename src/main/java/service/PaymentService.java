package service;

import java.time.LocalDateTime;

import model.dto.PaymentDto;
import model.entities.Basket;
import model.entities.Payment;
import repository.PaymentRepository;

public class PaymentService {
	
	private PaymentRepository repository = new PaymentRepository();
	
	public void createPayment( PaymentDto paymentDto ) {
		//Basket basket = basketServices.getBasket();
		Basket basket = new Basket(paymentDto.getBasketId(), 0, null, null, null);
		Payment payment = new Payment();
		LocalDateTime date = LocalDateTime.now();
		payment.setAmount(paymentDto.getAmount());
		payment.setType(paymentDto.getPaymentType());
		payment.setBasket(basket);
		payment.setCreatedAt(date);
		
		repository.insert(payment);
	}

	public PaymentDto readPayment(int id) {
		
		PaymentDto dto = new PaymentDto();
		Payment payment = new Payment();
		
		payment = repository.selectById(id);
		dto.setAmount(payment.getAmount());
		dto.setPaymentType(payment.getType());
		dto.setBasketId(id);
		
		return dto;
	}
	

}
