package com.bugtracker.dto;

import java.time.LocalDateTime; 
import java.time.LocalDate;

import com.bugtracker.enums.Category;
import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class BugDTO {
	private Long id;
	private String title;
	private String description;
	private Priority priority;
	private Status status;
	private Category category;
	private LocalDate dueDate;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Long createdById;
	private String createdByName;
	private Long assignedUserId;
	private String assignedUserName;
}
