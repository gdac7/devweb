package trabalho2.service;

import trabalho2.exception.EntidadeNaoEncontradaException;

import trabalho2.model.Inscricao;
import org.springframework.stereotype.Service;
import trabalho2.repository.InscricaoRepository;
import java.util.List;

@Service
public class InscricaoService {
    private final InscricaoRepository inscricaoRepository;

    public InscricaoService(InscricaoRepository inscricaoRepository) {
        this.inscricaoRepository = inscricaoRepository;
    }

    public List<Inscricao> recuperarInscricoes() {
        return inscricaoRepository.findAll();
    }

    public Inscricao cadastrarInscricao(Inscricao inscricao) {
        return inscricaoRepository.save(inscricao);
    }

    public Inscricao recuperarInscricaoPorId(Long id) {
        return inscricaoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Inscricao com id = " + id + " não encontrada."));
    }


    public void removerInscricaoPorId(Long id) {
        inscricaoRepository.deleteById(id);
    }
}