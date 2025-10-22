package trabalho2.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import trabalho2.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findByCodigoContainingIgnoreCaseOrderByCodigoAsc(String codigo);
}
