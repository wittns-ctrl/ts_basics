import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { persistAuth } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      navigate("/login?error=" + encodeURIComponent(error));
      return;
    }

    if (accessToken && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        persistAuth(user, accessToken, refreshToken);
        // Redirect based on role
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "owner") navigate("/owner");
        else navigate("/customer");
      } catch {
        navigate("/login?error=Invalid+OAuth+response");
      }
    } else {
      navigate("/login?error=OAuth+failed");
    }
  }, [searchParams, navigate, persistAuth]);

  return (
    <div className="oauth-callback-page">
      <span className="spinner" style={{ borderColor: 'rgba(245,166,35,0.2)', borderTopColor: '#f5a623', width: 40, height: 40, borderWidth: 3, borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
      <p>Completing sign-in...</p>
    </div>
  );
}
