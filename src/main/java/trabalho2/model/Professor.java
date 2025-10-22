package trabalho2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;


@Entity
public class Professor {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String email;
    @JsonIgnore
    @OneToMany(mappedBy = "professor")
    private List<Turma> turmas;

    public Professor() {}
    public Professor(String nome, String email, List<Turma> turmas) {
        this.nome = nome;
        this.email = email;
        this.turmas = turmas;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Turma> getTurmas() {
        return turmas;
    }

    public void setTurmas(List<Turma> turmas) {
        this.turmas = turmas;
    }
}
