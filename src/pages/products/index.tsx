import Arrow from "../../icons/Arrow";
import Search from "../../icons/Search";
import MainLayout from "../../layouts/Main";
import "../../css/products.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useToken } from "../../hooks/useToken";
import { ProductType } from "../../types/products";

const Products = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const { token } = useToken();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [actionId, setActionId] = useState(-1);
  const [search, setSearch] = useState("");
  const [initProducts, setInitProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://test1.focal-x.com/api/items", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) return;
      const data = await res.json();

      setProducts(data);
      setInitProducts(data);
    })();
  }, []);

  const handleDelete = async () => {
    const res = await fetch(`https://test1.focal-x.com/api/items/${actionId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return;
    setProducts((prev) => {
      let tmp = [...prev];
      tmp = tmp.filter(({ id }) => id != actionId);
      return [...tmp];
    });
  };

  return (
    <>
      <ConfirmDelete open={open} setOpen={setOpen} onConfirm={handleDelete} />
      <MainLayout>
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setProducts(
                e.target.value
                  ? initProducts.filter(({ name }) =>
                      name.includes(e.target.value)
                    )
                  : initProducts
              );
            }}
            type="text"
            placeholder="Search product by name"
          />
          <button>
            <Search />
          </button>
        </form>
        <a href="/products/add" className="addProducts">
          ADD NEW PRODUCT
        </a>
        <div className="productsGrid">
          {products
            .slice(page * 8, page * 8 + 8)
            .map(({ id, image_url, name }, i) => (
              <a
                key={i}
                href={`/products/${id}`}
                style={{
                  backgroundImage: `url(${image_url})`,
                }}
              >
                <p>{name}</p>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/products/add/${id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(true);
                      setActionId(id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </a>
            ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => {
              setPage(Math.max(page - 1, 0));
            }}
          >
            <Arrow />
          </button>
          {new Array(Math.ceil(products.length / 8))
            .fill("")
            .map((_, number) => (
              <button
                className={page == number ? "active" : ""}
                onClick={() => {
                  setPage(number);
                }}
                key={number}
              >
                {number + 1}
              </button>
            ))}
          <button
            onClick={() => {
              setPage(Math.min(page + 1, products.length - 1));
            }}
          >
            <Arrow />
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default Products;
