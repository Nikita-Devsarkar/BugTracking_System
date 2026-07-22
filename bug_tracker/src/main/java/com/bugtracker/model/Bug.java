package com.bugtracker.model;

import java.time.LocalDateTime;
import java.util.Optional;

import com.bugtracker.enums.Priority;
import com.bugtracker.enums.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Bug {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long Id;
	@NotBlank
	private String title;
	@NotBlank
	private String description;
	@Enumerated(EnumType.STRING)
	@NotNull
	private Priority priority;
	@Enumerated(EnumType.STRING)
	@NotNull
	private Status status;
	private LocalDateTime createdAt;
	@ManyToOne
	private User assignedUser;
	
	@PrePersist
	public void onCreate() {
	   this.createdAt = LocalDateTime.now();
	}

}
