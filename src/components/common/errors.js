import React from 'react';
import { Errors } from 'react-redux-form';

export default ({model, errors}) => {
    return (
            <Errors
                className="errors"
                model={model}
                show="touched"
                messages={{
                required: 'It is required field.',
                ...errors
                }}
            />
        );    
};