package model.entities;

import java.time.LocalDate;

public class Staff {
	private int id;
	private String username;
	private String password;
	private String passwordTrial;
	private String role;
	private boolean status;
	private LocalDate createdAt;
	private LocalDate updateAt;
	
	//default constructor
	public Staff(){};
	
	//constructor w/o id
	public Staff(String username, String password, String passwordTrial, String role, boolean status,
			LocalDate createdAt, LocalDate updateAt) {
		this.username = username;
		this.password = password;
		this.passwordTrial = passwordTrial;
		this.role = role;
		this.status = status;
		this.createdAt = createdAt;
		this.updateAt = updateAt;
	}

	//constructor w/ id
	public Staff(int id, String userName, String password, String passwordTrial, String role, boolean status,
			LocalDate createdAt, LocalDate updateAt) {
		super();
		this.id = id;
		this.username = userName;
		this.password = password;
		this.passwordTrial = passwordTrial;
		this.role = role;
		this.status = status;
		this.createdAt = createdAt;
		this.updateAt = updateAt;
	}

	/*
	 * getters & setters (no id setter)
	 */
	public int getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordTrial() {
		return passwordTrial;
	}

	public void setPasswordTrial(String passwordTrial) {
		this.passwordTrial = passwordTrial;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdateAt() {
		return updateAt;
	}

	public void setUpdateAt(LocalDate updateAt) {
		this.updateAt = updateAt;
	};
	
	
	
}
