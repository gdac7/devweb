package trabalho2.repository;
import jakarta.persistence.LockModeType;
import trabalho2.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    @Query("select a from Aluno a where a.nome = :nome")
    Optional<Aluno> recuperarAlunoPorNome(@Param("nome") String nome);
}
