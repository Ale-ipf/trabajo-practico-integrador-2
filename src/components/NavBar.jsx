import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { API_BASE_URL } from "../config/api";

export const Navbar = ({ nombre = "Anonimo" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const isLogged = localStorage.getItem("isLogged") === "true";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`No se pudo cerrar sesión (HTTP ${response.status}).`);
      }

      localStorage.removeItem("isLogged");
      navigate("/login", { replace: true });
    } catch (logoutError) {
      setError(
        logoutError instanceof Error
          ? logoutError.message
          : "Error de conexión al cerrar sesión.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="border-b border-border bg-background">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
          Hola, {nombre}
        </Link>

        <div
          className="flex flex-wrap items-center gap-2"
          aria-label="Acciones de usuario"
        >
          {isLogged ? (
            <>
              <Link
                to="/home"
                aria-current={location.pathname === "/home" ? "page" : undefined}
                className="bg-black px-4 py-2 text-white hover:bg-black/85"
              >
                Inicio
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-black px-4 py-2 text-white hover:bg-black/85 disabled:opacity-60"
              >
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-black px-4 py-2 text-white hover:bg-black/85"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-black px-4 py-2 text-white hover:bg-black/85"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
      {error && (
        <p role="alert" className="mx-auto max-w-6xl px-6 pb-3 text-red-700">
          {error}
        </p>
      )}
    </header>
  );
};