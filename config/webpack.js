const path = require('path');

function requireIfExists(path, fallback) {
  try {
    return require(path);
  }
  catch(err) {
    if(err.code === 'MODULE_NOT_FOUND') return fallback;
    throw err;
  }
}

module.exports = {
  webpack: {
    /***************************************************************************
     *                                                                         *
     * The webpack compilation should finished before this timeout or sails.js *
     * will not start                                                          *
     *                                                                         *
     ***************************************************************************/
    // _hookTimeout: 60000,

    /***************************************************************************
     *                                                                         *
     * A prefix to add to the hook logs                                        *
     *                                                                         *
     ***************************************************************************/
    // logPrefix: 'sails-hook-webpack2:',

    /***************************************************************************
     *                                                                         *
     * Options passed to webpack                                               *
     *                                                                         *
     ***************************************************************************/
    options: {
      context: path.resolve(__dirname, '../webpack/'),
    },

    /***************************************************************************
     *                                                                         *
     * Options for the middlewares used during development                     *
     * - after: the name of the middleware after which to insert the           *
     *          middlewares                                                    *
     * - hot: will be passed to the (webpack-hot-middleware)                   *
     *                   [https://github.com/glenjamin/webpack-hot-middleware] *
     * - dev: will be passed to the (webpack-dev-middleware)                   *
     *                     [https://github.com/webpack/webpack-dev-middleware] *
     * - history:will be passed to the (connect-history-api-fallback)          *
     *              [https://github.com/bripkens/connect-history-api-fallback] *
     *   when history is falsy, the history middleware will not be inserted    *
     *                                                                         *
     ***************************************************************************/
    middlewares: {
      // after: 'router',
      hot: { quiet: true },
      dev: { quiet: false },
      history: {}
    },

    /***************************************************************************
     *                                                                         *
     * This get merged with the webpack options by the hook when sails lift    *
     *                                                                         *
     ***************************************************************************/
    production: require('../webpack/build/webpack.prod.conf.js'),
    development: require('../webpack/build/webpack.dev.conf.js'),
    testing: requireIfExists('../webpack/build/webpack.test.conf.js')
  }
}
