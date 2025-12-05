import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useCadastrarUsuario from "../hooks/useCadastrarUsuario";
import type { Usuario, InfoUsuario } from "../types";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
  role: z.enum(["USER", "ADMIN"], {
    errorMap: () => ({ message: "Selecione um perfil válido" }),
  }),
});

type FormUsuarioAdmin = z.infer<typeof schema>;

export const GerenciarUsuariosPage = () => {
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUsuarioAdmin>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "USER"
    }
  });

  const { mutate: cadastrarUsuario, isPending } = useCadastrarUsuario();

  const submit = ({ nome, email, senha, role }: FormUsuarioAdmin) => {
    const usuario: Usuario = { nome, email, senha, role };
    cadastrarUsuario(usuario, {
      onSuccess: (info: InfoUsuario) => {
        if (info.valido) {
          setSucesso(true);
          setMensagem(info.mensagem || "Usuário cadastrado com sucesso!");
          reset();
          setTimeout(() => {
            setMensagem("");
          }, 3000);
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
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="h3 mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-person-gear" />
          Gerenciar Usuários
        </h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Cadastrar Novo Usuário</h5>

          {mensagem && (
            <div
              className={`alert ${sucesso ? "alert-success" : "alert-danger"} alert-dismissible fade show fw-bold`}
              role="alert"
            >
              {mensagem}
              <button
                type="button"
                className="btn-close"
                onClick={() => setMensagem("")}
                aria-label="Close"
              />
            </div>
          )}

          <form onSubmit={handleSubmit(submit)} autoComplete="off">
            <div className="row mb-3">
              <label htmlFor="nome" className="col-lg-2 col-form-label fw-bold">
                Nome
              </label>
              <div className="col-lg-6">
                <input
                  {...register("nome")}
                  type="text"
                  id="nome"
                  className="form-control"
                  disabled={isPending}
                />
                {errors.nome && (
                  <p className="text-danger small mt-1 mb-0">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="email" className="col-lg-2 col-form-label fw-bold">
                Email
              </label>
              <div className="col-lg-6">
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  className="form-control"
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="text-danger small mt-1 mb-0">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="senha" className="col-lg-2 col-form-label fw-bold">
                Senha
              </label>
              <div className="col-lg-6">
                <input
                  {...register("senha")}
                  type="password"
                  id="senha"
                  className="form-control"
                  disabled={isPending}
                />
                {errors.senha && (
                  <p className="text-danger small mt-1 mb-0">
                    {errors.senha.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row mb-4">
              <label htmlFor="role" className="col-lg-2 col-form-label fw-bold">
                Perfil
              </label>
              <div className="col-lg-6">
                <select
                  {...register("role")}
                  id="role"
                  className="form-select"
                  disabled={isPending}
                >
                  <option value="USER">Usuário (USER)</option>
                  <option value="ADMIN">Administrador (ADMIN)</option>
                </select>
                {errors.role && (
                  <p className="text-danger small mt-1 mb-0">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="offset-lg-2 col-lg-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2" />
                      Cadastrar Usuário
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GerenciarUsuariosPage;
