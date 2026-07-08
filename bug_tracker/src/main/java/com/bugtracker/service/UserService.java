package com.bugtracker.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.model.LoginDTO;
import com.bugtracker.model.User;
import com.bugtracker.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;
 
	
	public User addUser(User user) {		
		return ur.save(user);
	}


	public LoginDTO login(String email,String password) {
		Optional<User> user = ur.findByEmail(email);
		
		if(user.isPresent()) {
			User myData = user.get();
			if(myData.getPassword().equals(password)){
				LoginDTO check = new LoginDTO();
				
				check.setMessage("Login Successful");
				check.setRole(myData.getRole());
				
				return check;
			}else {
				throw new RuntimeException("Wrong Password!");
			}
		}else {
			throw new RuntimeException("User Not Found");
		}
		
	}

}
