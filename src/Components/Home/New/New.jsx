import axios from "axios";
import { useEffect, useState } from "react";
import "./New.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../../CartSlice/CartSlice";
import { useDispatch } from "react-redux";
import Popular from "../Popular/Popular";

const Products = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const dispatch = useDispatch();

  // Fetch API
  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/api/products/")
      .get("https://backend-fullstack-5.onrender.com/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // BRAND FILTER FUNCTION
  const handleBrandFilter = (brand) => {
    if (brand === "All") {
      setFilteredProducts(null);
      return;
    }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(brand.toLowerCase())
    );

    setFilteredProducts(result);
  };

  // 🔥 SEARCH FILTER (already fully working)
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return;
    }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(result);
  }, [searchTerm, products]);

  return (
    <>
      <div className="products-section">
        <Popular onBrandSelect={handleBrandFilter} />

        <h1 className="products-title">Our Products</h1>

        <div className="marquee">
          <span>Puma ------ Adidas ------ Nike ------ Rebook ------ Vans</span>
        </div>

        {/* FILTERED PRODUCTS */}
        {filteredProducts && (
          <>
            <h2>Filtered by brand</h2>
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div className="product-card" key={p.id}>
                  <div className="product-image">
                    <Link to={`/viewproducts/${p.id}`}>
                      <img src={p.image} alt={p.name} />
                    </Link>
                  </div>

                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">₹{p.price}</p>

                  <button
                    className="add-btn"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ALL PRODUCTS WHEN NO FILTER */}
        {!filteredProducts && (
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p.id}>
                <div className="product-image">
                  <Link to={`/viewproducts/${p.id}`}>
                    <img src={p.image} alt={p.name} />
                  </Link>
                </div>

                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">₹{p.price}</p>

                <button
                  className="add-btn"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
