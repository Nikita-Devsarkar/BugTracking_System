package com.bugtracker.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
    	
    	if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String email = null;
        String role = null;

        // Check Authorization header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            try {
                email = jwtService.extractEmail(token);
                role = jwtService.extractRole(token);
                
                System.out.println("JWT EMAIL: " + email);
                System.out.println("JWT ROLE: " + role);
            } catch (Exception e) {
                System.out.println("Invalid JWT Token");
            }
        }

        if (email != null
                && SecurityContextHolder.getContext().getAuthentication() == null
                && jwtService.isTokenValid(token)) {

        	System.out.println("AUTHORITY: ROLE_" + role);
        	
        	UsernamePasswordAuthenticationToken authentication =
        	        new UsernamePasswordAuthenticationToken(
        	                email,
        	                null,
        	                java.util.List.of(
        	                        new SimpleGrantedAuthority("ROLE_" + role)
        	                )
        	        );

        	System.out.println("SPRING AUTHORITY = "
        	        + authentication.getAuthorities());

        	authentication.setDetails(
        	        new WebAuthenticationDetailsSource()
        	                .buildDetails(request)
        	);

        	SecurityContextHolder.getContext()
        	        .setAuthentication(authentication);
        	
        	System.out.println(
                    "AUTHENTICATION SET: "
                    + SecurityContextHolder
                        .getContext()
                        .getAuthentication()
            );
        }

        filterChain.doFilter(request, response);
    }
}