package com.spring.dto;

import java.util.List;

import lombok.Data;

@Data
public class LoginResponse {
    private String jwtToken;
    private String email;
    private String name;
    private List<String> roles;

    public LoginResponse(String email, String name, List<String> roles, String jwtToken) {
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.jwtToken = jwtToken;
    }
}


