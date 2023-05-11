package model.dto;

public class StaffDto {
	private String name;
	private String password;
	private String passwordConfirm;
	private String role;
	private boolean status;
	
	public StaffDto() {}

	public StaffDto(String name, String password, String passwordConfirm, String role, boolean status) {
		this.name = name;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
		this.role = role;
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
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
	};
	
	
}
