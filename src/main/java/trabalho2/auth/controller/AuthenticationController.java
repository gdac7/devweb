package trabalho2.auth.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trabalho2.auth.model.Usuario;
import trabalho2.auth.repository.UsuarioRepository;
import trabalho2.auth.service.JwtService;
import trabalho2.auth.util.TokenResponse;
import trabalho2.auth.util.UsuarioLogin;

@AllArgsConstructor
@RestController
@RequestMapping("autenticacao")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody UsuarioLogin usuarioLogin,
                                               HttpServletResponse response) {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(usuarioLogin.email(), usuarioLogin.senha()));

        Usuario usuario = usuarioRepository.findByEmail(usuarioLogin.email()).orElseThrow();

        String accessToken = jwtService.generateAccessToken(usuario);

        return new ResponseEntity<>(new TokenResponse(
            accessToken, usuario.getId(), usuario.getNome(), usuario.getRole().name()), HttpStatus.OK);
    }
}
