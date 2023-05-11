package service;

import java.time.LocalDate;

import model.dto.PaymentDto;
import model.entities.Payment;
import repository.PaymentRepository;

public class PaymentService {
	
	private PaymentRepository repository = new PaymentRepository();
	
	public void createPayment( PaymentDto paymentDto ) {
		Payment payment = new Payment();
		LocalDate date = LocalDate.now();
		payment.setAmount(paymentDto.getAmount());
		payment.setType(paymentDto.getPaymentType());
		payment.setBasket(paymentDto.getBasket());
		payment.setCreatedAt(date);
		
		repository.insert(payment);
	}

	public PaymentDto readPayment(int id) {
		
		PaymentDto dto = new PaymentDto();
		Payment payment = new Payment();
		
		payment = repository.selectById(id);
		
		return dto;
	}
	

}
