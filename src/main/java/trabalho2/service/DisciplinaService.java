package trabalho2.service;
import trabalho2.exception.EntidadeNaoEncontradaException;
import trabalho2.model.Aluno;
import trabalho2.model.Disciplina;
import org.springframework.stereotype.Service;
import trabalho2.repository.DisciplinaRepository;
import java.util.List;
import java.util.Optional;

@Service
public class DisciplinaService {

    private final DisciplinaRepository disciplinaRepository;

    public DisciplinaService(DisciplinaRepository disciplinaRepository) {
        this.disciplinaRepository = disciplinaRepository;
    }

    public List<Disciplina> recuperarDisciplinas() {return disciplinaRepository.findAll();}

    public Disciplina cadastrarDisciplina(Disciplina disciplina){
        return disciplinaRepository.save(disciplina);
    }
    public Disciplina recuperarDisciplina(Long id){
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Disciplina com id = " + id + " não encontrado."));
    }



    public Disciplina alterarDisciplina(Disciplina disciplina){
        this.recuperarDisciplina(disciplina.getId());
        return disciplinaRepository.save(disciplina);
    }

    public void removerDisciplinaPorId(Long id){
        disciplinaRepository.deleteById(id);
    }
}
