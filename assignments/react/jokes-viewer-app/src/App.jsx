import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [jokes, setJokes] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function loadJokes() {
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/randomjokes?limit=1`,
        );

        const data = await response.json();

        setJokes(data.data.data);
        
      } catch (error) {
        console.log(error)
      }
    }

    loadJokes();
  }, [page]);

  return (
    <>
    <section>
      <div>
        <h1>Random Jokes</h1>
        <div>
          {jokes.map(joke => {
            return (
              <div key={joke.id}>
                <p>{joke.content}</p>
              </div>
            )
          })}
        </div>

        <div>
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
          </div>
      </div>
    </section>
  
  </>
  )
  
}

export default App;
