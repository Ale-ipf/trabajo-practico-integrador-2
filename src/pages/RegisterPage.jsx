import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { API_BASE_URL } from "../config/api";

export const RegisterPage = () => {
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccessMsg(null);

    try {
      const { last_name, ...userData } = formState;
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          role: "user",
          lastname: last_name,
        }),
      });

      if (response.ok || response.status === 201) {
        handleReset();
        setSuccessMsg("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.status === 400) {
        const data = await response.json();
        const validationErrors = data.errors;
        const validationMessages = Array.isArray(validationErrors)
          ? validationErrors.map((error) =>
              typeof error === "string" ? error : error.msg,
            )
          : validationErrors && typeof validationErrors === "object"
            ? Object.values(validationErrors).map((error) =>
                typeof error === "string" ? error : error.msg,
              )
            : [];

        setErrors(
          validationMessages.length > 0
            ? validationMessages
            : [data.message || "Error al validar los datos."],
        );
      } else {
        setErrors(["Error del servidor."]);
      }
    } catch {
      setErrors(["Error de conexión."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 w-full max-w-sm rounded-lg border border-gray-800 bg-gray-950 p-6 text-white shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white">
        Crear Cuenta
      </h1>

      {successMsg && (
        <p className="bg-green-200 text-green-800 p-2 mb-4">{successMsg}</p>
      )}

      {errors.length > 0 && (
        <ul className="bg-red-200 text-red-800 p-2 mb-4 list-disc pl-5">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="register-username" className="mb-1 block text-sm font-medium text-gray-200">
            Nombre de Usuario
          </label>
          <input
            id="register-username"
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-gray-200">
            Contraseña
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition placeholder:text-xs placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-gray-600"
            placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
          />
        </div>
        <div>
          <label htmlFor="register-first-name" className="mb-1 block text-sm font-medium text-gray-200">
            Nombre
          </label>
          <input
            id="register-first-name"
            type="text"
            name="first_name"
            value={formState.first_name}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 p-2.5 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label htmlFor="register-last-name" className="mb-1 block text-sm font-medium text-gray-200">
            Apellido
          </label>
          <input
            id="register-last-name"
            type="text"
            name="last_name"
            value={formState.last_name}
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
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="mt-5 text-sm text-gray-300">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="font-medium text-white underline underline-offset-4 hover:text-gray-300">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};