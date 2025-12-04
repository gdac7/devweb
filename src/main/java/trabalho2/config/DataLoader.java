package trabalho2.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import trabalho2.auth.model.Usuario;
import trabalho2.auth.repository.UsuarioRepository;
import trabalho2.auth.util.Role;
import trabalho2.model.*;
import trabalho2.repository.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@Profile("dev")
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(
            AlunoRepository alunoRepository,
            ProfessorRepository professorRepository,
            TurmaRepository turmaRepository,
            InscricaoRepository inscricaoRepository,
            DisciplinaRepository disciplinaRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail("admin@universidade.br");
            admin.setSenha(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            Usuario user = new Usuario();
            user.setNome("Usuario Comum");
            user.setEmail("user@universidade.br");
            user.setSenha(passwordEncoder.encode("user123"));
            user.setRole(Role.USER);

            usuarioRepository.saveAll(List.of(admin, user));
            // professores
            Professor profLuis = new Professor();
            profLuis.setNome("Luis Albuquerque");
            profLuis.setEmail("luis@universidade.br");

            Professor profMaria = new Professor();
            profMaria.setNome("Maria Prado");
            profMaria.setEmail("maria@universidade.br");

            Professor profJoao = new Professor();
            profJoao.setNome("João Seabra");
            profJoao.setEmail("joao@universidade.br");

            professorRepository.saveAll(List.of(profLuis, profMaria, profJoao));

            // disciplinas
            Disciplina discPOA = new Disciplina();
            discPOA.setNome("POA");
            discPOA.setCargaHoraria(72);

            Disciplina discBD = new Disciplina();
            discBD.setNome("Banco de Dados");
            discBD.setCargaHoraria(64);

            Disciplina discWeb = new Disciplina();
            discWeb.setNome("Desenvolvimento Web");
            discWeb.setCargaHoraria(80);

            disciplinaRepository.saveAll(List.of(discPOA, discBD, discWeb));

            // alunos
            Aluno alunoSergio = new Aluno();
            alunoSergio.setNome("Sergio Gomes");
            alunoSergio.setEmail("sergiogomes@gmail.com");
            alunoSergio.setCpf("53894562804");

            Aluno alunoAna = new Aluno();
            alunoAna.setNome("Ana Souza");
            alunoAna.setEmail("ana.souza@alunos.br");
            alunoAna.setCpf("12345678901");

            Aluno alunoBruno = new Aluno();
            alunoBruno.setNome("Bruno Lima");
            alunoBruno.setEmail("bruno.lima@alunos.br");
            alunoBruno.setCpf("23456789012");

            Aluno alunoCarla = new Aluno();
            alunoCarla.setNome("Carla Menezes");
            alunoCarla.setEmail("carla.menezes@alunos.br");
            alunoCarla.setCpf("34567890123");

            Aluno alunoDaniel = new Aluno();
            alunoDaniel.setNome("Daniel Prado");
            alunoDaniel.setEmail("daniel.prado@alunos.br");
            alunoDaniel.setCpf("45678901234");

            Aluno alunoErika = new Aluno();
            alunoErika.setNome("Érika Ribeiro");
            alunoErika.setEmail("erika.ribeiro@alunos.br");
            alunoErika.setCpf("56789012345");

            Aluno alunoFelipe = new Aluno();
            alunoFelipe.setNome("Felipe Ferreira");
            alunoFelipe.setEmail("felipe.ferreira@alunos.br");
            alunoFelipe.setCpf("67890123456");

            Aluno alunoGabriela = new Aluno();
            alunoGabriela.setNome("Gabriela Martins");
            alunoGabriela.setEmail("gabriela.martins@alunos.br");
            alunoGabriela.setCpf("78901234567");

            Aluno alunoHeitor = new Aluno();
            alunoHeitor.setNome("Heitor Alves");
            alunoHeitor.setEmail("heitor.alves@alunos.br");
            alunoHeitor.setCpf("89012345678");

            Aluno alunoIsabela = new Aluno();
            alunoIsabela.setNome("Isabela Costa");
            alunoIsabela.setEmail("isabela.costa@alunos.br");
            alunoIsabela.setCpf("90123456789");

            Aluno alunoJonas = new Aluno();
            alunoJonas.setNome("Jonas Silva");
            alunoJonas.setEmail("jonas.silva@alunos.br");
            alunoJonas.setCpf("01234567890");

            Aluno alunoKaren = new Aluno();
            alunoKaren.setNome("Karen Oliveira");
            alunoKaren.setEmail("karen.oliveira@alunos.br");
            alunoKaren.setCpf("11234567890");

            alunoRepository.saveAll(List.of(
                    alunoSergio, alunoAna, alunoBruno, alunoCarla, alunoDaniel,
                    alunoErika, alunoFelipe, alunoGabriela, alunoHeitor,
                    alunoIsabela, alunoJonas, alunoKaren
            ));

            // turmas
            Turma turmaA001 = new Turma();
            turmaA001.setCodigo("A001");
            turmaA001.setAno("2025");
            turmaA001.setPeriodo("1");
            turmaA001.setProfessor(profLuis);
            turmaA001.setDisciplina(discPOA);
            turmaA001.setInscricoes(new ArrayList<>());

            Turma turmaA002 = new Turma();
            turmaA002.setCodigo("A002");
            turmaA002.setAno("2025");
            turmaA002.setPeriodo("2");
            turmaA002.setProfessor(profLuis);
            turmaA002.setDisciplina(discPOA);
            turmaA002.setInscricoes(new ArrayList<>());


            Turma turmaB001 = new Turma();
            turmaB001.setCodigo("B001");
            turmaB001.setAno("2025");
            turmaB001.setPeriodo("1");
            turmaB001.setProfessor(profMaria);
            turmaB001.setDisciplina(discBD);
            turmaB001.setInscricoes(new ArrayList<>());

            Turma turmaB002 = new Turma();
            turmaB002.setCodigo("B002");
            turmaB002.setAno("2025");
            turmaB002.setPeriodo("2");
            turmaB002.setProfessor(profMaria);
            turmaB002.setDisciplina(discBD);
            turmaB002.setInscricoes(new ArrayList<>());


            Turma turmaC001 = new Turma();
            turmaC001.setCodigo("C001");
            turmaC001.setAno("2025");
            turmaC001.setPeriodo("1");
            turmaC001.setProfessor(profJoao);
            turmaC001.setDisciplina(discWeb);
            turmaC001.setInscricoes(new ArrayList<>());

            Turma turmaC002 = new Turma();
            turmaC002.setCodigo("C002");
            turmaC002.setAno("2025");
            turmaC002.setPeriodo("3");
            turmaC002.setProfessor(profJoao);
            turmaC002.setDisciplina(discWeb);
            turmaC002.setInscricoes(new ArrayList<>());

            turmaRepository.saveAll(List.of(
                    turmaA001, turmaA002, turmaB001, turmaB002, turmaC001, turmaC002
            ));

            // inscricoes
            LocalDateTime agora = LocalDateTime.now();


            Inscricao insc1 = new Inscricao();
            insc1.setAluno(alunoAna);
            insc1.setTurma(turmaA001);
            insc1.setDataHora(agora.minusDays(10));
            turmaA001.addInscricao(insc1);

            Inscricao insc2 = new Inscricao();
            insc2.setAluno(alunoBruno);
            insc2.setTurma(turmaA001);
            insc2.setDataHora(agora.minusDays(9));
            turmaA001.addInscricao(insc2);


            Inscricao insc3 = new Inscricao();
            insc3.setAluno(alunoSergio);
            insc3.setTurma(turmaA002);
            insc3.setDataHora(agora.minusDays(20));
            turmaA002.addInscricao(insc3);

            Inscricao insc4 = new Inscricao();
            insc4.setAluno(alunoCarla);
            insc4.setTurma(turmaA002);
            insc4.setDataHora(agora.minusDays(19));
            turmaA002.addInscricao(insc4);

            Inscricao insc5 = new Inscricao();
            insc5.setAluno(alunoDaniel);
            insc5.setTurma(turmaA002);
            insc5.setDataHora(agora.minusDays(18));
            turmaA002.addInscricao(insc5);

            Inscricao insc6 = new Inscricao();
            insc6.setAluno(alunoErika);
            insc6.setTurma(turmaA002);
            insc6.setDataHora(agora.minusDays(17));
            turmaA002.addInscricao(insc6);

            Inscricao insc7 = new Inscricao();
            insc7.setAluno(alunoFelipe);
            insc7.setTurma(turmaA002);
            insc7.setDataHora(agora.minusDays(16));
            turmaA002.addInscricao(insc7);

            Inscricao insc8 = new Inscricao();
            insc8.setAluno(alunoGabriela);
            insc8.setTurma(turmaA002);
            insc8.setDataHora(agora.minusDays(15));
            turmaA002.addInscricao(insc8);

            Inscricao insc9 = new Inscricao();
            insc9.setAluno(alunoHeitor);
            insc9.setTurma(turmaA002);
            insc9.setDataHora(agora.minusDays(14));
            turmaA002.addInscricao(insc9);

            Inscricao insc10 = new Inscricao();
            insc10.setAluno(alunoIsabela);
            insc10.setTurma(turmaA002);
            insc10.setDataHora(agora.minusDays(13));
            turmaA002.addInscricao(insc10);


            Inscricao insc11 = new Inscricao();
            insc11.setAluno(alunoJonas);
            insc11.setTurma(turmaB001);
            insc11.setDataHora(agora.minusDays(8));
            turmaB001.addInscricao(insc11);

            Inscricao insc12 = new Inscricao();
            insc12.setAluno(alunoKaren);
            insc12.setTurma(turmaB001);
            insc12.setDataHora(agora.minusDays(7));
            turmaB001.addInscricao(insc12);


            Inscricao insc13 = new Inscricao();
            insc13.setAluno(alunoAna);
            insc13.setTurma(turmaB002);
            insc13.setDataHora(agora.minusDays(6));
            turmaB002.addInscricao(insc13);

            Inscricao insc14 = new Inscricao();
            insc14.setAluno(alunoBruno);
            insc14.setTurma(turmaB002);
            insc14.setDataHora(agora.minusDays(5));
            turmaB002.addInscricao(insc14);


            Inscricao insc15 = new Inscricao();
            insc15.setAluno(alunoCarla);
            insc15.setTurma(turmaC001);
            insc15.setDataHora(agora.minusDays(4));
            turmaC001.addInscricao(insc15);

            Inscricao insc16 = new Inscricao();
            insc16.setAluno(alunoDaniel);
            insc16.setTurma(turmaC001);
            insc16.setDataHora(agora.minusDays(3));
            turmaC001.addInscricao(insc16);


            Inscricao insc17 = new Inscricao();
            insc17.setAluno(alunoErika);
            insc17.setTurma(turmaC002);
            insc17.setDataHora(agora.minusDays(2));
            turmaC002.addInscricao(insc17);

            Inscricao insc18 = new Inscricao();
            insc18.setAluno(alunoFelipe);
            insc18.setTurma(turmaC002);
            insc18.setDataHora(agora.minusDays(1));
            turmaC002.addInscricao(insc18);

            inscricaoRepository.saveAll(List.of(
                    insc1, insc2, insc3, insc4, insc5, insc6, insc7, insc8, insc9, insc10,
                    insc11, insc12, insc13, insc14, insc15, insc16, insc17, insc18
            ));

            turmaRepository.saveAll(List.of(
                    turmaA001, turmaA002, turmaB001, turmaB002, turmaC001, turmaC002
            ));
        };
    }
}
