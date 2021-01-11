import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i class='far fa-compass'></i> DevConnector
                </Link>
            </h1>
            {isAuthenticated ? (
                <ul>
                    <li>
                        <Link to='/profiles'>Members</Link>
                    </li>
                    <li>
                        <Link to='/posts'>Posts</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>
                            <i className='fas fa-user'></i>{' '}
                            <span className='hide-sm'>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <a onClick={logout} href='#!'>
                            <i className='fas fa-sign-out-alt'></i>{' '}
                            <span className='hide-sm'>Logout</span>
                        </a>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to='profiles'>Members</Link>
                    </li>
                    <li>
                        <Link to='/register'>Register</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
