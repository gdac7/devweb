package trabalho2.controller;

import trabalho2.model.Aluno;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.model.Disciplina;
import trabalho2.service.DisciplinaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("disciplinas")
public class DisciplinaController {

    private final DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @GetMapping
    public List<Disciplina> recuperarDisciplinas() {
        return disciplinaService.recuperarDisciplinas();
    }

    @PostMapping
    public Disciplina cadastrarDisciplinas(@RequestBody Disciplina disciplina) {
        return disciplinaService.cadastrarDisciplina(disciplina);
    }

    @PutMapping
    public Disciplina alterarDisciplinas(@RequestBody Disciplina disciplina) {
        return disciplinaService.alterarDisciplina(disciplina);
    }

    @GetMapping("{idDisciplina}")
    public ResponseEntity<Disciplina> recuperarDisciplinaPorId(@PathVariable("idDisciplina") Long id) {
        Disciplina disciplina = disciplinaService.recuperarDisciplina(id);
        return ResponseEntity.ok(disciplina);
    }



    @DeleteMapping("{idDisciplina}")
    public ResponseEntity<Void> removerDisciplinaPorId(@PathVariable("idDisciplina") Long id) {
        disciplinaService.removerDisciplinaPorId(id);
        return ResponseEntity.ok().build();
    }
}