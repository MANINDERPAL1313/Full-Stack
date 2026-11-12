package com.example.social;

import com.example.social.model.AppUser;
import com.example.social.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SocialApplication {
  public static void main(String[] args) { SpringApplication.run(SocialApplication.class, args); }
  @Bean CommandLineRunner seedDemoUser(UserRepository users, PasswordEncoder encoder) {
    return args -> { if (users.findByEmail("demo@example.com").isEmpty()) users.save(new AppUser("Demo User", "demo@example.com", encoder.encode("Password123!"), "USER")); };
  }
}
