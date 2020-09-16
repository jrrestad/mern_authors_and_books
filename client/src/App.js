import React, { useEffect, useState } from 'react';
import Authors from './components/Authors'
import axios from 'axios';
import { Router, Link } from '@reach/router'
import AuthorDetail from './components/AuthorDetail';


function App() {

  const [allAuthors, setAllAuthors] = useState([]);
  const [errors, setErrors] = useState("")

  useEffect(() => {
      axios.get(`http://localhost:8000/api/author`)
      .then(res => {
          console.log(res.data)
          setAllAuthors(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  // if use state to make a variable called actions, set to 0
  // put actions number inside of square brackets (can make axios.get change)

  return (
    <>
    <div className="navbar navbar-fixed shadow">
      <h1>
        <Link to={"/"}>
            <span className="">
            Favorite Authors 
            </span>
          </Link>
      </h1>
    </div>
      <div className="container">
      <Router>
        <Authors 
          errors={errors} setErrors={setErrors}
          allAuthors={allAuthors} setAllAuthors={setAllAuthors} 
          path="/"/>
        <AuthorDetail
          errors={errors} setErrors={setErrors}
          allAuthors={allAuthors} setAllAuthors={setAllAuthors} 
          path={`/author/:id/`}/>
      </Router>
  </div>
  </>
  );
}

export default App;
