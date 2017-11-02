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
    total_points: {
      type: 'float',
      defaultsTo: 0,
    },
    vote: {
      collection: 'vote',
      via: 'voter',
    },
  },

};
