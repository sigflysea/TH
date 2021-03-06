import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileTripLog from './ProfileTripLog';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match,
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        GO BACK{' '}
                    </Link>
                    {auth.isAuthenticated &&
                        auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                {' '}
                                Edit Profile{' '}
                            </Link>
                        )}

                    <div class='profile-grid my-1 profile-about bg-light p-2'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />

                        <h2 className='text-primary'>Trips</h2>
                        {profile.tripLog.length > 0 ? (
                            <Fragment>
                                {profile.tripLog.map((tripLog) => (
                                    <ProfileTripLog
                                        key={tripLog._id}
                                        tripLog={tripLog}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <h4>No trip log</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
