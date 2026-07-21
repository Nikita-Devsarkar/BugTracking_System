package com.bugtracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.dto.DashboardDTO;
import com.bugtracker.service.DashboardService;

@RestController
public class DashboardController {
	@Autowired
	private DashboardService ds;
	
	@GetMapping("/dashboard")
	public DashboardDTO getDashboard(){
		return ds.getDashboard();
	}
}
