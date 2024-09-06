package com.encora.codesynthesis.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow requests to all endpoints
                .allowedOrigins("http://localhost:8081") // Allowed origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed methods
                .allowedHeaders("*"); // Allowed headers
    }
}
