package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.backend.controllers.EmailController;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
@EnableJpaRepositories("com.example.backend.repository.jpa")
@EnableElasticsearchRepositories("com.example.backend.repository.elasticsearch")
@EnableSwagger2
public class BackendApplication {

	@Autowired
	private EmailController mailController;

	@CrossOrigin(origins = "http://localhost:3000")
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


}