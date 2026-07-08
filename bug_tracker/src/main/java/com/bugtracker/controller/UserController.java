package com.bugtracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	
	@PostMapping("/login")
	public LoginDTO login(@RequestParam("email") String email,@RequestParam("password") String password) {
		return us.login(email, password);
	}
}
