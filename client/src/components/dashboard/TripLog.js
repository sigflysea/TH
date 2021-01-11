import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteTripLog } from '../../actions/profile';

const TripLog = ({ tripLog, deleteTripLog }) => {
    const trips = tripLog.map((trip) => (
        <tr key={trip._id}>
            <td>{trip.location}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{trip.from}</Moment> -{' '}
                {trip.to === null ? (
                    'Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{trip.to}</Moment>
                )}
            </td>
            <td className='hide-sm'>{trip.description}</td>
            <td>
                <button
                    className='btn btn-danger'
                    onClick={(e) => {
                        deleteTripLog(trip._id);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className='my-2'>Experience Crentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th className='hide-sm'>From</th>
                        <th className='hide-sm'>To</th>
                        <th className='hide-sm'>Description</th>
                    </tr>
                </thead>
                <tbody>{trips}</tbody>
            </table>
        </Fragment>
    );
};

TripLog.propTypes = {
    tripLog: PropTypes.array.isRequired,
    deleteTripLog: PropTypes.func.isRequired,
};

export default connect(null, { deleteTripLog })(TripLog);
