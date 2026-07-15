package com.bugtracker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public Bug addBug(Bug bug) {
		return br.save(bug);
	}

	public List<Bug> getAllBugs() {
		return br.findAll();
	}

	public Bug getBugById(Long Id) {
		Optional<Bug> optionalbug = br.findById(Id);
		
		if(optionalbug.isPresent()) {
			return optionalbug.get();
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
		
	}

	public Bug updateBug(Long id, Bug newBug) {
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
			
			return br.save(oldBug);
			
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

	public Bug assignedUser(Long id, Long uid) {
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
			
				return br.save(allBug);	
			}else {
				throw new RuntimeException("User Not Found!");
			}
			
		}else {
			throw new RuntimeException("Bug Not Found!");
		}
		
	}

	public List<Bug> getBugByStatus(Status status) {	
		  return br.findByStatus(status);
	}

	public List<Bug> getBugByPriority(Priority priority) {
		return br.findByPriority(priority);
	}

}
