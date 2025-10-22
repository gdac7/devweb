package trabalho2;

import trabalho2.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import trabalho2.repository.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class Trabalho02Application implements CommandLineRunner {

    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final TurmaRepository turmaRepository;
    private final InscricaoRepository inscricaoRepository;
    private final DisciplinaRepository disciplinaRepository;

    public Trabalho02Application(AlunoRepository alunoRepository, ProfessorRepository professorRepository, TurmaRepository turmaRepository, InscricaoRepository inscricaoRepository, DisciplinaRepository disciplinaRepository) {
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
        this.turmaRepository = turmaRepository;
        this.inscricaoRepository = inscricaoRepository;
        this.disciplinaRepository = disciplinaRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Trabalho02Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {


//        Professor profLuis = new Professor();
//        profLuis.setNome("Luis Albuquerque");
//        profLuis.setEmail("luis@universidade.br");
//
//        Professor profMaria = new Professor();
//        profMaria.setNome("Maria Prado");
//        profMaria.setEmail("maria@universidade.br");
//
//        Professor profJoao = new Professor();
//        profJoao.setNome("João Seabra");
//        profJoao.setEmail("joao@universidade.br");
//
//        professorRepository.saveAll(List.of(profLuis, profMaria,
//                profJoao));
//
//        Disciplina discPOO = new Disciplina();
//        discPOO.setNome("Programação Orientada a Objetos");
//        discPOO.setCargaHoraria(72);
//
//        Disciplina discBD = new Disciplina();
//        discBD.setNome("Banco de Dados");
//        discBD.setCargaHoraria(64);
//
//        Disciplina discWeb = new Disciplina();
//        discWeb.setNome("Desenvolvimento Web");
//        discWeb.setCargaHoraria(80);
//
//        disciplinaRepository.saveAll(List.of(discPOO, discBD, discWeb));
//
//        Aluno alunoAna = new Aluno();
//        alunoAna.setNome("Ana Souza");
//        alunoAna.setEmail("ana.souza@alunos.br");
//
//        Aluno alunoBruno = new Aluno();
//        alunoBruno.setNome("Bruno Lima");
//        alunoBruno.setEmail("bruno.lima@alunos.br");
//        alunoBruno.setCpf("3213123");
//
//        Aluno alunoCarla = new Aluno();
//        alunoCarla.setNome("Carla Menezes");
//        alunoCarla.setEmail("carla.menezes@alunos.br");
//        alunoCarla.setCpf("317713");
//
//        Aluno alunoDaniel = new Aluno();
//        alunoDaniel.setNome("Daniel Prado");
//        alunoDaniel.setEmail("daniel.prado@alunos.br");
//        alunoDaniel.setCpf("99191");
//
//        Aluno alunoErika = new Aluno();
//        alunoErika.setNome("Érika Ribeiro");
//        alunoErika.setEmail("erika.ribeiro@alunos.br");
//        alunoErika.setCpf("56555");
//
//        Aluno alunoFelipe = new Aluno();
//        alunoFelipe.setNome("Felipe Ferreira");
//        alunoFelipe.setEmail("felipe.ferreira@alunos.br");
//        alunoFelipe.setCpf("93191");
//
//        Aluno alunoGabriela = new Aluno();
//        alunoGabriela.setNome("Gabriela Martins");
//        alunoGabriela.setEmail("gabriela.martins@alunos.br");
//        alunoGabriela.setCpf("19191");
//
//        Aluno alunoHeitor = new Aluno();
//        alunoHeitor.setNome("Heitor Alves");
//        alunoHeitor.setEmail("heitor.alves@alunos.br");
//        alunoHeitor.setCpf("6551");
//
//        alunoRepository.saveAll(List.of(
//                alunoAna, alunoBruno, alunoCarla, alunoDaniel,
//                alunoErika, alunoFelipe, alunoGabriela, alunoHeitor
//        ));
//
//        Turma turmaA001 = new Turma();
//        turmaA001.setCodigo("A001");
//        turmaA001.setAno("2025");
//        turmaA001.setPeriodo("1º");
//        turmaA001.setProfessor(profLuis);
//        turmaA001.setDisciplina(discPOO);
//        turmaA001.setInscricoes(new ArrayList<>());
//
//        Turma turmaA002 = new Turma();
//        turmaA002.setCodigo("A002");
//        turmaA002.setAno("2025");
//        turmaA002.setPeriodo("2º");
//        turmaA002.setProfessor(profLuis);
//        turmaA002.setDisciplina(discWeb);
//        turmaA002.setInscricoes(new ArrayList<>());
//
//        Turma turmaA003 = new Turma();
//        turmaA003.setCodigo("A003");
//        turmaA003.setAno("2024");
//        turmaA003.setPeriodo("2º");
//        turmaA003.setProfessor(profMaria);
//        turmaA003.setDisciplina(discBD);
//        turmaA003.setInscricoes(new ArrayList<>());
//
//        Turma turmaB001 = new Turma();
//        turmaB001.setCodigo("B001");
//        turmaB001.setAno("2025");
//        turmaB001.setPeriodo("1º");
//        turmaB001.setProfessor(profJoao);
//        turmaB001.setDisciplina(discPOO);
//        turmaB001.setInscricoes(new ArrayList<>());
//
//        Turma turmaB002 = new Turma();
//        turmaB002.setCodigo("B002");
//        turmaB002.setAno("2025");
//        turmaB002.setPeriodo("3º");
//        turmaB002.setProfessor(profJoao);
//        turmaB002.setDisciplina(discWeb);
//        turmaB002.setInscricoes(new ArrayList<>());
//
//        turmaRepository.saveAll(List.of(
//                turmaA001, turmaA002, turmaA003, turmaB001, turmaB002
//        ));
//
//        LocalDateTime agora = LocalDateTime.now();
//
//        Inscricao insc1 = new Inscricao();
//        insc1.setAluno(alunoAna);
//        insc1.setTurma(turmaA001);
//        insc1.setDataHora(agora.minusDays(10));
//        turmaA001.addInscricao(insc1);
//
//        Inscricao insc2 = new Inscricao();
//        insc2.setAluno(alunoBruno);
//        insc2.setTurma(turmaA001);
//        insc2.setDataHora(agora.minusDays(9));
//        turmaA001.addInscricao(insc2);
//
//        Inscricao insc3 = new Inscricao();
//        insc3.setAluno(alunoCarla);
//        insc3.setTurma(turmaA002);
//        insc3.setDataHora(agora.minusDays(7));
//        turmaA002.addInscricao(insc3);
//
//        Inscricao insc4 = new Inscricao();
//        insc4.setAluno(alunoDaniel);
//        insc4.setTurma(turmaA002);
//        insc4.setDataHora(agora.minusDays(6));
//        turmaA002.addInscricao(insc4);
//
//        Inscricao insc5 = new Inscricao();
//        insc5.setAluno(alunoErika);
//        insc5.setTurma(turmaA002);
//        insc5.setDataHora(agora.minusDays(5));
//        turmaA002.addInscricao(insc5);
//
//        Inscricao insc6 = new Inscricao();
//        insc6.setAluno(alunoFelipe);
//        insc6.setTurma(turmaA003);
//        insc6.setDataHora(agora.minusDays(3));
//        turmaA003.addInscricao(insc6);
//
//        Inscricao insc7 = new Inscricao();
//        insc7.setAluno(alunoGabriela);
//        insc7.setTurma(turmaB001);
//        insc7.setDataHora(agora.minusDays(8));
//        turmaB001.addInscricao(insc7);
//
//        Inscricao insc8 = new Inscricao();
//        insc8.setAluno(alunoHeitor);
//        insc8.setTurma(turmaB002);
//        insc8.setDataHora(agora.minusDays(2));
//        turmaB002.addInscricao(insc8);
//
//        inscricaoRepository.saveAll(List.of(
//                insc1, insc2, insc3, insc4, insc5, insc6, insc7, insc8
//        ));
//
//        turmaRepository.saveAll(List.of(
//                turmaA001, turmaA002, turmaA003, turmaB001, turmaB002
//        ));
  }
}
