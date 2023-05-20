package service;

import java.time.LocalDate;

import model.dto.StaffDto;
import model.entities.Product;
import model.entities.Staff;
import repository.StaffRepository;

public class StaffService {
	private StaffRepository staffRepository = new StaffRepository();
	
	public void createStaff(StaffDto staffDto) {
		//Staff staff = map (staffDto, Staff.class)
		
		staffRepository.insert(staff);
		
	}
	
	//find a staff by id
	public Staff getStaffById(Integer staffId ) throws Exception  {
		if(staffId != null) {
			return staffRepository.findById(staffId);
		}
		
		throw new Exception("Staff ID is null");
	}
	
	//find a staff by name
	public Staff getStaffByName(String name) {
		return staffRepository.findByName(name);
	}
	
	//insert new staff
	public void insert(Integer staffId, Staff staffDto) throws Exception {
		if (staffId != null && staffRepository.findById(staffId) != null) {
			Staff staff = new Staff();
			staffRepository.insert(staff);
		}
		
		throw new Exception("Product ID is incorrect or doesn't exist");
		
	}
	
	//update staff
	public void update(Integer staffId, Staff staffDto) throws Exception {
		if (staffId != null && staffRepository.findById(staffId) != null) {
			Staff staff = new Staff();
			staff.setUpdateAt(LocalDate.now());
			staff.setUpdatedBy("USER");
			staffRepository.update(staffId);
		}
		
		throw new Exception("Product ID is incorrect or doesn't exist");
	}
	
	//delete staff
	public void deleteById(Integer staffId) {
		if(staffId != null) {
			return staffRepository.deleteById(staffId);
		}
		throw new Exception("Product ID is incorrect");
	}
}
