package trabalho2.controller;

import jakarta.validation.Valid;
import trabalho2.model.Aluno;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.service.AlunoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("alunos")
public class AlunoController {

    private final AlunoService alunoService;

    public AlunoController(AlunoService alunoService) {
        this.alunoService = alunoService;
    }

    @GetMapping
    public List<Aluno> recuperarAlunos() {
        return alunoService.recuperarAlunos();
    }

    @PostMapping
    public Aluno cadastrarAluno(@RequestBody @Valid Aluno aluno) {
        return alunoService.cadastrarAluno(aluno);
    }

    @PutMapping
    public Aluno alterarAluno(@RequestBody @Valid Aluno aluno) {
        return alunoService.alterarAluno(aluno);
    }

    @GetMapping("{idAluno}")
    public ResponseEntity<Aluno> recuperarAlunoPorId(@PathVariable("idAluno") Long id) {
        Aluno aluno = alunoService.recuperarAluno(id);
        return ResponseEntity.ok(aluno);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Aluno> recuperarAlunoPorNome(@RequestParam("nome") String nome) {
        Optional<Aluno> aluno = alunoService.recuperarAlunoPorNome(nome);
        return aluno.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nao-inscritos")
    public List<Aluno> recuperarAlunosNaoInscritosNaTurma(@RequestParam("turmaId") Long turmaId) {
        return alunoService.recuperarAlunosNaoInscritosNaTurma(turmaId);
    }

    @DeleteMapping("{idAluno}")
    public ResponseEntity<Void> removerAlunoPorId(@PathVariable("idAluno") Long id) {
        alunoService.removerAlunoPorId(id);
        return ResponseEntity.ok().build();
    }
}