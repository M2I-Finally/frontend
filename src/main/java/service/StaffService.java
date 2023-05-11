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
		
		throw new Exception("Product ID is null");
	}
}
