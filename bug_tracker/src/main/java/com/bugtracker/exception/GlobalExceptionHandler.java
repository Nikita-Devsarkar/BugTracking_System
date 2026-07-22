package com.bugtracker.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bugtracker.dto.ErrorResponseDTO;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException ex){

        ErrorResponseDTO dto = new ErrorResponseDTO();
        
        dto.setTimestamp(LocalDateTime.now());
        dto.setStatus(HttpStatus.NOT_FOUND.value());
        dto.setMessage(ex.getMessage());
        
        return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);      
    }
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponseDTO> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
		
		 ErrorResponseDTO dto = new ErrorResponseDTO();
		 
		 dto.setTimestamp(LocalDateTime.now());
	     dto.setStatus(HttpStatus.BAD_REQUEST.value());
		 dto.setMessage(ex.getBindingResult().getFieldError().getDefaultMessage());
		
		 return new ResponseEntity<>(dto,HttpStatus.BAD_REQUEST);
		
		
	}
}
