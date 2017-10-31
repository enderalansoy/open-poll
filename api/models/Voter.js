/**
 * Voter.js
 * aenderso@ford.com
 */

module.exports = {

  connection: 'mongo',
  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: 'Enter name.',
    },
    password: {
      type: 'string',
      required: true,
    },
    vote: {
      collection: 'vote',
      via: 'voter',
    },
  },

};
