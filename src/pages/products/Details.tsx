import MainLayout from "../../layouts/Main";
import "../../css/products.css";
import Arrow from "../../icons/Arrow";
import { useToken } from "../../hooks/useToken";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../../types/products";

const ProductDetails = () => {
  const { id } = useParams(); 
  const { token } = useToken();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://test1.focal-x.com/api/items/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      const data = await res.json();

      setProduct(data);
    })();
  }, []);

  return (
    <MainLayout>
      <button className="backButton" onClick={() => history.back()}>
        <Arrow />
      </button>
      <div className="productDetails">
        <h1>{product?.name}</h1>
        <img src={product?.image_url} alt="" />
        <div>
          <p>
            Price: <span>{product?.price}$</span>
          </p>
          <p>
            Added at:{" "}
            <span>{product ? product.created_at.split("T")[0] : ""}</span>
          </p>
        </div>
        <p>
          updated at:{" "}
          <span>{product ? product.updated_at.split("T")[0] : ""}</span>
        </p>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
