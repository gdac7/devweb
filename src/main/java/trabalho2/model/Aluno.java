package trabalho2.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import trabalho2.repository.InscricaoRepository;

import java.util.ArrayList;
import java.util.List;


@Entity
public class Aluno {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @NotEmpty(message = "O nome deve ser informado.")
    private String nome;

    @NotEmpty(message = "O email deve ser informado.")
    @Email(message = "Email inválido.")
    private String email;

    @NotEmpty(message = "O CPF deve ser informado.")
    private String cpf;
    @JsonIgnore
    @OneToMany(mappedBy = "aluno")
    private List<Inscricao> inscricoes;



    public Aluno(){}

    public Aluno(String nome, String email, List<Inscricao> inscricoes, String cpf) {
        this.nome = nome;
        this.email = email;
        this.inscricoes = inscricoes;
        this.cpf = cpf;
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

    public List<Inscricao> getInscricoes() {
        return inscricoes;
    }

    public void setInscricoes(List<Inscricao> inscricoes) {
        this.inscricoes = inscricoes;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void addInscricao(Inscricao inscricao){
        if (this.inscricoes == null){
            this.inscricoes = new ArrayList<>();
        }
        this.inscricoes.add(inscricao);
    }
}
