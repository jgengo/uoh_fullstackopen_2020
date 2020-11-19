import React from 'react';

const Error = ({error}) => {
    if (error !== '') {
        return (
            <div>
                {error}
            </div>
        );
    }
}

export default Error;