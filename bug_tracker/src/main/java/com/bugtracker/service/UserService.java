package com.bugtracker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.dto.LoginRequestDTO;
import com.bugtracker.dto.LoginResponseDTO;
import com.bugtracker.dto.UserDTO;
import com.bugtracker.enums.Role;
import com.bugtracker.model.LoginDTO;
import com.bugtracker.model.User;
import com.bugtracker.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;
 
	
	public UserDTO addUser(User user) {	
		User savedUser = ur.save(user);
		return convertToDTO(savedUser);
	}


	public LoginResponseDTO login(LoginRequestDTO dto) {
		Optional<User> user = ur.findByEmail(dto.getEmail());
		
		if(user.isPresent()) {
			User myData = user.get();
			if(myData.getPassword().equals(dto.getPassword())){
				LoginResponseDTO response = new LoginResponseDTO();
				
				response.setMessage("Login Successful");
				response.setRole(myData.getRole());
				response.setName(myData.getName());
				response.setUserId(myData.getId());
				
				return response;
			}else {
				throw new RuntimeException("Wrong Password!");
			}
		}else {
			throw new RuntimeException("User Not Found");
		}
		
	}


	public List<UserDTO> getUsers(Role role) {
		List<UserDTO> dtoList = new ArrayList<UserDTO>();
		
		List<User> users = ur.findByRole(role);
		
			for(User user: users) {
				dtoList.add(convertToDTO(user));
			}
			return dtoList;	
		
	}

	public List<UserDTO> getAllDevelopers() {
		List<UserDTO> dtoList = new ArrayList<UserDTO>();
		List<User> users = ur.findByRole(Role.DEVELOPER);
		
		for(User user: users) {
			dtoList.add(convertToDTO(user));
		}
		return dtoList;	
	}


	private UserDTO convertToDTO(User user) {
	    UserDTO dto = new UserDTO();

	    dto.setId(user.getId());
	    dto.setName(user.getName());
	    dto.setEmail(user.getEmail());
	    dto.setRole(user.getRole());
	    dto.setCreatedAt(user.getCreatedAt());

	    return dto;
	}

}
