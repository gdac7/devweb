package trabalho2.repository;
import jakarta.persistence.LockModeType;
import trabalho2.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    @Query("select p from Professor p where p.nome = :nome")
    Optional<Professor> recuperarProfessorPorNome(@Param("nome") String nome);
}
