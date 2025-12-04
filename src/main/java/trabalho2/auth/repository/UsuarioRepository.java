package trabalho2.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import trabalho2.auth.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
