package trabalho2.service;
import trabalho2.exception.EntidadeNaoEncontradaException;
import trabalho2.model.Aluno;
import org.springframework.stereotype.Service;
import trabalho2.repository.AlunoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;

    // Mesmo com @RequiredArgsConstructor, o compilador estava reclamando
    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    public List<Aluno> recuperarAlunos(){
        return alunoRepository.findAll();
    }
    public Aluno cadastrarAluno(Aluno aluno){
        return alunoRepository.save(aluno);
    }
    public Aluno recuperarAluno(Long id){
        return alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Aluno com id = " + id + " não encontrado."));
    }

    public Optional<Aluno> recuperarAlunoPorNome(String nome){
        return alunoRepository.recuperarAlunoPorNome(nome);
    }

    public Aluno alterarAluno(Aluno aluno){
        this.recuperarAluno(aluno.getId());
        return alunoRepository.save(aluno);
    }

    public void removerAlunoPorId(Long id){
        alunoRepository.deleteById(id);
    }


}
