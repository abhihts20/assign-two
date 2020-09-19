import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import '../App.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <Link className="nav-link" to="/users/create">Create</Link>
                    <Link className="nav-link" to="/users/view">View</Link>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)
