package com.bugtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.dto.LoginRequestDTO;
import com.bugtracker.dto.LoginResponseDTO;
import com.bugtracker.dto.UserDTO;
import com.bugtracker.enums.Role;
import com.bugtracker.model.LoginDTO;
import com.bugtracker.model.User;
import com.bugtracker.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
	@Autowired
	private UserService us;
	
	@PostMapping("/add-user")
	public UserDTO addUser(@RequestBody User user) {
		return us.addUser(user);
	}
	
	@GetMapping("/users")
	public List<UserDTO> getUsers(@RequestParam Role role){
		return us.getUsers(role);
	}
	
	@PostMapping("/login")
	public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
		return us.login(dto);
	}
	
	@GetMapping("/user/developers")
	public List<UserDTO> getAllDevelopers(){
		return us.getAllDevelopers();
	}
	
	
}
