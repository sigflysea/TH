import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTripLog } from '../../actions/profile';

const AddTripLog = ({ addTripLog, history }) => {
    const [formData, setFormData] = useState({
        location: '',
        from: '',
        to: '',
        description: '',
    });
    const [toDateDisabled, toggleDisabled] = useState(false);
    const {
        location,
        from,
        to,

        description,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>
            <h1 className='large text-primary'>Add An Trip</h1>
            <p className='lead'>
                <i className='fas fa-code-branch' /> Add trips you had in the
                past
            </p>

            <form
                className='form'
                onSubmit={(e) => {
                    e.preventDefault();
                    addTripLog(formData, history);
                }}
            >
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <h4>From Date</h4>
                    <input
                        type='date'
                        name='from'
                        value={from}
                        onChange={onChange}
                    />
                </div>

                <div className='form-group'>
                    <h4>To Date</h4>
                    <input
                        type='date'
                        name='to'
                        value={to}
                        onChange={onChange}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        name='description'
                        cols='30'
                        rows='5'
                        placeholder='Job Description'
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};
AddTripLog.propTypes = {
    addTripLog: PropTypes.func.isRequired,
};

export default connect(null, { addTripLog })(withRouter(AddTripLog));
