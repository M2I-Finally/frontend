package repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.entities.Payment;
import repository.jdbc.DBManager;

public class PaymentRepository {
	
	public Payment findById(int id) {
		
		Payment payment = new Payment();
				
		return payment;
	}
	
	public Payment findByName(String name) {
		
		Payment payment = new Payment();
		
		return payment;
	}

	public void insert(Payment payment) {
		
		String query = "INSERT INTO payment( amount, type, created_at, basket_id ) VALUES ( ?, ?, ?, ? )";
		
		try {
			
			PreparedStatement pstmt = DBManager.getInstance().preparedStatement(query);
			
			pstmt.setFloat(1, payment.getAmount());
			pstmt.setString(2, payment.getType().name());
			pstmt.setObject(3, payment.getCreatedAt());
			pstmt.setInt(4, payment.getBasket().getId());
			
			pstmt.execute();
			
						
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			DBManager.getInstance().close();
		}
		
		System.out.println("ajout r�alis�");
	}

	public Payment selectById(int id) {
		Payment payment = new Payment();
		
		String query = "SELECT * FROM payment WHERE payment_id = ?";
		
		try {
			
			PreparedStatement pstmt = DBManager.getInstance().preparedStatement(query);
			
			
			pstmt.setInt(1, payment.getBasket().getId());
			
			ResultSet rs = pstmt.executeQuery();
			
			
						
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			DBManager.getInstance().close();
		}
		
		
		return payment;
	}

}
