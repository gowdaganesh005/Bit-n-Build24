import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = getAuth();
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 
      setCurrentUser(user);
      console.log("User logged in:", user);
      navigate("/user-inventory");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email. Please register.");
      } else {
        setErrorMessage("Error logging in. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      console.log("User signed in with Google:", result.user);
      navigate("/user-inventory");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex items-center justify-between min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen bg-black">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto border-t border-gray-900">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="text-center text-2xl text-gray-600">Login</div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
                  <input 
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="email" 
                    id="email" 
                    {...register("email", { required: "Email is required" })} 
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
                  <input 
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    type="password" 
                    id="password" 
                    {...register("password", { required: "Password is required" })} 
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>
                <div className="text-red-500 text-center mb-4">
                  {errorMessage} 
                </div>
                
                <div className="flex justify-center mt-5">
                  <button 
                    type="submit" 
                    className="flex items-center justify-center py-2 px-20 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-5 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 h-screen">
        <iframe
          className="w-full h-full"
          src="https://my.spline.design/particles-26a7c0cbf60c64d77108e70ec528c5bd/"
          allowFullScreen
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default Login;
