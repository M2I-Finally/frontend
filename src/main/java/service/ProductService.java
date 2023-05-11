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
	
	public void createProduct(ProductDto productDto) {
		productRepository.insert(null);
	}
	
	public void updateProduct(ProductDto productDto) {
		productRepository.update(null);
	}
	
	public void deleteProduct(int productId) {
		productRepository.deleteById(productId);
	}
	
	
}
