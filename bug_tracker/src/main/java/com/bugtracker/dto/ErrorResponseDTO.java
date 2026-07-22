package com.bugtracker.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ErrorResponseDTO {
	private LocalDateTime timestamp;
	private int status;
	private String message;
}
