import * as React from 'react';
import { LiveContext } from './LiveContext';
import { generateElement, renderElementAsync } from '../utils/transpile';

export interface ILiveProvider {
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

    componentWillMount() {
        const {code, scope, transformCode, noInline} = this.props;

        this.transpile({code, scope, transformCode, noInline});
    }

    componentDidUpdate({code: prevCode, scope: prevScope, noInline: prevNoInline, transformCode: prevTransformCode}) {
        const {code, scope, noInline, transformCode} = this.props;
        if (code !== prevCode || scope !== prevScope || noInline !== prevNoInline || transformCode !== prevTransformCode) {
            this.transpile({code, scope, transformCode, noInline});
        }
    }

    onChange = (code) => {
        const {scope, transformCode, noInline} = this.props;
        this.transpile({code, scope, transformCode, noInline});
    }

    onError = (error) => {
        this.setState({error: error.toString()});
    }

    transpile = ({
        code,
        scope,
        transformCode,
        noInline = false
    }) => {
        const input = {
            code: transformCode ? transformCode(code) : code,
            scope
        }

        const errorCallback = err => {
            this.setState({element: undefined, error: err.toString()});
        }
        const renderElement = element => {
            this.setState({
                ...this.state,
                element
            })
        }
        const state = {
            unsafeWrapperError: undefined,
            error: undefined
        };
        try {
            if (noInline) {
                this.setState({
                    ... state,
                    element: null
                });
                renderElementAsync(input, renderElement, errorCallback);
            } else {
                renderElement(generateElement(input, errorCallback))
            }
        } catch (error) {
            this.setState({
                ... state,
                error: error.toString()
            })
        }
    }

    render() {
        const {children, code, language, theme, disabled} = this.props;
        return(
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
        );
    }
}
