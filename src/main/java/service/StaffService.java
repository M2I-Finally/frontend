package service;

import model.dto.StaffDto;
import repository.StaffRepository;

public class StaffService {
	private StaffRepository repository = new StaffRepository();
	
	public void creatStaff(StaffDto staffDto) {
		//Staff staff = map (staffDto, Staff.class)
		
		repository.insert(staff);
		
	}
	
	
}
