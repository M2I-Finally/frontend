package repository;

import java.util.ArrayList;

import model.entities.BasketDetail;

public class BasketDetailRepository {
	
	public void insert(BasketDetail basketDetail) {
		//insert the basketDetail in argument in the DB
	}
	
	public ArrayList<BasketDetail> findAll() {
		//return all the basketDetails in the DB
		ArrayList<BasketDetail> basketDetailList= new ArrayList<BasketDetail>();
		return basketDetailList;
	}
	public BasketDetail findById(int id) {
		return new BasketDetail();		
	}
	
	public void update(BasketDetail basketDetail) {
		//update the basketDetail in argument in the DB
	}
	
	public void delete(int basketDetailId) {
		//remove the basketDetail with the id in argument from the DB
	}
}
