import { Mail, Lock, User, Image, ArrowRight, Upload, Loader2Icon, CloudHail } from "lucide-react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helpers/uploadFile";
import api from "../lib/axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redex/userSlice";

export default function Register() {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({...prev,[name]: value,}));
    setErrors((prev) => ({...prev,[name]: "",}));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    return newErrors;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      setLoading(true);
      const response = await api.post( "/users/login",payload);

      toast.success(response.data.message || "User logedin successfully");

      if(response.data.success){
        dispatch(setToken(response?.data?.data?.token));
        dispatch(setUser(response?.data?.data?.user));
        localStorage.setItem('token', response?.data?.data?.token)
        setData({
          email: "",
          password: "",
        });
        navigate("/dashboard")
      }
    } catch (error) {
      toast.error( error?.response?.data?.message || "logedin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4 py-4 ">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 p-2 rounded-full bg-white flex items-center justify-center text-white shadow-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXObmZs8U7yfj4tBBUVJtPMw20K33J7DXLmnuf-SrsNQ&s=10" alt="" />
          </div>
        </div>


        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-green-600">
            Link<span className="text-black">Hub</span>
          </h1>
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className="bg-white rounded-2xl shadow-md border p-6 bg-cover bg-center bg-[url('')]">

            {/* Email */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">Email Address </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="name@company.com"
                  className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Passwords */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">  Password </label>

                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder="••••••••"
                    className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

            {/* forgot-password */}
            
            <p className="my-2 text-center"> <Link to="/forgot-password" className="hover:text-emerald-400 font-semibold"> Forgot Password </Link> </p>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full disabled:opacity-50 active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition"
            >
              {loading ? <Loader2Icon className="animate-spin" /> : "Sign in"}
              <ArrowRight size={18} />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 uppercase">
                Or Register With
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="border rounded-xl py-2 text-sm font-medium hover:bg-gray-50" >Google </button>
              <button type="button"  className="border rounded-xl py-2 text-sm font-medium hover:bg-gray-50"> GitHub </button>
            </div>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New to the space?{" "}
          <a
            href="/register"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
}
