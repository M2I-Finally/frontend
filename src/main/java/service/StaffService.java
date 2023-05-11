package service;

import model.dto.StaffDto;
import model.entities.Staff;
import repository.StaffRepository;

public class StaffService {
	private StaffRepository repository = new StaffRepository();
	
	public void createStaff(StaffDto staffDto) {
		//Staff staff = map (staffDto, Staff.class)
		
		repository.insert(staff);
		
	}
	
	public Staff getStaffById(Integer staffId ) {
		if(staffId != null) {
			return staffRepository.findById(staffId);
		}
		
		throw new Exception("Staff ID is null");
	}
	
	public Staff getStaffByName(String name) {
		return staffRepository.findByName(name);
	}
	
	public void insert(Staff staff) {
		return staffRepository.save(staff);
	}
	
	public void deleteById(Integer staffId) {
		return staffRepository.deleteById(staffId);
	}
}
