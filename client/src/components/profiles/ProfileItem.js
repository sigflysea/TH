import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        location,
        tripLog,
    },
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {tripLog.slice(0, 4).map((trip, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' />
                        {trip}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileItem;
