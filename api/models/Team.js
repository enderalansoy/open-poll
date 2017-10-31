/**
 * Team.js
 * aenderso@ford.com
 */

module.exports = {

  connection: 'mongo',
  schema: true,

  attributes: {
    project_name: {
      type: 'string',
      required: true,
    },
    vote: {
      collection: 'vote',
      via: 'voter',
    },
  },

};
