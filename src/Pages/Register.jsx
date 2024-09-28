import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in success:', result.user);
    } catch (error) {
      console.error('Error during Google sign in:', error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between min-h-screen">
        {/* Left side - iframe */}
        <div className="w-1/2 h-screen">
          <iframe
            className="w-full h-full md:hidden"
            src="https://my.spline.design/particles-26a7c0cbf60c64d77108e70ec528c5bd/"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 flex items-center justify-center min-h-screen bg-black md:w-screen">
          <form onSubmit={handleSubmit(onSubmit)} className="relative py-3 sm:max-w-xl sm:mx-auto border-t border-gray-900">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="text-center text-2xl text-gray-600">Register</div>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="fullname">Full Name</label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="text"
                      {...register("fullname", { required: "Full Name is required" })}
                    />
                    {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="password"
                      {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Sign up
                  </button>
                </div>
                <div className="mt-5 flex justify-center items-center">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    onClick={handleGoogleSignIn}
                  >
                    <svg viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336"></path>
                        <path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3"></path>
                        <path d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z" fill="#FFC107"></path>
                        <path d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z" fill="#00B060"></path>
                      
                    </svg>
                    <span className="ml-2">Sign up with Google</span>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <a className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" href="#">
                    Have an account? Log in
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
