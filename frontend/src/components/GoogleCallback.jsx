import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const encodedUserData = params.get("user");

      console.log("Token from URL:", token);
      console.log("Encoded user data from URL:", encodedUserData);

      if (token && encodedUserData) {
        localStorage.setItem("token", token);

        const decodedUserData = decodeURIComponent(encodedUserData);
        localStorage.setItem("user", decodedUserData);

        const user = JSON.parse(decodedUserData);

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        console.error("Missing token or user data in URL");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing Google callback data:", error);
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      Logging you in with Google...
    </div>
  );
}
