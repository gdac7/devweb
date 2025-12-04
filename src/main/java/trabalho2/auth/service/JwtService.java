package trabalho2.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import trabalho2.auth.model.Usuario;
import trabalho2.auth.util.Role;

import java.util.Date;

@Service
public class JwtService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${jwt.security.accessTokenExpitation}")
    private String accessTokenExpiration;

    public String generateAccessToken(Usuario usuario) {
        final long tokenExpiration = Long.parseLong(accessTokenExpiration);
        return generateToken(usuario, tokenExpiration);
    }

    private String generateToken(Usuario usuario, long tokenExpiration) {
        return Jwts.builder().subject(usuario.getId().toString())
            .claim("name", usuario.getNome())
            .claim("role", usuario.getRole())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + tokenExpiration * 1000))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getExpiration().after(new Date());
        }
        catch(JwtException e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public Long getUserIdFromToken(String token) {
        return Long.valueOf(getClaims(token).getSubject());
    }

    public Role getRoleFromToken(String token) {
        return Role.valueOf(getClaims(token).get("role", String.class));
    }
}
