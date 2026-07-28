import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function loadCats() {
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=1`,
        );
        const data = await response.json();
        setCats(data.data.data);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.log(error.message);
      }
    }

    loadCats();
  }, [page]);
  return (
    <>
      <section className="app">
        <div className="container">
          <div className="hero">
            <h1>Ramdom cat breeds</h1>
          </div>
          <div className="cat-list">
            {cats.map((cat) => {
              return (
                <article className="cat-card" key={cat.id}>
                  <div className="cat-header">
                    <img src={cat.image} alt={cat.name} className="cat-image" />
                  </div>

                  <div className="cat-content">
                    <div className="cat-title">
                      <h2>{cat.name}</h2>
                    </div>
                    <p className="description">{cat.description}</p>

                    <div className="cat-info-grid">
                      <div className="info-box">
                        <span>Origin</span>
                        <strong>{cat.origin}</strong>
                      </div>

                      <div className="info-box">
                        <span>Life Span</span>
                        <strong>{cat.life_span}</strong>
                      </div>

                      <div className="info-box">
                        <span>Weight</span>
                        <strong>{cat.weight.metric} kg</strong>
                      </div>

                      <div className="info-box">
                        <span>Temperament</span>
                        <strong>{cat.temperament}</strong>
                      </div>
                    </div>

                    <div className="rating-grid">
                      <div className="rating">
                        <div className="rating-top">
                          <span>🐶 Dog Friendly</span>
                          <strong>{cat.dog_friendly}/5</strong>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.dog_friendly * 20}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="rating">
                        <div className="rating-top">
                          <span>👶 Child Friendly</span>
                          <strong>{cat.child_friendly}/5</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.child_friendly * 20}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="rating">
                        <div className="rating-top">
                          <span>❤️ Affection</span>
                          <strong>{cat.affection_level}/5</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.affection_level * 20}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="rating">
                        <div className="rating-top">
                          <span>⚡ Energy</span>
                          <strong>{cat.energy_level}/5</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.energy_level * 20}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="rating">
                        <div className="rating-top">
                          <span>🧠 Intelligence</span>
                          <strong>{cat.intelligence}/5</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.intelligence * 20}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="rating">
                        <div className="rating-top">
                          <span>🐾 Social Needs</span>
                          <strong>{cat.social_needs}/5</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${cat.social_needs * 20}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="links">
                      <a
                        href={cat.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia
                      </a>
                      <a
                        href={cat.vetstreet_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Vetstreet
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="page-indicator">
          <button
            onClick={() => setPages((page) => page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => setPages((page) => page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
          <p>
            Page {page} of {totalPages}
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
