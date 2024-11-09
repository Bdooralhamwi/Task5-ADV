import { FormEvent, useState } from "react";
import "../css/auth.css";
import Upload from "../icons/Upload";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    [key: string]: string | null | File;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_image: null | File;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        if (typeof form[key] == "string") fd.append(key, form[key]);
        else fd.append(key, form[key] as File, "profile.png");
      }
    }

    const res = await fetch("https://test1.focal-x.com/api/register", {
      body: fd,
      method: "POST",
    });
    if (!res.ok) return;
    const data = await res.json();

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    navigate("/products");
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit}>
        <img src="/logo.png" alt="" />
        <h1>Sign up</h1>
        <span>Fill in the following fields to create an account.</span>
        <label>
          Name
          <div>
            <input
              value={form.first_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, first_name: e.target.value }))
              }
              placeholder="First Name"
              type="text"
            />
            <input
              value={form.last_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, last_name: e.target.value }))
              }
              placeholder="Last Name"
              type="text"
            />
          </div>
        </label>
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
          <div>
            <input
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Enter password"
              type="password"
            />
            <input
              value={form.password_confirmation}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password_confirmation: e.target.value,
                }))
              }
              placeholder="Re-enter your password"
              type="password"
            />
          </div>
        </label>
        <label>
          Profile Image
          <input
            type="file"
            hidden
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                profile_image: e.target.files ? e.target.files[0] : null,
              }))
            }
          />
          <div className="fileUploader">
            <Upload />
          </div>
        </label>
        <button>SIGN UP</button>
        <p>
          Do you have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
