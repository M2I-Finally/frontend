package controller;

import model.dto.PaymentDto;
import service.PaymentService;

public class PaymentController {
	
	private PaymentService service = new PaymentService();
	
	

	public PaymentController() {
		
		
	}

	public PaymentService getService() {
		return service;
	}

	public void setService(PaymentService service) {
		this.service = service;
	}
	
	
	
	public void create(PaymentDto dto) {
		service.createPayment(dto);
	}
	
	public PaymentDto read() {
		PaymentDto dto = new PaymentDto();
		
		return dto;
	}

}
