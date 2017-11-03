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
    vote: {
      collection: 'vote',
      via: 'voter',
    },
  },

};
