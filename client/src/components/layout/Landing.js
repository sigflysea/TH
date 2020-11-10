import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard'></Redirect>;
    }
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Travel Hack</h1>
                    <p className='lead'>
                        Let the travel hackers to help you plan your trips and
                        be a travel hacker to share your travel wisdom with
                        others
                    </p>
                    <div className='buttons'>
                        <Link to='register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
