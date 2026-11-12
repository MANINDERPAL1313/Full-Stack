package com.example.social.model;
import jakarta.persistence.*;
@Entity @Table(name="app_users")
public class AppUser {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 private String name;
 @Column(unique=true, nullable=false) private String email;
 @Column(nullable=false) private String password;
 @Column(nullable=false) private String role="USER";
 protected AppUser() {}
 public AppUser(String name,String email,String password,String role){this.name=name;this.email=email;this.password=password;this.role=role;}
 public Long getId(){return id;} public String getName(){return name;} public String getEmail(){return email;} public String getPassword(){return password;} public String getRole(){return role;}
}
