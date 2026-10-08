import { Navigate, Outlet, useOutletContext } from "react-router";

export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";
  const outletContext = useOutletContext();
  return isLogged ? (
    <Outlet context={outletContext} />
  ) : (
    <Navigate to="/login" replace />
  );
};