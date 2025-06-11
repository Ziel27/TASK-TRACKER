import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      console.log("Data successfully sent:", res.data);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
      setIsLoading(false);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="flex flex-col gap-4 bg-base-100 w-full max-w-md border-2 border-base-300 rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">Register</h1>
          <p className="text-sm text-gray-500 mb-4">
            Please fill the form below to create an account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="form-control">
            <span className="label-text">Name</span>
            <input
              type="text"
              placeholder="John Doe"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full mt-2"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Email</span>
            <input
              type="email"
              placeholder="john@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="input input-bordered w-full mt-2"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="input input-bordered w-full mt-2"
            />
          </label>

          <label className="form-control">
            <span className="label-text">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="input input-bordered w-full mt-2"
            />
          </label>

          <div className="flex flex-col gap-2 mt-4">
            <button
              type="submit"
              className={`btn btn-primary mb-1 ${loading ? "loading" : ""}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button type="button" className="btn btn-outline">
              Continue with Google
            </button>
          </div>
        </form>
        <div>
            <p className="text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-primary font-semibold link link-primary">
                Login here
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
