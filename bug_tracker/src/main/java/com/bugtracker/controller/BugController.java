package com.bugtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Status;
import com.bugtracker.model.Bug;
import com.bugtracker.service.BugService;

@RestController
public class BugController {
	@Autowired
	private BugService bs;
	
	@PostMapping("/bug")
	public Bug addBug(@RequestBody Bug bug) {
		return bs.addBug(bug);
	}
	
	@GetMapping("/bugs")
	public List<Bug> getAllBugs(){
		return bs.getAllBugs();
	}
	
	@GetMapping("/bug/{id}")
	public Bug getBugById(@PathVariable("id") Long Id) {
		return bs.getBugById(Id);
	}
	
	@PutMapping("/bug/{id}")
	public Bug updateBug(@PathVariable("id") Long Id,@RequestBody Bug newBug) {
		return bs.updateBug(Id, newBug);
	}
	
	@DeleteMapping("bug/{id}")
	public String deleteBug(@PathVariable("id") Long Id){
		return bs.deleteBug(Id);
	}
	
	@PutMapping("bug/assign/{id}/{uid}")
	public Bug assignedUser(@PathVariable("id") Long Id, @PathVariable("uid") Long uid ) {
		return bs.assignedUser(Id,uid) ;
		
	}
	
	@GetMapping("bug/status")
	public List<Bug> getBugByStatus(@RequestParam("status") Status status){
		return bs.getBugByStatus(status);
		
	}
	
	@GetMapping("bug/priority")
	public List<Bug> getBugByPriority(@RequestParam("priority") Priority priority){
		return bs.getBugByPriority(priority);
		
	}
}
