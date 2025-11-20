package trabalho2.controller;

import trabalho2.model.Aluno;
import trabalho2.model.Inscricao;
import trabalho2.model.Turma;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho2.service.AlunoService;
import trabalho2.service.InscricaoService;
import trabalho2.service.TurmaService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("turmas")
public class TurmaController {

    private final TurmaService turmaService;
    private final AlunoService alunoService;
    private final InscricaoService inscricaoService;

    public TurmaController(TurmaService turmaService, AlunoService alunoService, InscricaoService inscricaoService) {
        this.turmaService = turmaService;
        this.alunoService = alunoService;
        this.inscricaoService = inscricaoService;
    }

    @GetMapping
    public List<Turma> recuperarTurmas(@RequestParam(value = "disciplinaId", required = false) Long disciplinaId) {
        if (disciplinaId != null) {
            return turmaService.recuperarTurmasPorDisciplina(disciplinaId);
        }
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

    @GetMapping("{idTurma}/alunos")
    public List<Aluno> recuperarAlunosDaTurma(@PathVariable("idTurma") Long id){
        return alunoService.recuperarAlunosPorTurma(id);
    }

    @PostMapping("{idTurma}/inscricoes")
    public Inscricao criarInscricaoNaTurma(@PathVariable("idTurma") Long idTurma, @RequestParam("idAluno") Long idAluno){
        Turma turma = turmaService.recuperarTurmaPorId(idTurma);
        Aluno aluno = alunoService.recuperarAluno(idAluno);
        Inscricao inscricao = new Inscricao();
        inscricao.setAluno(aluno);
        inscricao.setTurma(turma);
        inscricao.setDataHora(LocalDateTime.now());
        turma.addInscricao(inscricao);
        return inscricaoService.cadastrarInscricao(inscricao);
    }

    @DeleteMapping("{idTurma}")
    public ResponseEntity<Void> removerTurmaPorId(@PathVariable("idTurma") Long id) {
        turmaService.removerTurmaPorId(id);
        return ResponseEntity.ok().build();
    }


}