package com.example.social.config;
import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys; import javax.crypto.SecretKey; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service; import java.nio.charset.StandardCharsets; import java.util.Date;
@Service public class JwtService {
 @Value("${app.jwt-secret}") private String secret; @Value("${app.jwt-expiration-ms}") private long expiration;
 private SecretKey key(){return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));}
 public String generate(String email,String role){long now=System.currentTimeMillis();return Jwts.builder().subject(email).claim("role",role).issuedAt(new Date(now)).expiration(new Date(now+expiration)).signWith(key()).compact();}
 public String subject(String token){return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload().getSubject();}
}
