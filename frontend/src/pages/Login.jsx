import { useState } from "react";
import { ShieldCheck, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    const response = await login(
      formData.email,
      formData.password
    );

    if (response.success) {

      navigate("/dashboard");

    } else {

      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#050816]
        flex
        items-center
        justify-center
        px-6
        relative
        overflow-hidden
      "
    >
      
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-cyan-500/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-blue-500/10
          blur-3xl
          rounded-full
        "
      />

      {/* LOGIN CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-[480px]
          bg-[#0b1120]
          border border-cyan-900/20
          rounded-3xl
          p-10
          shadow-[0_0_40px_rgba(34,211,238,0.08)]
        "
      >
        
        {/* HEADER */}
        <div className="text-center mb-10">
          
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-3xl
              bg-cyan-500/10
              border border-cyan-500/20
              flex
              items-center
              justify-center
              mb-6
            "
          >
            <ShieldCheck
              size={40}
              className="text-cyan-400"
            />
          </div>

          <h1 className="text-4xl font-bold text-white">
            ForensAR Nexus
          </h1>

          <p className="text-gray-400 mt-3">
            AI-Powered Forensic Intelligence System
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-6
              bg-red-500/10
              border border-red-500/20
              rounded-2xl
              p-4
              text-red-400
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          {/* EMAIL */}
          <div>
            
            <label className="text-sm text-gray-400 mb-3 block">
              Email Address
            </label>

            <div
              className="
                flex items-center gap-4
                bg-[#111827]
                border border-cyan-900/20
                rounded-2xl
                px-5 py-4
              "
            >
              
              <Mail
                size={18}
                className="text-cyan-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-white
                  placeholder:text-gray-500
                "
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            
            <label className="text-sm text-gray-400 mb-3 block">
              Password
            </label>

            <div
              className="
                flex items-center gap-4
                bg-[#111827]
                border border-cyan-900/20
                rounded-2xl
                px-5 py-4
              "
            >
              
              <Lock
                size={18}
                className="text-cyan-400"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-white
                  placeholder:text-gray-500
                "
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-2xl
              bg-cyan-400
              hover:bg-cyan-300
              disabled:opacity-50
              text-black
              font-semibold
              transition-all duration-300
              shadow-[0_0_20px_rgba(34,211,238,0.3)]
            "
          >
            {loading
              ? "Authenticating..."
              : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Don’t have an account?{" "}
          
          <Link
            to="/register"
            className="
              text-cyan-400
              hover:text-cyan-300
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;