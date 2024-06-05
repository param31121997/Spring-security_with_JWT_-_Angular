package com.spring.services;

import com.spring.dto.SignupRequest;
import com.spring.entities.Customer;

public interface AuthService {
    Customer createCustomer(SignupRequest signupRequest);
}
