import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { API_BASE_URL } from "../config/api";

export const LoginPage = () => {
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        localStorage.setItem("isLogged", "true");
        navigate("/");
      } else if (response.status === 401) {
        setErrorMsg("Credenciales incorrectas.");
      } else {
        const data = await response.json().catch(() => null);
        setErrorMsg(
          data?.message
            ? `No se pudo iniciar sesión: ${data.message}`
            : `No se pudo iniciar sesión (HTTP ${response.status}).`,
        );
      }
    } catch {
      setErrorMsg("Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-sm rounded-lg border border-gray-800 bg-gray-950 p-6 text-white shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white">
        Iniciar Sesión
      </h1>

      {location.state?.sessionExpired && (
        <p role="alert" className="bg-yellow-100 text-yellow-900 p-2 mb-4">
          La sesión no es válida o venció. Inicia sesión nuevamente para entrar
          al inicio.
        </p>
      )}

      {errorMsg && (
        <p className="bg-red-200 text-red-800 p-2 mb-4">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="login-username" className="mb-1 block text-sm font-medium text-gray-200">
            Usuario
          </label>
          <input
            id="login-username"
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-gray-200">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-md bg-white p-2.5 font-medium text-black transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
      </form>

      <p className="mt-5 text-sm text-gray-300">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="font-medium text-white underline underline-offset-4 hover:text-gray-300">
          Regístrate
        </Link>
      </p>
    </div>
  );
};