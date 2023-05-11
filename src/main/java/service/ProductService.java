package service;

import java.util.ArrayList;

import model.dto.ProductDto;
import model.entities.Product;
import repository.ProductRepository;

public class ProductService {

	ProductRepository productRepository = new ProductRepository();
	
	public Product getProductById(int productId) {
		return productRepository.findById(productId);
	}
	
	public ArrayList<Product> getEveryProducts() {
		return productRepository.findAll();
	}
	
	public void createProduct(Product product) {
		productRepository.insert(null);
	}
	
	public void updateProduct(Product product) {
		productRepository.update(null);
	}
	
	public void deleteProduct(int productId) {
		productRepository.deleteById(productId);
	}
	
	
}
