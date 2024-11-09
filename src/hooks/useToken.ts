import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useToken = () => {
  const { pathname } = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<null | {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    profile_image_url: string;
  }>();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
    } else {
      setUser(null);
    }
  }, [pathname]);

  return { token, user };
};

export { useToken };
