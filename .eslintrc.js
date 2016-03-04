module.exports =
{
    parserOptions:
    {
        ecmaVersion: 6,
        sourceType: 'script',
        globalReturn: true,
        impliedStrict: true,
    },
    env:
    {
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    plugins:
    [
        'promise',
    ],
    rules:
    {
        'promise/always-catch':     1,
        'promise/always-return':    1,
        'array-bracket-spacing':       [ 1, "never", { arraysInArrays: false, objectsInArrays: false } ],
        'block-scoped-var':            2,
        'block-spacing':               [ 1, 'always' ],
        'brace-style':                 [ 1, 'allman', { 'allowSingleLine': true }],
        'comma-dangle':                [ 1, 'always-multiline' ],
        'comma-spacing':               [1, { 'before': false, 'after': true }],
        'comma-style':                 [2, 'last'],
        complexity:                    [ 1, 15 ],
        curly:                         [ 1, 'all' ],
        'dot-notation':                1,
        'eol-last':                    1,
        'handle-callback-err':         1,
        'keyword-spacing':             [ 1,
        {
            before: true,
            after:  true,
            overrides:
            {
                if:       { after: false },
                for:      { after: false },
                while:    { after: false },
                continue: { after: false },
            }
        } ],
        'linebreak-style':             [ 1, 'unix' ],
        'no-bitwise':                  1,
        'no-console' :                 0,
        'no-fallthrough':              1,
        'no-loop-func':                2,
        'no-nested-ternary':           2,
        'no-param-reassign':        [ 1, { props: false } ],
        'no-redeclare':                [ 2, { builtinGlobals: true } ],
        'no-return-assign':            [ 2, 'always' ],
        'no-self-compare':             2,
        'no-sequences':                2,
        'no-spaced-func':              1,
        'no-trailing-spaces':          1,
        'no-unexpected-multiline':     2,
        'no-unneeded-ternary':         2,
        'no-unused-expressions':       [ 2, { allowShortCircuit: true, allowTernary: true } ],
        'no-unused-vars':              [1, {args: 'after-used'}],
        'no-use-before-define':        [ 2, 'nofunc' ],
        'no-warning-comments':         [ 1, { 'terms': ['todo', 'fixme', 'any other term'], 'location': 'anywhere' }],
        'object-curly-spacing':        [ 1, 'always', { arraysInObjects: true } ],
        'padded-blocks':               [ 1, 'never' ],
        'quote-props':                 [ 1, 'as-needed', { keywords: true, numbers: true } ],
        quotes:                        [ 1, 'single', 'avoid-escape' ],
        semi:                          [ 2, 'always' ],
        'semi-spacing':                [2, { before: false, after: true }],
        'space-before-blocks':         [ 1, { functions: 'always', keywords: 'always' }],
        'space-before-function-paren': [ 1, 'never' ],
        'space-in-parens':             [ 1, 'never' ],
        'space-infix-ops':             1,
        'space-unary-ops':             [ 1, { words: true, nonwords: false }],
    },
};
