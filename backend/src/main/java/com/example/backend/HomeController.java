package com.example.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api")
public class HomeController {


        @GetMapping("/login")
        public String i2() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            boolean hasUserRole = authentication.getAuthorities().stream()
                    .anyMatch(r -> r.getAuthority().equals("ROLE_ADMINS"));
            if(!hasUserRole)
                return "user" ;
            else
                return "admin";
    }



}