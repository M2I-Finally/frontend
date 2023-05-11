package repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import model.PaymentType;
import model.entities.Basket;
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
		
		System.out.println("ajout réalisé");
	}

	public Payment selectById(int id) {
		Payment payment = new Payment();
		
		
		
		String query = "SELECT * FROM payment WHERE basket_id = ?";
		
		try {
			
			PreparedStatement pstmt = DBManager.getInstance().preparedStatement(query);
			
			
			pstmt.setInt(1, id);
			
			
			ResultSet rs = pstmt.executeQuery();
			
			if (rs.next()) {
				
				int basketId = rs.getInt("basket_id");
				Timestamp date = rs.getTimestamp("created_at");
				float Amount = rs.getFloat("amount");
				PaymentType type = PaymentType.valueOf(rs.getString("type"));
				
								
				Basket basket = new Basket(basketId, id, null, null, null);
				payment.setBasket(basket);
				payment.setAmount(rs.getFloat("amount"));
				payment.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
				System.out.println(type);
				payment.setType(type);
			}
			
			
						
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			
			DBManager.getInstance().close();
		}
		
		System.out.println(payment.getType());
		
		return payment;
	}

}
