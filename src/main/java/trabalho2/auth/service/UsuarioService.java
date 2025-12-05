package trabalho2.auth.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import trabalho2.auth.model.Usuario;
import trabalho2.auth.repository.UsuarioRepository;
import trabalho2.auth.util.InfoUsuario;
import trabalho2.auth.util.Role;

import java.util.List;

//@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public InfoUsuario cadastrarUsuario(Usuario usuario) {
        try {
            usuarioRepository
                .findByEmail(usuario.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
            return new InfoUsuario(false, true, "Email já cadastrado!");
        }
        catch(UsernameNotFoundException e) {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            boolean isAdminAuthenticated = authentication != null &&
                authentication.isAuthenticated() &&
                authentication.getAuthorities().stream()
                    .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdminAuthenticated) {
                usuario.setRole(Role.USER);
            }

            usuarioRepository.save(usuario);
            return new InfoUsuario(true, false, "Usuário cadastrado com sucesso!");
        }
    }

    public List<Usuario> recuperarUsuarios() {
        return usuarioRepository.findAll();
    }
}
