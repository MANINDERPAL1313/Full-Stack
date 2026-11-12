package com.example.social.controller;
import com.example.social.dto.LoginRequest;import com.example.social.service.AuthService;import jakarta.validation.Valid;import org.springframework.web.bind.annotation.*;import java.util.Map;
@RestController @RequestMapping("/api/auth") public class AuthController{private final AuthService auth;public AuthController(AuthService a){auth=a;}@PostMapping("/login") public Map<String,Object> login(@Valid @RequestBody LoginRequest r){return auth.login(r.email(),r.password());}}
