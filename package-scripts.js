const npsUtils = require('nps-utils');
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const copy = npsUtils.copy;
const concurrent = npsUtils.concurrent;

module.exports = {
    scripts: {
        build: {
            description: 'Clean dist directory and run all builds',
            default: series(
                rimraf('dist'),
                rimraf('lib'),
                concurrent.nps('build.rollup', 'build.babel')
            ),
            rollup: 'rollup --config',
            babel: 'npx babel src --out-dir lib',
        },
        demo: {
            default: series(
                rimraf('demo/dist'),
                'mkdir "demo/dist"',
                'webpack --env production',
                copy('demo/src/.gitignore demo/dist/')
            ),
        },
    },
};
