import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement = ({ code = '', scope = {}}, errorCallback) =>{
    const codeTrimmed = code.trim().replace(/;$/, '');

    const transformed = transform(`return (${codeTrimmed})`).trim();
    return errorBoundary(evalCode(transformed, scope), errorCallback);
}

export const renderElementAsync = (
    { code = '', scope = {}},
    resultCallback,
    errorCallback
) => {
    const render = element => {
        if (typeof element === 'undefined') {
            errorCallback(new SyntaxError('`render` must be called with valid TSX.'));
        } else {
            resultCallback(errorBoundary(element, errorCallback));
        }
    };
    if(!/render\s*\(/.test(code)){
        return errorCallback(
            new SyntaxError('No-Inline evaluations must call `render`.')
        );
    }

    evalCode(transform(code), {...scope, render});
}