package trabalho2.repository;
import trabalho2.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    @Query("select a from Aluno a where a.nome = :nome")
    Optional<Aluno> recuperarAlunoPorNome(@Param("nome") String nome);

    @Query("select i.aluno from Inscricao i where i.turma.id = :turmaId order by i.id desc")
    List<Aluno> recuperarAlunosPorTurma(@Param("turmaId") Long turmaId);

    @Query("select a from Aluno a where a.id not in (select i.aluno.id from Inscricao i where i.turma.id = :turmaId) order by a.nome asc")
    List<Aluno> recuperarAlunosNaoInscritosNaTurma(@Param("turmaId") Long turmaId);
}
