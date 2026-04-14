import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export  function Signup({ setIsLoggedIn, setUserRole }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields before registering");
      return;
    }
    setIsSubmitting(true);
    try {
      const signupPayload = { ...formData, city: "Not specified" };
      const res = await axios.post(API_ENDPOINTS.SIGNUP, signupPayload);
      alert(res.data.message);

      navigate("/dashboard");

      // Extract user data from response
      const user = res.data.data?.user || { role: 'user' };
      localStorage.setItem("user", JSON.stringify(user));
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Update App state
      setIsLoggedIn(true);
      setUserRole(user.role);

      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleSignup = () => {
    window.location.href = API_ENDPOINTS.GOOGLE_AUTH;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-transparent px-4 py-10">
      <div className="section w-full max-w-md p-8 border border-border">
      <h1 className="text-4xl font-bold mb-8 text-card-foreground text-center">Create Your Account</h1>

      <div className="card p-8 rounded-2xl shadow-2xl w-full border border-border">

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {/* FORM START */}
        <form onSubmit={handleSubmit} aria-busy={isSubmitting}>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full mb-4 p-3 bg-input border border-border rounded-lg text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mb-4 p-3 bg-input border border-border rounded-lg text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mb-6 p-3 bg-input border border-border rounded-lg text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full button-primary py-3 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                <path className="opacity-90" fill="currentColor" d="M22 12a10 10 0 0 0-10-10v4a6 6 0 0 1 6 6h4Z" />
              </svg>
            )}
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        {/* FORM END */}

        {/* DIVIDER */}
        <div className="flex items-center justify-center my-6">
          <span className="h-[1px] bg-border w-1/4"></span>
          <span className="px-3 text-muted-foreground text-sm">or</span>
          <span className="h-[1px] bg-border w-1/4"></span>
        </div>

        {/* GOOGLE BUTTON — OUTSIDE FORM */}
        <button
          type="button"
          onClick={googleSignup}
          className="w-full flex items-center justify-center gap-2 bg-card border border-border py-2.5 rounded-lg hover:bg-muted transition text-card-foreground font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign up with Google</span>
        </button>

      </div>
      </div>

      <p className="mt-6 text-lg text-card-foreground">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Log In
        </a>
      </p>
    </div>
  );
}
