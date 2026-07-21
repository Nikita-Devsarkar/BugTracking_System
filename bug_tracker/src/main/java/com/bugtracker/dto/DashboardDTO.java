package com.bugtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DashboardDTO {
	private Long totalUsers;
	private Long totalDevelopers;
	private Long totalBugs;
	private Long openBugs;
	private Long inProgressBugs;
	private Long resolvedBugs;
	private Long closedBugs;
	private Long highPriorityBugs;
	private Long MediumPriorityBugs;
	private Long CriticalPriorityBugs;
	private Long LowPriorityBugs;
}
