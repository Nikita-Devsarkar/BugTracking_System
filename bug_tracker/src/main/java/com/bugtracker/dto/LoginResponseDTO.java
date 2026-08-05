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


public class LoginResponseDTO {
	private String message;
    private Long userId;
    private String name;
    private Role role;
}
