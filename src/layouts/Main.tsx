import { ReactNode } from "react";
import "../css/layout.css";
import Bookmark from "../icons/Bookmark";
import Logout from "../icons/Logout";
import Products from "../icons/Products";
import { useToken } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

const links = [
  {
    text: "Products",
    icon: <Products />,
    href: "/products",
  },
  {
    text: "Favorites",
    icon: <Bookmark />,
    href: "",
  },
  {
    text: "order list",
    icon: <Bookmark />,
    href: "",
  },
];

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { token, user } = useToken();
  const navigate = useNavigate();

  return (
    <div className="mainLayout">
      <div className="sidebar">
        <img className="logo" src="/logo.png" alt="" />
        <img className="avatar" src={user?.profile_image_url} alt="" />
        <p>
          {user?.first_name} {user?.last_name}
        </p>
        <div>
          {links.map(({ text, icon, href }, i) => (
            <a
              key={i}
              href={href}
              style={{
                backgroundColor: i == 0 ? "#feaf00" : "",
              }}
            >
              {icon}
              <span>{text}</span>
            </a>
          ))}
        </div>
        <button
          onClick={async () => {
            const res = await fetch("https://test1.focal-x.com/api/login", {
              method: "POST",
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            if (!res.ok) return;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/signin");
          }}
        >
          <span>Logout</span>
          <Logout />
        </button>
      </div>
      <div className="mainContent">{children}</div>
    </div>
  );
};

export default MainLayout;
