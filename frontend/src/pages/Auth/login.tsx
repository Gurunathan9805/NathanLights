import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = (e: any) => {
    e.preventDefault();
    setUser({ name: loginData.email.split("@")[0], email: loginData.email });
    alert("Login successful!");
    navigate("account");
  };

  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {isSignup && (
              <input
                key="signup-name"
                type="text"
                placeholder="Full Name *"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded"
              />
            )}
            <input
              key="login-email"
              type="email"
              placeholder="Email *"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-700 text-white rounded"
            />
            <input
              key="login-password"
              type="password"
              placeholder="Password *"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-700 text-white rounded"
            />

            {!isSignup && (
              <div className="flex justify-between items-center text-sm">
                <label className="text-gray-300 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-amber-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-amber-400 hover:underline ml-2"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Google
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
