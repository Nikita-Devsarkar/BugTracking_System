package com.bugtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.dto.BugDTO;
import com.bugtracker.dto.CreateBugDTO;
import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Status;
import com.bugtracker.model.Bug;
import com.bugtracker.service.BugService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BugController {
	@Autowired
	private BugService bs;
	
	@PostMapping("/bug")
	public BugDTO addBug(@RequestBody CreateBugDTO dto) {
		return bs.addBug(dto);
	}
	
	@GetMapping("/bugs")
	public List<BugDTO> getAllBugs(){
		return bs.getAllBugs();
	}
	
	@GetMapping("/bug/{id}")
	public BugDTO getBugById(@PathVariable("id") Long Id) {
		return bs.getBugById(Id);
	}
	
	@PutMapping("/bug/{id}")
	public BugDTO updateBug(@PathVariable("id") Long Id,@RequestBody Bug newBug) {
		return bs.updateBug(Id, newBug);
	}
	
	@DeleteMapping("bug/{id}")
	public String deleteBug(@PathVariable("id") Long Id){
		return bs.deleteBug(Id);
	}
	
	@PutMapping("bug/assign/{id}/{uid}")
	public BugDTO assignedUser(@PathVariable("id") Long Id, @PathVariable("uid") Long uid ) {
		return bs.assignedUser(Id,uid) ;
		
	}
	
	@GetMapping("bug/status")
	public List<BugDTO> getBugByStatus(@RequestParam("status") Status status){
		return bs.getBugByStatus(status);
		
	}
	
	@GetMapping("bug/priority")
	public List<BugDTO> getBugByPriority(@RequestParam("priority") Priority priority){
		return bs.getBugByPriority(priority);
		
	}
	
	@GetMapping("bug/developer/{id}")
	public List<BugDTO> getBugByDeveloper(@PathVariable("id") Long Id){
		return bs.getBugByDeveloper(Id);
	}
	
	@GetMapping("bug/tester/{id}")
	public List<BugDTO> getBugByTester(@PathVariable("id") Long id) {
	    return bs.getBugByTester(id);
	}
	
}
