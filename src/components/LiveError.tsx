import * as React from 'react';
import { LiveContext } from './LiveContext';

const LiveError = (props) => {
    return (
        <LiveContext.Consumer>
            {({error}) => (
                error ? <pre {...props}>{error}</pre> : null
            )}
        </LiveContext.Consumer>
    )
}

export default LiveError;