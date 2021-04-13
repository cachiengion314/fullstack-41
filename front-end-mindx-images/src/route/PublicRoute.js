import {
    Route
} from 'react-router-dom'

import React from 'react'

const PublicRoute = ({ children, ...props }) => {
    return (
        <Route {...props}>
            {children}
        </Route>
    )
}

export default PublicRoute