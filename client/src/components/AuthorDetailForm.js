import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const AuthorDetailForm = (props) => {

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
                
        }})
        .catch(err => console.log(err))
    }
    return(
        <div>
            <div className="row">
                <div className="col-5 m-auto shadow border p-5">
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
                <div className="col-5 m-auto shadow border p-5">
                    <form onSubmit={bookHandler}>
                        <h3>Add Book</h3>
                        {
                        errors.books ?
                        <p className="text-danger">{ errors.books.errors.title.message }</p>
                        : ""
                        }
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
    )
}

export default AuthorDetailForm;