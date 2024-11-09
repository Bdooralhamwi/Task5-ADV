import MainLayout from "../../layouts/Main";
import "../../css/products.css";
import Arrow from "../../icons/Arrow";
import Upload from "../../icons/Upload";
import { FormEvent, useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";
import { ProductType } from "../../types/products";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const { token } = useToken();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const navigate = useNavigate();
  const [form, setForm] = useState<{
    [key: string]: string | null | File;
    name: string;
    price: string;
    image: null | File;
  }>({
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`https://test1.focal-x.com/api/items/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      const data: ProductType = await res.json();

      setProduct(data);
      setForm({
        name: data.name,
        price: data.price,
        image: null,
      });
    })();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        if (typeof form[key] == "string") fd.append(key, form[key]);
        else fd.append(key, form[key] as File, "profile.png");
      }
    }
    if (id) fd.append("_method", "PUT");

    const res = await fetch(
      `https://test1.focal-x.com/api/items${id ? "/" + id : ""}`,
      {
        body: fd,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) navigate("/products");
  };
  return (
    <MainLayout>
      <button className="backButton" onClick={() => history.back()}>
        <Arrow />
      </button>
      <form onSubmit={handleSubmit} className="addProduct">
        <h1>{id ? "EDIT ITEM" : "ADD NEW ITEM"}</h1>
        <div>
          <div>
            <p>Name</p>
            <input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              placeholder="Enter the product name"
            />
            <p className="extraMargin">Price</p>
            <input
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
              type="text"
              placeholder="Enter the product price"
            />
          </div>
          <div>
            <p>Image</p>
            <label
              style={{
                backgroundImage: `url(${
                  form.image
                    ? URL.createObjectURL(form.image)
                    : product
                    ? product.image_url
                    : ""
                })`,
              }}
            >
              {form.image || product ? "" : <Upload />}
              <input
                type="file"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    image: e.target.files ? e.target.files[0] : null,
                  }))
                }
                hidden
              />
            </label>
          </div>
        </div>
        <button>Save</button>
      </form>
    </MainLayout>
  );
};

export default AddProduct;
