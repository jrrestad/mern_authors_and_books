import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import '../App.css';

const AuthorDetail = (props) => {

    const { id, errors, setErrors, allAuthors, setAllAuthors } = props;

    const [author, setAuthor] = useState(allAuthors.filter(auth => auth._id === id)[0])
    
    // instantiated to set real-time validation
    const [ title, setTitle ] = useState('')
    const [ namer, setName ] = useState('')

    const changeHandler = (e) => {
        setAuthor({
          ...author,
          [e.target.name]: e.target.value
        });
        setName(e.target.value)
      }

    // Clear input form after book is added
    const clearForm = () => {
        document.getElementById("clearForm").reset();
    }

      const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/author/update/${id}`, author)
        .then(res => {
            if (res.data.errors) {
                console.log(res.data)
                setErrors(res.data.errors)
            } else {
                axios.get(`http://localhost:8000/api/author`)
                .then(res => {
                    console.log(res.data)
                    setAllAuthors(res.data)
                })
                .catch(err => console.log(err))
                alert(`Author name successfully changed to ${author.name}`)
                navigate(`/`)
        }})
        .catch(err => console.log(err))
    }

    const bookHandler = (e) => {
        e.preventDefault();
        const book = {
            title: e.target['title'].value,
        }
        axios.patch(`http://localhost:8000/api/author/${id}/book`, book)
        .then(res => {
            if (res.data.errors) {
                console.log(res.data)
                setErrors(res.data.errors)
            } else {
                console.log(res.data)
                setAuthor(res.data)
                setErrors('')
                clearForm()
                
        }})
        .catch(err => console.log(err))
    }

    const deleteHandler = (e) => {
        e.preventDefault();
            const bId = e.target['deleteBook'].value
            axios.patch(`http://localhost:8000/api/author/${id}/book/delete/${bId}`)
            .then(res => {
                console.log(res.data)
                setAuthor(res.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="container">
            <h1 className="my-3">Author: <span className="ml-2">{author.name}</span></h1>

            <div className="row">
                <div className="col-6 border-bottom">
                    <h1 className="book-scroll-2"><ol>
                    {
                        author.books.slice(0).reverse().map( (book, j ) => 
                        <h3 key={j}><li>
                            {book.title}
                            </li></h3>
                        )}
                    </ol>
                    </h1>
                </div>
                <div className="col">
                    <div className="mb-5 shadow border p-5">
                        <form onSubmit={ submitHandler }>
                            <h3>Update Author</h3>
                            {
                                errors.name ?
                                <p className="text-danger">{ errors.name.message }</p>
                                : ""
                            }
                            {
                                namer.length < 3 && namer.length !== 0 && !errors.name ?
                                <p className="text-danger">Author name min length is 3 characters.</p>
                                : ''
                            }
                            <input className="form-control" value={author.name} type="text" name="name" required onChange={ changeHandler }/>
                            <br/>
                            <input className="btn btn-primary form-control" type="submit" value="Submit"/>
                        </form>
                    </div>
                    <div className="m-auto shadow border p-5">
                        <form id="clearForm" onSubmit={bookHandler}>
                            <h3>Add Book</h3>
                            {
                            errors.books ?
                            <p className="text-danger">{ errors.books.errors.title.message }</p>
                            : ""
                            }
                            {/* Above sets the error using the msg from back-end validations. Below renders it dynamically */}
                            {
                                title.length < 2 && title.length !== 0 && !errors.books ?
                                <p className="text-danger">A book title minimum length is 2 characters.</p>
                                : ""
                            }
                            <input className="form-control" type="text" name="title" required onChange={ (e) => setTitle(e.target.value)}/>
                            <br/>
                            <input className="btn btn-primary form-control" type="submit" value="Add Book"/>
                        </form>
                    </div>
                </div>
            </div>
            {
                author.books[0] ?
            <form className="mt-3" onSubmit={deleteHandler}>
                <select name="deleteBook">
                    {
                        author.books.map( (book, j) =>
                        <option key={j} value={book._id}>{book.title}</option>
                        )
                    }
                </select>
                <button className="bg-danger text-white ml-3">Delete Book</button>
            </form>
            : ''
            }
        </div>
    )
}

export default AuthorDetail;