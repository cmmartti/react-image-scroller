import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';
import pkg from './package.json';

const name = 'ImageScroller';
const path = 'dist/react-image-scroller';
const globals = {
    classnames: 'classNames',
    'prop-types': 'PropTypes',
    'react-dom': 'ReactDOM',
    react: 'React',
    emotion: 'emotion',
};
const external = Object.keys(globals);

const babelOptions = {
    babelrc: false,
    presets: [['@babel/preset-env', {modules: false}], '@babel/preset-react'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
    ],
};

export default [
    {
        input: 'src/index.js',
        output: {
            file: pkg.module,
            format: 'es',
        },
        external: [...external],
        plugins: [babel(babelOptions)],
    },
    {
        input: 'src/index.js',
        output: {
            name,
            file: path + '.js',
            format: 'umd',
            globals,
        },
        external,
        plugins: [babel(babelOptions), resolve()],
    },
    {
        input: 'src/index.js',
        output: {
            name,
            file: path + '.min.js',
            format: 'umd',
            globals,
        },
        external,
        plugins: [babel(babelOptions), resolve(), uglify({}, minify)],
    },
];
