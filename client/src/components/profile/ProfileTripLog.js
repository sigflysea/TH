import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileTripLog = ({
    tripLog: { location, current, to, from, description },
}) => (
    <div>
        <p>
            <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
            {!to ? (
                ' Now'
            ) : (
                <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>
            )}
        </p>

        <p>
            <strong>Location: </strong> {location}
        </p>
        <p>
            <strong>Description: </strong> {description}
        </p>
    </div>
);

ProfileTripLog.propTypes = {
    tripLog: PropTypes.object.isRequired,
};

export default ProfileTripLog;
