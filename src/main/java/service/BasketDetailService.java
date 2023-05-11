package service;

import java.util.ArrayList;

import model.dto.BasketDetailDto;
import model.entities.BasketDetail;
import repository.BasketDetailRepository;

public class BasketDetailService {
	BasketDetailRepository basketDetailRepository = new BasketDetailRepository();
	
	public BasketDetail getBasketDetailById(Integer basketDetailId) throws Exception {
		
		if( basketDetailId != null ) {
			return basketDetailRepository.findById(basketDetailId);
		}
		
		throw new Exception("Basket Detail ID is null");
	}
	
	public ArrayList<BasketDetail> getBasketDetails() {
		return basketDetailRepository.findAll();
	}
	
	public void createBasketDetail(BasketDetailDto basketDetailDto) {
		BasketDetail basketDetail = new BasketDetail(); // Mapping de BasketDetailDto vers BasketDetail
		basketDetailRepository.insert(basketDetail);
	}
	
	public void updateBasketDetail(Integer basketDetailId, BasketDetail basketDetailDto) throws Exception {
		if( basketDetailId != null && basketDetailRepository.findById(basketDetailId) != null ) {
			BasketDetail basketDetail = new BasketDetail(); // Mapping de BasketDetailDto vers BasketDetail
			basketDetailRepository.update(basketDetail);
		}
		
		throw new Exception("Basket Detail ID is incorrect or doesn't exist");
	}
	
	public void deleteBasketDetail(Integer basketDetailId) throws Exception {
		if( basketDetailId != null ) {
			basketDetailRepository.delete(basketDetailId);
		}
		
		throw new Exception("Basket Detail ID is incorrect");
	}
}
