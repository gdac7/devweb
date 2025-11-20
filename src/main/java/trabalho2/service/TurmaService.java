package trabalho2.service;

import trabalho2.exception.EntidadeNaoEncontradaException;
import trabalho2.model.Turma;
import org.springframework.stereotype.Service;
import trabalho2.repository.TurmaRepository;

import java.util.Collections;
import java.util.List;


@Service
public class TurmaService {
    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    public List<Turma> recuperarTurmas() {
        return turmaRepository.findAll();
    }

    public Turma cadastrarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    public Turma recuperarTurmaPorId(Long id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Turma com id = " + id + " não encontrada."));
    }

    public void removerTurmaPorId(Long id) {
        turmaRepository.deleteById(id);
    }

    public List<Turma> buscarTurmaPorCodigo(String codigo){
        if (codigo == null || codigo.trim().isEmpty()){
            return Collections.emptyList();
        }
        return turmaRepository.findByCodigoContainingIgnoreCaseOrderByCodigoAsc(codigo.trim());

    }

    public List<Turma> recuperarTurmasPorDisciplina(Long disciplinaId) {
        return turmaRepository.findByDisciplinaIdOrderByCodigoAsc(disciplinaId);
    }
}