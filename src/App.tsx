import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/products";
import AddProduct from "./pages/products/Add";
import ProductDetails from "./pages/products/Details";
import { useToken } from "./hooks/useToken";

const App = () => {
  const { token } = useToken();

  return (
    <Routes>
      <Route
        path="/signin"
        element={token ? <Navigate to="/products" /> : <Signin />}
      />
      <Route
        path="/signup"
        element={token ? <Navigate to="/products" /> : <Signup />}
      />
      <Route
        path="/products"
        element={!token ? <Navigate to="/signin" /> : <Products />}
      />
      <Route
        path="/products/add"
        element={!token ? <Navigate to="/signin" /> : <AddProduct />}
      />
      <Route
        path="/products/add/:id"
        element={!token ? <Navigate to="/signin" /> : <AddProduct />}
      />
      <Route
        path="/products/:id"
        element={!token ? <Navigate to="/signin" /> : <ProductDetails />}
      />
    </Routes>
  );
};

export default App;
