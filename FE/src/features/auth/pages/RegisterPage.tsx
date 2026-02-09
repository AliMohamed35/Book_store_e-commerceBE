import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { clearError, registerUser } from "../authSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
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
                placeholder="Your Address"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition mt-5"
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
    </>
  );
};

export default RegisterPage;
