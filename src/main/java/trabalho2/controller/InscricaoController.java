package trabalho2.controller;

import trabalho2.model.Inscricao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.service.InscricaoService;

import java.util.List;

@RestController
@RequestMapping("inscricoes")
public class InscricaoController {

    private final InscricaoService inscricaoService;

    public InscricaoController(InscricaoService inscricaoService) {
        this.inscricaoService = inscricaoService;
    }

    @GetMapping
    public List<Inscricao> recuperarInscricoes() {
        return inscricaoService.recuperarInscricoes();
    }

    @PostMapping
    public Inscricao cadastrarInscricao(@RequestBody Inscricao inscricao) {
        return inscricaoService.cadastrarInscricao(inscricao);
    }


    @GetMapping("{idInscricao}")
    public ResponseEntity<Inscricao> recuperarInscricaoPorId(@PathVariable("idInscricao") Long id) {
        Inscricao inscricao = inscricaoService.recuperarInscricaoPorId(id);
        return ResponseEntity.ok(inscricao);
    }

    @DeleteMapping("{idInscricao}")
    public ResponseEntity<Void> removerInscricaoPorId(@PathVariable("idInscricao") Long id) {
        inscricaoService.removerInscricaoPorId(id);
        return ResponseEntity.ok().build();
    }
}