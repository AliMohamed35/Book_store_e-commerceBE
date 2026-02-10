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

  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

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
    // navigate("/login")
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
      <div className="relative z-10 min-h-screen">
        <header className="p-5 text-white flex items-center justify-between">
          <div className="text-2xl font-bold">Jenova</div>
          <Link to={"/login"} className="font-bold text-xl underline">
            Login
          </Link>
        </header>
        <div className="flex items-center justify-center min-h-[calc(100vh-76px)] px-4">
          <ToastContainer />
          <div className="bg-[#00000045] text-white backdrop-blur-sm p-8 shadow-2xl rounded-lg w-full max-w-md">
            <h1 className="text-center font-bold text-2xl mb-6">Register</h1>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                {/* NAME INPUT */}
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  placeholder="Enter your username"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 mb-2">
                    {errors.name.message}
                  </p>
                )}

                {/* EMAIL INPUT */}
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}

                {/* Password INPUT */}
                <label className="mt-3 block text-sm font-meduim mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}

                {/* Address INPUT */}
                <label className="mt-3 block text-sm font-meduim mb-1">
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}

                {/* Phone Number INPUT */}
                <label className="mt-3 block text-sm font-meduim mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phone_number")}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Phone Number"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone_number.message}
                  </p>
                )}

                {/* Hidden role field - defaults to CUSTOMER */}
                <input type="hidden" {...register("role")} value="CUSTOMER" />

                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={notify}
                  className="w-full bg-whtie text-black py-2 rounded-lg hover:bg-black hover:text-white disabled:bg-blue-300 transition bg-white mt-4"
                >
                  {isLoading ? "Processing" : "Register"}
                </button>
              </div>
            </form>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Login in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
