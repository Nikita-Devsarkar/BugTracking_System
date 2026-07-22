package com.bugtracker.model;

import java.time.LocalDateTime;
import java.util.List;

import com.bugtracker.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Email;
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
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Name is required")
	private String name;
	@Column(unique = true, nullable = false)
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid Email")
	private String email;
	@NotBlank(message = "Password is required")
	private String password;
	@Enumerated(EnumType.STRING)
	@NotNull
	private Role role;
	private LocalDateTime createdAt;
	@JsonIgnore
	@OneToMany(mappedBy = "assignedUser")
	private List<Bug> bugs;
	
	 @PrePersist
	  public void onCreate() {
	      this.createdAt = LocalDateTime.now();
	  }
	 
}
