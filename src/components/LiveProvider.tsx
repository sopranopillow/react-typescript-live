import * as React from 'react';
import { LiveContext } from './LiveContext';
import { transpile, generateElement, renderElement } from '../utils/transpile';

interface ILiveProvider {
    children: React.ReactChildren,
    code: string,
    disabled: boolean,
    language: string,
    noInline: boolean,
    scope: object,
    theme: object,
    transformCode: Node
}

export default class LiveProvider extends React.Component<ILiveProvider> {
    static defaultProps = {
        code: '',
        noInline: false,
        language: 'tsx',
        disabled: false
    }

    onChange = (code: string) => {
        const { scope, transformCode, noInline } = this.props;
        this.transpile({ code, scope, transformCode, noInline });
    }

    onError = error => {
        this.setState({
            error: error.toString()
        })
    }

    render() {
        const { children, code, language, theme, disabled } = this.props;

        return (
            <LiveContext.Provider
                value={{
                    ...this.state,
                    code,
                    language,
                    theme,
                    disabled,
                    onError: this.onError,
                    onChange: this.onChange
                }}
            >
                {children}
            </LiveContext.Provider>
        )
    }
}