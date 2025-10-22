package trabalho2.controller;

import trabalho2.model.Turma;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.service.TurmaService;

import java.util.List;

@RestController
@RequestMapping("turmas")
public class TurmaController {

    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @GetMapping
    public List<Turma> recuperarTurmas() {
        return turmaService.recuperarTurmas();
    }

    @GetMapping("buscar")
    public List<Turma> buscarTurmas(@RequestParam("q") String codigo) {return turmaService.buscarTurmaPorCodigo(codigo);}

    @PostMapping
    public Turma cadastrarTurma(@RequestBody Turma turma) {
        return turmaService.cadastrarTurma(turma);
    }


    @GetMapping("{idTurma}")
    public ResponseEntity<Turma> recuperarTurmaPorId(@PathVariable("idTurma") Long id) {
        Turma turma = turmaService.recuperarTurmaPorId(id);
        return ResponseEntity.ok(turma);
    }

    @DeleteMapping("{idTurma}")
    public ResponseEntity<Void> removerTurmaPorId(@PathVariable("idTurma") Long id) {
        turmaService.removerTurmaPorId(id);
        return ResponseEntity.ok().build();
    }
}