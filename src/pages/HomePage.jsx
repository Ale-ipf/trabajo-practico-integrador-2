import { useFetch } from "../hooks/useFetch";
import { useOutletContext } from "react-router";
import { Inicio } from "../components/Inicio";
import { API_BASE_URL } from "../config/api";

export const HomePage = () => {
  const { profile, profileLoading, profileError } = useOutletContext();
  const { data, isLoading, error } = useFetch(`${API_BASE_URL}/articles`);

  const articles = data?.articulos || [];

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
              <article key={article.id} className="border p-4 rounded bg-white">
                <h2 className="font-bold text-xl mb-1">{article.title}</h2>
                <p className="text-sm text-gray-500 italic mb-2">
                  Resumen: {article.excerpt}
                </p>

                {/* Aquí agregamos el contenido completo del artículo */}
                <div className="text-gray-800 my-3 whitespace-pre-wrap border-t pt-2">
                  {article.content}
                </div>

                <span className="bg-gray-200 text-xs px-2 py-1 inline-block mt-2">
                  Autor: {article.author?.username || "Anónimo"}
                </span>
              </article>
            ))}
        </div>
      </main>
    </div>
  );
};