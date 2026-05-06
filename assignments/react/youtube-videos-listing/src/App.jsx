import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const formatViews = (views) => {
    if (views >= 1000000) return Math.floor(views / 1000000) + "M";
    if (views >= 1000) return Math.floor(views / 1000) + "K";
    return views;
  };

  useEffect(() => {

    async function loadVideoListing() {
      const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=10&query=javascript&sortBy=mostViewed`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setVideos(data.data.data);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    }

    loadVideoListing();
  }, [page]);

  return (
    <>
      <section className="app">
        <div className="container">
          <header className="header">
            <h1>YouTube Videos Listing</h1>
            <p>Most viewed videos</p>
          </header>
          <div className="video-grid">
            {videos.map((video, index) => {
              const snippet = video.items?.snippet || {};
              const thumb = snippet.thumbnails?.medium.url || "";

              return (
                <a
                  key={`${video.items?.id}-${index}`}
                  href={`https://www.youtube.com/watch?v=${video.items?.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="video-card"
                >
                  <div className="thumbnail-wrapper">
                    <img
                      src={thumb}
                      alt={snippet.title}
                      className="thumbnail"
                    />
                  </div>

                  <div className="video-content">
                    <p className="video-title">{snippet.title}</p>

                    <div className="video-meta">
                      <p className="channel-name">{snippet.channelTitle}</p>
                      <p className="views">
                        {formatViews(video.items.statistics.viewCount)} views
                      </p>
                    </div>
                  </div>
                </a>
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
