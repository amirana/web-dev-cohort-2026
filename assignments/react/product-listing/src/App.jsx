import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=10`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setProducts(data.data.data);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, [page]);

  return (
    <>
      <section className="app">
        <div className="container">
          <header className="header">
            <h1>Products Listing</h1>
            <p>Modern product showcase UI</p>
          </header>

          <div className="products-grid">
            {products.map((product, index) => {
              return (
                <div key={product.id} className="product-card">
                  <div className="image-wrapper">
                    <span className="discount-badge">
                      -{Math.floor(product.discountPercentage)}%
                    </span>

                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="thumbnail"
                    />
                  </div>

                  <div className="product-content">
                    <div className="product-top">
                      <p className="brand">{product.brand}</p>
                      <p className="category">{product.category}</p>
                    </div>

                    <h2 className="title">{product.title}</h2>

                    <div className="product-bottom">
                      <div>
                        <p className="price">${product.price}</p>
                      </div>

                      <div className="product-info">
                        <p className="rating">⭐ {product.rating}</p>
                        <p className="stock">{product.stock} in stock</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="page-btn"
            >
              Prev
            </button>

            <span className="page-number">{page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
