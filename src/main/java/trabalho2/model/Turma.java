package trabalho2.model;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Turma {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String ano;
    private String periodo;
    private String codigo;
    @ManyToOne
    private Professor professor;
    @OneToMany(mappedBy = "turma")
    private List<Inscricao> inscricoes;
    @ManyToOne
    private Disciplina disciplina;
    public Turma(){}

    public Turma(String ano, String periodo, Professor professor, List<Inscricao> inscricoes, Disciplina disciplina, String codigo) {
        this.ano = ano;
        this.periodo = periodo;
        this.codigo = codigo;
        this.professor = professor;
        this.inscricoes = inscricoes;
        this.disciplina = disciplina;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public List<Inscricao> getInscricoes() {
        return inscricoes;
    }

    public void setInscricoes(List<Inscricao> inscricoes) {
        this.inscricoes = inscricoes;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void addInscricao(Inscricao inscricao){
        if (this.inscricoes == null){
            this.inscricoes = new ArrayList<>();
        }
        this.inscricoes.add(inscricao);
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }
}
