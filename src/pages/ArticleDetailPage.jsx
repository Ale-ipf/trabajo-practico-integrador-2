import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../config/api";

export const ArticleDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    id ? `${API_BASE_URL}/articles/${encodeURIComponent(id)}` : null,
  );
  const article = data?.article;

  return (
    <main className="mx-auto mt-8 w-full max-w-3xl p-4 text-left">
      <Link
        to="/home"
        className="font-medium text-blue-700 underline underline-offset-4"
      >
        Volver a los artículos
      </Link>

      {isLoading && (
        <p role="status" className="mt-6 text-blue-600">
          Cargando artículo...
        </p>
      )}

      {error && (
        <p role="alert" className="mt-6 text-red-600">
          No se pudo cargar el artículo: {error}
        </p>
      )}

      {!isLoading && !error && !article && (
        <p role="alert" className="mt-6 text-red-600">
          No se encontró el artículo solicitado.
        </p>
      )}

      {!isLoading && !error && article && (
        <article className="mt-6 rounded border bg-gray-900 p-6">
          <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
          {article.excerpt && (
            <p className="mb-4 text-gray-300 italic">{article.excerpt}</p>
          )}
          <div className="whitespace-pre-wrap border-t pt-4 text-gray-300">
            {article.content}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
            <span>Autor: {article.author?.username || "Anónimo"}</span>
            {article.status && <span>Estado: {article.status}</span>}
          </div>
        </article>
      )}
    </main>
  );
};
