import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { API_BASE_URL } from "../config/api";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("isLogged") === "true";
  const profileUrl = isLogged ? `${API_BASE_URL}/auth/profile` : null;
  const profileKey = profileUrl ? `${location.pathname}:${profileUrl}` : null;
  const [profileRequest, setProfileRequest] = useState({
    key: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!profileUrl || !profileKey) return;

    let isCurrent = true;

    const fetchProfile = async () => {
      try {
        const response = await fetch(profileUrl, {
          credentials: "include",
        });

        if (response.status === 401) {
          localStorage.removeItem("isLogged");
          navigate("/login", {
            replace: true,
            state: { sessionExpired: true },
          });
          return;
        }

        if (!response.ok) {
          throw new Error(
            `No se pudo cargar el perfil (HTTP ${response.status}).`,
          );
        }

        const data = await response.json();
        if (isCurrent) {
          setProfileRequest({ key: profileKey, data, error: null });
        }
      } catch (error) {
        if (isCurrent) {
          setProfileRequest({
            key: profileKey,
            data: null,
            error:
              error instanceof Error
                ? error.message
                : "Error de conexión al cargar el perfil.",
          });
        }
      }
    };

    fetchProfile();

    return () => {
      isCurrent = false;
    };
  }, [navigate, profileKey, profileUrl]);

  const isCurrentProfile = profileRequest.key === profileKey;
  const profile = isCurrentProfile ? profileRequest.data?.profile : null;
  const profileLoading = Boolean(profileKey) && !isCurrentProfile;
  const profileError = isCurrentProfile ? profileRequest.error : null;

  return (
    <>
      <Navbar nombre={profile?.user?.username || "Anonimo"} />
      <Outlet context={{ profile, profileLoading, profileError }} />
      <Footer />
    </>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
