package com.spring.services;

import java.util.Collections;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.dto.SignupRequest;
import com.spring.entities.Customer;
import com.spring.entities.Role;
import com.spring.repository.CustomerRepository;

@Service
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Customer createCustomer(SignupRequest signupRequest) {
    	boolean isAvailable = customerRepository.existsByEmail(signupRequest.getEmail());
    	 Customer customer = new Customer();
        //Check if customer already exist
        if (isAvailable) {
        	return null;
        }
        BeanUtils.copyProperties(signupRequest,customer);

        //Hash the password before saving
        String hashPassword = passwordEncoder.encode(signupRequest.getPassword());
        customer.setPassword(hashPassword);
        customer.setRoles(Collections.singleton(Role.ROLE_USER));
        Customer createdCustomer = customerRepository.save(customer);
        customer.setId(createdCustomer.getId());
        return customer;
    }
}
