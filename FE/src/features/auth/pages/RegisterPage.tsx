import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { clearError, registerUser } from "../authSlice";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast("Registration done successfully");

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="bg-black/45 text-white backdrop-blur-sm p-6 sm:p-8 shadow-2xl rounded-lg w-full max-w-sm sm:max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-4 sm:mb-6">
            <Link to="/" className="text-2xl sm:text-4xl font-bold text-blue-400">
              Jenova
            </Link>
          </div>

          <h1 className="text-center font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            {/* NAME INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-600 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Enter your username"
              />
              {errors.name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-600 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="your@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-600 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Address INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Address</label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-600 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Your Address"
              />
              {errors.address && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Phone Number INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phone_number")}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-600 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Your Phone Number"
              />
              {errors.phone_number && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Hidden role field - defaults to CUSTOMER */}
            <input type="hidden" {...register("role")} value="CUSTOMER" />

            <button
              type="submit"
              disabled={isLoading}
              onClick={notify}
              className="w-full bg-white text-black py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mt-4 sm:mt-6 text-sm sm:text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center mt-4 sm:mt-6 text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
