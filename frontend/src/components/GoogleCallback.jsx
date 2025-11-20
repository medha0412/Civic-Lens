import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export  function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const encodedUserData = params.get("user");

    if (token && encodedUserData) {
      localStorage.setItem("token", token);

      const userData = decodeURIComponent(encodedUserData);
      localStorage.setItem("user", userData);

      const user = JSON.parse(userData);

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-lg">
      Logging you in with Google...
    </div>
  );
}
