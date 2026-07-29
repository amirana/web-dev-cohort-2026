import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(null);

  useEffect(() => {
    async function loadMeals() {
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=12`,
        );
        const data = await response.json();
        setMeals(data.data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMeals();
  }, [page]);
  return (
    <>
      <section>
        <div>
          <h1>Meals</h1>
          <div>
            {meals.map((meal) => {
              return (
                <article key={meal.id}>
                  <div>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                  </div>
                  <div>
                    <h2>{meal.strMeal}</h2>

                    <p>{meal.strArea}</p>
                    <p>{meal.strCategory}</p>
                  </div>
                  <div>
                    <p>{meal.strInstructions}</p>
                  </div>
                  <div>
                    <a href={meal.strYoutube} target="_blank">
                      Watch on YouTube
                    </a>
                    <a href={meal.strSource} target="_blank">
                      Follow on Instagram
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div>
            <button
              onClick={() => setPage((page) => page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((page) => page + 1)}
              disabled={page === totalPage}
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
