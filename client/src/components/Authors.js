import React, { useState } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import '../App.css';

const Authors = (props) => {


    const { allAuthors, setAllAuthors, errors, setErrors } = props;

    const [ author, setAuthor ] = useState({
        name: ''
    })

    const deleteHandler = (i) => {
        if (window.confirm("Are you SURE you want to delete this author and all of their books?")) {
        axios.delete(`http://localhost:8000/api/author/delete/${allAuthors[i]._id}`)
        .then(res => {
            const [...tempAuthors] = allAuthors;
            tempAuthors.splice(i, 1);
            setAllAuthors(tempAuthors)
        })
        .catch(err => console.log(err))
        }
    }

    const createAuthor = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/author`, author)
        .then(res => {
            if (res.data.errors) {
                setErrors(res.data.errors)
            } else {
                console.log(res.data)
                setAllAuthors([...allAuthors, res.data])
        }})
        .catch(err => console.log(err))
    }

    const changeHandler = (e) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    }

    return(
        <div>
            <div className="col-6 p-5 border shadow my-5 mx-auto">
                <form onSubmit={createAuthor}>
                    <h1 className="text-center">Add an Author</h1>
                {
                    errors.name ?
                    <p className="text-danger">{ errors.name.message }</p>
                    : ""
                }
                <input className="form-control" type="text" required name="name" placeholder="Add an author..." onChange={changeHandler}/>
                <br/>
                <input className="form-control btn btn-primary" type="submit" value="Add author"/>
            </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Books</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allAuthors.map((item, i) => 
                        <tr key={i}>
                            <td>
                                <Link to={`/author/${item._id}`}>{item.name}</Link>
                            </td>
                            <td>
                                {
                                item.books[0] ?
                                <ol className="book-scroll">
                                    {item.books.map((book, j) =>
                                        <li key={j}>{book.title}</li>
                                    )}
                                </ol>
                                :
                                <p className="text-muted">Nothing so far...</p>
                                }
                            </td>
                            <td><Link to={`/author/${item._id}`}>Edit</Link>
                                <span className="ml-3">|</span>
                                <button className="btn-link btn mb-1" type="submit" onClick={ () => deleteHandler(i) }>
                                        Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Authors;