import * as React from 'react';
import { LiveContext } from './LiveContext';
import { Editor } from './Editor';

const LiveEditor = (props) => {
    return (
        <LiveContext.Consumer>
            {({ code, language, theme, disabled, onChange}) => (
                <Editor
                    width={100}
                    height={100}
                    language={language}
                    code={code}
                    onChange={onChange}
                    {...props}
                />
            )}
        </LiveContext.Consumer>
    )
}