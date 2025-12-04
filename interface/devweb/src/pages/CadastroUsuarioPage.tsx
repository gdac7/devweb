import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useCadastrarUsuario from "../hooks/useCadastrarUsuario";
import type { Usuario, InfoUsuario } from "../types";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
});

type FormUsuario = z.infer<typeof schema>;

export const CadastroUsuarioPage = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUsuario>({ resolver: zodResolver(schema) });

  const { mutate: cadastrarUsuario } = useCadastrarUsuario();

  const submit = ({ nome, email, senha }: FormUsuario) => {
    const usuario: Usuario = { nome, email, senha };
    cadastrarUsuario(usuario, {
      onSuccess: (info: InfoUsuario) => {
        if (info.valido) {
          setSucesso(true);
          setMensagem(info.mensagem);
          reset();
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setSucesso(false);
          setMensagem(info.mensagem);
        }
      },
      onError: (error: any) => {
        setSucesso(false);
        setMensagem("Erro ao cadastrar usuário. Tente novamente.");
      },
    });
  };

  return (
    <div className="container">
      <h3 className="mb-4">Cadastrar Novo Usuário</h3>

      {mensagem && (
        <div
          className={`alert ${sucesso ? "alert-success" : "alert-danger"} fw-bold`}
          role="alert"
        >
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <div className="row mb-2">
          <label htmlFor="nome" className="col-lg-2 fw-bold">
            Nome
          </label>
          <div className="col-lg-5">
            <input
              {...register("nome")}
              type="text"
              id="nome"
              className="form-control form-control-sm"
            />
            {errors.nome && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "2px",
                  marginBottom: "0px",
                }}
              >
                {errors.nome.message}
              </p>
            )}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="email" className="col-lg-2 fw-bold">
            Email
          </label>
          <div className="col-lg-5">
            <input
              {...register("email")}
              type="text"
              id="email"
              className="form-control form-control-sm"
            />
            {errors.email && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "2px",
                  marginBottom: "0px",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="senha" className="col-lg-2 fw-bold">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("senha")}
              type="password"
              id="senha"
              className="form-control form-control-sm"
            />
            {errors.senha && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "2px",
                  marginBottom: "0px",
                }}
              >
                {errors.senha.message}
              </p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="offset-lg-2 col-lg-5">
            <button type="submit" className="btn btn-success btn-sm me-2">
              Cadastrar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/login")}
            >
              Voltar para Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CadastroUsuarioPage;
