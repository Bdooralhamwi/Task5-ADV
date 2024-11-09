import { FormEvent, useState } from "react";
import "../css/auth.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    [key: string]: string;
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        fd.append(key, form[key]);
      }
    }

    const res = await fetch("https://test1.focal-x.com/api/login", {
      body: fd,
      method: "POST",
    });
    if (!res.ok) return;
    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/products");
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit}>
        <img src="/logo.png" alt="" />
        <h1>Sign In</h1>
        <span>Enter your credentials to access your account</span>
        <label>
          Email
          <input
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter your email"
            type="text"
          />
        </label>
        <label>
          Password
          <input
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter your password"
            type="password"
          />
        </label>
        <button>SIGN IN</button>
        <p>
          Don&apos;t have an account? <a href="/signup">Create one</a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
