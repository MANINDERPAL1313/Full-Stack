package com.example.social.config;
import org.springframework.http.*;import org.springframework.web.bind.MethodArgumentNotValidException;import org.springframework.web.bind.annotation.*;import java.util.Map;
@RestControllerAdvice public class ApiExceptionHandler{
 @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<Map<String,String>> badRequest(IllegalArgumentException e){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error",e.getMessage()));}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,String>> invalid(MethodArgumentNotValidException e){return ResponseEntity.badRequest().body(Map.of("error","Request validation failed"));}
}
