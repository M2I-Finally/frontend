package service;

import java.util.ArrayList;

import model.dto.BasketDto;
import model.entities.Basket;
import repository.BasketRepository;

public class BasketService {
	BasketRepository basketRepository = new BasketRepository();
	
	public Basket getBasketById(Integer basketId) throws Exception {
		
		if( basketId != null ) {
			return basketRepository.findById(basketId);
		}
		
		throw new Exception("Basket ID is null");
	}
	
	public ArrayList<Basket> getBasketDetails() {
		return basketRepository.findAll();
	}
	
	public void createBasket(BasketDto basketDto) {
		Basket basket = new Basket(); // Mapping de BasketDto vers Basket
		basketRepository.insert(basket);
	}
	
	public void updateBasket(Integer basketId, Basket basketDto) throws Exception {
		if( basketId != null && basketRepository.findById(basketId) != null ) {
			Basket basket = new Basket(); // Mapping de BasketDto vers Basket
			basketRepository.update(basket);
		}
		
		throw new Exception("Basket ID is incorrect or doesn't exist");
	}
	
	public void deleteBasket(Integer basketId, Basket basket) throws Exception {
		if( basketId != null ) {
			basketRepository.delete(basket);
		}
		
		throw new Exception("Basket ID is incorrect");
	}
}
