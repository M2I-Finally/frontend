package service;

import java.time.LocalDate;
import java.util.ArrayList;

import model.dto.ProductDto;
import model.entities.Product;
import repository.ProductRepository;

public class ProductService {

	ProductRepository productRepository = new ProductRepository();
	
	public Product getProductById(Integer productId) throws Exception {
		
		if(productId != null) {
			return productRepository.findById(productId);
		}
		
		throw new Exception("Product ID is null");
	}
	
	public ArrayList<Product> getProducts() {
		return productRepository.findAll();
	}
	
	public void createProduct(ProductDto productDto) {
		Product product = new Product(); // Mapping de ProductDto vers Product
		product.setCreatedAt(LocalDate.now());
		product.setCreatedBy("USER");
		productRepository.save(product);
	}
	
	public void updateProduct(Integer productId, Product productDto) throws Exception {
		if(productId != null && productRepository.findById(productId) != null) {
			Product product = new Product(); // Mapping de ProductDto vers Product
			product.setUpdatedAt(LocalDate.now());
			product.setUpdatedBy("USER");
			productRepository.update(product);
		}
		
		throw new Exception("Product ID is incorrect or doesn't exist");
	}
	
	public void deleteProduct(Integer productId) throws Exception {
		if(productId != null) {
			productRepository.deleteById(productId);
		}
		
		throw new Exception("Product ID is incorrect");
	}
	
	
}
