package com.spring.services.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.entities.Customer;
import com.spring.repository.CustomerRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class CustomerServiceImpl implements UserDetailsService {

//    private final CustomerRepository customerRepository;

    @Autowired
    private  CustomerRepository customerRepository; 
//        this.customerRepository = ;
    

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Write logic to fetch customer from DB
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Customer not found with email: " + email));
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        if (customer != null) {
        	
        	customer.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role.name()));
            });
        }
        return new User(customer.getEmail(), customer.getPassword(), authorities);
    }
}
