import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import type { TokenResponse } from "../store/TokenStore";
import type { UsuarioLogin } from "../types";
import useTokenStore from "../store/TokenStore";
import useLoginStore from "../store/LoginStore";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(1, "Informe o email.")
    .email("Informe um email válido."),
  senha: z
    .string()
    .min(1, "Informe a senha.")
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
  const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
  const loginInvalido = useLoginStore((s) => s.loginInvalido);
  const msg = useLoginStore((s) => s.msg);

  const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
  const setMsg = useLoginStore((s) => s.setMsg);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenResponse({ idUsuario: 0, token: "", nome: "", role: "" });

    return () => {
      setLoginInvalido(false);
      setMsg("");
    };
  }, []);

  const { register, handleSubmit, formState: {errors} } = useForm<FormLogin>({resolver: zodResolver(schema)});

  const { mutate: efetuarLogin } = useEfetuarLogin();

  const submit = ({ email, senha }: FormLogin) => {
    const usuarioLogin: UsuarioLogin = { email, senha };
    efetuarLogin(usuarioLogin, {
      onSuccess: (tokenResp: TokenResponse) => {
        setTokenResponse({
          idUsuario: tokenResp.idUsuario,
          token: tokenResp.token,
          nome: tokenResp.nome,
          role: tokenResp.role,
        });
        if (location.state?.destino) {
          navigate(location.state.destino);
        } else {
          navigate("/");
        }
      },
      onError: (error: any) => {
        if (error.message && error.message.includes("401")) {
          setLoginInvalido(true);
          setMsg("Email ou senha inválidos.");
        } else {
          setLoginInvalido(true);
          setMsg(
            "Não foi possível efetuar o login. Por favor, tente mais tarde."
          );
        }
      },
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <div className="row">
        <div className="col-lg-6">
          {loginInvalido && (
            <div className="alert alert-danger fw-bold" role="alert">
              {msg}
            </div>
          )}
        </div>
      </div>
      <div className="row mb-2">
        <label htmlFor="email" className="col-lg-1 fw-bold mb-2">
          Email
        </label>
        <div className="col-lg-5">
          <input
            {...register("email")}
            type="text"
            id="email"
            className="form-control form-control-sm"
          />
          {errors.email && <p style={{color: "red",
                                      fontSize: "14px",
                                      marginTop: "2px",
                                      marginBottom: "0px"}}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
          Senha
        </label>
        <div className="col-lg-5">
          <input
            {...register("senha")}
            type="password"
            id="senha"
            className="form-control form-control-sm"
          />
          {errors.senha && <p style={{color: "red",
                                      fontSize: "14px",
                                      marginTop: "2px",
                                      marginBottom: "0px"}}>{errors.senha.message}</p>}
        </div>
      </div>

      <div className="row mb-3">
        <div className="offset-lg-1 col-lg-5">
          <button type="submit" className="btn btn-success btn-sm me-2">
            Entrar
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/cadastro")}
          >
            Criar Conta
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
