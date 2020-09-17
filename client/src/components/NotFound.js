import React from 'react'
import { Link } from '@reach/router';

const NotFound = () => {
    return(
        <div className="container mt-5 mx-auto">
            <h1 className="text-center">We're sorry, but we could not find the author you are looking for.
                 Click <Link to="/">here</Link> to return.</h1>

        </div>
    )
}

export default NotFound;