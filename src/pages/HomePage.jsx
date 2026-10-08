import { useFetch } from "../hooks/useFetch";
import { useOutletContext } from "react-router";
import { Link } from "react-router";
import { Inicio } from "../components/Inicio";
import { API_BASE_URL } from "../config/api";

export const HomePage = () => {
  const { profile, profileLoading, profileError } = useOutletContext();
  const { data, isLoading, error } = useFetch(`${API_BASE_URL}/articles`);

  const articles = data?.articles || data?.articulos || [];

  return (
    <div>
      <Inicio
        nombre={
          profileLoading
            ? "Cargando..."
            : profile?.user?.username || "Usuario"
        }
      />
      <main className="p-4 max-w-3xl mx-auto mt-4">
        {profileError && (
          <p role="alert" className="mb-4 text-red-600">
            Error al cargar los datos de la cuenta: {profileError}
          </p>
        )}

        <h1 className="text-2xl font-bold mb-4">Artículos Publicados</h1>

        {isLoading && <p className="text-blue-600">Cargando...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!isLoading && !error && articles.length === 0 && (
          <p>No hay artículos publicados.</p>
        )}

        <div className="flex flex-col gap-4">
          {!isLoading &&
            !error &&
            articles.map((article) => (
              <article
                key={article.id}
                className="rounded border border-gray-700 bg-gray-900 p-4 text-gray-100"
              >
                <h2 className="mb-1 text-xl font-bold text-white">
                  {article.title}
                </h2>
                <p className="mb-2 text-sm italic text-gray-300">
                  Resumen: {article.excerpt}
                </p>

                <span className="mt-2 inline-block bg-gray-800 px-2 py-1 text-xs text-gray-200">
                  Autor: {article.author?.username || "Anónimo"}
                </span>
                <Link
                  to={`/articles/${article.id}`}
                  className="mt-3 inline-block font-medium text-blue-300 underline underline-offset-4 hover:text-blue-200"
                >
                  Leer artículo
                </Link>
              </article>
            ))}
        </div>
      </main>
    </div>
  );
};