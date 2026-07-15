package com.bugtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.enums.Role;
import com.bugtracker.model.LoginDTO;
import com.bugtracker.model.User;
import com.bugtracker.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService us;
	
	@PostMapping("/add-user")
	public User addUser(@RequestBody User user) {
		return us.addUser(user);
	}
	
	@GetMapping("/users")
	public List<User> getUsers(@RequestParam Role role){
		return us.getUsers(role);
	}
	
	@PostMapping("/login")
	public LoginDTO login(@RequestParam("email") String email,@RequestParam("password") String password) {
		return us.login(email, password);
	}
}
