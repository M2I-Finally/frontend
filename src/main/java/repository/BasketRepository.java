package repository;

import java.util.ArrayList;

import model.entities.Basket;

public class BasketRepository {
	
	public void insert(Basket basket) {
		//insert the basket in argument in the DB
	}
	
	public ArrayList<Basket> findAll() {
		//return all the baskets in the DB
		ArrayList<Basket> basketList= new ArrayList<Basket>();
		return basketList;
	}
	public Basket findById(int id) {
		return new Basket();		
	}
	
	public void update(Basket basket) {
		//update the basket in argument in the DB
	}
	
	public void delete(Basket basket) {
		//remove the basket in argument from the DB
	}
}
