package trabalho2.controller;
import trabalho2.model.Professor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.service.ProfessorService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("professores")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public List<Professor> recuperarProfessores() {
        return professorService.recuperarProfessores();
    }

    @PostMapping
    public Professor cadastrarProfessor(@RequestBody Professor professor) {
        return professorService.cadastrarProfessor(professor);
    }

    @PutMapping
    public Professor alterarProfessor(@RequestBody Professor professor) {

        return professorService.alterarProfessor(professor);
    }

    @GetMapping("{idProfessor}")
    public ResponseEntity<Professor> recuperarProfessorPorId(@PathVariable("idProfessor") Long id) {
        Professor professor = professorService.recuperarProfessor(id);
        return ResponseEntity.ok(professor);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Professor> recuperarProfessorPorNome(@PathVariable("nome") String nome) {
        Optional<Professor> professor = professorService.recuperarProfessorPorNome(nome);
        return professor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("{idProfessor}")
    public ResponseEntity<Void> removerProfessorPorId(@PathVariable("idProfessor") Long id) {
        professorService.removerProfessorPorId(id);
        return ResponseEntity.ok().build();
    }
}