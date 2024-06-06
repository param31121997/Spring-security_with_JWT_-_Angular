package com.spring.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.dto.LoginRequest;
import com.spring.dto.LoginResponse;
import com.spring.entities.Customer;
import com.spring.repository.CustomerRepository;
import com.spring.services.jwt.CustomerServiceImpl;
import com.spring.utils.JwtUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
    private AuthenticationManager authenticationManager;

	@Autowired
    private CustomerServiceImpl customerService;

    private final JwtUtil jwtUtils;
    
    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
    public LoginController(AuthenticationManager authenticationManager, CustomerServiceImpl customerService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.jwtUtils = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws IOException {
    	Authentication authentication;
        try {
        	
        	authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        }catch (AuthenticationException exception) {
        	 Map<String, Object> map = new HashMap<>();
             map.put("message", "Bad credentials");
             map.put("status", false);
             return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateToken(userDetails.getUsername());
        List<String> roles = new ArrayList<>();
        if(userDetails.getUsername().equals("ramwankhede1997@gmail.com")) {
        	roles.add("ROLE_ADMIN");
        }
        else {
        	 roles = userDetails.getAuthorities().stream()
                     .map(item -> item.getAuthority())
                     .collect(Collectors.toList());
        }
         Customer customer =  customerRepository.findByEmail(userDetails.getUsername());
        LoginResponse response = new LoginResponse(userDetails.getUsername(), customer.getName(), roles, jwtToken);

        return ResponseEntity.ok(response);
    }
    
}
