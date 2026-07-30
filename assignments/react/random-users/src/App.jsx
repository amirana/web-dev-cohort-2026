import { use, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [page, setPages] = useState(1)
  const [totalPage, setTotalPages] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=10`)
        const data = await response.json()

        setUsers(data.data.data)

      } catch (error) {
        console.log(error)
      }
    }

    loadUsers()
  }, [page])


  return (
    <>
      <section id="app">
        <div className='container'>
          <div>
            <h1>Random Users</h1>
            {users.map(user => (
              <article key={user.id}>
                <img src={user.picture.large} alt={user.name.first} />
                <div>
                  <h3>{user.name.title}. {user.name.first} {user.name.last}</h3>
                  <address>
                    <p>{user.location.street.number}, {user.location.street.name}</p>
                    <span>{user.location.city}</span>, <span>{user.location.country}</span>
                    <span> - {user.location.postcode}</span>
                  </address>
                </div>
                <div>
                  <p>{user.email}</p>
                  <p>{user.cell}</p>
                </div>
              </article>
              
            ))}
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
              disabled={page === totalPage}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
