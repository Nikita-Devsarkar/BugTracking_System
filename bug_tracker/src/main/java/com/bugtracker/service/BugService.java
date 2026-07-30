package com.bugtracker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.dto.BugDTO;
import com.bugtracker.dto.CreateBugDTO;
import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Role;
import com.bugtracker.enums.Status;
import com.bugtracker.model.Bug;
import com.bugtracker.model.User;
import com.bugtracker.repository.BugRepository;
import com.bugtracker.repository.UserRepository;

@Service
public class BugService {
	@Autowired
	private BugRepository br;
	
	@Autowired
	private UserRepository ur;

	public BugDTO addBug(CreateBugDTO dto) {
		System.out.println(dto.getCreatedById());
		System.out.println(dto.getTitle());
		System.out.println(dto.getDescription());
		System.out.println(dto.getPriority());

	    Bug bug = new Bug();

	    bug.setTitle(dto.getTitle());
	    bug.setDescription(dto.getDescription());
	    bug.setPriority(dto.getPriority());

	    bug.setStatus(Status.OPEN);

	    Optional<User> optionalUser = ur.findById(dto.getCreatedById());

	    if(optionalUser.isPresent()) {

	        bug.setCreatedBy(optionalUser.get());

	        Bug savedBug = br.save(bug);

	        return convertToDTO(savedBug);

	    } else {

	        throw new RuntimeException("User Not Found!");

	    }
	}

	public List<BugDTO> getAllBugs() {
		List<BugDTO> dtolist = new ArrayList<BugDTO>();
		List<Bug> allbug  = br.findAll();
		
		for(Bug bug : allbug) {
			dtolist.add(convertToDTO(bug));
		}
		
		return dtolist;
	}

	public BugDTO getBugById(Long Id) {
		Optional<Bug> optionalbug = br.findById(Id);
		
		if(optionalbug.isPresent()) {
			return convertToDTO(optionalbug.get());
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
		
	}

	public BugDTO updateBug(Long id, Bug newBug) {
		Optional<Bug> optionalbug = br.findById(id);
		
		if(optionalbug.isPresent()) {
			Bug oldBug = optionalbug.get();
			
			if(newBug.getTitle() != null) {
				oldBug.setTitle(newBug.getTitle());
			}
		    if(newBug.getDescription()!= null) {
		    	oldBug.setDescription(newBug.getDescription());
		    }
		    if(newBug.getPriority()!= null) {
		    	oldBug.setPriority(newBug.getPriority());
		    }
		    if(newBug.getStatus()!= null) {
		    	oldBug.setStatus(newBug.getStatus());
		    }
			
		    Bug savedbug = br.save(oldBug);
		    
			return convertToDTO(savedbug);
			
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
	}

	public String deleteBug(Long id) {
		Optional<Bug> optionalbug = br.findById(id);
		
		if(optionalbug.isPresent()) {
			Bug allBug = optionalbug.get();
			br.deleteById(allBug.getId());
			
			return "Bug Deleted Successfully!";
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
		
		
	}

	public BugDTO assignedUser(Long id, Long uid) {
		Optional<Bug> optionalbug = br.findById(id); 
		
		if(optionalbug.isPresent()) {
			Bug allBug = optionalbug.get();
			
			Optional<User> optionaluser = ur.findById(uid);
			
			if(optionaluser.isPresent()){
				User myData = optionaluser.get(); 
				if (myData.getRole() != Role.DEVELOPER) {
				    throw new RuntimeException("Bug can only be assigned to a Developer");
				}
				
				allBug.setAssignedUser(myData);
				
				Bug assignedbug = br.save(allBug);
				
				return convertToDTO(assignedbug);	
			}else {
				throw new RuntimeException("User Not Found!");
			}
			
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
		
	}

	public List<BugDTO> getBugByStatus(Status status) {	
		List<BugDTO> dtostatus = new ArrayList<BugDTO>();
		
		List<Bug> allbug  = br.findByStatus(status);
		
		for(Bug bug : allbug) {
			dtostatus.add(convertToDTO(bug));
		}
		
		return dtostatus;
	}

	public List<BugDTO> getBugByPriority(Priority priority) {
		List<BugDTO> dtopriority = new ArrayList<BugDTO>();
		
		List<Bug> allbug  = br.findByPriority(priority);
		
		for(Bug bug : allbug) {
			dtopriority.add(convertToDTO(bug));
		}

		
		return dtopriority;
	}

	public List<BugDTO> getBugByDeveloper(Long id) {
		List<BugDTO> dtoList = new ArrayList<BugDTO>();
		Optional<User> optionalUser = ur.findById(id);
		
		if(optionalUser.isPresent()) {
			User user = optionalUser.get();
			
			if (user.getRole() != Role.DEVELOPER) {
			    throw new RuntimeException("User is not a Developer");
			}
			
			List<Bug> assignedBugs = br.findByAssignedUser(user);
			
			for (Bug bug : assignedBugs) {
			    dtoList.add(convertToDTO(bug));
			}
			
			return dtoList;
		}else {
			throw new RuntimeException("User Not Found!");
		}
	}
	
	public List<BugDTO> getBugByTester(Long id) {
	    List<BugDTO> dtoList = new ArrayList<>();
	    Optional<User> optionalUser = ur.findById(id);

	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();
	        
	        if (user.getRole() != Role.TESTER) {
	            throw new RuntimeException("User is not a Tester");
	        }

	        List<Bug> bugs = br.findByCreatedBy(user);

	        for (Bug bug : bugs) {
	            dtoList.add(convertToDTO(bug));
	        }
	        return dtoList;
	    } else {
	        throw new RuntimeException("User Not Found!");
	    }
	}
	
	private BugDTO convertToDTO(Bug bug) {
		BugDTO dto = new BugDTO();
		
		dto.setId(bug.getId());
		dto.setTitle(bug.getTitle());
		dto.setDescription(bug.getDescription());
		dto.setPriority(bug.getPriority());
		dto.setStatus(bug.getStatus());
		dto.setCreatedAt(bug.getCreatedAt());
		
		if (bug.getCreatedBy() != null) {
		    dto.setCreatedById(bug.getCreatedBy().getId());
		    dto.setCreatedByName(bug.getCreatedBy().getName());
		}
		
		if(bug.getAssignedUser() != null) {
			dto.setAssignedUserId(bug.getAssignedUser().getId());
			dto.setAssignedUserName(bug.getAssignedUser().getName());
		}
		
		
		return dto;
		
	}

}
