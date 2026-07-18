package com.bugtracker.dto;

import java.time.LocalDateTime;

import com.bugtracker.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {
	private Long id;
	private String name;
	private String email;
	private Role role;
	private LocalDateTime createdAt;
}
