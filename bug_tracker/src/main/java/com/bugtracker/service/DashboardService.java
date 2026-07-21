package com.bugtracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.dto.DashboardDTO;
import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Role;
import com.bugtracker.enums.Status;
import com.bugtracker.repository.BugRepository;
import com.bugtracker.repository.UserRepository;

@Service
public class DashboardService {
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private BugRepository br;
	
	public DashboardDTO getDashboard() {
		DashboardDTO dto = new DashboardDTO();
		
		dto.setTotalUsers(ur.count());
		dto.setTotalBugs(br.count());
		dto.setTotalDevelopers(ur.countByRole(Role.DEVELOPER));
		dto.setOpenBugs(br.countByStatus(Status.OPEN));
		dto.setInProgressBugs(br.countByStatus(Status.IN_PROGRESS));
		dto.setResolvedBugs(br.countByStatus(Status.RESOLVED));
		dto.setClosedBugs(br.countByStatus(Status.CLOSED));
		dto.setHighPriorityBugs(br.countByPriority(Priority.HIGH));
		dto.setMediumPriorityBugs(br.countByPriority(Priority.MEDIUM));
		dto.setCriticalPriorityBugs(br.countByPriority(Priority.CRITICAL));
		dto.setLowPriorityBugs(br.countByPriority(Priority.LOW));
		
		
		return dto;
		
	}
}
