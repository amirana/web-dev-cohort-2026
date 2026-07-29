import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages] = useState(5);

  async function loadQuotes(pageNum) {
    const url = `https://api.freeapi.app/api/v1/public/quotes?page=${pageNum}&limit=10`;
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      const data = await res.json();
      setQuotes((prev) => [...prev, ...data.data.data]);
      setLoading(false);
      setTimeout(() => setVisible(true), 60);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuotes(page);
  }, [page]);

  function handleNext() {
    setVisible(false);
    setTimeout(() => {
      const next = currentIndex + 1;
      if (next >= quotes.length) {
        if (page < totalPages) setPage((p) => p + 1);
        setCurrentIndex(next % quotes.length || 0);
      } else {
        setCurrentIndex(next);
      }
      setVisible(true);
    }, 300);
  }

  const quote = quotes[currentIndex];
  const globalNum = currentIndex + 1;
  const totalLoaded = quotes.length;

  return (
    <div className="app">
        <div className="top-bar">
          <span className="wordmark">Quotidian</span>
          {!loading && (
            <span className="counter">
              {globalNum} / {totalLoaded + (page < totalPages ? "+" : "")}
            </span>
          )}
        </div>

        <div className="stage">
          {loading ? (
            <div className="loading-state">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          ) : quote ? (
            <div className={`quote-wrap ${visible ? "visible" : ""}`}>
              <span className="opening-mark">"</span>
              <p className="quote-text">{quote.content}</p>
              <div className="quote-author">
                <div className="author-line" />
                <span className="author-name">{quote.author}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="bottom-bar">
          <span className="nav-hint">
            {page < totalPages ? `Page ${page} of ${totalPages}` : "All quotes loaded"}
          </span>
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={loading}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

export default App;
