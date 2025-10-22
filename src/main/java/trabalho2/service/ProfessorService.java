package trabalho2.service;

import trabalho2.exception.EntidadeNaoEncontradaException;
import trabalho2.model.Professor;
import org.springframework.stereotype.Service;
import trabalho2.repository.ProfessorRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    public List<Professor> recuperarProfessores() {
        return professorRepository.findAll();
    }

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public Professor recuperarProfessor(Long id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Professor com id = " + id + " não encontrado."));
    }

    public Optional<Professor> recuperarProfessorPorNome(String nome){
        return professorRepository.recuperarProfessorPorNome(nome);
    }

    public Professor alterarProfessor(Professor professor) {
        this.recuperarProfessor(professor.getId());
        return professorRepository.save(professor);
    }

    public void removerProfessorPorId(Long id) {
        professorRepository.deleteById(id);
    }
}