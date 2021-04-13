import {
    Route, Redirect
} from 'react-router-dom'

import React from 'react'

const GuestRoute = ({ className, children, user, ...props }) => {
    return (
        <Route {...props}>
            {(user && <Redirect to="/" />) || children}
        </Route>
    )
}

export default GuestRoute