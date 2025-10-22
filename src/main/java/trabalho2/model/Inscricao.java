package trabalho2.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Inscricao {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private LocalDateTime dataHora;
    @ManyToOne
    private Aluno aluno;
    @JsonIgnore
    @ManyToOne
    private Turma turma;

    public Inscricao(){}

    public Inscricao(LocalDateTime dataHora, Aluno aluno, Turma turma) {
        this.dataHora = dataHora;
        this.aluno = aluno;
        this.turma = turma;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }
}
